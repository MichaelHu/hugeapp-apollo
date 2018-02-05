import * as utils from './utils';
import MagicBox from './magicBox';

export default class Arbitrator {
    constructor( box, options ) {
        let me = this;
        me.opt = options || {};
        if ( ! me.opt.unitTest && ! box instanceof MagicBox ) {
            throw Error( 'Arbitrator constructor: box must be instance of MagicBox' );
        }
        me.box = me.opt.unitTest 
            ? { width: 300, height: 320, contentHeight: 300, left: 0 } : box;
        me.subBoxes = [];
        me.subComponents = [];
        me.deviation = typeof me.opt.deviation == 'number' ? me.opt.deviation : 2;

        me.isDebug = me.opt.isDebug || 0;
        me.useDefLayout = me.opt.useDefLayout || 0;
    }

    register( subBox ) {
        if ( ! subBox instanceof MagicBox ) {
            throw Error( 'Arbitrator register(): subBox must be instance of MagicBox' );
        }
        this.subBoxes.push( subBox );
    }

    unregister( subBox ) {
        if ( ! subBox instanceof MagicBox ) {
            throw Error( 'Arbitrator unregister(): subBox must be instance of MagicBox' );
        }
        let i = this.subBoxes.length - 1;
        while( i >= 0 ) {
            if ( this.subBoxes[ i ] == subBox ) {
                this.subBoxes.splice( i, 1 );
                return;
            }
            i--;
        }
    }

    registerSubComponent( subComponent ) {
        if ( ! subComponent instanceof React.Component ) {
            throw Error( 'Arbitrator registerSubComponent(): '
                + 'subComponent must be instance of React.Component' );
        }
        this.subComponents.push( subComponent );
    }

    unregisterSubComponent( subComponent ) {
        if ( ! subComponent instanceof React.Component ) {
            throw Error( 'Arbitrator unregisterSubComponent(): '
                + 'subComponent must be instance of React.Component' );
        }
        let i = this.subComponents.length - 1;
        while( i >= 0 ) {
            if ( this.subComponents[ i ] == subComponent ) {
                this.subComponents.splice( i, 1 );
                return;
            }
            i--;
        }
    }

    initializeSubBoxLayout() {
        let me = this;
        if ( me.subBoxes.length ) {
            me.isDebug && console.log( 
                '  initializeSubBoxLayout on parent box [ ' + me.box._uuid + ' ] : '
                + me.subBoxes.map( ( box ) => box._uuid )
                    .join( '; ' )
            );
        }

        me.getDefaultLayout();
    }

    getDefaultLayout( total /* only for unit test */ ) {
        let me = this;
        total = total || me.subBoxes.length;

        let grid = me.getSubBoxGrid( total );
        let lineCount = grid.length;
        let contWidth = me.box.width;
        let contHeight = me.box.contentHeight;
        let lineHeight = contHeight / lineCount;
        let j = 0;
        let layoutData = [];

        // console.log( 'Arbitrator.getDefaultLayout(): on box ' + me.box._uuid );

        if ( me.opt.unitTest ) {
            while( j < total ) {
                let coords = getCoords( j );
                let params = getBoxParams( coords );
                layoutData.push( params );
                j++;
            } 
        }
        else {
            me.subBoxes.forEach( ( box, index ) => {
                let coords = getCoords( index );
                let params = getBoxParams( coords );
                layoutData.push( params );
                utils.extend( box, params );
            } );
        }

        return layoutData;

        function getBoxParams( coords ) {
            let { ln, col } = coords;
            let left, top, width, height;
            let colWidth = contWidth / grid[ ln ];  
            left = colWidth * col;
            top = lineHeight * ln;
            width = colWidth;
            height = lineHeight;
            return { left, top, width, height };
        }

        function getCoords( index ) {
            let ln = 0, col = 0;
            let i = 0, colsOfLine;
            while ( ln < lineCount && i <= index ) {
                colsOfLine = grid[ ln ];
                col = 0;
                while( col < colsOfLine && i <= index ) {
                    if( i == index ) {
                        return { ln, col };
                    }
                    i++;
                    col++;
                }
                ln++;
            }
        }
    }

    getSubBoxGrid( total ) {
        let me = this;
        total = total || me.subBoxes.length;
        let lineCount = Math.floor( Math.sqrt( total ) );
        if ( lineCount * ( lineCount + 1 ) < total ) {
            lineCount++;
        }
        let lines = [];
        let i = lineCount;
        while( i > 0 ) {
            lines.push( lineCount - 1 );
            i--;
        }
        let j = lineCount * ( lineCount - 1 ) + 1;
        while ( j++ <= total ) {
            lines[ i ]++;
            i = ( i + 1 ) % lineCount;
        }
        return lines;
    }



    arbitrateSubBoxLayout( params ) {
        let me = this;
        me.isDebug && console.log(
            '  arbitrateSubBoxLayout on parent box [ ' + this.box._uuid + ' ]: '
            + this.subBoxes.map( ( box ) => box._uuid )
                .join( '; ' )
        );

        let resizedBoxes = {};
        resizedBoxes.__version = Date.now();
        if ( me.probeResizeRequest( params, resizedBoxes ) ) {
            me.isDebug && console.log( '  arbitrateSubBoxLayout successfully' );
            me.box.arbitrator.onResize( { useTobe: 1 } );
        }
        else {
            me.isDebug && console.log( '  arbitrateSubBoxLayout failed' );
            me.box.arbitrator.onResize( { clearTobe: 1 } );
        }
    }

    getAdjInfoForSubBoxes( subBoxes ) {
        let me = this;
        let adjBoxes = {};
        subBoxes = subBoxes || me.subBoxes;

        if ( me.opt.unitTest ) {
            let _uuid = 1;
            subBoxes.forEach( box => {
                box._uuid = _uuid++;
            } );
        }

        subBoxes.forEach( ( box ) => {
            let _uuid = box._uuid;
            let { top, left, width, height } = box;
            let abs = adjBoxes[ _uuid ] = {};

            subBoxes.forEach( ( subBox ) => {

                if ( _uuid == subBox ) { return; }
                let { top: sTop, left: sLeft, width: sWidth, height: sHeight } = subBox;

                // console.log( { top, left, width, height, sTop, sLeft, sWidth, sHeight } );

                if ( utils.equal( sLeft, left + width, me.deviation )
                        && ! (
                            sTop >= top + height
                            || sTop + sHeight <= top
                        )
                    ) {
                    abs[ 'e' ] = abs[ 'e' ] || [];
                    abs[ 'e' ].push( subBox );
                } 
                else if ( utils.equal( sLeft + sWidth, left, me.deviation )
                        && ! (
                            sTop >= top + height
                            || sTop + sHeight <= top
                        )
                    ) {
                    abs[ 'w' ] = abs[ 'w' ] || [];
                    abs[ 'w' ].push( subBox );
                }
                else if ( utils.equal( sTop, top + height, me.deviation )
                        && ! (
                            sLeft >= left + width
                            || sLeft + sWidth <= left
                        )
                    ) {
                    abs[ 's' ] = abs[ 's' ] || [];
                    abs[ 's' ].push( subBox );
                }
                else if ( utils.equal( sTop + sHeight, top, me.deviation )
                        && ! (
                            sLeft >= left + width
                            || sLeft + sWidth <= left
                        )
                    ) {
                    abs[ 'n' ] = abs[ 'n' ] || [];
                    abs[ 'n' ].push( subBox );
                }

            } );

        } );

        return adjBoxes;
    }

    getAffectedBoxes( request, resizedBoxes ) {
        if ( !resizedBoxes ) {
            throw Error( 'getAffectedBoxes: resizedBoxes not defined' );
        }
        let me = this;
        let boxId = request.target;
        let adjBoxes = me.getAdjInfoForSubBoxes();
        let boxes = [];
        switch( request.type ) {
            case 'e-resize':
                _addBoxes( 'e' );
                break;
            case 's-resize':
                _addBoxes( 's' );
                break;
            case 'w-resize':
                _addBoxes( 'w' );
                break;
            case 'n-resize':
                _addBoxes( 'n' );
                break;
            case 'se-resize':
                _addBoxes( 's' );
                _addBoxes( 'e' );
                break;
            case 'sw-resize':
                _addBoxes( 's' );
                _addBoxes( 'w' );
                break;
            case 'ne-resize':
                _addBoxes( 'n' );
                _addBoxes( 'e' );
                break;
            case 'nw-resize':
                _addBoxes( 'n' );
                _addBoxes( 'w' );
                break;
        }

        function _addBoxes( type ) {
            ( adjBoxes[ boxId ][ type ] || [] ).forEach( box => {
                if ( !resizedBoxes[ box._uuid ] ) {
                    boxes.push( { type, box } );
                }
            } );
        }

        return boxes;
    }

    probeResizeRequest( request, resizedBoxes ) {
        if ( !resizedBoxes ) {
            throw Error( 'probeResizeRequest: resizedBoxes not defined' );
        }

        resizedBoxes[ request.target ] = 1;

        let me = this;
        let box = me.getBoxFromRequest( request ); 
        let tobeSize = me.getTobeSize( request );

        me.isDebug && console.log( '    probeResizeRequest: box ' + box._uuid );

        if ( !tobeSize ) {
            return false;
        }

        let p = me.probeRatioResize( box );
        if ( !p ) {
            me.isDebug && console.log( '      probeResizeRequest: can not be resized' );
            return false;
        }
        let affectedBoxes = me.getAffectedBoxes( request, resizedBoxes );

        me.isDebug && console.log( 
            '      affectedBoxes: ' 
            + affectedBoxes.map( box => box.type + '|' + box.box._uuid ).join( ', ' ) 
        );

        affectedBoxes.forEach( item => resizedBoxes[ item.box._uuid ] = 1 );

        let i = 0, item, transferedRequest;
        while( i < affectedBoxes.length ) {
            item = affectedBoxes[ i ];
            transferedRequest = me.getTransferedRequest( request, item.type, item.box );
            if ( ! me.probeResizeRequest( transferedRequest, resizedBoxes ) ) {
                return false;    
            }
            i++;
        } 

        return true;
    }

    getTransferedRequest( request, direction, transferedBox ) {
        let me = this;
        let box = this.getBoxFromRequest( request );
        let r, transferedRequest;

        r = utils.extend( {}, request );
        r.target = transferedBox._uuid;

        switch( request.type ) {
            case 'e-resize': 
                if ( 'e' == direction ) {
                    r.type = 'w-resize';
                    r.dx = -r.dx;
                    transferedRequest = r;
                }
                break;
            case 'w-resize': 
                if ( 'w' == direction ) {
                    r.type = 'e-resize';
                    r.dx = -r.dx;
                    transferedRequest = r;
                }
                break;
            case 's-resize': 
                if ( 's' == direction ) {
                    r.type = 'n-resize';
                    r.dy = -r.dy;
                    transferedRequest = r;
                }
                break;
            case 'n-resize': 
                if ( 'n' == direction ) {
                    r.type = 's-resize';
                    r.dy = -r.dy;
                    transferedRequest = r;
                }
                break;
            case 'se-resize':
                if ( 'e' == direction ) {
                    if ( utils.equal( 
                                box.top + box.height
                                , transferedBox.top + transferedBox.height 
                                , me.deviation 
                            ) 
                        ) {
                        r.type = 'sw-resize';
                        r.dx = -r.dx;
                    }
                    else {
                        r.type = 'w-resize';
                        r.dx = -r.dx;
                        r.dy = 0;
                    }
                    transferedRequest = r;
                }
                if ( 's' == direction ) {
                    if ( utils.equal( 
                                box.left + box.width
                                , transferedBox.left + transferedBox.width
                                , me.deviation
                            )
                        ) {
                        r.type = 'ne-resize';
                        r.dy = -r.dy;
                    }
                    else {
                        r.type = 'n-resize';
                        r.dx = 0;
                        r.dy = -r.dy;
                    }
                    transferedRequest = r;
                }
                break;
            case 'sw-resize':
                if ( 'w' == direction ) {
                    if ( utils.equal(
                                box.top + box.height 
                                , transferedBox.top + transferedBox.height
                                , me.deviation
                            )
                        ) {
                        r.type = 'se-resize';
                        r.dx = -r.dx;
                    }
                    else {
                        r.type = 'e-resize';
                        r.dx = -r.dx;
                        r.dy = 0;
                    }
                    transferedRequest = r;
                }
                if ( 's' == direction ) {
                    if ( utils.equal( box.left, transferedBox.left, me.deviation ) ) {
                        r.type = 'nw-resize';
                        r.dy = -r.dy;
                    }
                    else {
                        r.type = 'n-resize';
                        r.dx = 0;
                        r.dy = -r.dy;
                    }
                    transferedRequest = r;
                }
                break;
            case 'ne-resize':
                if ( 'e' == direction ) {
                    if ( utils.equal( box.top, transferedBox.top, me.deviation ) ) {
                        r.type = 'nw-resize';
                        r.dx = -r.dx;
                    }
                    else {
                        r.type = 'w-resize';
                        r.dx = -r.dx;
                        r.dy = 0;
                    }
                    transferedRequest = r;
                }
                if ( 'n' == direction ) {
                    if ( utils.equal( 
                                box.left + box.width
                                , transferedBox.left + transferedBox.width
                                , me.deviation
                            )
                        ) {
                        r.type = 'se-resize';
                        r.dy = -r.dy;
                    }
                    else {
                        r.type = 's-resize';
                        r.dx = 0;
                        r.dy = -r.dy;
                    }
                    transferedRequest = r;
                }
                break;
            case 'nw-resize':
                if ( 'w' == direction ) {
                    if ( utils.equal( box.top, transferedBox.top, me.deviation ) ) {
                        r.type = 'ne-resize';
                        r.dx = -r.dx;
                    }
                    else {
                        r.type = 'e-resize';
                        r.dx = -r.dx;
                        r.dy = 0;
                    }
                    transferedRequest = r;
                }
                if ( 'n' == direction ) {
                    if ( utils.equal( box.left, transferedBox.left, me.deviation ) ) {
                        r.type = 'sw-resize';
                        r.dy = -r.dy;
                    }
                    else {
                        r.type = 's-resize';
                        r.dx = 0;
                        r.dy = -r.dy;
                    }
                    transferedRequest = r;
                }
                break;
        }

        return transferedRequest;
    }

    probeRatioResize( box ) {
        let me = this;
        let { tobe_width, tobe_height, width, height, contentHeight } = box;

        if ( ! box.checkParams() ) {
            return false;
        }

        if ( ! me.subBoxes.length ) {
            return true;
        }

        me.isDebug && console.log( '      probeRatioResize: box ' + box._uuid );
        // console.log( { tobe_width, tobe_height, width, height } );

        let headerHeight = height - contentHeight; 
        let xRatio = tobe_width / width;
        let yRatio = ( tobe_height - headerHeight ) / ( height - headerHeight );
        // console.log( { xRatio, yRatio } );
        let subBoxes = box.arbitrator.subBoxes;
        let i = 0, subBox;
        while( i < subBoxes.length ) {
            subBox = subBoxes[ i ];
            subBox.tobe_left = subBox.left * xRatio;
            subBox.tobe_width = subBox.width * xRatio;
            subBox.tobe_top = subBox.top * yRatio;
            subBox.tobe_height = subBox.height * yRatio;
            if ( ! me.probeRatioResize( subBox ) ) {
                return false;
            }
            i++;
        }
        return true;
    }

    getBoxFromRequest( request ) {
        let i = 0;
        let boxes = this.subBoxes;
        while( i < boxes.length ) {
            if ( boxes[ i ]._uuid == request.target ) {
                return boxes[ i ];
            }
            i++;
        }
        return false;
    }

    getTobeSize( request ) {
        let me = this;
        let box = me.getBoxFromRequest( request ); 

        box.tobe_left = box.left;
        box.tobe_top = box.top;
        box.tobe_width = box.width;
        box.tobe_height = box.height;
        switch( request.type ) {
            case 'e-resize':
                box.tobe_width = box.width + request.dx;
                break;
            case 's-resize':
                box.tobe_height = box.height + request.dy;
                break;
            case 'w-resize':
                box.tobe_width = box.width + request.dx;
                box.tobe_left = box.left - request.dx;
                break;
            case 'n-resize':
                box.tobe_height = box.height + request.dy;
                box.tobe_top = box.top - request.dy;
                break;
            case 'se-resize':
                box.tobe_width = box.width + request.dx;
                box.tobe_height = box.height + request.dy;
                break;
            case 'sw-resize':
                box.tobe_width = box.width + request.dx;
                box.tobe_height = box.height + request.dy;
                box.tobe_left = box.left - request.dx;
                break;
            case 'ne-resize':
                box.tobe_width = box.width + request.dx;
                box.tobe_height = box.height + request.dy;
                box.tobe_top = box.top - request.dy;
                break;
            case 'nw-resize':
                box.tobe_width = box.width + request.dx;
                box.tobe_height = box.height + request.dy;
                box.tobe_top = box.top - request.dy;
                box.tobe_left = box.left - request.dx;
                break;
        }

        let { left, top, width, height
            , tobe_left, tobe_top, tobe_width, tobe_height } = box;

        return { left, top, width, height
            , tobe_left, tobe_top, tobe_width, tobe_height };
    }

    getTotalSpace( options ) {
        let me = this;
        let right = 0, bottom = 0, left = Infinity, top = Infinity;
        if ( ! me.subBoxes.length ) {
            return null;
        }
        me.subBoxes.forEach( box => {
            if ( box.left + box.width > right ) {
                right = box.left + box.width;
            }
            if ( box.top + box.height > bottom ) {
                bottom = box.top + box.height;
            }
            if ( box.left < left ) {
                left = box.left;
            }
            if ( box.top < top ) {
                top = box.top;
            }
        } );
        let width = right - left;
        let height = bottom - top;
        return { width, height };
    }

    resize( options ) {
        let me = this; 
        let opt = options || {};

        if ( opt.useTobe ) {
            me.isDebug && console.log( '    resize subboxes using tobe-size' );
        }
        else if ( opt.clearTobe ) {
            me.isDebug && console.log( '    clear subboxes `tobe-` properties' );
        }
        else if ( me.useDefLayout ) {
            me.isDebug && console.log( '    use default layout' );
            me.initializeSubBoxLayout( options );
        }

        me.subBoxes.forEach( ( box ) => {
            box.arbitrator.onResize( options );
        } );
    }

    onResize( options ) {
        let me = this;
        me.isDebug && console.log( '  onResize: on box ' + me.box._uuid );

        // update box params
        me.box.updateParams( options );
        me.resize( options );
    }

    onSubBoxResize( params ) {
        // console.log( 'onSubBoxResize: from box ' + this.box._uuid );
        // console.log( params );
        if ( !params ) {
            throw Error( 'onSubBoxResize( params ): params undefined' );
        }
        this.arbitrateSubBoxLayout( params );
    }

}
