import * as React from "react";
import { Logger } from "hornet-js-utils/src/logger";
import { Utils } from "hornet-js-utils";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
import { SESSION_REFRESHED_NOTIFICATION_EVENT, SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT, SESSION_WILL_EXPIRE_NOTIFICATION_EVENT, SessionEvent } from "hornet-js-core/src/services/hornet-superagent";
import { HornetComponentProps, HornetComponentState } from "hornet-js-components/src/component/ihornet-component";
import { HornetEvent } from "hornet-js-core/src/event/hornet-event";
const logger: Logger = Utils.getLogger("hornet-js-react-components.widget.notification.notification-session");
const notifyDesktop = (message: string) => {
    logger.debug("notifyBesktop");
    // le navigateur supporte les notifications
    if (!("Notification" in window)) {
        logger.warn("This browser does not support desktop notification");
        return;
    }
    // La permission a déjà été donnée
    if ((Notification as any).permission === "granted") {
        return new Notification(message);
    }
    // Besoin de demander la permission
    if ((Notification as any).permission !== "denied") {
        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                return new Notification(message);
            }
        });
    }
};

export class SessionExpireNotification extends HornetComponent<HornetComponentProps, any> {

    constructor(props?: any, context?: any) {
        super(props, context);
        this.listen(SESSION_REFRESHED_NOTIFICATION_EVENT, this.handleRefresh);
        this.listen(SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT, this.handleWillExpireStart);
        this.listen(SESSION_WILL_EXPIRE_NOTIFICATION_EVENT, this.handleWillExpire);
    }

    handleRefresh(ev: HornetEvent<SessionEvent>) {
    }
    handleWillExpireStart(ev: HornetEvent<SessionEvent>) {
    }
    handleWillExpire(ev: HornetEvent<SessionEvent>) {
        const expireIn = ev.detail.value / 1000;
        notifyDesktop("Votre session expire dans " + expireIn + " seconde(s).");
    }
    render(): JSX.Element {
        logger.debug("SessionExpireNotification render");
        return null;
    }
}
