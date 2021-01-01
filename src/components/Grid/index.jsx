import {Grid as SemanticGrid} from "semantic-ui-react";
import Card from "../Card";
import {elapsedDays, getPercent} from "../../utils";
import TableComponent from "../Table";
import React from "react";

export default class Grid extends React.Component {
    render() {
        return(
            <SemanticGrid stackable columns={3}>
                <SemanticGrid.Column>
                    <Card header={"Päivä " + elapsedDays() + "/31"}>
                        {/*{this.props.altered ? null : "Devaaja murtui 10. päivä"}*/}
                    </Card>
                </SemanticGrid.Column>
                <SemanticGrid.Column>
                    <Card header={getPercent() + " % Kärsitty"} divider={true}>
                        {Number(100 - getPercent()).toFixed(3)} % jäljellä
                    </Card>
                </SemanticGrid.Column>
                <SemanticGrid.Column>
                    <Card header="Jäljellä">
                        <TableComponent {...this.props} />
                    </Card>
                </SemanticGrid.Column>
            </SemanticGrid>
        )
    }
}

