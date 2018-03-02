import React from 'react';
import MagicBox from 'MagicBox';
import Block from './components/Block';
import ReactStrap from '../reactstrap/reactstrap'; 

class Box extends React.Component {
    render() {
        return (
<div>

<div className="test-magic-box-container">
    <MagicBox height="100%" width="100%" isRootBox useDefLayout>
        <MagicBox key="1"><Block type="seagreen" /></MagicBox>
        <MagicBox key="2"><Block type="success" /></MagicBox>
        <MagicBox key="3"><Block type="goldenrod" /></MagicBox>
    </MagicBox>
</div>

<div className="test-magic-box-container">
    <MagicBox height="100%" width="100%" isRootBox showUUID>
        <MagicBox key="1" showUUID width="20%" height="100%">
            <Block type="seagreen">
ABC
            </Block>
        </MagicBox>
        <MagicBox key="2" showUUID width="80%" height="100%" left="20%">
            <div style={{backgroundColor: '#fefefe', overflow: 'scroll'}}>
                <ReactStrap />
            </div>
        </MagicBox>
    </MagicBox>
</div>

</div>
        );
    }
}

export default Box;
