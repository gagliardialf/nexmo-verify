'use strict'

const Nexmo = require('nexmo');

class SmsProxy {
    constructor(nexmoClient) {
        this.nexmo = nexmoClient
        this.numbers = [];
    }

    addUser(number) {
        this.numbers.push(number);
        console.log(JSON.stringify(this.numbers))
        if (this.numbers.length == 2) {
            this.createChat(this.numbers[0], this.numbers[1]);
        }
    }

    removeUser(number) {       
        console.log('remove user: ' + number)
    }

    createChat(userANumber, userBNumber) {
        this.chat = {
            userA: userANumber,
            userB: userBNumber
        };
        console.log(`Chat created between user A: ${userANumber} and user B: ${userBNumber}`);
        this.sendSMS();
    }

    sendSMS() {
        /*  
            Send a message from userA to the virtual number
        */
        this.nexmo.message.sendSms(process.env.VIRTUAL_NUMBER, this.chat.userA,
                                    'Reply to this SMS to talk to UserA');

        /*  
            Send a message from userB to the virtual number
        */
        this.nexmo.message.sendSms(process.env.VIRTUAL_NUMBER, this.chat.userB,
                                    'Reply to this SMS to talk to UserB');
    }


    getDestinationRealNumber(from) {
        let destinationRealNumber = null;
        console.log(`current chat: ${JSON.stringify(this.chat)}`);
        // Use `from` numbers to work out who is sending to whom
        const fromUserA = (from === this.chat.userA);
        const fromUserB = (from === this.chat.userB);

        if (fromUserA || fromUserB) {
            destinationRealNumber = fromUserA ? this.chat.userB : this.chat.userA;
        }

        return destinationRealNumber;
    }

    proxySms(from, text) {
        // Determine which real number to send the SMS to
        const destinationRealNumber = this.getDestinationRealNumber(from);

        if (destinationRealNumber  === null) {
            console.log(`No chat found for this number`);
            return;
        }

        // Send the SMS from the virtual number to the real number
        this.nexmo.message.sendSms(process.env.VIRTUAL_NUMBER,
                                   destinationRealNumber,
                                   text);
    }

}

module.exports = SmsProxy;