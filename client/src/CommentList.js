import React, {useState, useEffect} from 'react';
import axios from 'axios';


const CommentList = ({postId}) => {

    const [comments, setComments] = useState([]);

    useEffect(()=>{
        (async ()=> {
            try {
             const {data} =  await axios.get(`//localhost:4001/posts/${postId}/comments`);
             setComments(data);
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    return (
        <ul>
            {comments.map(comment => (<li>{comment.content}</li>))}
        </ul>
    )
};

export default CommentList;