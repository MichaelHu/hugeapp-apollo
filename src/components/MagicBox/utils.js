function extend( target, ...sources ) {
    for ( let i = 0; i < sources.length; i++ ) {
        let source = sources[ i ];
        for ( let key in source ) {
            if ( source.hasOwnProperty( key ) ) {
                target[ key ] = source[ key ];
            }
        }
    }
    return target;
}

function extendOnly( target, ...others ) {
    let len = others.length 
        , sources = [].slice.call( others, 0, len - 1 )
        , keys = others[ len - 1 ] 
        ;
    for ( let i = 0; i < sources.length; i++ ) {
        let source = sources[ i ];
        for ( let key in source ) {
            if ( source.hasOwnProperty( key ) && keys.indexOf( key ) >= 0 ) {
                target[ key ] = source[ key ];
            }
        }
    }
    return target;
}

function defaults( target, ...sources ) {
    for ( let i = 0; i < sources.length; i++ ) {
        let source = sources[ i ];
        for ( let key in source ) {
            if ( source.hasOwnProperty( key ) && target[ key ] == undefined ) {
                target[ key ] = source[ key ];
            }
        }
    }
    return target;
}

function equal( a, b, deviation ) {
    deviation = deviation | 0;
    return Math.abs( a - b ) <= Math.abs( deviation );
}

function getContentSize( element ) {
    let computedStyle = getComputedStyle( element );
    let boxSizing = computedStyle[ 'box-sizing' ];
    let containerWidth = parseFloat( computedStyle[ 'width' ] );
    let containerHeight = parseFloat( computedStyle[ 'height' ] );
    let containerBorderTop = parseFloat( computedStyle[ 'border-top' ] );
    let containerBorderRight = parseFloat( computedStyle[ 'border-right' ] );
    let containerBorderBottom = parseFloat( computedStyle[ 'border-bottom' ] );
    let containerBorderLeft = parseFloat( computedStyle[ 'border-left' ] );
    let containerPaddingTop = parseFloat( computedStyle[ 'padding-top' ] );
    let containerPaddingRight = parseFloat( computedStyle[ 'padding-right' ] );
    let containerPaddingBottom = parseFloat( computedStyle[ 'padding-bottom' ] );
    let containerPaddingLeft = parseFloat( computedStyle[ 'padding-left' ] );

    let width = boxSizing == 'border-box'
            ? containerWidth - containerBorderLeft - containerBorderRight 
                - containerPaddingLeft - containerPaddingRight
            : containerWidth;
    let height = boxSizing == 'border-box'
            ? containerHeight - containerBorderTop - containerBorderBottom
                - containerPaddingTop - containerPaddingBottom
            : containerHeight;

    return { width, height };
}

export {
    extend
    , extendOnly
    , defaults
    , equal
    , getContentSize
};
