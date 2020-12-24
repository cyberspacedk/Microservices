const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const postedComments = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts/:id/comments', (req, res)=> {
    const postId = req.params.id;
    res.send(postedComments[postId] || [])
});

app.post('/posts/:id/comments', async (req, res)=> {
    const postId = req.params.id;
    const id = randomBytes(4).toString('hex');
    const content = req.body.content;

    const foundComments = postedComments[postId] || [];
    foundComments.push({id, content})

    postedComments[postId] = foundComments;

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            payload: {
                id,
                content,
                postId
            }
        });
    } catch (error) {
        console.log('Error:', error)
    }

    res.status(201).send(foundComments)
});

// Get event from event-bus
app.post('/events', (req, res)=> {
    console.log('COMMENTS MS HAS RECEIVED EVENT: ', req.body.type);

    res.send({})
})

app.listen(4001, ()=> {
    console.log('Server starts on 4001 port')
});