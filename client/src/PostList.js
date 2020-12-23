import React, {useEffect, useState} from 'react'
import axios from 'axios';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList'

const PostList = () => {
    const [posts, setPosts] = useState({});

    useEffect(()=> {
        (async ()=> {
            try {
             const {data} = await axios('//localhost:4000/posts');
             setPosts(data)
            } catch (error) {
                console.log('Err', error)
            }
        })()
    }, [])

    const renderedposts = Object.values(posts).map((post)=> {
        return (
            <div 
                key={post.id} 
                className="card p-2" 
                style={{width: '30%', margin:'10px 20px'}}
            >
                <h3 className="p-3">{post.title}</h3>
                <CommentList postId={post.id}/>
                <CommentCreate postId={post.id}/>
            </div>
        )
    })

    return (
        <div className="d-flex flex-row flex-wrap">
            {renderedposts} 
        </div>
    )
};

export default PostList;