import {Grid as SemanticGrid} from "semantic-ui-react";
import Card from "../Card";
import {elapsedDays, getPercent, getLevelName} from "../../utils";
import TableComponent from "../Table";
import React from "react";

export default function Grid(props) {
    return (
        <SemanticGrid centered stackable columns={3}>
            <SemanticGrid.Row>
                <SemanticGrid.Column>
                    <Card
                        header={"Päivä " + elapsedDays() + "/31"}
                        altered={props.altered}
                        start={props.start.toDateString()}
                        end={props.end.toDateString()}
                        style={props.style}
                    >
                        {props.developerCracked && "Devaaja murtui " + props.developerCracked.getDate() + ". päivä"}
                    </Card>
                    <Card header={getPercent() + " % Kärsitty"} divider={true} style={props.style}>
                        {Number(100 - getPercent()).toFixed(3)} % jäljellä
                    </Card>
                    <Card header="Olet tasolla" style={props.style}>
                        {getLevelName(Number(getPercent()))}
                    </Card>

                </SemanticGrid.Column>
                <SemanticGrid.Column>
                    <Card header="Jäljellä">
                        <TableComponent {...props} />
                    </Card>
                </SemanticGrid.Column>
            </SemanticGrid.Row>
        </SemanticGrid>
    )
}
