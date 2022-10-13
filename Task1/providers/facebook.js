const axios = require("axios");
const config = require("../config");
const constant = require("../constant");
const User = require("../models/users");
const Product = require("../models/products");
const { sendEmail } = require("../providers/sendGrid");

async function webhookHandler(body) {
  const { object } = body;

  if (object !== "page") {
    return false;
  }

  console.log("webhook received");
  // console.dir(body, { depth: null });

  try {
    let responseMessage = "";
    const customerId = body.entry[0].messaging[0].sender.id;

    const isUserVisited = await User.findOne({
      facebookId: customerId,
    }).exec();

    if (!isUserVisited) {
      responseMessage =
        constant.facebook.randomGreetingMessages[
          Math.floor(
            Math.random() * constant.facebook.randomGreetingMessages.length
          )
        ];

      const newVisitor = new User();
      newVisitor.facebookId = customerId;
      await newVisitor.save();
      await sendMessage(responseMessage, customerId);
      return true;
    }

    const customerMessage = body.entry[0].messaging[0].message.text;
    const command =
      customerMessage[0] === "/" ? customerMessage.split(" ")[0] : null;

    if (!command) {
      console.log("not command");
      return true;
    }

    const productId = customerMessage.split(" ")[1];
    const product = await Product.findOne({ id: productId }).exec();
    if (!productId || !product) {
      console.log("product not found");
      return true;
    }

    switch (command) {
      case "/desc":
        responseMessage = product.description;
        break;
      case "/price":
        responseMessage = product.price;
        break;
      case "/shipping":
        responseMessage = product.shippingFee;
        break;
      case "/buy":
        const subject = "New Order Coming In";
        const text = `new orders ${product.title} - Price ${product.price} - Shipping Fee ${product.shippingFee}  For customer ${customerId}`;
        const html = `<strong>new orders ${product.title} <strong> <br/> - Price ${product.price} <br/> - Shipping Fee ${product.shippingFee} <br/> <br/> For customer ${customerId}`;
        await sendEmail(subject, text, html, true);
        responseMessage = "Order has been made, please wait for updates";
        break;
      default:
        return true;
    }

    await sendMessage(responseMessage, customerId);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function webhookVerify(mode, token, challenge) {
  if (mode && token) {
    return mode === "subscribe" && token === config.facebook.verifyToken;
  }

  return false;
}

async function sendMessage(message, recipientId) {
  const body = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: message,
    },
    messaging_type: constant.facebook.messageType.response,
  };

  const result = await axios.post(
    `${constant.facebook.api.sendMessage}${config.facebook.accessToken}`,
    body
  );

  return result;
}

module.exports = { sendMessage, webhookVerify, webhookHandler };
