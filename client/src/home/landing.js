import React from 'react';
import Navbar from './navbar.js';
import {Line} from 'react-chartjs-2';

// Example data table
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
        },
        {
            label: 'Kanye',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'orange',
            borderColor: 'orange',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'orange',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'orange',
            pointHoverBorderColor: 'orange',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [70000, 65000, 60000, 64000, 79000, 59000, 55000]
        },
        {
            label: 'J.Cole',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'pink',
            borderColor: 'pink',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'pink',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'pink',
            pointHoverBorderColor: 'pink',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [40000, 50000, 45000, 35000, 36000, 39000, 37000]
        }
    ],
};

function Landing(props) {
    let choosePage = props.choosePage;
    return (
        <div id='landingPage'>
            <div id='introduction'>
                <Navbar choosePage={choosePage}/>
                <h1 className='title'>Test your knowledge<br/> of the <span className="blueUnderline">
                    music market</span></h1>
                <div className="chart" id='exampleChart'>
                    <Line
                        data={exampleData}
                        options={{
                            maintainAspectRatio: false,
                            animation: false,
                            scales: {
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
            </div>
            <div className='pageBreak'/>
            <div id='main'>
                <h1 className='mainHeader'>How does it work?</h1>
                <p className='mainText'>Artists' listener count is retrieved from Last.fm's public web API, an
                    aggregator of online music streaming service data. Every hour or so, the database updates the number
                    of people currently listening to each of the top 500 most popular current artists. This serves as an
                    artist's value and currently, the only things a user will be able to do in this stock market copy
                    is buying and selling albums, which is the equivalent of stocks, as well as viewing an artist's
                    album value history, powered by Chart.js, and viewing your own portfolio's history.
                </p>
                <div id='fill'/>
            </div>
        </div>
    )
}

export default Landing;