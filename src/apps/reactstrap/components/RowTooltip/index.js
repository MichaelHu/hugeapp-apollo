import React, { Component } from 'react';
import { Row, Col, Button, Tooltip
    , UncontrolledTooltip } from 'reactstrap';
import Markdown from 'react-markdown';

export default class RowTooltip extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            tooltipOpen: false
            , tooltip2Open: false
        };
    }

    render() {
        return (
        
        
<Row>
    <Col>


<h3>Tooltip</h3>
<p>Somewhere in here is a <a href="#" ref="anchor">tooltip</a></p>
<Tooltip placement="right"
    isOpen={this.state.tooltipOpen}
    target={()=>this.refs.anchor}
    toggle={()=>this.setState( { tooltipOpen: !this.state.tooltipOpen } )}
    >
Hello world!
</Tooltip>

<h3>Tooltip Disable Autohide</h3>
<p>Sometimes you need to allow users to select text within a <a href="#" ref="anchor2">tooltip</a></p>
<Tooltip placement="top"
    isOpen={this.state.tooltip2Open}
    target={()=>this.refs.anchor2}
    toggle={()=>this.setState( { tooltip2Open: !this.state.tooltip2Open } )}
    autohide={false}
    >
Try to select this text!
</Tooltip>

<h3>Multi-Tooltip</h3>
<MultiTooltip />
<Markdown source={
`
* ref: 遇HTML Element，代表的是DOM对象；遇自定义组件，则代表的是Component Instance
`
} />

<h3>UncontrolledTooltip</h3>
<p>Somewhere in here is a <a href="#" id="UncontrolledTooltipExample">tooltip</a>.</p>
<UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
Hello world!
</UncontrolledTooltip>


    </Col>
</Row>
        
        
        );
    }
}


class TooltipItem extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            tooltipOpen: false
        };
    }

    render() {
        const id = 'tmp-tooltip-' + this.props.id;
        return (

<span>
    <Button className="mr-1"
        id={id}
        color="secondary">
        {this.props.item.text}
    </Button>
    <Tooltip placement={this.props.item.placement}
        isOpen={this.state.tooltipOpen}
        target={id}
        toggle={()=>this.setState({ tooltipOpen: !this.state.tooltipOpen})}
        >
        Tooltip Content!
    </Tooltip>
</span>

        );
    }
}

class MultiTooltip extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            tooltips: [
                { placement: 'top', text: 'Top' }
                , { placement: 'bottom', text: 'Bottom' }
                , { placement: 'left', text: 'Left' }
                , { placement: 'right', text: 'Right' }
            ]
        };
    }

    render() {
        return (
        
<div>
{
    this.state.tooltips.map( ( tooltip, i ) => {
        return <TooltipItem key={i} item={tooltip} id={i} />;
    } )
}
</div>
        
        );
    }

}


