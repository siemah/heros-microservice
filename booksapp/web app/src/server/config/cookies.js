// cookies options configuration
const cookiesConfig = {
  options: { 
    expires: new Date(Date.now() + 1000 * 3600 * 24 * 7), 
    httpOnly: true, 
    secure: false,
  },
  expiredOptions: {
    expires: new Date(Date.now() - 100000), 
  }
}

export default cookiesConfig;