import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Alert } from 'reactstrap';

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


class ReactStrap extends React.Component {
    render( props ) {
        return ( 
            <Container>
                <RowAlert />
                <RowBadge />
                <RowBreadcrumb />
                <RowButton />
                <RowButtonDropdown />
                <RowButtonGroup />
                <RowCard />
                <RowCollapse />
                <RowFade />
                <RowNavbar />
                <RowModal buttonLabel="Show Modal" />
            </Container>
        );
    }
}

export default ReactStrap;
