import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import CardComponent from './Card';
import TableComponent from './Table';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

export default class MainComponent extends React.Component {
    state = {
        year: new Date().getFullYear(),
        dateTime: new Date(),
        timerHandler: null
    }

    updateDateTime = () => {
        const date = new Date();
        this.setState({
            year: date.getFullYear(),
            dateTime: date
        })
    }

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

    getPercent = () => {
        const janSeconds = new Date(this.state.year, 1, 1) - new Date(this.state.year, 0, 1)
        const secondsElapsed = this.state.dateTime - new Date(this.state.year, 0, 1)
        return Number((secondsElapsed / janSeconds) * 100).toFixed(3);
    }

    render() {
        return (
            <Container text>
                <HeaderComponent {...this.state} />
                <Grid stackable columns={3}>
                    <Grid.Column>
                        <CardComponent header={"Päivä " + this.state.dateTime.getDate() + "/31"}>
                            Devaaja murtui 10. päivä
                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header={this.getPercent() + " % Kärsitty"} divider={true}>
                            {Number(100 - this.getPercent()).toFixed(3)} % jäljellä
                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header="Jäljellä">
                            <TableComponent {...this.state} />
                        </CardComponent>
                    </Grid.Column>
                </Grid>
                <FooterComponent />
            </Container>
        )
    }
}
