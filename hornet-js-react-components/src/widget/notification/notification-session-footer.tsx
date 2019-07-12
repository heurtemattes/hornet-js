import * as React from "react";
import { Logger } from "hornet-js-logger/src/logger";
import { Utils } from "hornet-js-utils";
import { HornetComponent } from "src/widget/component/hornet-component";
import {
    SESSION_REFRESHED_NOTIFICATION_EVENT,
    SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT,
    SESSION_WILL_EXPIRE_NOTIFICATION_EVENT,
    SessionEvent
} from "hornet-js-core/src/services/hornet-superagent";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetEvent } from "hornet-js-core/src/event/hornet-event";
import { WakeUpNode } from "hornet-js-core/src/services/default/wakeup-node";
import classNames from "classnames";
import * as moment from "moment-timezone";
import { SvgSprites } from '../icon/svg-sprites';

import "src/widget/notification/sass/_notification.scss";

(moment.duration as any).fn.format = function () {
    let str = "";
    if (this.days() > 1) str = str + Math.floor(this.days()) + "d ";
    if (this.hours() > 1) str = str + Math.floor(this.hours()) + "h ";
    if (this.minutes() > 1) str = str + Math.floor(this.minutes()) + "m ";
    if (this.seconds() > 1) str = str + Math.floor(this.seconds()) + "s ";
    return str
};

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.notification.notification-session-footer");

/**
 * Déclaration des prpriétés du CountDown
 */
export interface NotificationSessionFooterProps extends HornetComponentProps {
    messages?: any
    displayDuration?: number,
    handlClickWakeUp?: any
}

export class NotificationSessionFooter extends HornetComponent<NotificationSessionFooterProps, any> {

    /**
     * Service middleware pour le layout
     */
    protected wakeUpNodeService: WakeUpNode = new WakeUpNode();

    static defaultProps = ({
        offset: 0,
        header: "header-container",
        footer: "footer-container",
        messages: "notificationSession",
        displayDuration: 5000
    });

    constructor(props?: any, context?: any) {
        super(props, context);

        this.state = {
            ...this.state,
            offset: 0
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.listen(SESSION_REFRESHED_NOTIFICATION_EVENT, this.handleRefresh);
        this.listen(SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT, this.handleWillExpireStart);
        this.listen(SESSION_WILL_EXPIRE_NOTIFICATION_EVENT, this.handleWillExpire);

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        this.remove(SESSION_REFRESHED_NOTIFICATION_EVENT, this.handleRefresh);
        this.remove(SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT, this.handleWillExpireStart);
        this.remove(SESSION_WILL_EXPIRE_NOTIFICATION_EVENT, this.handleWillExpire);
    }

    render(): JSX.Element {
        logger.debug("NotificationSessionFooter render");
        return (
            this.state.isVisible ? this.renderNotification() : <div />
        );
    }

    /**
     * Méthode permettant de faire le rendu du bloc de notification
     * @returns {JSX.Element}
     */
    renderNotification(): JSX.Element {

        let style = {};
        /*si le footer est visible, le composant s'affichera au dessus de celui-ci*/
        if (this.state.offset < 0) {
            style = { bottom: 0 };
        }

        let divProps: any = {
            className: "notification-timeout flex-container",
            style: style,
            name: this.state.name,
            title: this.state.title,
            id: "notification-session"
        };

        let labelClasses = {
            "fl": true,
            "notification-session-message": true,
            "notification-expanded": !this.state.reduced,
            "notification-reduced": this.state.reduced
        };

        let imgSrc: any = <SvgSprites icon="next" color="#2E586E" height="3em" width="2em" />;
        if (this.state.reduced) {
            imgSrc = <SvgSprites icon="previous" color="#0579BE" height="3em" width="2em" />;
        }

        let tabIndex: number = this.state.reduced ? -1 : 0;

        return (
            <div {...divProps}>
                <div className={classNames(labelClasses)}>
                    <div>{this.formateMessage()}</div>
                    <div>
                        <a onClick={this.handlClickWakeUp} tabIndex={tabIndex}>
                            {this.i18n(this.props.messages).reconnexion}
                        </a>
                    </div>
                </div>
                <div className={"fl"}>
                    <a href={""} onClick={this.handleToggleNotification} tabIndex={0} className="notifWrap">
                        {imgSrc}
                    </a>
                </div>
            </div>
        );
    }

    handlClickWakeUp(): void {
        if (this.props.handlClickWakeUp) {
            this.props.handlClickWakeUp()
        } else {
            this.wakeUpNodeService.wakeUp().then(() => {
                this.handleRefresh();
            })
        }
    }

    /**
     * Méthode permettant de formater le message à afficher dans le bloc de notification
     * @returns {string}
     */
    formateMessage(): string {

        let message: any = this.i18n(this.props.messages).countDownExpiredMesage;
        let duration = this.formateTime();

        if (duration > 1) {
            let time = (moment.duration(duration, "milliseconds") as any).format("H:mm:ss");
            message = this.i18n(this.props.messages).countDownNormalMessage + time
        }
        return message
    }

    /**
     * Méthode permettant de formater le state expireIn au format Date
     * @returns {number}
     */
    formateTime() {
        return new Date(this.state.expireIn).getTime()
    }

    /**
     * Méthode permettant de réduire la notification
     */
    handleToggleNotification() {
        this.setState({ reduced: !this.state.reduced });
    }

    /**
     * Méthode permettant de rafraichir la notification
     * @param {HornetEvent<SessionEvent>} ev
     */
    handleRefresh(ev?: HornetEvent<SessionEvent>) {

        let elementsToUpdate = {
            isVisible: false,
            reduced: false
        };
        if (ev && ev.detail && ev.detail.value) {
            elementsToUpdate[ "expireIn" ] = ev.detail.value;
        }

        this.setState(elementsToUpdate);
    }

    /**
     * Méthode permettant de rafraichir la notification
     * @param {HornetEvent<SessionEvent>} ev
     */
    handleWillExpireStart(ev: HornetEvent<SessionEvent>) {
        this.setState({ isVisible: true, expireIn: ev.detail.value });
    }

    /**
     * Méthode permettant d'avertir d'une fin de session
     * @param {HornetEvent<SessionEvent>} ev
     */
    handleWillExpire(ev: HornetEvent<SessionEvent>) {
        this.setState({ expireIn: ev.detail.value }, () => {
            setTimeout(this.handleToggleNotification, this.props.displayDuration);
        });
    }

    /**
     * Métohde de gestion du scroll à l'écran
     */
    protected handleScroll() {

        let footer = document.getElementById(this.state.footer);

        let rect = footer.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        //sauvegarde la taille visible du footer
        let height = -(rect.top - viewHeight);
        this.setState({ size: height });

        /*si le footer est visible, le composant s'affichera au dessus de celui-ci*/
        let visible: boolean = false;
        if (footer) {
            visible = this.checkvisible(footer);
        }

        this.setState({
            offset: height,
            visible: visible
        });
    }


    /**
     * Calcule si un élément est présent ou non a l'écran
     * @param {Element} elm - l'élément a rechercher
     * @return {boolean} true si l'élément est présent
     */
    protected checkvisible(elm) {
        let rect = elm.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        //sauvegarde la la taille visible de l'élément
        let height = -(rect.top - viewHeight) + 40;
        this.setState({ size: height });

        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}