import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../chart';

// options
import heatmapInCartesianOption from '../../options/heatmap-cartesian';
import heatmapInMapOption from '../../options/heatmap-map';

function HeatMapInCartesian( props ) {
    return <Chart chartOptions={heatmapInCartesianOption} />;
}

function HeatMapInMap( props ) {
    return <Chart chartOptions={heatmapInMapOption} height="800" />;
}

export default function HeatMap( props ) {
    return (
        <div>
            <HeatMapInCartesian />
            <HeatMapInMap />
        </div>
    );
}
