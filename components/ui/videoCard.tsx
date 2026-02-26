"use client";

import { Play } from "lucide-react";

type Props = {
  src: string;
  title: string;
};

export default function VideoCard({ src, title }: Props) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <div className="relative aspect-video bg-gray-600 cursor-pointer group">
        <video
          src={`${src}#t=0.1`}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-gray-200 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
    </a>
  );
}
