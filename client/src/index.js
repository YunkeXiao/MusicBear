import React from 'react';
import ReactDOM from 'react-dom';
import './home/home.css';
import './portfolio/portfolio.css';
import LoginForm from './home/sign_in_form.js';
import SignupForm from "./home/sign_up_form.js";
import Landing from './home/landing.js';
import Portfolio from './portfolio/portfolio.js';
import * as helper from './helpers.js';

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.choosePage = this.choosePage.bind(this);
        this.state = {
            page: 3,
            isUnmounted: true
        }
    }

    choosePage(val) {
        this.setState({page: val})
    }

    setIsUnmounted(val) {
        this.setState({isUnMounted: val})
    }


    render() {
        if (this.state.page === 0) {
            helper.changeBackground('white');
            return (
                <div>
                    <Landing choosePage={this.choosePage.bind(this)}/>
                </div>
            )
        } else if (this.state.page === 1) {
            helper.changeBackground('#333333');
            return (
                <LoginForm choosePage={this.choosePage.bind(this)}/>
            )
        } else if (this.state.page === 2) {
            helper.changeBackground('#333333');
            return (
                <SignupForm choosePage={this.choosePage.bind(this)}/>
            )
        } else if (this.state.page === 3) {
            helper.changeBackground('white');
            return (
            <Portfolio choosePage={this.choosePage.bind(this)}/>
            )
        }

    }
}

ReactDOM.render(
    <Home/>, document.getElementById('root')
);
