# nexmo-verify

#### _Use case_
You’re building a ride sharing service. You want your users to register with the service with their mobile phone number and you will use the Verify API to ensure that they own the number that they are registering with.

Once they are registered, you want your users to send SMS to each other using the SMS API, without revealing their private mobile numbers, so you will use a virtual number to mask those numbers.

#### _RUNNING INSTRUCTION_
1. add a .env file with the following keys:
   `NEXMO_API_KEY`
   `NEXMO_API_SECRET`   
   `NEXMO_BRAND_NAME`
   `VIRTUAL_NUMBER`
2. install the packages (`npm i`)
3. run the application (`npm start`)
4. expose the application on the Internet with ngrok
5. set the incoming-sms webhook address http://(ngrok_addr)/incoming-sms
