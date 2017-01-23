import React from 'react';
import Notifications from 'react-notify-toast';
import { connect } from 'react-redux';
import { saveStatus } from '../Redux/Selectors/Server';
import stackedNotifier from './stackedNotifier';

export class AppNotifier extends React.Component {
    componentDidUpdate() {
        if (this.props.saveStatus === 'IN_PROGRESS') stackedNotifier.showNeutral('Saving the result...');
        if (this.props.saveStatus === 'ERROR') stackedNotifier.showError('Save failed.');
        if (this.props.saveStatus === 'SUCCESS') stackedNotifier.showSuccess('Result saved!');
    }

    render() {
        return (
            <Notifications />
        )
    }
}

AppNotifier.propTypes = {
    saveStatus: React.PropTypes.string
}

export default connect(state => ({
    saveStatus: saveStatus(state)
}),
{}
)(AppNotifier);
