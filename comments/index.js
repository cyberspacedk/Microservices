const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const postedComments = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts/:id/comments', (req, res)=> {
    const postId = req.params.id;
    res.send(postedComments[postId] || [])
});

app.post('/posts/:id/comments', (req, res)=> {
    const postId = req.params.id;
    const id = randomBytes(4).toString('hex');
    const content = req.body.content;

    const foundComments = postedComments[postId] || [];
    foundComments.push({id, content})

    postedComments[postId] = foundComments;

    res.status(201).send(foundComments)
});

app.listen(4001, ()=> {
    console.log('Server starts on 4001 port')
})