module.exports = {
  facebook: {
    api: {
      sendMessage: "https://graph.facebook.com/v15.0/me/messages?access_token=",
    },
    randomGreetingMessages: [
      "How are you?",
      "I hope you're doing well.",
      "I hope you're having a great day.",
    ],
    messageType: {
      response: "RESPONSE",
      update: "UPDATE",
      messageTag: "MESSAGE_TAG",
    },
  },
  sendGrid: {
    api: {
      sendEmail: "https://api.sendgrid.com/v3/mail.send",
    },
  },
};
