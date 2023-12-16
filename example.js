
const mqtt = require('mqtt');
const cors = require('cors');
const express= require('express')
const app =express();



app.use(cors(
  {
    origin: ["http://localhost:3000"],
   //   origin: ["https://asteropen.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }))


// your credentials
const options = {
  username: 'abdelrahman',
  password: 'Nowyouseeme2',
};

// connect to your cluster, insert your host name and port
const client = mqtt.connect('tls://c1bf4523d3c9437388ac725e6f46c8a3.s2.eu.hivemq.cloud:8883', options);
let text="not fire"
// prints a received message
client.on('message', function(topic, message) {
  console.log(String.fromCharCode.apply(null, message)); // need to convert the byte array to string
  text=String.fromCharCode.apply(null, message);
});

// reassurance that the connection worked
client.on('connect', () => {
  console.log('Connected!');
});

// prints an error message
client.on('error', (error) => {
  console.log('Error:', error);
});

// subscribe and publish to the same topic
client.subscribe('message');
//client.publish('message', 'Hello, this message was received!');

app.post('/api', async (req, res) => {
  res.json(text)
})

app.listen(3005, () =>{

console.log('App is lestening on port 3005')

})