import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts'
import io from 'socket.io-client';
import { Spinner, Container, Row, Col } from 'react-bootstrap'

import Objects from '../Objects/Objects'

import '../styles/charts.css';

let socket = io.connect("https://trading-backend.wissamsawah.me");

class Graph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'realtime',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                    },
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 2
                },

                title: {
                    text: 'Value per stock in SEK',
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime',
                    range: 45000,
                    labels: {
                        formatter: value => {
                            const categoryTime = new Date(value);
                            const hours = categoryTime.getHours();
                            const minutes = categoryTime.getMinutes();
                            const minutesString = minutes === 0
                                ? `${minutes}0`
                                : minutes < 10
                                    ? `0${minutes}`
                                    : minutes;
                            const seconds = categoryTime.getSeconds();
                            const secondsString = seconds === 0
                                ? `${seconds}0`
                                : seconds < 10
                                    ? `0${seconds}`
                                    : seconds;

                            return `${hours}:${minutesString}:${secondsString}`;
                        },
                        hideOverlappingLabels: false
                    },
                },
                yaxis: {
                    min: 100,
                    max: 1000
                },
                legend: {
                    show: true
                }
            },
            series: [{
                name: "",
                data: []
            }]
        }
    }


    componentDidMount() {
        // this.intervals()
        socket.on('connect', () => {
            console.log("Connected");
        });

        socket.on('stocks', (socketData) => {
            ApexCharts.exec('realtime', 'updateSeries', [{
                name: socketData[0].name,
                data: socketData[0].data,
            }, {
                name: socketData[1].name,
                data: socketData[1].data,
            }, {
                name: socketData[2].name,
                data: socketData[2].data,
            }])
            this.props.setAppleValue(socketData[0].data.slice(-1)[0].y);
            this.props.setSamsungValue(socketData[1].data.slice(-1)[0].y);
            this.props.setNasdaqValue(socketData[2].data.slice(-1)[0].y);
        })
    }

    componentWillUnmount() {
        socket.on('disconnect', () => {
            console.log("Disconnected");
        });
        socket.off();
    }

    render() {

        return (
            <React.Fragment>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="500" />
                </div>
                <Objects
                    samsungValue={this.props.samsungValue}
                    appleValue={this.props.appleValue}
                    nasdaqValue={this.props.nasdaqValue}
                    setBalance={this.props.setBalance}
                    setDepot={this.props.setDepot}
                    setTradeAlert={this.props.setTradeAlert}
                />
            </React.Fragment>
        );

        if (!this.props.appleValue || !this.props.samsungValue) {
            return (
                <React.Fragment>
                    <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="500" />
                    </div>
                    <Container>
                        <Row ClassName="justify-content-md-center">
                            <Col></Col>
                            <Col md="auto">
                                <Spinner animation="grow"></Spinner>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </React.Fragment>
            )
        }
    }

}

export default Graph
