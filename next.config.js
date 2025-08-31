/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 파일 서빙 설정
  async headers() {
    return [
      {
        source: '/mutsideout/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/melpik/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // 이미지 최적화 설정
  images: {
    domains: [],
    unoptimized: true, // 정적 이미지 최적화 비활성화
  },

  // 정적 내보내기 설정
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // 정적 파일 복사 설정
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
};

module.exports = nextConfig;
