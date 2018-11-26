import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './sign_in_form.js';
import SignupForm from "./sign_up_form.js";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.state = {page: 1}
    }

    open(val) {
        this.setState({page: val})
    }

    render() {
        if (this.state.page === 0) {
            return (
                <div>
                    <input type='button' onClick={() => this.open(1)} value="OPEN LOGIN"/>
                    <input type='button' onClick={() => this.open(2)} value="OPEN SIGNUP"/>
                </div>
            )
        } else if (this.state.page === 1) {
            return (
                <LoginForm choosePage={this.open.bind(this)}/>
            )
        } else {
            return (
                <SignupForm choosePage={this.open.bind(this)}/>
            )
        }

    }
}

ReactDOM.render(
    <Home/>, document.getElementById('root')
);
