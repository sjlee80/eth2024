/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
  },
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source: '/cosmiccowboys',
        destination: 'https://cosmiccowboys.cloud',
        permanent: false
      },
      {
        source: '/pinatacloud',
        destination: 'https://www.pinata.cloud/blog/how-to-make-a-frame-on-farcaster-using-ipfs',
        permanent: false
      },
      {
        source: '/video',
        destination: 'https://youtu.be/wUt5NjXHSO4',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
