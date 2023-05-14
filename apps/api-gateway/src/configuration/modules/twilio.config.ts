export = {
  accountSid: String(process.env.TWILIO_ACCOUNT_SID),
  authToken: String(process.env.TWILIO_AUTH_TOKEN),
  serviceSid: String(process.env.TWILIO_VERIFICATION_SERVICE_SID),
  senderNumber: String(process.env.TWILIO_SENDER_PHONE_NUMBER),
};
