module.exports = {
  facebook: {
    verifyToken: process.env.FACEBOOK_VERIFY_KEY,
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  },
  sendGrid: {
    accessToken: process.env.SENDGRID_ACCESS_TOKEN,
    senderEmail: process.env.SENDGRID_SENDER_EMAIL,
    companyEmail: process.env.SENDGRID_COMPANY_EMAIL,
  },
  mongo: {
    connection: process.env.MONGO_URL,
  },
};
