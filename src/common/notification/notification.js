// import React from 'react'
// import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

export const CreateNotification = {
    success: (tittle = "", message = "", SetTimeOut = 2000) => {
        NotificationManager.success(tittle, message, SetTimeOut);

    },
    error: (tittle = "", message = "", SetTimeOut = 3000) => {
        NotificationManager.error(tittle, message, SetTimeOut);

    },
    warning: (tittle = "", message = "", SetTimeOut = 3000) => {
        NotificationManager.warning(tittle, message, SetTimeOut);

    },
    info: (tittle = "", message = "", SetTimeOut = 3000) => {
        NotificationManager.info(tittle, message, SetTimeOut);

    },

}
export default CreateNotification
