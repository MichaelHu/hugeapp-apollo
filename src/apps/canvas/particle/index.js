import React, { Component } from 'react';
import Markdown from 'react-markdown';
import styles from './index.scss';
import $ from 'jquery';

import { Slider, Tag, Checkbox } from 'element-react';
import 'element-theme-default';
import demoImg from './ab-180228.jpg';

export default class Particle extends Component {
    constructor( props ) {
        super( props );
        this.canvasContext = null;
        this.fontSize = 0;
        this.state = {
            granularity: 3
            , randomColor: false
        };
        this.unregisterEvents = [];
    }

    initCanvas() {
        let canvas = createCanvas( this.refs[ 'canvas-container' ] );
        this.canvasContext = canvas.getContext( '2d' );
    }

    getMaxFontSize( text, maxFontSize = 300 ) {
        let context = this.canvasContext; 
        let $canvasContainer = $( this.refs[ 'canvas-container' ] );
        const width = $canvasContainer.width();

        let fontSize = maxFontSize;
        let textWidth;

        while( 1 ) {
            context.font = this.getFont( fontSize );
            textWidth = context.measureText( text ).width;
            if ( textWidth < width || fontSize < 20 ) {
                break;
            }
            fontSize -= 5;
        }

        return fontSize;
    }

    getFont( fontSize ) {
        let lineHeight = fontSize * 1.2;

        // shortcut: style variant weight size/line-height family
        return 'normal normal bold ' + fontSize + 'px/' + lineHeight + 'px '
            + '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue"'
            + ', Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"'
            + ', "WenQuanYi Microhei", sans-serif'
            ;
    }

    drawText( text ) {
        text = text || 'Creative';

        let $canvasContainer = $( this.refs[ 'canvas-container' ] );
        let context = this.canvasContext; 
        let fontSize = this.getMaxFontSize( text );
        let containerHeight = $canvasContainer.height();

        this.fontSize = fontSize;

        context.save();

        // text config
        context.font = this.getFont( fontSize );

        let textWidth = context.measureText( text ).width;
        context.textAlign = 'left';
        context.textBaseline = 'top';

        // stroke config
        context.strokeStyle = '#31a354';
        context.lineWidth = '5px';

        // fill config
        context.fillStyle = '#74c476';

        context.fillText( 
            text
            , - textWidth / 2
            , - containerHeight / 2
            , textWidth
        );

        context.strokeText( 
            text
            , - textWidth / 2
            , - containerHeight / 2
            , textWidth
        );

        // context.strokeRect( 0, 0, 100, 100 );
        context.restore();
        return context;
    }

    drawImage( callback ) {
        let img = new Image();
        img.onload = () => {
            let context = this.canvasContext;
            let canvas = context.canvas;
            let $canvasContainer = $( this.refs[ 'canvas-container' ] );
            let height = $canvasContainer.height()
                , dw = 300, dh = 300;

            context.drawImage( img, - dw / 2, - height / 2 + this.fontSize, dw, dh );
            callback && callback();
        };
        img.src = demoImg;
    }

    turnIntoParticles( options ) {
        let opt = options || {};
        let context = this.canvasContext; 
        let canvas = context.canvas;
        // let imageData = context.getImageData( 0, 0, canvas.offsetWidth, canvas.offsetHeight );
        let imageData = context.getImageData( 0, 0, canvas.width, canvas.height );

        let data = imageData.data;
        let w = imageData.width, h = imageData.height;
        let row = 0, col = 0;
        let granularity = opt.granularity || 0;
        let randomColor = opt.randomColor || false;

        if ( granularity > 0 ) {
            for ( row = 0; row < h; row += granularity ) {
                for ( col = 0; col < w; col += granularity ) {
                    let offset = ( row * w + col ) * 4;
                    let R = data[ offset ];
                    let G = data[ offset + 1 ];
                    let B = data[ offset + 2 ];
                    let A = data[ offset + 3 ];
                    let newR, newG, newB;
                    let nonBlankAcquired = 0;
                    let random = Math.random() * randomColor;
                    
                    // if non-transparent-black
                    if ( A > 0 ) {
                        newR = ( R + 1000 * random ) % 255 | 0;
                        newG = ( G + 1000 * random ) % 255 | 0;
                        newB = ( B + 1000 * random ) % 255 | 0;
                        data[ offset ] = newR;
                        data[ offset + 1 ] = newG;
                        data[ offset + 2 ] = newB;
                        nonBlankAcquired = 1;
                    }

                    let y, x, t, alpha;
                    for ( y = row; y < row + granularity && y < h; y++ ) {
                        for ( x = col; x < col + granularity && x < w; x++ ) {
                            t = ( y * w + x ) * 4;
                            alpha = data[ t + 3 ];
                            if ( alpha > 0 ) {
                                // save the first non-blank pixel
                                if ( !nonBlankAcquired ) {
                                    R = data[ t ];
                                    G = data[ t + 1 ];
                                    B = data[ t + 2 ];
                                    newR = ( R + 1000 * random ) % 255 | 0;
                                    newG = ( G + 1000 * random ) % 255 | 0;
                                    newB = ( B + 1000 * random ) % 255 | 0;
                                    nonBlankAcquired = 1;
                                }
                                data[ t ] = newR;
                                data[ t + 1 ] = newG;
                                data[ t + 2 ] = newB;
                            }
                        }
                    } 

                }
            }

            context.putImageData( imageData, 0, 0 );
        }
    }

    onresize() {
        let $canvasContainer = $( this.refs[ 'canvas-container' ] );
        let $prevElement = $canvasContainer.prev();
        let newHeight = $( window ).height()
                - $prevElement.offset().top - $prevElement.height();
        let context = this.canvasContext;
        $canvasContainer.height( newHeight );

        const cssSize = { 
                w: $canvasContainer.width()
                , h: $canvasContainer.height()
            };

        adaptDevice( context.canvas, cssSize );
        this.refresh();
    }

    draw() {
        const textConfig = [ 'Think Different', 'Creative', 'Just do it' ];
        const len = textConfig.length;
        // let text = textConfig[ len * Math.random() | 0 ]; 
        let text = textConfig[ 1 ]; 

        this.drawText( text );
        this.drawImage( () => {
            this.turnIntoParticles( this.state );
        } );
    }

    refresh() {
        let context = this.canvasContext; 
        let $canvasContainer = $( this.refs[ 'canvas-container' ] );
        let width = $canvasContainer.width();
        let height = $canvasContainer.height();
        context.clearRect(
            - width / 2, - height / 2
            , width, height
        );
        this.draw();
    }

    componentDidMount() {
        this.initCanvas();
        this.onresize();
        const onResize = () => this.onresize();
        $( window ).on( 'resize', onResize );
        this.unregisterEvents.push( () => $( window ).off( 'resize', onResize ) );
    }

    componentDidUpdate( prevProps, prevState ) {
        // this.turnIntoParticles( this.state );
        this.refresh();
    }

    ongranularitychange = ( value ) => {
        this.setState( { granularity: value } );
    }

    onrandomcolorchange = ( value ) => {
        this.setState( { randomColor: value } );
    }

    componentWillUnmount() {
        this.unregisterEvents.forEach( unreg => unreg() );
    }

    render() {
        
        return (
            <div>
                <Tag type="primary">granularity</Tag>
                <Slider min={0} max={30} value={this.state.granularity} 
                    showStops showInput
                    onChange={this.ongranularitychange} />
                <Checkbox checked={this.state.randomColor}
                    onChange={this.onrandomcolorchange}>随机颜色( randomColor )</Checkbox>
                <div ref="canvas-container" className={styles[ 'canvas-container' ]}></div>
                <Markdown source={`

### 粒子特效

* Pixel Manipulation，通过像素操作，实现多种图像特效
* 参数 _granularity_ 用于设置粒子粒度
* 参数 _randomColor_ 用于设置处理像素颜色时是否使用随机颜色
* 字体尺寸大小根据画布大小自适应调整

                    `} />
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
