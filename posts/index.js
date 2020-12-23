const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = {};

app.use(cors());
app.use(bodyParser.json());


app.get('/posts', (req, res)=> {
    res.send(posts)
});

app.post('/posts', (req, res)=> {
    console.log("🚀 ~ file: index.js ~ line 16 ~ app.post ~ req", req)
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {id, title};

    res.status(201).send(posts[id])
});

app.listen(4000, ()=> {
    console.log('Server starts on 4000 port')
})