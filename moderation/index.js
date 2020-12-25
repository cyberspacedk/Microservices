const app = require('express')();
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const posts = {};

app.use(bodyParser.json());

const restrictedVocabulary = ['orange', 'fuck'];

function moderate(str){
    const isAllowed = !restrictedVocabulary.includes(str);
    return isAllowed ? 'approved' : 'rejected';
}

// Get event from event-bus
app.post('/events', async (req, res) => {
    const {type, payload} = req.body;

    console.log('MODERATION MS GOT EVENT', type);

    try{
        if(type === 'CommentCreated'){
            const status = moderate(payload.content);
            //after moderation emit new event and send to Event-bus
            await axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                payload:{
                    ...payload,
                    status
                }
            })
        }
    }catch (err) {
        console.log('Error', err)
    }

   res.send({});
});

app.listen(4003, ()=>{
    console.log('Server start on 4003')
})
