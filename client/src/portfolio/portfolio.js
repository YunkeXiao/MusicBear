import React from 'react';
import Navbar from './navbar.js';
import {Line} from "react-chartjs-2";
import SearchBar from './searchBar.js';
import * as helpers from '../helpers';

const exampleData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Eminem',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'dodgerblue',
            borderColor: 'dodgerblue',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'dodgerblue',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'dodgerblue',
            pointHoverBorderColor: 'dodgerblue',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65000, 59000, 80000, 81000, 56000, 90000, 85000]
        }
    ],
};

class Portfolio extends React.PureComponent {
    constructor(props) {
        super(props);
        this.chooseArtist = this.chooseArtist.bind(this);
        this.state = {
            canProceed: this.props.isUnmounted,
            artist: '',
            chartOptions: exampleData,
        }
    }

    //BUGS: NEED DATABASE
    chooseArtist = (name, listeners) => {
        let newData = exampleData;
            newData['datasets'][0]['label'] = helpers.capitalize(name);
        if (name === 'Eminem'){
            newData['datasets'][0]['data'] = [listeners[0], listeners[1], listeners[2], listeners[3], listeners[4], listeners[5], listeners[6]];
        }
        newData['datasets'][0]['data'] = [listeners, listeners, listeners, listeners, listeners, listeners, listeners];
        newData['labels'] = helpers.getPastWeek().split(',');
        console.log(helpers.getPastWeek());
        this.setState({chartOptions: newData});
        this.forceUpdate();
    };

    render() {
        return (
            <div id='portfolio'>
                <Navbar choosePage={this.props.choosePage}/>
                <h1 id='portfolioTitle'>PORTFOLIO</h1>
                <div id='chartStuff'>
                    <div className="chart" id='portfolioChart'>
                        <Line
                            data={this.state.chartOptions}
                            options={{
                                maintainAspectRatio: false,
                                animation: false, scales: {
                                    xAxes: [
                                        {
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Date'
                                            },
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Listener Count'
                                            },
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                    <SearchBar chooseArtist={this.chooseArtist.bind(this)}/>
                </div>
            </div>
        )
    }

}

export default Portfolio;
