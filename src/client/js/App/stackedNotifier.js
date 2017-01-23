import { notify } from 'react-notify-toast';

const notifier = new stackedShow();

export default {
    showNeutral: msg => notifier(msg, null, 3000),
    showSuccess: msg => notifier(msg, 'success', 3000),
    showError: msg => notifier(msg, 'error', 3000)
}

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