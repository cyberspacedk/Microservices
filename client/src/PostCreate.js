import React, {useState} from 'react';
import axios from 'axios';

const PostCreate = ()=> {
    const [title, setTitle] = useState('');

    const handleChange = ({target})=> {
        setTitle(target.value)
    };

    const sendPost = async (e) => {
        e.preventDefault();
        try{
            await axios.post('//localhost:4000/posts', { title })
            setTitle('')
        }catch(err){
            console.log(err)
        }       
    }

    return (
        <div className="row col-3">
            <form onSubmit={sendPost}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" value={title} onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default PostCreate;