import React from 'react';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();

// Hashing algorithm for password
String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.choosePage = this.choosePage.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);

        this.state = {
            username: '',
            password: '',
            mode: ['userInput', 'userInput']
        }
    }


    // Manages page state
    choosePage(page) {
        this.props.choosePage(page)
    }

    // Handles user username and password input
    handleInputChange(type, event) {
        if (type === 0){
            this.setState({username: event.target.value})
        } else {
            this.setState({password: event.target.value})
        }
    }

    // Checks password
    confirmPassword = (username, password) => {
        let correctPassword;
        let url = 'http://localhost:5000/api/users/?username=' + username + '&password=' + password.hashCode().toString();
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            let json = JSON.parse(xhr.responseText);
            correctPassword = json['answer'];
            if (correctPassword === 'true') {
                this.choosePage(3);
            }
            else {
                this.setState({username: '', password: '', mode: ['invalidInput', 'invalidInput']})
            }
        };
        xhr.send();
    };


    // Handles login
    handleLogin(e) {
        e.preventDefault();
        this.confirmPassword(this.state.username, this.state.password);
    }

    render() {
        return (
            <div id='loginPage'>
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <h2 className='formBack' onClick={() => this.choosePage(0)}>Home <i className="fas fa-times"/></h2>
                    <h1 className='formTitle'>Sign in</h1>
                    <label className='formLabel'>
                        Username
                        <input type='text' value={this.state.username} onChange={(e) => this.handleInputChange(0, e)}
                               placeholder='Enter your username' className={this.state.mode[0]}/>
                    </label>
                    <label className='formLabel'>
                        Password
                        <input type='password' value={this.state.password}
                               onChange={(e) => this.handleInputChange(1, e)}
                               placeholder='Enter your password' className={this.state.mode[1]}/>
                    </label>
                    <input type='submit' value='Sign in' className='formButton'/>
                    <h3 id='signUpLink' onClick={() => this.choosePage(2)}>click here to sign up</h3>
                </form>
            </div>
        )
    }
}

export default LoginForm;