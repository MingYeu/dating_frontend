/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    env: {
        apiURL: process.env.apiURL,
        // https://unique.stacksolution.co/api
        // http://localhost:4000/api
        authToken: process.env.authToken,
    },
};

module.exports = nextConfig;
