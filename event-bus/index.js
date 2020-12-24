const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

app.post('/events', (req, res)=> {
    const event = req.body;
    console.log('Got event =', event, '\r\r');
    
    try {
        axios.post('http://localhost:4000/events', event);
        axios.post('http://localhost:4001/events', event);
        axios.post('http://localhost:4002/events', event);
    } catch (error) {
        console.log('Error:', error)
    }
  

    res.send({status: 'ok'});
});

app.listen(4005, ()=>{
    console.log('Server starts on port 4005')
})