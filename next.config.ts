import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(); // ./i18n/request.ts ni o'qiydi

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
