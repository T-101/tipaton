import React from 'react';
import {Card as SemanticCard, Divider} from 'semantic-ui-react';

export default function Card(props) {
    const headerTextAlign = props.headerTextAlign || "center";
    return (
        <SemanticCard fluid>
            <SemanticCard.Content>
                <SemanticCard.Header textAlign={headerTextAlign}>
                    {props.header}
                </SemanticCard.Header>
                {props.altered &&
                    <SemanticCard.Content style={{fontSize: 10}}>
                        Start: {props.start}<br/>
                        End: {props.end}
                    </SemanticCard.Content>
                }
                {props.divider && <Divider/>}
                {props.children}
            </SemanticCard.Content>
        </SemanticCard>
    )
}