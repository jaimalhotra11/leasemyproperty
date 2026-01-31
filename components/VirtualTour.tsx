'use client';

import React, { useState } from 'react';
import { Video, Image as ImageIcon, X, Play } from 'lucide-react';
import Image from 'next/image';

interface VirtualTourProps {
  virtualTourUrl?: string;
  videoUrl?: string;
  images?: string[];
}

export default function VirtualTour({ virtualTourUrl, videoUrl, images = [] }: VirtualTourProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [is360Open, setIs360Open] = useState(false);

  if (!virtualTourUrl && !videoUrl && images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <h3 className="text-xl font-bold text-black mb-4">Virtual Tour</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videoUrl && (
          <div className="relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
            <div className="relative h-48 bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                alt="Video thumbnail"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-black ml-1" />
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-gray-700">
              <Video className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Video Walkthrough</span>
            </div>
          </div>
        )}

        {virtualTourUrl && (
          <div className="relative group cursor-pointer" onClick={() => setIs360Open(true)}>
            <div className="relative h-48 bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={images[0] || 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'}
                alt="360 tour thumbnail"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-black" />
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-gray-700">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">360° Virtual Tour</span>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && videoUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-black rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-auto max-h-[80vh]"
            />
          </div>
        </div>
      )}

      {/* 360 Tour Modal */}
      {is360Open && virtualTourUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setIs360Open(false)}>
          <div className="relative w-full max-w-6xl bg-white rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIs360Open(false)}
              className="absolute top-4 right-4 z-10 bg-black/90 hover:bg-black text-white rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-4">
              <h3 className="text-xl font-bold text-black mb-4">360° Virtual Tour</h3>
              <iframe
                src={virtualTourUrl}
                className="w-full h-[70vh] rounded-lg border-2 border-gray-200"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
