/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    output:
        process.env.NEXT_PUBLIC_PLATFORM === "electron"
            ? "export"
            : "standalone",
    images: {
        unoptimized: true,
    }
};

module.exports = nextConfig;
