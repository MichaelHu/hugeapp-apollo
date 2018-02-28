import React, { Component } from 'react';
import { Row, Col, Button, Modal, ModalHeader
    , ModalBody, ModalFooter, Alert } from 'reactstrap';
import Markdown from 'react-markdown';

export default class RowModal extends Component {
    constructor( props ) {
        super( props );
        this.state = { 
            modal: false 
            , nestedModal: false
            , closeAll: false
            , status: 'Closed'
        };

        [
            'toggle'
            , 'toggleNested'
            , 'toggleAll'
        ].forEach( key => this[ key ] = this[ key ].bind( this ) );
    }

    toggle() {
        this.setState( {
            modal: !this.state.modal
        } );
    }

    toggleNested() {
        this.setState( {
            nestedModal: !this.state.nestedModal
            , closeAll: false
        } );
    }

    toggleAll() {
        this.setState( {
            nestedModal: !this.state.nestedModal
            , closeAll: true
        } );
    }

    onEnter = ( e ) => {
        this.setState( {
            status: 'Enter'
        } );
    }

    onExit = ( e ) => {
        this.setState( {
            status: 'Exit'
        } );
    }
    
    onOpened = ( e ) => {
        this.setState( {
            status: 'Opened'
        } );
    }
    
    onClosed = ( e ) => {
        this.setState( {
            status: 'Closed'
        } );
    }
    


    render() {
        return (
        
        
<Row>
    <Col>




<h3>Modal</h3>
<Markdown source={ `
* 支持Modal嵌套
* fade默认为true，其opacity为1，导致backdrop背景不透明，若要使用透明背景，可以将fade设置为false
* backdrop属性可选值：false|true|'static'
` } />
<Button color="danger" onClick={this.toggle} className="mb-2">
    Show Modal
</Button>
<Alert color="warning">{this.state.status}</Alert>
<Modal isOpen={this.state.modal} toggle={this.toggle} 
    className={this.props.className} fade={false}
    onEnter={this.onEnter}
    onExit={this.onExit}
    onOpened={this.onOpened}
    onClosed={this.onClosed}
    >
    <ModalHeader toggle={this.props.toggle}>
        Modal title
    </ModalHeader>
    <ModalBody>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <br />
        <Button color="success" onClick={this.toggleNested}>
            Show Nested Modal
        </Button>
        <Modal isOpen={this.state.nestedModal}
            fade={false}
            toggle={this.toggleNested}
            onClosed={this.state.closeAll ? this.toggle : undefined}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
                <Button color="primary" 
                    onClick={this.toggleNested}>Done</Button>{' '}
                <Button color="secondary" 
                    onClick={this.toggleAll}>All Done</Button>
            </ModalFooter> 
        </Modal>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" 
            onClick={this.toggle}>Do Something</Button>{' '}
        <Button color="secondary"
            onClick={this.toggle}>Cancel</Button>
    </ModalFooter>
</Modal>









    </Col>
</Row>
        
        
        );
    }
}


/**
Modal.propTypes = {
  // boolean to control the state of the popover
  isOpen:  PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  // callback for toggling isOpen in the controlling component
  toggle:  PropTypes.func,
  role: PropTypes.string, // defaults to "dialog"
  // used to reference the ID of the title element in the modal
  labelledBy: PropTypes.string,
  keyboard: PropTypes.bool,
  // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
  backdrop: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['static'])
  ]),
  // called on componentDidMount
  onEnter: PropTypes.func,
  // called on componentWillUnmount
  onExit: PropTypes.func,
  // called when done transitioning in
  onOpened: PropTypes.func,
  // called when done transitioning out
  onClosed: PropTypes.func,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  // boolean to control whether the fade transition occurs (default: true)
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  // zIndex defaults to 1000.
  zIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  // backdropTransition - controls backdrop transition
  // timeout is 150ms by default to match bootstrap
  // see Fade for more details
  backdropTransition: PropTypes.shape(Fade.propTypes),
  // modalTransition - controls modal transition 
  // timeout is 300ms by default to match bootstrap
  // see Fade for more details
  modalTransition: PropTypes.shape(Fade.propTypes),
}

*/



