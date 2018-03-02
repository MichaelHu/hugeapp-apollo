import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../chart';

// options
import lineBasicAreaOption from '../../options/line-basic-area.js';

function LineBasicArea( props ) {

    return (
        <Chart chartOptions={lineBasicAreaOption} />
    );

}

export default function Bar( props ) {
    return (
        <div>
            <LineBasicArea />
        </div>
    );
}

