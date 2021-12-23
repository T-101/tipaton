import React from 'react';
import {Container} from 'semantic-ui-react'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import {alteredStartDate, elapsedDays, getRequiredYear, start, end, developerCracked} from '../utils';
import Grid from "./Grid";
import Card from "./Card";

export default class MainComponent extends React.Component {
    state = {
        altered: alteredStartDate(),
        year: getRequiredYear(new Date()),
        dateTime: new Date(),
        timerHandler: null,
        start: start(),
        end: end(),
        developerCracked: developerCracked(process.env.REACT_APP_DEVELOPER_CRACKED)
    };

    updateDateTime = () => {
        const date = new Date();
        this.setState({
            year: getRequiredYear(date),
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
