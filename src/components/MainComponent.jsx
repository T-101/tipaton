import React, {useState, useEffect} from 'react';
import {Container, Header, Grid as SemanticGrid} from 'semantic-ui-react'
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

const boxShadow = () => {
    return {boxShadow: "0 3px 3px rgba(0,0,0,0.1)"}
}

const backGroundOpacity = (now, elem) => {
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    let diff = (now.getTime() - midnight.getTime()) / 1000 / 60
    diff = (diff <= 720) ? diff : 720 - (diff - 720)
    elem.style.opacity = diff / 720
}

export default function MainComponent() {

    const altered = alteredStartDate()
    const [dateTime, setDateTime] = useState(new Date())
    const [timerHandler, setTimerHandler] = useState(null)
    const start = funcStart()
    const end = funcEnd()
    const year = funcEnd().getFullYear()
    const [stats, setStats] = useState()
    const developerCracked = funcDeveloperCracked(process.env.REACT_APP_DEVELOPER_CRACKED)
    const backGround = document.querySelector("#bg")

    backGroundOpacity(new Date(), backGround) // set initial value so the screen doesnt blink at start

    useEffect(() => {
        if (!timerHandler) {
            setTimerHandler(setInterval(() => {
                const now = new Date()
                setDateTime(now)
                backGroundOpacity(now, backGround)
            }, 1000))
        }
    }, [timerHandler, backGround])

    useEffect(() => {
        if (!stats) {
            fetch("/stats").then(res => res.json()).then(j => setStats(j.results))
        }
    }, [stats])

    /* useEffect(() => {
        if (!stats) {
            setStats({
                pageviews: {
                    value: 66
                }
                ,
                visitors: {
                    value: 55
                }
                ,
                visits: {
                    value: 44
                }
            })
        }
    }, [stats]) */


    return (
        <Container text>
            <HeaderComponent {...{altered, year}} style={boxShadow()}/>
            {
                elapsedDays() > 31
                    ? <Card header="Saa ottaa!" style={boxShadow()}>Ohi on</Card>
                    : <Grid {...{start, end, dateTime, developerCracked}} style={boxShadow()}/>
            }
            {
                showCountdownCard(altered) &&
                <Card header={"Tipaton Tammikuu " + Number(year + 1) + " on alkamassa!"}
                      style={boxShadow()}
                >
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
            {stats && <Header textAlign="center" block style={boxShadow()}>
                <SemanticGrid stackable columns={5} style={{fontSize: "12px"}}>
                    <SemanticGrid.Column>Edelliset 30 päivää</SemanticGrid.Column>
                    <SemanticGrid.Column>Katsomiskertoja: {stats.pageviews.value}</SemanticGrid.Column>
                    <SemanticGrid.Column>Vieraita: {stats.visitors.value}</SemanticGrid.Column>
                    <SemanticGrid.Column>Vierailuja: {stats.visits.value}</SemanticGrid.Column>
                </SemanticGrid>
            </Header>}
            <FooterComponent/>
        </Container>
    )
}