"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  isPortrait: boolean;
};

export default function BlogVideo({ src, isPortrait }: Props) {
  return (
    <video
      src={src}
      className="w-full h-full object-cover rounded-2xl"
      controls
      autoPlay
      playsInline
    />
  );
}
