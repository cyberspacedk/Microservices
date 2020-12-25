const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

app.post('/events', (req, res)=> {
    console.log('EVENT BUS GOT EVENT', req.body.type);

    const event = req.body;
    //Send event to all listeners
    try {
        axios.post('http://localhost:4000/events', event); // Post creation
        axios.post('http://localhost:4001/events', event); // Comments creation
        axios.post('http://localhost:4002/events', event); // Query service
        axios.post('http://localhost:4003/events', event); // Moderation service
    } catch (error) {
        console.log('Error:', error)
    }
  

    res.send({status: 'ok'});
});

app.listen(4005, ()=>{
    console.log('Server starts on port 4005')
})