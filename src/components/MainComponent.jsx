import React from 'react';
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import CardComponent from './Card';

export default class MainComponent extends React.Component {
    state = {
        year: null,
        dateTime: new Date(),
        timerHandler: null
    }

    updateDateTime = () => {
        this.setState({
            dateTime: new Date()
        })
    }

    componentDidMount() {
        this.setState({
            year: new Date().getFullYear(),
            timerHandler: setInterval(() => this.updateDateTime(), 1000)
        })
    }

    componentWillUnmount() {
        this.setState({
            timerHandler: clearInterval(this.state.timerHandler)
        })
    }

    getDate = () => {
        const dateTime = this.state.dateTime;
        return dateTime ? dateTime.getDate() : 0
    }

    getPercent = () => {
        const janSeconds = new Date(this.state.year, 1, 1) - new Date(this.state.year, 0, 1)
        const secondsElapsed = this.state.dateTime - new Date(this.state.year, 0, 1)
        return Number((secondsElapsed / janSeconds) * 100).toFixed(3);
    }

    getRemaining = (precision) => {
        const janSeconds = Number((new Date(this.state.year, 1, 1) - new Date(this.state.year, 0, 1)) / 1000).toFixed(0);
        const millisecondsElapsed = (this.state.dateTime - new Date(this.state.year, 0, 1));
        const secondsElapsed = Number((millisecondsElapsed / 1000)).toFixed(0);
        const remaining = janSeconds - secondsElapsed;
        let multiplier = 1;
        switch (precision) {
            case "min":
                multiplier *= 60;
                break;
            case "hour":
                multiplier *= 3600;
                break;
            case "day":
                multiplier *= 86400;
                break;
            case "week":
                multiplier *= 604800;
                break;
            default:
                break
        }
        if (multiplier >= 86400) return Number(remaining / multiplier).toFixed(2);
        return Math.floor(remaining / multiplier);
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
                        <CardComponent header={"Päivä " + this.getDate() + "/31"}>

                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header={this.getPercent() + " % Kärsitty"}>
                            {Number(100 - this.getPercent()).toFixed(3)} % jäljellä
                        </CardComponent>
                    </Grid.Column>
                    <Grid.Column>
                        <CardComponent header="Jäljellä">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>{this.getRemaining("sec")}</td>
                                        <td>sekuntia</td>
                                    </tr>
                                    <tr>
                                        <td>{this.getRemaining("min")}</td>
                                        <td>minuuttia</td>
                                    </tr>
                                    <tr>
                                        <td>{this.getRemaining("hour")}</td>
                                        <td>tuntia</td>
                                    </tr>
                                    <tr>
                                        <td>{this.getRemaining("day")}</td>
                                        <td>päivää</td>
                                    </tr>
                                    <tr>
                                        <td>{this.getRemaining("week")}</td>
                                        <td>viikkoa</td>
                                    </tr>
                                </tbody>
                            </table>
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
