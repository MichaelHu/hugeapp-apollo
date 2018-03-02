/**
 * @author fe
 * @description MagicBox
 */

// for React 15 and below
// import React, { PropTypes } from 'react';

// for React 16+
import React from 'react';
import PropTypes from 'prop-types';

import Arbitrator from './arbitrator';
import * as utils from './utils';
import $ from 'jquery';
import styles from './magicBox.scss';

/**
 * state                desc
 * =================================
 * DISABLED             disabled
 * CAPTURE_HOVER        捕获hover
 * HOVER                进入响应区
 * RESIZABLE            可缩放状态
 * RESIZING             正在缩放
 */
const RESIZE_STATE_DISTABLED = 1;
const RESIZE_STATE_CAPTURE_HOVER = 2;
const RESIZE_STATE_HOVER = 3;
const RESIZE_STATE_RESIZABLE = 4;
const RESIZE_STATE_RESIZING = 5;
let _uuid = 1;

class MagicBox extends React.Component {

    constructor( props, context ) {
        super( props );
        let  me = this;

        me._uuid = _uuid++;

        utils.extendOnly( me, props
            , [
                'top', 'left', 'width', 'height'
                , 'isRootBox', 'showHeader', 'useDefLayout', 'showUUID'
            ]
        );

        me.styles = {
            top: me.top + ( /%/.test( me.top ) ? '' : 'px' )
            , left: me.left + ( /%/.test( me.left ) ? '' : 'px' )
            , width: me.width + ( /%/.test( me.width ) ? '' : 'px' )
            , height: me.height + ( /%/.test( me.height ) ? '' : 'px' )
        };

        me.isFocused = 0;
        me.isDragging = 0;
        me.resizeState = RESIZE_STATE_DISTABLED;

        if ( ! me.isRootBox ) {
            me.parentArbitrator = context.arbitrator;
        }

        if ( me.parentArbitrator ) {
            me.parentArbitrator.register( me );
        }

        // support: only configures on the root box
        me.isDebug = props.isDebug
            || me.parentArbitrator && me.parentArbitrator.isDebug
            || 0;

        me.arbitratorOptionFields = [ 'isDebug', 'useDefLayout' ];

        let arbitratorOptions = utils.extendOnly( {}, me, me.arbitratorOptionFields );
        me.arbitrator = new Arbitrator( me, arbitratorOptions );

        me.borderThreshold = 10;
    }

    getChildContext() {
        return { arbitrator: this.arbitrator };
    }

    render() {
        let me = this;
        let header = ! me.showHeader ? null : (
                <div className={styles[ 'magic-box__header' ]} ref="header">Title</div>
            );
        let uuid = ! me.showUUID 
            ? null 
            : <div className={styles[ 'magic-box__uuid' ]}>{ me._uuid }</div>;
        let classes = [ styles[ 'magic-box' ] ];
        me.showHeader && classes.push( styles[ 'magic-box_show-header' ] );

        return (
            <div className={classes.join( ' ' )}
                style={this.styles} ref="box">
                { header }
                <div className={styles[ 'magic-box__content' ]} ref="content">
                    { uuid }
                    { this.props.children }
                </div>
                <div className={styles[ 'magic-box__focus-mask' ]}></div>
            </div>
        );
    }

    componentDidMount() {
        let me = this;

        // initialize
        if ( me.isRootBox ) {
            // to convert the percentage size to numeric size
            me.arbitrator.onResize( { init: 1 } );
            // call `on_resize()` to get appropriate size for root box, then resize the tree
            me.on_resize();
            window.addEventListener( 'resize', me.on_resize, false );
        }

        if ( me.showHeader ) {
            me.enableDraggable();
        }

        if ( me.isDebug ) {
            me.enableShowBoxConfig();
        }

        me.enableFocus();
        me.enableHover();
    }

    componentWillReceiveProps( nextProps ) {
        let me = this;
        let props = nextProps;

        // apply new props
        me.top = props.top || 0;
        me.left = props.left || 0;
        me.width = props.width || 100;
        me.height = props.height || 50;
        me.showHeader = props.showHeader || false;
        me.useDefLayout = props.useDefLayout || false;
        me.showUUID = props.showUUID || false;

        // support: only configures on the root box
        me.isDebug = props.isDebug
            || me.parentArbitrator && me.parentArbitrator.isDebug
            || false;

        // reset showing box config
        me.disableShowBoxConfig();
        if ( me.isDebug ) {
            me.enableShowBoxConfig();
        }

        // update arbitrator props
        utils.extendOnly( me.arbitrator, me, me.arbitratorOptionFields );
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }

    componentWillUpdate( nextProps, nextState ) {
    }

    componentDidUpdate( prevProps, prevState ) {
        if ( this.isRootBox ) {
            this.arbitrator.onResize( { init: 1 } );
        }
    }

    componentWillUnmount() {
        let me = this;

        if ( me.isRootBox ) {
            window.removeEventListener( 'resize', me.on_resize, false );
        }

        if ( me.showHeader ) {
            me.disableDraggable();
        }

        if ( me.parentArbitrator ) {
            me.parentArbitrator.unregister( me );
        }

        if ( me.isDebug ) {
            me.disableShowBoxConfig();
        }

        me.disableFocus();
        me.disableHover();
    }

    enableShowBoxConfig() {
        let me = this;
        let box = me.refs.box;
        box.addEventListener(
            'click'
            , me.showConfig
            , false
        );
    }

    disableShowBoxConfig() {
        let me = this;
        let box = me.refs.box;
        box.removeEventListener(
            'click'
            , me.showConfig
            , false
        );
    }

    showConfig = () => {
        let config = this.getConfig();
        let treeConfig = this.getTreeConfig();
        console.log( config );
        if ( this.isRootBox ) {
            console.log( '_boxTreeConfig', treeConfig );
            window._boxTreeConfig = JSON.stringify( treeConfig );
        }
    }

    getConfig() {
        let { isRootBox, showHeader, useDefLayout, isDebug, showUUID
            , top, left, width, height } = this;

        return {
            type: 'MagicBox'
            , props: {
                isRootBox
                , showHeader
                , useDefLayout
                , isDebug
                , showUUID
                , top
                , left
                , width
                , height
            }
        };
    }

    getTreeConfig() {
        let me = this;
        let subBoxes = me.arbitrator.subBoxes;
        let subComponents = me.arbitrator.subComponents;
        let config = {};
        let subBoxesCount = subBoxes.length;
        let subComponentsCount = subComponents.length;

        if ( subBoxesCount * subComponentsCount != 0 ) {
            throw Error( 'getTreeConfig: one of '
                + 'subBoxesCount and subComponentsCount must be zero' );
        }

        config.component = me.getConfig();
        config.children = [];

        subBoxes.forEach( ( subBox ) => {
            config.children.push( subBox.getTreeConfig() );
        } );

        subComponents.forEach( subComponent => {
            config.children.push( subComponent.getConfig() );
        } );

        return config;
    }

    checkParams() {
        if ( void 0 == this.tobe_width ) {
            throw Error( 'checkParams: `tobe_` properties not existed' );
        }

        let minSize = 3 * this.borderThreshold;

        if ( this.tobe_width < minSize || this.tobe_height < minSize ) {
            return false;
        }
        return true;
    }

    updateParams( options ) {
        let me = this;
        let opt = options || {};
        me.isDebug && console.log( '    MagicBox.updateParams(): on box ' + me._uuid );
        let box = me.refs.box;
        let content = me.refs.content;
        let container = me.parentArbitrator && me.parentArbitrator.box.refs.content
                || box.parentNode;

        if ( opt.init ) {
            if ( container ) {
                let contSize = utils.getContentSize( container );
                let contHeight = contSize.height;
                let contWidth = contSize.width;
                /(\d+)%/.test( me.left ) && ( me.left = RegExp.$1 * contWidth / 100 );
                /(\d+)%/.test( me.top ) && ( me.top = RegExp.$1 * contHeight / 100 );
                /(\d+)%/.test( me.width ) && ( me.width = RegExp.$1 * contWidth / 100 );
                /(\d+)%/.test( me.height ) && ( me.height = RegExp.$1 * contHeight / 100 );
            }
            else {
                throw Error( 'updateParams: no container' );
            }
        }
        else if ( opt.useTobe ) {
            // even if useTobe is set, maybe there is no tobe-size
            me.left = me.tobe_left || me.left;
            me.top = me.tobe_top || me.top;
            me.width = me.tobe_width || me.width;
            me.height = me.tobe_height || me.height;

            // must clear `tobe_` properties
            clearTobe();
        }
        else if ( opt.clearTobe ) {
            clearTobe();
            return;
        }

        box.style.left = me.left + 'px';
        box.style.top = me.top + 'px';
        box.style.width = me.width + 'px';
        box.style.height = me.height + 'px';

        me.contentHeight = content.offsetHeight;

        function clearTobe() {
            [ 'left', 'top', 'width', 'height' ].forEach( prop => {
                delete me[ 'tobe_' + prop ];
            } );
        }
    }

    enableFocus() {
        document.addEventListener(
            'mousedown'
            , this.on_focus
            , false
        );
    }

    disableFocus() {
        document.removeEventListener(
            'mousedown'
            , this.on_focus
            , false
        );
    }

    enableDraggable() {
        let header = this.refs.header;

        header.addEventListener(
            'mousedown'
            , this.on_header_drag_start
            , false
        );
    }

    disableDraggable() {
        let header = this.refs.header;

        header.removeEventListener(
            'mousedown'
            , this.on_header_drag_start
            , false
        );
    }

    enableHover() {
        let box = this.refs.box;

        this.resizeState = RESIZE_STATE_CAPTURE_HOVER;

        document.addEventListener(
            'mousemove'
            , this.on_capture_hover
            , false
        );
    }

    disableHover() {
        let box = this.refs.box;

        this.resizeState = RESIZE_STATE_DISTABLED;

        document.removeEventListener(
            'mousemove'
            , this.on_capture_hover
            , false
        );
    }

    enableResize( type ) {
        let me = this;
        let box = me.refs.box;

        me.resizeState = RESIZE_STATE_HOVER;
        me.resizeType = type;

        box.addEventListener(
            'mousedown'
            , me.on_border_resize_start
            , true
        );
    }

    disableResize() {
        let box = this.refs.box;

        this.resizeState = RESIZE_STATE_CAPTURE_HOVER;

        box.removeEventListener(
            'mousedown'
            , this.on_border_resize_start
            , true
        );
    }

    /***********************************************
     * handlers for focus
     */
    on_focus = ( e ) => {
        let me = this;
        let target = e.target;
        let box = me.refs.box;
        let curElement = target;
        let className = styles[ 'magic-box_focus' ];

        while( curElement
            && curElement.parentNode != box ) {
            curElement = curElement.parentNode;
        }

        if ( !curElement ) {
            $( box ).removeClass( className );
            me.isFocused = 0;
        }
        else {
            $( box ).addClass( className );
            me.isFocused = 1;
            me.isDebug && console.log( 'mousedown on box: ' + me._uuid );
        }
    }

    /***********************************************
     * handlers for drag
     */
    on_header_drag_start = ( e ) => {
        let box = this.refs.box;
        let parentBox = box.parentNode;
        let header = this.refs.header;

        this.isDragging = 1;

        this._dragParams = {
            vx: e.clientX
            , vy: e.clientY
            , ox: parseFloat( box.style.left ) || 0
            , oy: parseFloat( box.style.top ) || 0
        };

        document.addEventListener(
            'mousemove'
            , this.on_header_dragging
            , false
        );

        document.addEventListener(
            'mouseup'
            , this.on_header_drag_end
            , false
        );
    }

    on_header_dragging  = ( e ) => {
        let box = this.refs.box;
        let parentBox = box.parentNode;
        let header = this.refs.header;
        let _p = this._dragParams;
        let dx = e.clientX - _p.vx;
        let dy = e.clientY - _p.vy;
        let nx = _p.ox + dx;
        let ny = _p.oy + dy;

        let pComputedStyle = getComputedStyle( parentBox );
        let pw = parseFloat( pComputedStyle[ 'width' ] );
        let ph = parseFloat( pComputedStyle[ 'height' ] );
        let boxSizing = pComputedStyle[ 'box-sizing' ];
        let pBorderLeftWidth = parseFloat( pComputedStyle[ 'border-left-width' ] );
        let pBorderRightWidth = parseFloat( pComputedStyle[ 'border-right-width' ] );
        let pBorderTopWidth = parseFloat( pComputedStyle[ 'border-top-width' ] );
        let pBorderBottomWidth = parseFloat( pComputedStyle[ 'border-bottom-width' ] );
        let pPaddingLeft = parseFloat( pComputedStyle[ 'padding-left' ] );
        let pPaddingRight = parseFloat( pComputedStyle[ 'padding-right' ] );
        let pPaddingBottom = parseFloat( pComputedStyle[ 'padding-bottom' ] );
        let pPaddingTop = parseFloat( pComputedStyle[ 'padding-top' ] );
        let pContentWidth = boxSizing == 'content-box'
                ? pw
                : pw - pPaddingLeft - pPaddingRight - pBorderLeftWidth - pBorderRightWidth;
        let pContentHeight = boxSizing == 'content-box'
                ? ph
                : ph - pPaddingTop - pPaddingBottom - pBorderTopWidth - pBorderBottomWidth;

        if ( nx < 0 ) nx = 0;
        if ( ny < 0 ) ny = 0;
        if ( nx > pContentWidth - 10 ) nx = pContentWidth - 10;
        if ( ny > pContentHeight - 10 ) ny = pContentHeight - 10;

        this.left = nx;
        this.top = ny;
        box.style.left = nx + 'px';
        box.style.top = ny + 'px';
    }

    on_header_drag_end = ( e ) => {
        let header = this.refs.header;
        let box = this.refs.box;
        let parentBox = box.parentNode;

        document.removeEventListener(
            'mousemove'
            , this.on_header_dragging
            , false
        );

        document.removeEventListener(
            'mouseup'
            , this.on_header_drag_end
            , false
        );

        this.isDragging = 0;
    }

    /***********************************************
     * handlers for resize
     */
    on_capture_hover = ( e ) => {
        let box = this.refs.box;

        if (

            ! this.isFocused
            || this.isDragging
            || (
                this.resizeState != RESIZE_STATE_CAPTURE_HOVER
                && this.resizeState != RESIZE_STATE_HOVER
            )

            ) {

            if ( this.resizeState != RESIZE_STATE_RESIZING
                && this.resizeState != RESIZE_STATE_RESIZABLE ) {
                _resetDefault();
            }
            return;
        }

        let header = this.refs.header;
        let parentBox = box.parentNode;
        let headerRect = !this.showHeader ? { height: -1 } : header.getBoundingClientRect();
        let boxRect = box.getBoundingClientRect();
        // viewport coords
        let vx = e.clientX;
        let vy = e.clientY;
        // content coords
        let cx = vx - boxRect.left;
        let cy = vy - boxRect.top;

        let threshold = this.borderThreshold;

        let xRightHit = Math.abs( cx - boxRect.width ) < threshold;
        let xLeftHit = Math.abs( cx ) < threshold;
        let yBottomHit = Math.abs( cy - boxRect.height ) < threshold;
        let yTopHit = Math.abs( cy ) < threshold;

        let onHeader = cy >= 0 && cy <= headerRect.height
                && cx >=0 && cx <= boxRect.width;

        let resizeType;
        if ( !onHeader ) {
            if ( xRightHit && yBottomHit ){
                resizeType = 'se-resize';
            }
            else if ( xLeftHit && yBottomHit ) {
                resizeType = 'sw-resize';
            }
            else if ( xRightHit && yTopHit ) {
                resizeType = 'ne-resize';
            }
            else if ( xLeftHit && yTopHit ) {
                resizeType = 'nw-resize';
            }
            else if ( xRightHit ) {
                resizeType = 'e-resize';
            }
            else if ( yBottomHit ) {
                resizeType = 's-resize';
            }
            else if ( xLeftHit ) {
                resizeType = 'w-resize';
            }
            else if ( yTopHit ) {
                resizeType = 'n-resize';
            }
            else {
                resizeType = null;
            }
        }
        else {
            resizeType = null;
        }

        if ( !resizeType ) {
            _resetDefault();
            this.disableResize();
        }
        else {
            _resetDefault();
            $( box ).addClass( styles[ 'magic-box_' + resizeType ] );
            this.enableResize( resizeType );
        }

        function _resetDefault() {
            [
                'se-resize', 'e-resize', 'n-resize'
                , 's-resize', 'sw-resize', 'w-resize'
                , 'ne-resize', 'nw-resize'
            ]
            .map( item => 'magic-box_' + item )
            .forEach( item => $( box ).removeClass( styles[ item ] ) )
            ;
        }
    }

    on_border_resize_start = ( e ) => {
        let me = this;

        me.resizeState = RESIZE_STATE_RESIZABLE;
        // offset: [0, 10]
        me._resizeParams = { offsetX: 0, offsetY: 0 };

        let vx = e.clientX;
        let vy = e.clientY;
        let boundingRect = me.refs.box.getBoundingClientRect();
        let cx = vx - boundingRect.left;
        let cy = vy - boundingRect.top;
        switch( me.resizeType ) {
            case 'e-resize':
                me._resizeParams.offsetX = boundingRect.width - cx;
                break;
            case 's-resize':
                me._resizeParams.offsetY = boundingRect.height - cy;
                break;
            case 'w-resize':
                me._resizeParams.offsetX = cx;
                break;
            case 'n-resize':
                me._resizeParams.offsetY = cy;
                break;
            case 'se-resize':
                me._resizeParams.offsetX = boundingRect.width - cx;
                me._resizeParams.offsetY = boundingRect.height - cy;
                break;
            case 'sw-resize':
                me._resizeParams.offsetX = cx;
                me._resizeParams.offsetY = boundingRect.height - cy;
                break;
            case 'ne-resize':
                me._resizeParams.offsetX = boundingRect.width - cx;
                me._resizeParams.offsetY = cy;
                break;
            case 'nw-resize':
                me._resizeParams.offsetX = cx;
                me._resizeParams.offsetY = cy;
                break;
        }

        document.addEventListener(
            'mousemove'
            , this.on_border_resizing
            , false
        );

        document.addEventListener(
            'mouseup'
            , this.on_border_resize_end
            , false
        );

        me.isDebug && console.log( 'mousedown on box: ' + me._uuid )

        // prevent selection of text or image triggered by mousemove
        e.preventDefault();

        // make sure resizing be on the border of the most bottom box
        e.stopPropagation();
    }

    on_border_resizing = ( e ) => {
        let me = this;

        let boundingRect = me.refs.box.getBoundingClientRect();
        let vx = e.clientX;
        let vy = e.clientY;
        let vTop = boundingRect[ 'top' ];
        let vLeft = boundingRect[ 'left' ];
        let cx = vx - vLeft;
        let cy = vy - vTop;
        let dx = cx - me.width;
        let dy = cy - me.height;

        me.resizeState = RESIZE_STATE_RESIZING;

        switch( me.resizeType ) {
            case 'e-resize':
                dx += me._resizeParams.offsetX;
                dy = 0;
                break;
            case 's-resize':
                dy += me._resizeParams.offsetY;
                dx = 0;
                break;
            case 'w-resize':
                dx = -cx;
                dx += me._resizeParams.offsetX;
                dy = 0;
                break;
            case 'n-resize':
                dy = -cy;
                dy += me._resizeParams.offsetY;
                dx = 0;
                break;
            case 'se-resize':
                dx += me._resizeParams.offsetX;
                dy += me._resizeParams.offsetY;
                break;
            case 'sw-resize':
                dx = -cx;
                dx += me._resizeParams.offsetX;
                dy += me._resizeParams.offsetY;
                break;
            case 'ne-resize':
                dy = -cy;
                dy += me._resizeParams.offsetY;
                dx += me._resizeParams.offsetX;
                break;
            case 'nw-resize':
                dx = -cx;
                dx += me._resizeParams.offsetX;
                dy = -cy;
                dy += me._resizeParams.offsetY;
                break;
        }

        me.isDebug && console.log( '\n\n=> resizing on box: ' + me._uuid );

        if ( Math.abs( dx ) >= 2 || Math.abs( dy ) >= 2 ) {
            me.parentArbitrator
                && me.parentArbitrator.onSubBoxResize( {
                    target: me._uuid
                    , type: me.resizeType
                    , dx: dx
                    , dy: dy
                } );
        }
    }

    on_border_resize_end = ( e ) => {

        // this.resizeState = RESIZE_STATE_CAPTURE_HOVER;
        this.disableResize();


        document.removeEventListener(
            'mousemove'
            , this.on_border_resizing
            , false
        );

        document.removeEventListener(
            'mouseup'
            , this.on_border_resize_end
            , false
        );

    }

    on_resize = () => {
        let me = this;
        let box = me.refs.box;
        let container = box.parentNode;
        let { width, height } = utils.getContentSize( container );

        me.tobe_height = height;
        me.tobe_width = width;

        if ( me.arbitrator.probeRatioResize( me ) ) {
            me.arbitrator.onResize( { useTobe: 1 } );
        }
        else {
            me.arbitrator.onResize( { clearTobe: 1 } );
        }
    }

}

MagicBox.defaultProps = {
    top: 0
    , left: 0
    , width: 200
    , height: 100
    , isRootBox: false
    , isDebug: false
    , showHeader: false
    , showUUID: false
    , useDefLayout: false
};

MagicBox.propTypes = {
    top: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
    , left: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
    , width: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
    , height: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] )
    , isRootBox: PropTypes.bool
    , isDebug: PropTypes.bool
    , showHeader: PropTypes.bool
    , showUUID: PropTypes.bool
    , useDefLayout: PropTypes.bool
};

MagicBox.contextTypes = {
    arbitrator: PropTypes.instanceOf( Arbitrator )
};

MagicBox.childContextTypes = {
    arbitrator: PropTypes.instanceOf( Arbitrator )
};

export default MagicBox;
