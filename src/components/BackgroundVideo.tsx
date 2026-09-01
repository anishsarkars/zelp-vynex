"use client";
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const onCanPlay = () => {
      video.classList.add('ready');
    };

    video.addEventListener('canplay', onCanPlay);

    const isHls = src.endsWith('.m3u8');

    if (isHls && Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
        maxBufferLength: 30,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for native Safari for HLS
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    } else {
      // Standard MP4 playback
      video.src = src;
      video.load();
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="page-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="page-video"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
