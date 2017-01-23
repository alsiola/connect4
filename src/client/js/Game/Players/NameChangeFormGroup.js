import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const NameChangeFormGroup = props => (
    <FormGroup validationState={props.getValidationState()}>
        <ControlLabel>{props.label}</ControlLabel>
        <FormControl
            type='text'
            value={props.value}
            onChange={e => props.inputChanged(e)}
            placeholder='Enter Your Name'
        />
        <FormControl.Feedback />
        <HelpBlock>Between three and twelve characters.</HelpBlock>
    </FormGroup>
);

NameChangeFormGroup.propTypes = {
    getValidationState: React.PropTypes.func.isRequired,
    inputChanged: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
}

export default NameChangeFormGroup;