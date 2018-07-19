import React, { Component } from 'react'
import RandomPosts from './RandomPosts';


class UserCards extends Component {

    constructor(props) {
        super(props) 
            this.state = {
                randomized: false,
            }
        }

    getRandomPosts = (event) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.props.userId}`)
            .then(response => response.json())
            .then(this.randomizePosts)
            .then(posts => 
                this.props.showUsersPosts(posts)
            )
    }

    randomizePosts = (posts) => {
        let randomPosts = []
        for (let i = 0; randomPosts.length < 5; i++) {
            var randomPost = posts[Math.floor(Math.random() * posts.length)]

            if (!randomPosts.map(post => post.id).includes(randomPost.id)) {
                randomPosts.push(randomPost)
            }
        }        

        this.setState({randomized: true})
        return randomPosts
    }


    render() {

        const avatarEmail = this.props.userEmail

        return (
        <div>
            <div className='user-card' onClick={this.getRandomPosts}>
                <div className='user-info-container'>
                    <div id='user-image'>
                        <img src={`https://api.adorable.io/avatars/150/${avatarEmail}.png`}/>
                    </div>
                    <div id='user-info'>
                        <p id='user-catchphrase'><i>"{this.props.userCatchPhrase}"</i></p>
                        <br/>
                        <p id='user-name'>{this.props.userName}</p>
                        <small id='user-email'>{this.props.userEmail}</small>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default UserCards
