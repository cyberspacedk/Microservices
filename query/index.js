const app = require('express')(); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
 

app.use(cors());
app.use(bodyParser.json());

const postsDB = {};

app.get('/posts', (req, res)=> {
    res.send(postsDB);
});

// Get event from event-bus
app.post('/events', (req, res)=>{
    const {type, payload} = req.body;

    console.log("QUERY MS GOT EVENT", type)
    
    if(type === 'PostCreated'){
        const {id, title} = payload;
        postsDB[id] = {
            id,
            title,
            comments: []
        };
    }
    
    if(type === 'CommentCreated'){
        const { id, content, postId, status } = payload;
        postsDB[postId].comments.push({ id, content, status})
    }
    
    if(type === 'CommentUpdated'){
       const {id, status, postId} = payload;

       const post = postsDB[postId];
       const comment = post.comments.find(comment => comment.id === id);
       comment.status = status;
    }

    res.send({})
});

app.listen(4002, ()=>{
    console.log('Server start on 4002')
});