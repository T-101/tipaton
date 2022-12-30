import React from 'react';
import {Table} from 'semantic-ui-react';
import {getRemaining} from '../../utils'

export default function TableComponent(props) {
    const tableContents = [
        {short: "sec", long: "sekuntia"},
        {short: "min", long: "minuuttia"},
        {short: "hour", long: "tuntia"},
        {short: "day", long: "päivää"},
        {short: "week", long: "viikkoa"},
    ]

    return (
        <Table basic="very" compact celled unstackable>
            <Table.Body>
                {tableContents.map((row, key) => (
                    <Table.Row key={key}>
                        <Table.Cell textAlign="right">{getRemaining(props.dateTime, row.short)}</Table.Cell>
                        <Table.Cell>{row.long}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
