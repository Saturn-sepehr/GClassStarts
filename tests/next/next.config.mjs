/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only, so emit a fully prerendered
  // export instead of a Node server build.
  output: "export",
  basePath: "/GClassStarts/next",
  // Pages has no image optimiser
  images: { unoptimized: true },
  // emit next/index.html rather than next.html
  trailingSlash: true,
};

export default nextConfig;
