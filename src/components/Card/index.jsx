import React from 'react';
import { Card, Divider } from 'semantic-ui-react';

export default class CardComponent extends React.Component {
    render() {
        const headerTextAlign = this.props.headerTextAlign || "center";
        const divider = this.props.divider;
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header textAlign={headerTextAlign}>
                        {this.props.header}
                    </Card.Header>
                    {divider && <Divider />}
                    {this.props.children}
                </Card.Content>
            </Card>
        )
    }
}
