import React from 'react'

import PostCreate from './PostCreate';
import PostList from './PostList';

const App = ()=> {
    return (
        <div className="container"> 
            <h1>Create Post</h1> 
            <PostCreate />
            <hr />
            <h2>Post lists</h2>
            <PostList />
        </div>)
};

export default App;