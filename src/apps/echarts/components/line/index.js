import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../chart';

// options
import lineBasicAreaOption from '../../options/line-basic-area.js';
import lineWithVisualMapOption from '../../options/line-with-visualmap.js';

function LineBasicArea( props ) {
    return <Chart chartOptions={lineBasicAreaOption} />;
}

function LineWithVisualMap( props ) {
    return <Chart chartOptions={lineWithVisualMapOption} />;
}

export default function Bar( props ) {
    return (
        <div>
            <LineBasicArea />
            <LineWithVisualMap />
        </div>
    );
}

