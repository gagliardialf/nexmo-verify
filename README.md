# nexmo-verify

Use case
You’re building a ride sharing service. You want your users to register with the service with their mobile phone number and you will use the Verify API to ensure that they own the number that they are registering with.

Once they are registered, you want your users to send SMS to each other using the SMS API, without revealing their private mobile numbers, so you will use a virtual number to mask those numbers.

Use any supported SDK to achieve this.

If you feel you need to create a simple user interface to collect users’ details, go ahead. Alternatively, you might want to create endpoints in your application to collect things like their number, verification codes, etc and call those using a utility like curl.