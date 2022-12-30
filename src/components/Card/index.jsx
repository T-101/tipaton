import React from 'react';
import {Card as SemanticCard, Divider} from 'semantic-ui-react';

export default function Card(props) {
    const headerTextAlign = props.headerTextAlign || "center";
    return (
        <SemanticCard fluid style={props.style}>
            <SemanticCard.Content>
                <SemanticCard.Header textAlign={headerTextAlign}>
                    {props.header}
                </SemanticCard.Header>
                {props.altered !== 0 && props.start &&
                    <SemanticCard.Content textAlign={headerTextAlign} style={{fontSize: 10}}>
                        <strong>Start: </strong>{props.start}<br/>
                        <strong>End: </strong>{props.end}
                    </SemanticCard.Content>
                }
                {props.divider && <Divider/>}
                <SemanticCard.Content textAlign={headerTextAlign}>
                    {props.children}
                </SemanticCard.Content>
            </SemanticCard.Content>
        </SemanticCard>
    )
}