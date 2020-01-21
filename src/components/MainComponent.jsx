import React from 'react';
import {Container} from 'semantic-ui-react'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import {alteredStartDate, elapsedDays} from '../utils';
import Grid from "./Grid";
import Card from "./Card";

export default class MainComponent extends React.Component {
    state = {
        altered: alteredStartDate(),
        year: new Date().getFullYear(),
        dateTime: new Date(),
        timerHandler: null
    };

    updateDateTime = () => {
        const date = new Date();
        this.setState({
            year: date.getFullYear(),
            dateTime: date
        })
    };

    componentDidMount() {
        this.setState({
            timerHandler: setInterval(() => this.updateDateTime(), 1000)
        })
    }

    componentWillUnmount() {
        this.setState({
            timerHandler: clearInterval(this.state.timerHandler)
        })
    }

    render() {
        return (
            <Container text>
                <HeaderComponent {...this.state} />
                {
                    elapsedDays() > 31
                        ? <Card header="Saa ottaa!">Ohi on</Card>
                        : <Grid {...this.state} />
                }
                <FooterComponent/>
            </Container>
        )
    }
}
