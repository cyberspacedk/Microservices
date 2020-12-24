const app = require('express')(); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
 

app.use(cors());
app.use(bodyParser.json());

const postsDB = {};

app.get('/posts', (req, res)=> {
    res.send(postsDB);
});

app.post('/events', (req, res)=>{
    const {type, payload} = req.body;
    console.log("🚀 ~ type ================", type)
    
    if(type === 'PostCreated'){
        const {id, title} = payload;
        postsDB[id] = {
            id,
            title,
            comments: []
        };
    };
    
    if(type === 'CommentCreated'){
        const { id, content, postId} = payload;
        postsDB[postId].comments.push({ id, content})
    }
    
    console.log("🚀 ~ postsDB", postsDB)
    res.send({})
});

app.listen(4002, ()=>{
    console.log('Server start on 4002')
});