import React from 'react';
import './index.css';

class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            error: 0, // 0: No attempt to login, 1:
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
        let choosePage = this.props.choosePage;
        return (
            <div id='loginPage'>
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <h2 className='formBack' onClick={() => choosePage(0)}>Home <i className="fas fa-times"/></h2>
                    <h1 className='formTitle'>Sign in</h1>
                    <label className='formLabel'>
                        Username
                        <input type='text' value={this.state.username} onChange={(e) => this.handleInputChange(0, e)}
                               placeholder='Enter your username' className="userInput"/>
                    </label>
                    <label className='formLabel'>
                        Password
                        <input type='password' value={this.state.password}
                               onChange={(e) => this.handleInputChange(1, e)}
                               placeholder='Enter your password' className="userInput"/>
                    </label>
                    <input type='submit' value='Sign in' className='formButton'/>
                    <a href='#' id='signUpLink' onClick={() => choosePage(2)}>click here to sign up</a>
                </form>
            </div>
        )
    }
}

export default LoginForm;