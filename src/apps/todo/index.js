import Bundle from 'Bundle';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import todoBundle from 'bundle-loader?lazy!./todo';

export default function TodoApp( props ) {
    return ( 
        <Route>
            <Bundle load={todoBundle}>
                { ( mod ) => {
                    return <h2>{ mod.a }</h2>;
                } }
            </Bundle>
        </Route>
    );
}
