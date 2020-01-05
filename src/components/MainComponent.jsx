import React from 'react';
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import CardComponent from './Card';
import TableComponent from './Table';

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
                <Header>&nbsp;</Header>
                <Header textAlign="center">
                    Tipaton Tammikuu {this.state.year}
                </Header>
                <Grid stackable columns={3}>
                    <Grid.Column>
                        <CardComponent header={"Päivä " + this.state.dateTime.getDate() + "/31"} />
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header={this.getPercent() + " % Kärsitty"}>
                            {Number(100 - this.getPercent()).toFixed(3)} % jäljellä
                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header="Jäljellä">
                            <TableComponent {...this.state} />
                        </CardComponent>
                    </Grid.Column>
                </Grid>
                <Menu borderless fixed="bottom">
                    <Menu.Item>
                        Janoisena tämäkin idea syntyi
                    </Menu.Item>
                    <Menu.Item position="right">
                        <a href="https://github.com/T-101/tipaton">Github</a>
                    </Menu.Item>
                </Menu>
            </Container >
        )
    }
}
