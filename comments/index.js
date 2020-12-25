const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const commentsDB = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts/:id/comments', (req, res)=> {
    const postId = req.params.id;
    res.send(commentsDB[postId] || [])
});

//when new comment will be created
app.post('/posts/:id/comments', async (req, res)=> {
    const postId = req.params.id;
    const id = randomBytes(4).toString('hex');
    const content = req.body.content;

    const foundComments = commentsDB[postId] || [];
    foundComments.push({id, content, status: 'pending'})

    commentsDB[postId] = foundComments;

    //Emit new event to Event-bus
    try {
        await axios.post('http://localhost:4005/events', {
            type: 'CommentCreated',
            payload: {
                id,
                content,
                postId,
                status: 'pending'
            }
        });
    } catch (error) {
        console.log('Error:', error)
    }

    res.status(201).send(foundComments)
});

// Get event from event-bus
app.post('/events', async(req, res)=> {
    const {type, payload} = req.body;

    console.log('COMMENTS MS GOT EVENT: ', req.body.type);

    const {postId, id, status } = payload;

    if(type === 'CommentModerated'){
        commentsDB[postId] = commentsDB[postId].map(comment => (comment.id === id ? {...comment, status}: comment) );

        //Emit new event CommentUpdated and send to event-bus
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            payload
        });
    }



    res.send({})
});

app.listen(4001, ()=> {
    console.log('Server starts on 4001 port')
});