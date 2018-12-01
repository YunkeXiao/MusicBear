import React from 'react';
import ReactDOM from 'react-dom';
import './home/home.css';
import LoginForm from './home/sign_in_form.js';
import SignupForm from "./home/sign_up_form.js";
import Landing from './home/landing.js';
import Portfolio from './portfolio/portfolio.js';
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
        } else if (this.state.page === 2) {
            helper.changeBackground('#333333');
            return (
                <SignupForm choosePage={this.open.bind(this)}/>
            )
        } else if (this.state.page === 3){
            return(
                <Portfolio/>
            )
        }

    }
}

ReactDOM.render(
    <Home/>, document.getElementById('root')
);
