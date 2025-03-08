/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,

  // Disable serverless functions error display in production
  onDemandEntries: {
    // Keep the error display minimal in production
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // Configure error handling
  productionBrowserSourceMaps: false,
};

export default nextConfig;
