import {Grid as SemanticGrid} from "semantic-ui-react";
import Card from "../Card";
import {elapsedDays, getPercent, getLevelName, start, end} from "../../utils";
import TableComponent from "../Table";
import React from "react";

export default function Grid(props) {
    return (
        <SemanticGrid stackable columns={3}>
            <SemanticGrid.Column>
                <Card
                    header={"Päivä " + elapsedDays() + "/31"}
                    altered={props.altered}
                    start={start().toDateString()}
                    end={end().toDateString()}
                >
                    {props.developerCracked && "Devaaja murtui " + props.developerCracked.getDate() + ". päivä"}
                </Card>
            </SemanticGrid.Column>
            <SemanticGrid.Column>
                <Card header={getPercent() + " % Kärsitty"} divider={true}>
                    {Number(100 - getPercent()).toFixed(3)} % jäljellä
                </Card>
                <Card header="Olet tasolla">
                    {getLevelName(Number(getPercent()))}
                </Card>

            </SemanticGrid.Column>
            <SemanticGrid.Column>
                <Card header="Jäljellä">
                    <TableComponent {...props} />
                </Card>
            </SemanticGrid.Column>
        </SemanticGrid>
    )
}
