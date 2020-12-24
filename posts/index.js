const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const posts = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts', (req, res)=> {
    res.send(posts)
});

app.post('/posts', async (req, res)=> { 
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {id, title};

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'PostCreated',
            payload: { id, title }
        });
    } catch (error) {
        console.error(error)
    }
    

    res.status(201).send(posts[id])
});

// Get event from event-bus
app.post('/event', (req, res)=> {
    console.log('POSTS MS HAS RECEIVED EVENT: ', req.body.type);

    res.send({})
})

app.listen(4000, ()=> {
    console.log('Server starts on 4000 port')
})