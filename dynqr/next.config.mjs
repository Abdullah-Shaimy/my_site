import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dirnameValue = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: dirnameValue,
  },
};

export default nextConfig;
