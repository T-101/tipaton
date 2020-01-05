import React from 'react';
import { Card, Divider } from 'semantic-ui-react';

export default class CardComponent extends React.Component {
    render() {
        const headerTextAlign = this.props.headerTextAlign || "center";
        return (
            <Card>
                <Card.Content>
                    <Card.Header textAlign={headerTextAlign}>
                        {this.props.header}
                    </Card.Header>
                    {this.props.children && <Divider />}
                    {this.props.children}
                </Card.Content>
            </Card>
        )
    }
}
