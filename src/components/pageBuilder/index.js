import React, { Component, Fragment } from 'react';
import uiConfig from './uiConfig';
import './index.scss'
import { get, has } from './utils';

class PageBuilder extends Component {
    render() {
        console.log('uiConfig ', uiConfig)
        const elements = uiConfig.map(({ type, contains, component }, i) => {
            if (type === 'label') {
                return type === 'label' && <div key={i} style={contains.style || {}}>{contains.text}</div>
            }
            if (type === 'custom') {
                return <Fragment key={i}>{component}</Fragment>
            }
            if (type === 'input') {
                return <input key={i} defaultValue={contains.value}
                    style={contains.style}
                    placeholder={contains.placeholder} />
            }
        })
        return (
            <div>
                {elements}
            </div>
        )
    }
}

export default PageBuilder