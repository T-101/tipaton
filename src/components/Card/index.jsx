import React from 'react';
import { Card as SemanticCard, Divider } from 'semantic-ui-react';

export default class Card extends React.Component {
    render() {
        const headerTextAlign = this.props.headerTextAlign || "center";
        const divider = this.props.divider;
        return (
            <SemanticCard fluid>
                <SemanticCard.Content>
                    <SemanticCard.Header textAlign={headerTextAlign}>
                        {this.props.header}
                    </SemanticCard.Header>
                    {divider && <Divider />}
                    {this.props.children}
                </SemanticCard.Content>
            </SemanticCard>
        )
    }
}
