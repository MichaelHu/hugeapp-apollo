import React from 'react';
import styles from './style.scss';

export default function Block( props ) {
    const types = {
            primary: '#cce5ff'
            , secondary: '#e2e3e5'
            , success: '#d4edda'
            , danger: '#f8d7da'
            , warning: '#fff3cd'
            , light: '#fefefe'
            , dark: '#d6d8d9'
            , info: '#d1ecf1'

            // <http://www.5tu.cn/colors/rgb-peisebiao.html>
            , springgreen: '#00ff7f'
            , cyan: '#00ffff'
            , peachpuff: '#ffdab9'
            , seagreen: '#2e8b57'
            , goldenrod: '#daa520'
        };

    const color = types[ props.type ] || types[ 'primary' ]; 
    return (
        <div className={styles.block} style={{backgroundColor: color}}>
            {props.children}
        </div>
    );
}
