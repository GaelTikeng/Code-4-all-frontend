/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "www.ekreative.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "www.mymcpl.org",
      },
      {
        hostname: "cdn1.iconfinder.com",
      },
      {
        hostname: "i.pinimg.com",
      },
      {
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
};
