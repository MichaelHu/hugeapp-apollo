import React, { Component } from 'react';
import Markdown from 'react-markdown';
import styles from './index.scss';

export default class Particle extends Component {
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        let canvas = createCanvas( this.refs[ 'canvas-container' ] );
        let context = canvas.getContext( '2d' );
        let text = 'Creative';
        let fontSize = 100;
        let lineHeight = fontSize * 1.2;

        context.save();

        // text config
        // shortcut: style variant weight size/line-height family
        context.font = 'normal normal bold ' + fontSize + 'px/' + lineHeight + 'px '
            + '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue"'
            + ', Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"'
            + ', "WenQuanYi Microhei", sans-serif'
            ;
        let textWidth = context.measureText( text ).width;
        context.textAlign = 'left';
        context.textBaseline = 'top';

        // stroke config
        context.strokeStyle = '#31a354';
        context.lineWidth = '5px';

        // fill config
        context.fillStyle = '#a1d99b';

        context.fillText( 
            text
            , - textWidth / 2
            , - fontSize / 2
            , textWidth
        );

        context.strokeText( 
            text
            , - textWidth / 2
            , - fontSize / 2
            , textWidth
        );

        // context.strokeRect( 0, 0, 100, 100 );
        context.restore();
    }

    render() {
        
        return (
            <div>
                <Markdown source={`
* 粒子特效
                    `} />
                <div ref="canvas-container" className={styles[ 'canvas-container' ]}></div>
            </div>
        );

    }
}

function createCanvas( container, options ){
    var width, height, canvas
        , opt = options || {}
        ;

    if ( typeof container == 'string' ) {
        if ( document.querySelector ) {
            container = document.querySelector( container );
        }
        else {
            container = document.getElementById( container );
        }
    }

    width = container.offsetWidth;
    height = container.offsetHeight;
    canvas = document.createElement( 'canvas' );
    container.appendChild( canvas );
    adaptDevice( canvas, { w: width, h: height } );
    return canvas;
}

function adaptDevice( canvas, cssSize ){
    var ratio = window.devicePixelRatio
        , ctx = canvas.getContext( '2d' )
        ;
    canvas.width = cssSize.w * ratio;
    canvas.height = cssSize.h * ratio;
    canvas.style.width = cssSize.w + 'px';
    canvas.style.height = cssSize.h + 'px';
    // the center point is ( 0, 0 )
    ctx.setTransform( ratio, 0, 0, ratio, canvas.width / 2, canvas.height / 2 );
}
