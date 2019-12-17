import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function confirmBox(title, message, onConfirm, onCancel) {
    confirmAlert({
        title: title,
        message: message,
        confirmLabel: 'Yes',                           // Text button confirm
        cancelLabel: 'Confirm',
        buttons: [
            {
                'label': 'Confirm',
                onClick: onConfirm
            },
            {
                'label': 'Cancel',
                onClick: onCancel
            }
        ]                       // Text button cancel
    })
}