'use strict'

class SmsSender {
    constructor(nexmoClient) {
        this.nexmo = nexmoClient
    }

    sendSMS(from, to, text) {
        this.nexmo.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
              } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
            }
          });
    }
}

module.exports = SmsSender;