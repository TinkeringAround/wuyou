import React, {FC, Fragment} from 'react'

// Hooks
import {useBreakpoint} from "../../hooks/useBreakpoint"

// Assets
import * as notification from '../../assets/notification.json'

// Custom Components
import NotificationDesktop from "./desktop"
import NotificationMobile from "./mobile";

// ===============================================
const Notifications: FC = () => {
    const {isMobile} = useBreakpoint();

    return (
        <Fragment>
            {isMobile && <NotificationMobile notification={notification.latest}/>}
            {!isMobile && <NotificationDesktop notification={notification.latest}/>}
        </Fragment>
    );
}

export default Notifications;
