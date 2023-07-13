const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateVerificationToken() {
  return uuidv4();
}

async function sendVerificationEmail(email, verificationToken) {
  const serverUrl =
    `${process.env.BASE_URL}:${process.env.APP_PORT}` ||
    `http://localhost:${process.env.APP_PORT}`;
  const verificationLink = `${serverUrl}/api/users/verify/${verificationToken}`;
  const msg = {
    to: email,
    from: process.env.EMAIL_SENDER,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Email successfully sent");
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
}

module.exports = { generateVerificationToken, sendVerificationEmail };
