import React, {useState} from 'react';
import axios from 'axios';


const CommentCreate = ({postId}) => {
    const [content, setContent] = useState('')

    const handleChange = ({target}) => {
        setContent(target.value);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            await axios.post(`//localhost:4001/posts/${postId}/comments`, {content});
            setContent('')
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input className="form-control" onChange={handleChange} value={content}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default CommentCreate;