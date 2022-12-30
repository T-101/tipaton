import React, {useState, useEffect} from 'react';
import {Container} from 'semantic-ui-react'
import Snowfall from 'react-snowfall'
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import {
    alteredStartDate,
    elapsedDays,
    start as funcStart,
    end as funcEnd,
    developerCracked as funcDeveloperCracked,
    showCountdownCard,
    renderCountdown
} from '../utils';
import Grid from "./Grid";
import Card from "./Card";


export default function MainComponent() {

    const altered = alteredStartDate()
    const [dateTime, setDateTime] = useState(new Date())
    const [timerHandler, setTimerHandler] = useState(null)
    const start = funcStart()
    const end = funcEnd()
    const year = funcEnd().getFullYear()
    const developerCracked = funcDeveloperCracked(process.env.REACT_APP_DEVELOPER_CRACKED)

    useEffect(() => {
        if (!timerHandler) {
            setTimerHandler(setInterval(() => setDateTime(new Date()), 1000))
        }
    }, [timerHandler])

    return (
        <Container text>
            <HeaderComponent {...{altered, year}}/>
            {
                elapsedDays() > 31
                    ? <Card header="Saa ottaa!">Ohi on</Card>
                    : <Grid {...{start, end, dateTime, developerCracked}} />
            }
            {
                showCountdownCard(altered) &&
                <Card header={"Tipaton Tammikuu " + Number(year + 1) + " on alkamassa!"}>
                    {renderCountdown(dateTime)}
                </Card>}
            {(dateTime.getMonth() === 11 || dateTime.getMonth() === 0) &&
                <Snowfall
                    snowflakeCount={250}
                    color="white"
                    radius={[0.5, 4.0]}
                    style={{zIndex: -1}}
                />
            }

            <FooterComponent/>
        </Container>
    )
}