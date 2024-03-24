/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MESUREMENT_ID: process.env.FIREBASE_MESUREMENT_ID,
    NEXT_PUBLIC_BASE_API_URL: process.env.BASE_API_URL
  },
  images: {
    domains: [
      "proto-v2.s3.ap-northeast-2.amazonaws.com"
    ]
  },
  rewrites: () => {
    return [
      {
        source: '/votes',
        destination: `http://3.35.168.245:8080/votes`
      },
      {
        source: '/votes/vote-contract/:id*',
        destination: 'http://3.35.168.245:8080/votes/vote-contract/:id*'
      },
      {
        source: '/votes/target-address/:target*',
        destination: 'http://3.35.168.245:8080/votes/target-address/:target*'
      }
    ]
  }
}

module.exports = nextConfig
