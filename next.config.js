/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "media-exp1.licdn.com",
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};
