import React, { Component } from 'react'
import UserCards from './UserCards'
import RandomPosts from './RandomPosts'

const usersURL = 'https://jsonplaceholder.typicode.com/users'

class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            randomUsers: [],
            randomized: false,
            usersPosts: [],
            displayInstructions: true
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        fetch(usersURL)
            .then(response => response.json())
            .then(users => {
                this.setState({
                    users: users
                })
            })
            .then(this.randomizeUsers)
    }

    randomizeUsers = () => {
        const randomUsers = []
        for (let i = 0; randomUsers.length < 3; i++) {
            var randomUser = this.state.users[Math.floor(Math.random() * this.state.users.length)]

            if (!randomUsers.map(user => user.id).includes(randomUser.id)){
                randomUsers.push(randomUser)   
            }
            
        }

        this.setState({
            randomUsers,
            randomized: true
        })
    }

    showUsersPosts = (usersPosts) => {
        this.setState({
            usersPosts,
            displayInstructions: false
        })
    } 

    render() {

        console.log(this.state.usersPosts);
        
        
        const randomTrue = this.state.randomized
        const displayedUsers = this.state.randomUsers
        const displayInstructions = this.state.displayInstructions

        return (
            <div>
                <h1></h1>
                <div className='user-cards'>
                    {randomTrue && displayedUsers.map(user => {
                        return (
                                <div>
                                <UserCards  userName={user.name}
                                            userEmail={user.email}
                                            userCatchPhrase={user.company.catchPhrase}
                                            userId={user.id} 
                                            showUsersPosts={this.showUsersPosts}
                                            />
                                </div>
                        )
                        })}
                </div>
                {displayInstructions ?
                                        <div className='instruction-box'>
                                            <p>Click a card to view five of their posts.</p>
                                        </div> : <RandomPosts postInfo={this.state.usersPosts}/>}
                
            </div>
        )
    }
}

export default Users
