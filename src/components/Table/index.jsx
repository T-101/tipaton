import React from 'react';
import { Table } from 'semantic-ui-react';

export default class TableComponent extends React.Component {

    getRemaining = (precision) => {
        const janSeconds = Number((new Date(this.props.year, 1, 1) - new Date(this.props.year, 0, 1)) / 1000).toFixed(0);
        const millisecondsElapsed = (this.props.dateTime - new Date(this.props.year, 0, 1));
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

        const tableContents = [
            { short: "sec", long: "sekuntia" },
            { short: "min", long: "minuuttia" },
            { short: "hour", long: "tuntia" },
            { short: "day", long: "päivää" },
            { short: "week", long: "viikkoa" },
        ]

        return (
            <Table>
                <Table.Body>
                    {tableContents.map((row, key) => (
                        <Table.Row key={key}>
                            <Table.Cell>{this.getRemaining(row.short)}</Table.Cell>
                            <Table.Cell>{row.long}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}
