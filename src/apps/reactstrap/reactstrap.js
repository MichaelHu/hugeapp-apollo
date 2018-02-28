import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Alert, NavLink } from 'reactstrap';

import RowAlert from './components/RowAlert';
import RowBadge from './components/RowBadge';
import RowBreadcrumb from './components/RowBreadcrumb';
import RowButton from './components/RowButton';
import RowButtonDropdown from './components/RowButtonDropdown';
import RowButtonGroup from './components/RowButtonGroup';
import RowCard from './components/RowCard';
import RowCollapse from './components/RowCollapse';
import RowFade from './components/RowFade';
import RowNavbar from './components/RowNavbar';
import RowModal from './components/RowModal';
import RowListGroup from './components/RowListGroup';
import RowTooltip from './components/RowTooltip';


class ReactStrap extends React.Component {
    render( props ) {
        const itemConfig = {
                Alert: RowAlert
                , Badge: RowBadge
                , Breadcrumb: RowBreadcrumb
                , Button: RowButton
                , ButtonDropdown: RowButtonDropdown
                , ButtonGroup: RowButtonGroup
                , Card: RowCard
                , Collapse: RowCollapse
                , Fade: RowFade
                , Navbar: RowNavbar
                , Modal: RowModal
                , ListGroup: RowListGroup
                , Tooltip: RowTooltip
            };

        const items = Object.keys( itemConfig ).map( ( key, index ) => {
            let Item = itemConfig[ key ];
            return (
                <div key={index}>
                    <h2 style={{marginTop: '30px'}}>{index+1}. {key}</h2>
                    <Item />
                </div>
            );
        } ); 

        return ( 
            <Container>
                <NavLink href="https://reactstrap.github.io/components/">
                    RecatStrap Components
                </NavLink> 
                { items }
            </Container>
        );
    }
}

export default ReactStrap;
