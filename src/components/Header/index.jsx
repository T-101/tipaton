import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';

const HeaderComponent = (props) => {
    const [alternateTitle, setAlternateTitle] = useState(false);
    return (
        <>
            <Header />
            <Header textAlign="center" block>
                <div
                    onMouseOver={() => setAlternateTitle(true)}
                    onMouseLeave={() => setAlternateTitle(false)}
                >
                    {props.altered !== 0 && 'Melkein '}
                    {alternateTitle
                        ? 'Dropless Zäni '
                        : 'Tipaton Tammikuu '}
                    {props.year}
                </div>
            </Header>
        </>
    )
}

export default HeaderComponent
