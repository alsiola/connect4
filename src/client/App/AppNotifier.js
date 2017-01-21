import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import { connect } from 'react-redux';
import { saveStatus } from '../Redux/Selectors/Server';

class AppNotifier extends React.Component {
    constructor() {
        super();
        this.stackNotification = new stackedShow();
    }

    componentDidUpdate() {
        console.log(this.props.saveStatus);
        if (this.props.saveStatus === 'IN_PROGRESS') this.stackNotification("Saving the result...", 'success', 3000);
        if (this.props.saveStatus === 'ERROR') this.stackNotification("Save failed.", 'error', 3000);
        if (this.props.saveStatus === 'SUCCESS') this.stackNotification("Result saved!", 'success', 3000);
    }

    render() {
        return (
            <Notifications />
        )
    }
}

export default connect(state => ({
    saveStatus: saveStatus(state)
}),
{}
)(AppNotifier);

function stackedShow() {
    this.msgs = [];
    this.isNotifying = false;

    this.showNotify = function() {
        if (this.msgs.length === 0) {
            this.isNotifying = false;
            return;
        }

        const current = this.msgs.pop();
        this.isNotifying = true;
        notify.show(current.msg, current.type, current.timeout);
        
        if (current.timeout > 0) {
            setTimeout(() => this.showNotify(), current.timeout + 300);
        }
    }

    return (msg, type, timeout) => {
        this.msgs.push({msg, type, timeout});
        if (!this.isNotifying) {
            this.showNotify();
        }
    }
}
