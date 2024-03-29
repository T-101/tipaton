import React from 'react';
import {Menu} from 'semantic-ui-react';

export default function FooterComponent() {
    return (
        <Menu borderless fixed="bottom">
            <Menu.Item>
                Janoisena tämäkin idea syntyi
            </Menu.Item>
            <Menu.Item position="right">
                <a href="https://github.com/T-101/tipaton">Github</a>
            </Menu.Item>
        </Menu>
    )
}
