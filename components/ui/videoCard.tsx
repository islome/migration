"use client";

import { Play } from "lucide-react";

type Props = {
  videoUrl: string | null;
  imageUrl: string | null;
  title: string;
};

export default function VideoCard({ videoUrl, imageUrl, title }: Props) {
  // Video ustuvor; video bo'lmasa rasm ko'rsatiladi.
  if (videoUrl) {
    return (
      <a href={videoUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-video bg-gray-600 cursor-pointer group">
          <video
            src={`${videoUrl}#t=0.1`}
            className="w-full h-full object-cover"
            preload="metadata"
            muted
            playsInline
            poster={imageUrl ?? undefined}
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-gray-500 ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (imageUrl) {
    return (
      <a href={imageUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative aspect-video bg-gray-600 cursor-pointer group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
        </div>
      </a>
    );
  }

  // Media umuman bo'lmasa — placeholder
  return (
    <div className="relative aspect-video bg-gray-200 flex items-center justify-center">
      <span className="text-gray-400 text-sm">Media yo&apos;q</span>
    </div>
  );
}
