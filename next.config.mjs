/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "cdn.pixabay.com" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
