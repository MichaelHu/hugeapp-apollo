import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
// for React 15 and below
// import React, { PropTypes, Component } from 'react';

/**
 * ===== default included =====
 * d3-array@1.2.1
 * d3-axis@1.0.8
 * d3-brush@1.0.4
 * d3-chord@1.0.4
 * d3-collection@1.0.4
 * d3-color@1.0.3
 * d3-dispatch@1.0.3
 * d3-drag@1.2.1
 * d3-dsv@1.0.8
 * d3-ease@1.0.3
 * d3-force@1.1.0
 * d3-format@1.2.2
 * d3-geo@1.9.1
 * d3-hierarchy@1.1.5
 * d3-interpolate@1.1.6
 * d3-path@1.0.5
 * d3-polygon@1.0.3
 * d3-quadtree@1.0.3
 * d3-queue@3.0.7
 * d3-random@1.1.0
 * d3-request@1.0.6
 * d3-scale@1.0.7
 * d3-selection@1.3.0
 * d3-shape@1.2.0
 * d3-time-format@2.1.1
 * d3-time@1.0.8
 * d3-timer@1.0.7
 * d3-transition@1.1.1
 * d3-voronoi@1.1.2
 * d3-zoom@1.7.1
 *
 * ===== install manually =====
 * d3-fetch@1.1.0
 */

import * as hierarchy from 'd3-hierarchy';
import * as selection from 'd3-selection';
import * as dsv from 'd3-dsv';
import * as fetch from 'd3-fetch';

const d3 = Object.assign( {}, hierarchy, selection
    , dsv, fetch );


import styles from './index.scss';
import csvFile from './flare.csv';

export default class Dendrogram extends Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );
    }




    /****************************************
     * Life Circles
     */

    /**
     * Mounting Phase
     */
    componentWillMount() {}
    componentDidMount() { this.init(); }

    /**
     * Updating Phase
     */
    componentWillReceiveProps( nextProps ) {}
    shouldComponentUpdate( nextProps, nextState ) { return true; }
    componentWillUpdate( nextProps, nextState ) {}

    /**
     * Rendering 
     */
    render() {
        return (
            <div>
                <Markdown source={`

### Dendrogram

* 系统树图，其叶子节点在一条直线上 <https://en.wikipedia.org/wiki/Dendrogram> 
* 此外还有镭射状的系统树图
* 节点定位使用translate( x, y )，而不需使用绝对定位
* 边的绘制使用三阶贝塞尔曲线

                `} />
                <svg ref="container" className={styles.svg}></svg>
            </div>
        );
    }

    /**
     * Unmounting Phase
     */
    componentWillUnmount() {}





    /****************************************
     * Event Handlers
     */





    /****************************************
     * Other
     */

    init() {

        let svg = d3.select( this.refs.container );
        let width = parseInt( svg.style( 'width' ) );
        let height = parseInt( svg.style( 'height' ) );
        let g = svg.append( 'g' )
            .attr( 'transform', 'translate(40,0)' )
            ;

        let tree = d3.cluster()
            .size( [ height, width - 160 ] )
            ;

        let stratify = d3.stratify()
            .parentId( d => d.id.substring( 0, d.id.lastIndexOf( '.' ) ) )
            ;

        d3.csv( csvFile )
            .then( data => {

                let root = stratify( data )
                    .sort( ( a, b ) => ( a.height - b.height ) || a.id.localeCompare( b.id ) )
                    ;

                // get tree layout
                tree( root );

                let link = g.selectAll( styles.link )
                    .data( root.descendants().slice( 1 ) )
                    .enter()
                    .append( 'path' )
                    .attr( 'class', styles.link )
                    .attr( 'd', d => {
                        return 'M' + d.y + ',' + d.x
                            + 'C' + ( d.parent.y + 100 ) + ',' + d.x 
                            + ' ' + ( d.parent.y + 100 ) + ',' + d.parent.x
                            + ' ' + d.parent.y + ',' + d.parent.x
                            ;
                    } )
                    ;

                let node = g.selectAll( styles.node )
                    .data( root.descendants() )
                    .enter()
                    .append( 'g' )
                    .attr( 'class'
                        , d => { 
                            return styles.node + ' ' 
                                + ( d.children 
                                    ? styles[ 'node--internal' ] 
                                    : styles[ 'node--leaf' ] 
                                ) 
                        } 
                    )
                    .attr( 'transform', d => 'translate(' + d.y + ',' + d.x + ')' )
                    ;

                node.append( 'circle' )
                    .attr( 'r', 2.5 )
                    ;

                node.append( 'text' )
                    .attr( 'dy', 3 )
                    .attr( 'x', d => d.children ? -8 : 8 )
                    .style( 'text-anchor', d => d.children ? 'end' : 'start' )
                    .text( d => d.id.substring( d.id.lastIndexOf( '.' ) + 1 ) )
                    ;

            } );

    }

}

