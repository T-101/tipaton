import React from 'react';
import { Container, Grid } from 'semantic-ui-react'
import CardComponent from './Card';
import TableComponent from './Table';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { alteredStartDate, elapsedDays, getPercent } from '../utils';

export default class MainComponent extends React.Component {
    state = {
        altered: alteredStartDate(),
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

    render() {
        return (
            <Container text>
                <HeaderComponent {...this.state} />
                <Grid stackable columns={3}>
                    <Grid.Column>
                        <CardComponent header={"Päivä " + elapsedDays(this) + "/31"}>
                            {this.state.altered ? null : "Devaaja murtui 10. päivä"}
                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header={getPercent(this) + " % Kärsitty"} divider={true}>
                            {Number(100 - getPercent(this)).toFixed(3)} % jäljellä
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
