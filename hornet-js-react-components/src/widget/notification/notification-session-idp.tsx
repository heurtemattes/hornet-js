import * as React from "react";
import { Logger } from "hornet-js-logger/src/logger";
import { Utils } from "hornet-js-utils";
import { HornetComponent } from "src/widget/component/hornet-component";
import { HornetComponentProps, HornetComponentState } from "hornet-js-components/src/component/ihornet-component";
import classNames from "classnames";
import { SvgSprites } from '../icon/svg-sprites';

import "src/widget/notification/sass/_notification.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.notification.notification-message-item");

/**
 * Propriétés de l'accordion
 */
export interface SessionIdpExpireNotificationProps extends HornetComponentProps {
    notificationMessage?: string;
    expireIn?: number;
    expireInDate?: number;
    reduced?: boolean;
}

export class SessionIdpExpireNotification extends HornetComponent<SessionIdpExpireNotificationProps, any> {

    static defaultProps:SessionIdpExpireNotificationProps = {
        notificationMessage: "notificationIdp.expireMessage",
        expireIn: 60000,
        expireInDate: 60000,
        reduced: false
    }

    public readonly props: Readonly<SessionIdpExpireNotificationProps>;
    public timeoutHandler;
    public activeElement:Element;

    constructor(props?: SessionIdpExpireNotificationProps, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        if (!Utils.isServer) {
            this.timeoutHandler = setTimeout(() => {
                this.setState({ isVisible: true});
            }, this.props.expireInDate - (this.props.expireIn));
        }
    }
    
    render(): JSX.Element {
        return (
            <div >
                {this.state.isVisible ? this.renderNotification() : null}
            </div>
        );
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeoutHandler);
    }

    componentDidUpdate() {
        if(this.state.isVisible === false && this.activeElement && (this.activeElement as any).focus) {
            (this.activeElement as any).focus();
        }
    }
   
    /**
     * Méthode permettant de faire le rendu du bloc de notification
     * @returns {JSX.Element}
     */
    renderNotification(): JSX.Element {
        logger.debug("SessionIdpExpireNotification renderNotification");
        this.activeElement = undefined;
        if(window && window.document && window.document.activeElement) {
            this.activeElement = document.activeElement;
        }

        let style = {};
        /*si le footer est visible, le composant s'affichera au dessus de celui-ci*/
        if (this.state.offset < 0) {
            style = { bottom: 0 };
        }

        let divProps: any = {
            className: "notification-idp-timeout flex-container",
            style: style,
            name: this.state.name,
            title: this.state.title,
            id: "notification-idp-session"
        };

        let labelClasses = {
            "fl": true,
            "notification-session-idp-message": true,
            "notification-idp-expanded": !this.state.reduced,
            "notification-idp-reduced": this.state.reduced
        };

        return (
            <div {...divProps}>
                <div className={"fl notification-session-idp-button"} onClick={this.handleToggleNotification}>
                    <a href={""} onClick={this.handleToggleNotification} tabIndex={0}>
                        <SvgSprites icon="close" color="#2E586E" tabIndex={ -1 } />
                    </a>
                </div>
                <div className={classNames(labelClasses)}>
                    <div className="notification-idp-message" role="log" >{this.i18n(this.props.notificationMessage, { expireIn: this.props.expireIn / 1000 })}</div>
                    {this.props.children ? <div className="notification-idp-children" >{this.props.children}</div> : null}
                </div>
            </div>
        );
    }

    /**
     * Méthode permettant de réduire la notification
     */
    handleToggleNotification() {
        this.setState({ isVisible: !this.state.isVisible });
    }

    /**
     * Calcule si un élément est présent ou non a l'écran
     * @param {Element} elm - l'élément a rechercher
     * @return {boolean} true si l'élément est présent
     */
    protected checkvisible(elm) {
        let rect = elm.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        // sauvegarde la la taille visible de l'élément
        const height = -(rect.top - viewHeight) + 40;
        this.setState({ size: height });

        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
}
