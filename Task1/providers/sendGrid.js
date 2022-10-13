const sendGrid = require("@sendgrid/mail");
const config = require("../config");

sendGrid.setApiKey(config.sendGrid.accessToken);

async function sendEmail(subject, text, html, isCompany, receipientEmail) {
  const recipient = isCompany ? config.sendGrid.companyEmail : receipientEmail;

  const message = {
    to: recipient,
    from: config.sendGrid.senderEmail,
    subject,
    text,
    html,
  };

  try {
    const result = await sendGrid.send(message);

    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendEmail };
