import React, { Component } from 'react'

class RandomPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        const randomPosts = this.props.postInfo        
    
        return (
            <div className='random-posts'>
                <div id='post-text'>
                    {randomPosts.map(post => {
                        return(
                        <div>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default RandomPosts
