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
                {props.altered !== 0 && props.start &&
                    <SemanticCard.Content style={{fontSize: 10}}>
                        <strong>Start: </strong>{props.start}<br/>
                        <strong>End: </strong>{props.end}
                    </SemanticCard.Content>
                }
                {props.divider && <Divider/>}
                {props.children}
            </SemanticCard.Content>
        </SemanticCard>
    )
}