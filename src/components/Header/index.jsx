import React from 'react';
import { Header } from 'semantic-ui-react';

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Header textAlign="center" block>
                    Tipaton Tammikuu {this.props.year}
                </Header>
            </>
        )
    }
}
