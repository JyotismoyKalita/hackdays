import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 't32a2y5k3v.ufs.sh',
                port: '',
                pathname: '/f/**',
            },
            {
                protocol: 'https',
                hostname: 'api.microlink.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
};


export default nextConfig;
