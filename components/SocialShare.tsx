"use client"
import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  propertyId: string;
  title: string;
  url?: string;
}

export default function SocialShare({ propertyId, title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || `${typeof window !== 'undefined' ? window.location.origin : ''}/properties/${propertyId}`;
  const shareText = `Check out this property: ${title}`;

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`,
    };

    if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="w-5 h-5 text-black" />
        <h3 className="font-bold text-black">Share Property</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <Facebook className="w-4 h-4" />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all"
        >
          <Twitter className="w-4 h-4" />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all"
        >
          <Linkedin className="w-4 h-4" />
          <span>LinkedIn</span>
        </button>
        <button
          onClick={() => handleShare('email')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
