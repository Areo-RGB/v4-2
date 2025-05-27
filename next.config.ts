import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Experimental features for better compatibility
  experimental: {
    turbo: {
      rules: {
        // Configure video file handling for Turbopack
        '*.mp4': {
          loaders: ['file-loader'],
          as: '*.mp4',
        },
        '*.webm': {
          loaders: ['file-loader'],
          as: '*.webm',
        },
        '*.mov': {
          loaders: ['file-loader'],
          as: '*.mov',
        },
        '*.m4v': {
          loaders: ['file-loader'],
          as: '*.m4v',
        },
      },
    },
  },
}

export default withNextVideo(nextConfig);