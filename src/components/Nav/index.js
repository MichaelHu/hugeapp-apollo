import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

function NavBar( props ) {
    return ( 
        <Nav pills>
            <NavItem>
                <Link className="nav-link" to="/todo">Todo</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/magicbox">MagicBox</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/reactstrap">ReactStrap</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to="/canvas">Canvas</Link>
            </NavItem>
        </Nav>
    );
}

export default NavBar;
