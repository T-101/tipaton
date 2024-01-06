import React, {useState, useEffect} from 'react';
import {Container, Header, Grid as SemanticGrid, AccordionTitle, AccordionContent, Accordion} from 'semantic-ui-react'
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
    renderCountdown,
    easeInOutQuart
} from '../utils';
import Grid from "./Grid";
import Card from "./Card";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const chartOptions = {
    responsive: true,
    aspectRatio: 1.5,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Viimeiset 30 päivää',
        },
    },
    interaction: {
        mode: "index"
    }
};

const boxShadow = () => {
    return {boxShadow: "0 3px 3px rgba(0,0,0,0.1)"}
}

const backGroundOpacity = (now, elem) => {
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    let diff = (now.getTime() - midnight.getTime()) / 1000 / 60
    diff = (diff <= 720) ? diff : 720 - (diff - 720)
    elem.style.opacity = easeInOutQuart(diff / 720)
}


const getData = (data) => {
    return {
        labels: data.map(e => e.date),
        datasets: [
            {
                label: "Sivulatauksia",
                data: data.map(e => e.pageviews),
                borderColor: 'rgb(0, 140, 186)',
                backgroundColor: 'rgb(0, 140, 186)',
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            },
            {
                label: "Vieraita",
                data: data.map(e => e.visitors),
                borderColor: 'rgb(12, 100, 140)',
                backgroundColor: 'rgb(21, 140, 186)',
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            },
            {
                label: "Vierailuja",
                data: data.map(e => e.visits),
                borderColor: 'rgb(12, 80, 120)',
                backgroundColor: 'rgb(21, 128, 166)',
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    }
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
    const [accordionState, setAccordionState] = useState(false)

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
            fetch("https://saako.ottaa.biss.ee/stats").then(res => res.json()).then(j => setStats(j)).catch(e => console.log(e))
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
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                        zIndex: -1
                    }}
                />
            }
            {stats && <Header textAlign="center" block style={boxShadow()}>
                <Accordion>
                    <AccordionTitle onClick={() => setAccordionState(!accordionState)}>
                        Katso käyttäjätilastoja
                    </AccordionTitle>
                    <AccordionContent active={accordionState}>
                        <Line options={chartOptions} data={getData(stats.month.results)}/>
                        <hr/>
                        <SemanticGrid stackable columns={5} style={{fontSize: "12px"}}>
                            <SemanticGrid.Column>Palvelun aloittamisesta</SemanticGrid.Column>
                            <SemanticGrid.Column>Sivulatauksia: {stats.alltime.results.pageviews.value}</SemanticGrid.Column>
                            <SemanticGrid.Column>Vieraita: {stats.alltime.results.visitors.value}</SemanticGrid.Column>
                            <SemanticGrid.Column>Vierailuja: {stats.alltime.results.visits.value}</SemanticGrid.Column>
                        </SemanticGrid>

                    </AccordionContent>
                </Accordion>

            </Header>}
            <h1>&nbsp;</h1>
            <FooterComponent/>
        </Container>
    )
}