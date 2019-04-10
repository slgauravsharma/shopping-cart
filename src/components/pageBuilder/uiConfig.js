
import React from 'react';

const uiConfig = [
    {
        type: 'label',
        contains: {
            text: "Telus Internation Digital Team",
            style: {
                textAlign: 'center'
            }
        }
    },
    {
        type: 'custom',
        component: <span>Custom component</span>
    },
    {
        type: 'input',
        contains: {
            placeholder: 'Please enter name',
            value: '',
            style: {
                width: '150px',
                height: '30px'
            }
        }
    },

]
export default uiConfig