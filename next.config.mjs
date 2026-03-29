/** @type {import('next').NextConfig} */
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const appRemotePattern = appUrl
  ? (() => {
      const { protocol, hostname, port } = new URL(appUrl);

      return {
        protocol: protocol.replace(":", ""),
        hostname,
        ...(port ? { port } : {}),
      };
    })()
  : null;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      ...(appRemotePattern ? [appRemotePattern] : []),
    ],
  },
};

export default nextConfig;
