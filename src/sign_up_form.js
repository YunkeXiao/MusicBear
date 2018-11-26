import React from 'react';
import './index.css';

class SignupForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            mode: ['userInput', "userInput", "userInput"],
            error: 0    // 0: No errors, 1: Username is already taken, 2: Wrong passwords
        }
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

    // Handles sign up
    handleLogin(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                mode: ['userInput', 'invalidInput', 'invalidInput'],
                error: 2
            })
        } else {
            this.setState({
                username: '',
                password: '',
                confirmPassword: '',
                mode: ['userInput', 'userInput', 'userInput'],
                error: 0
            })
        }
    }

    render() {
        let choosePage = this.props.choosePage;
        return (
            <div id='signupPage'>
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <h2 className='formBack' onClick={() => choosePage(0)}>Home <i className="fas fa-times"/>
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
                    <h3 id='signUpLink' onClick={() => choosePage(1)}>click here to sign in</h3>
                </form>
            </div>
        )
    }
}

export default SignupForm;