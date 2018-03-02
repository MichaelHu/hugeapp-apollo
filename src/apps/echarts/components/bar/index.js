import React from 'react';
import PropTypes from 'prop-types';
import Chart from '../chart';

// options
import barSimpleOption from '../../options/bar-simple';
import barWeatherOption from '../../options/bar-weather';

function BarSimple( props ) {

    return (
        <Chart chartOptions={barSimpleOption} />
    );

}

function BarWeather( props ) {

    return <Chart chartOptions={barWeatherOption} height="500" />

}

export default function Bar( props ) {
    return (
        <div>
            <BarSimple />
            <BarWeather />
        </div>
    );
}
