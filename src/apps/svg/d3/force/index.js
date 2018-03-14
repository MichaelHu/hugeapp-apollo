import React, { Component } from 'react';
import Markdown from 'react-markdown';
import styles from './index.scss';

/**
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
 */

import * as force from 'd3-force';
import * as selection from 'd3-selection';
import * as dispatch from 'd3-dispatch';
import * as scale from 'd3-scale';
import * as drag from 'd3-drag';
const d3 = Object.assign( {}, force, selection, dispatch, scale, drag );

// !Note: `d3.event` is defined by `selection.event`
Object.defineProperty( d3, 'event', {
    get: function() { return selection.event; }
} );

import graphData from './miserables';

console.log( d3 );
// console.log( graphData );
// console.log( styles );

export default class Force extends React.Component {

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
     * Unmounting Phase
     */
    componentWillUnmount() {}

    render() {
        return <svg ref="container" className={styles.svg}></svg>;
    }





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
        let color = d3.scaleOrdinal( d3.schemeCategory20 );
        let simulation = d3.forceSimulation()
            .force( 'link', d3.forceLink().id( d => d.id ) )
            // <https://github.com/d3/d3-force/blob/master/README.md#forceManyBody>
            .force( 'charge', d3.forceManyBody().strength( -60 ) )
            .force( 'center', d3.forceCenter( width / 2, height / 2 ) )
            ;

		let link = svg.append( 'g' )
			.attr( 'class', styles.links )
			.selectAll( 'line' )
			.data( graphData.links )
			.enter()
			.append( 'line' )
			.attr( 'stroke-width', d => Math.sqrt( d.value ) )
			;

		let node = svg.append( 'g' )
			.attr( 'class', styles.nodes )
			.selectAll( 'circle' )
			.data( graphData.nodes )
            .enter()
            .append( 'circle' )
            .attr( 'r', 8 )
            .attr( 'fill', d => color( d.group ) )
            .call( 
                d3.drag()
                .on( 'start', dragstarted )
                .on( 'drag', dragged )
                .on( 'end', dragended )
            )
            ;

        node.append( 'title' )
            .text( d => d.id )
            ;

        simulation
            .nodes( graphData.nodes )
            .on( 'tick', ticked )
            ;

        // <https://github.com/d3/d3-force/blob/master/README.md#link_links>
        simulation.force( 'link' )
            .links( graphData.links )
            ;

        function ticked() {
            link
                .attr( 'x1', d => d.source.x )
                .attr( 'y1', d => d.source.y )
                .attr( 'x2', d => d.target.x )
                .attr( 'y2', d => d.target.y )
                ;

            node
                .attr( 'cx', d => d.x )
                .attr( 'cy', d => d.y )
                ;
        }

        function dragstarted( d ) {
            if ( !d3.event.active ) {
                simulation.alphaTarget( 0.3 ).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged( d ) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended( d ) {
            if ( !d3.event.active ) {
                simulation.alphaTarget( 0 );
            }
            d.fx = null;
            d.fy = null;
        }

    }

}

