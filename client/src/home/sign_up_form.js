import React from 'react';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();

String.prototype.hashCode = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

class SignupForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.choosePage = this.choosePage.bind(this);
        this.sendPost = this.sendPost.bind(this);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            mode: ['userInput', "userInput", "userInput"],
            // 0: No errors, 1: Username is already taken, 2: Wrong passwords; 3: Empty username; 4: Empty password
            error: 0,
        }
    }

    // Manages page state
    choosePage(page) {
        this.props.choosePage(page)
    }

    // Handles user username and password input
    handleInputChange(type, event) {
        if (type === 0) {
            this.setState({username: event.target.value})
        }
        else if (type === 1) {
            this.setState({password: event.target.value})
        } else {
            this.setState({confirmPassword: event.target.value})
        }
    }

    // Manages POST request
    sendPost = (username, password) => {
        // let url = 'https://musicbear.herokuapp.com/api/users';
        let url = 'http://localhost:5000/api/users';

        let xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            let json = JSON.parse(xhr.responseText);
            console.log('username: ' + json['username'] + ' password: ' + json['password'] + ' error: ' + json['error']);
            if (json['error'] === '0') {
                this.setState({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    mode: ['userInput', 'userInput', 'userInput'],
                    error: 0
                });
                this.choosePage(1);
            }
            else if (json['error'] === '1') {
                this.setState({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    mode: ['invalidInput', 'invalidInput', 'invalidInput'],
                    error: 1
                });
            }
        };

        xhr.send(JSON.stringify({"username": username, "password": password.hashCode().toString()}));
    };

    // Handles sign up
    // NEED TO HANDLE EXISTING USERNAME ERROR
    handleSignup(event) {
        event.preventDefault();
        if (this.state.username.length === 0) {
            this.setState({
                mode: ['invalidInput', 'userInput', 'userInput'],
                error: 4
            })
        }
        else if (this.state.password.length === 0) {
            this.setState({
                mode: ['userInput', 'invalidInput', 'invalidInput'],
                error: 4
            })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                mode: ['userInput', 'invalidInput', 'invalidInput'],
                error: 2
            })
        } else {
            this.sendPost(this.state.username, this.state.password);
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div id='signupPage'>
                <form onSubmit={(e) => this.handleSignup(e)}>
                    <h2 className='formBack' onClick={() => this.choosePage(0)}>Home <i className="fas fa-times"/>
                    </h2>
                    <h1 className='formTitle'>Sign up</h1>
                    <label className='formlabel'>
                        Username
                        <input type='text' value={this.state.username} onChange={(e) => this.handleInputChange(0, e)}
                               placeholder='Enter your username' className={this.state.mode[0]}/>
                    </label>
                    <label className='formlabel'>
                        Password
                        <input type='password' value={this.state.password}
                               onChange={(e) => this.handleInputChange(1, e)}
                               placeholder='Enter your password' className={this.state.mode[1]}/>
                    </label>
                    <label className='formlabel'>
                        Confirm Password
                        <input type='password' value={this.state.confirmPassword}
                               onChange={(e) => this.handleInputChange(2, e)}
                               placeholder='Confirm your password' className={this.state.mode[2]}/>
                    </label>
                    <input type='submit' value='Sign up' className='formButton'/>
                    <h3 id='signUpLink' onClick={() => this.choosePage(1)}>click here to sign in</h3>
                </form>
            </div>
        )
    }
}

export default SignupForm;
