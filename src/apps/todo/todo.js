import React, { Component } from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import styles from './index.scss';
import Markdown from 'react-markdown';
import { Row, Col, Collapse, Button, Card, CardBody } from 'reactstrap';

let _uuid = 1000;
function uuid() { return ++_uuid; }

class Tips extends Component {

    constructor( props ) {
        super( props );
        this.state = { showText: false };
    }

    render () {

        return (

            <div>
                Tips: <Button color="link" onClick={this.toggle}>Click to Toogle</Button>
                <Row>
                    <Col>
                        <Collapse isOpen={this.state.showText}>
                            <Card>
                                <CardBody>
                <Markdown source={`

## key的设置
* 确保其唯一性，使用array index或者todo.id是有区别的，react会在元素更新时，根据其key值进行复用，本例中，如果使用array index作为key值，可能出现无法删除指定项的情况，这和复用元素有关

## 参考
* TodoMVC: <http://todomvc.com/examples/react/#/>

                `}/>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </Col>
                </Row>
            </div>

        );

    }

    toggle = ( e ) => {
        this.setState( { showText: ! this.state.showText } );
    }

}

export default class TodoMain extends Component {

    /**
     * Constructing
     */
    constructor( props ) {
        super( props );
        this.state = {
            todos: [
                {
                    id: 1
                    , title: 'kkk'
                    , isCompleted: false
                }
            ]
        };
    }




    /****************************************
     * Life Circles
     */

    /**
     * Mounting Phase
     */
    componentWillMount() {}
    componentDidMount() {}

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
            <div className={styles[ 'todoapp-wrapper' ]}>
                <section className={styles[ 'todoapp' ]}>
                    <header>
                        <h1>todos</h1>
                        <input className={styles[ 'new-todo']}
                            placeholder="What needs to be done?"
                            onKeyDown={this.onNewTodoInputKeyDown}
                            />
                    </header>
                    <section className={styles[ 'main' ]}>
                        <input className={styles[ 'toggle-all' ]}
                            type="checkbox"
                            />
                        <ul className={styles[ 'todo-list' ]}>
                            {
                                this.state.todos.map( ( todo, index ) => {
                                    return (
                                        <li key={todo.id} data-id={todo.id} className={''}>
                                            <div className={styles[ 'view' ]}>
                                                <input className={styles[ 'toggle' ]}
                                                    type="checkbox" />
                                                <label>{todo.title}</label>
                                                <button className={styles[ 'destroy' ]} 
                                                    onClick={this.onDestroyButtonClick}
                                                    />
                                            </div>
                                            <input className={styles[ 'edit' ]} />
                                        </li>
                                    );
                                } )
                            }
                        </ul>
                    </section>
                    <footer className={styles[ 'footer' ]}>
                        <span className={styles[ 'todo-count' ]}>
                            <strong>1</strong>
                            <span> </span>
                            <span>item</span>
                            <span> left</span>
                        </span>
                        <ul className={styles[ 'filters' ]}>
                            <li>
                                <a className={styles[ 'selected' ]}>All</a>
                            </li>
                            <li>
                                <a>Active</a>
                            </li>
                            <li>
                                <a>Completed</a>
                            </li>
                        </ul>
                    </footer>
                </section>
                <footer className={styles[ 'info' ]}>
                    <p>Double-click to edit a todo</p> 
                </footer>
                <Tips />
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
    onNewTodoInputKeyDown = ( e ) => {
        let keyCode = e.keyCode;
        if ( 13 == keyCode ) {
            let text = e.target.value;
            text = text.replace( /^\s+|\s+$/g, '' );
            let newTodos = this.state.todos.slice();
            let newTodo = {
                id: uuid()
                , title: text
                , isCompleted: false
            };
            newTodos.splice( 0, 0, newTodo );
            this.setState( { todos: newTodos } );
            e.target.value = '';
        }
    }

    onDestroyButtonClick = ( e ) => {
        let $btn = $( e.target );
        let $li = $btn.closest( 'li' );
        let id = $li.data( 'id' );
        let newTodos = [];
        console.log( id );
        this.state.todos.forEach( item => {
            if ( item.id != id ) {
                newTodos.push( item );
            }
        } );
        console.log( newTodos );
        this.setState( { todos: newTodos } );
    }





    /****************************************
     * Other
     */

}

