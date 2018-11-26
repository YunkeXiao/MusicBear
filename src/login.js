import React from 'react';
import './index.css';

class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    // Handles user username and password input
    handleInputChange(type, event) {
        if (type === 0) {
            this.setState({username: event.target.value})
        }
        else {
            this.setState({password: event.target.value})
        }
    }

    // Handles login
    handleLogin(event) {
        event.preventDefault();
        this.setState({username: '', password: ''})
    }

    render() {
        return (
            <div id='loginPage'>
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <label className='loginLabel'>
                        Username
                        <input type='text' value={this.state.username} onChange={(e) => this.handleInputChange(0, e)}
                               placeholder='Enter your username' className="loginInput"/>
                    </label>
                    <label className='loginLabel'>
                        Password
                        <input type='password' value={this.state.password} onChange={(e) => this.handleInputChange(1, e)}
                               placeholder='Enter your password' className="loginInput"/>
                    </label>
                    <input type='submit' value='Login' id='loginButton'/>
                </form>
            </div>
        )
    }
}

export default LoginForm;