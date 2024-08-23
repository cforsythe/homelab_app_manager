module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'octoprint.org',
          port: '',
          pathname: '/assets/img/*',
        },
        {
          protocol: 'https',
          hostname: 'pngimg.com',
          port: '',
          pathname: '/uploads/server/*',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/*',
        },
      ],
    },
  }