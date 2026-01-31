import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

async function uploadBuffer(buffer: Buffer, folder: string) {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error || !result) return reject(error || new Error('Upload failed'));
      resolve(result.secure_url);
    });
    stream.end(buffer);
  });
}

export async function POST(req: Request) {
  const { profile } = await requireAuth();
  if (!profile || profile.role !== 'landlord') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 500 });
  }

  const form = await req.formData();
  const folder = (form.get('folder') as string) || 'leasemyproperty/properties';
  const files = form.getAll('files');
  if (!files || files.length === 0) return NextResponse.json({ error: 'No files provided' }, { status: 400 });

  try {
    const urls: string[] = [];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    for (const file of files) {
      const blob = file as Blob;
      
      // Validate file type
      if (!allowedTypes.includes(blob.type)) {
        return NextResponse.json({ error: `Invalid file type: ${blob.type}. Allowed types: ${allowedTypes.join(', ')}` }, { status: 400 });
      }

      // Validate file size
      if (blob.size > maxFileSize) {
        return NextResponse.json({ error: `File size exceeds 5MB limit: ${blob.name}` }, { status: 400 });
      }

      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const url = await uploadBuffer(buffer, folder);
      urls.push(url);
    }
    return NextResponse.json({ urls });
  } catch (e: any) {
    console.error('Error uploading files:', e);
    return NextResponse.json({ error: e.message || 'Upload failed' }, { status: 500 });
  }
}