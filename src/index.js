import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './sign_in_form.js';
import SignupForm from "./sign_up_form.js";
import Landing from './landing.js';
import * as helper from './helpers.js';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.state = {page: 0}
    }

    open(val) {
        this.setState({page: val})
    }

    render() {
        if (this.state.page === 0) {
            helper.changeBackground('white');
            return (
                <div>
                    <Landing choosePage={this.open.bind(this)}/>
                </div>
            )
        } else if (this.state.page === 1) {
            helper.changeBackground('#333333');
            return (
                <LoginForm choosePage={this.open.bind(this)}/>
            )
        } else {
            helper.changeBackground('#333333');
            return (
                <SignupForm choosePage={this.open.bind(this)}/>
            )
        }

    }
}

ReactDOM.render(
    <Home/>, document.getElementById('root')
);
