/**
 * Copyright ou © ou Copr. Ministère de l'Europe et des Affaires étrangères (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * Ce logiciel est un programme informatique servant à faciliter la création
 * d'applications Web conformément aux référentiels généraux français : RGI, RGS et RGAA
 * <p/>
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l'INRIA
 * sur le site "http://www.cecill.info".
 * <p/>
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 * <p/>
 * A cet égard  l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement,  à l'utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l'adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l'utiliser et l'exploiter dans les mêmes conditions de sécurité.
 * <p/>
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL, et que vous en avez accepté les
 * termes.
 * <p/>
 * <p/>
 * Copyright or © or Copr. Ministry for Europe and Foreign Affairs (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * This software is a computer program whose purpose is to facilitate creation of
 * web application in accordance with french general repositories : RGI, RGS and RGAA.
 * <p/>
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software.  You can  use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 * <p/>
 * As a counterpart to the access to the source code and  rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty  and the software's author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 * <p/>
 * In this respect, the user's attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and,  more generally, to use and operate it in the
 * same conditions as regards security.
 * <p/>
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 *
 */

/**
 * hornet-js-react-components - Ensemble des composants web React de base de hornet-js
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.4.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";

import * as ReactDom from "react-dom";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "src/widget/component/hornet-component";
import { MessageItem } from "src/widget/notification/notification-message-item";
import {
    ADD_NOTIFICATION_EVENT,
    CLEAN_ALL_NOTIFICATION_EVENT,
    CLEAN_NOTIFICATION_EVENT,
} from "hornet-js-core/src/notification/notification-events";
import { BaseError } from "hornet-js-utils/src/exception/base-error";
import { Accordion } from "src/widget/accordion/accordion";
import { ScrollingUtils } from "hornet-js-components/src/utils/scrolling-utils";
import { SvgSprites } from '../icon/svg-sprites';
import { AlertItem } from './notification-alerts';

import "src/widget/notification/sass/_notification.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.notification.notification");

/**
 * Propriétés du composant Notification
 */
export interface NotificationProps extends HornetComponentProps {
    errorsTitle?: string;
    infosTitle?: string;
    personnalsTitle?: string;
    warningsTitle?: string;
    infos?: any;
    errors?: any;
    warnings?: any;
    exceptions?: Array<BaseError>;
    id: string;
    personnals?: any;
    color?: string;
    logo?: string;
}

export interface NotificationContentState {
    infos?: any;
    warnings?: any;
    errors?: any;
    exceptions?: Array<BaseError>;
    personnals?: any;
    color?: string;
    logo?: string;

}

/**
 * Propriétés du contenu d'une notification
 */
export interface NotificationContentProps extends HornetComponentProps {
    errorsTitle?: string;
    warningsTitle?: string;
    personnalsTitle?: string;
    infosTitle?: string;
    infos?: any;
    warnings?: any;
    errors?: any;
    personnals?: any;
    color?: string;
    logo?: string;
    exceptions?: Array<BaseError>;
    idComponent?: string;
}


/**
 * Type d'erreur 
 */
export enum notificationType {

    ERROR = "error",
    WARNING = "warning",
    PERSONNALS = "personnal",
    INFOS = "info",
    EXCEPTION = "exception",
}

/**
 * Composant Notification
 */
export class Notification extends HornetComponent<NotificationProps, any> {

    static started = false;
    static INSTANCES = {};
    static ORDER = [];

    static defaultProps = {
        color: "black",
    };

    constructor(props?: NotificationProps, context?: any) {
        super(props, context);

        if (!Notification.started) {
            this.listen(ADD_NOTIFICATION_EVENT, (ev) => {
                const state: NotificationContentState = {};
                if (ev.detail.errors) state.errors = ev.detail.errors.getNotifications();
                if (ev.detail.infos) state.infos = ev.detail.infos.getNotifications();
                if (ev.detail.exceptions) state.exceptions = ev.detail.exceptions;
                if (ev.detail.warnings) state.warnings = ev.detail.warnings.getNotifications();
                if (ev.detail.personnals) {
                    state.personnals = ev.detail.personnals.getNotifications();
                    state.color = ev.detail.personnals.color;
                    state.logo = ev.detail.personnals.logo;
                }

                if (!ev.detail.id || !(ev.detail.id in Notification.INSTANCES)) {
                    ev.detail.id = Notification.ORDER[Notification.ORDER.length - 1];
                }
                Notification.INSTANCES[ ev.detail.id ].setState(state, ev.detail.cb);
            });

            this.listen(CLEAN_NOTIFICATION_EVENT, (ev) => {
                if (!ev.detail.id) {
                    ev.detail.id = Notification.ORDER[Notification.ORDER.length - 1];
                }
                else if (Notification.INSTANCES[ev.detail.id]) {
                    Notification.INSTANCES[ev.detail.id].setState({
                        infos: null,
                        errors: null,
                        exceptions: null,
                        warnings: null,
                        personnals: null,
                    });
                }
                else if (ev.detail.id) {
                    let idComponent = Notification.ORDER[Notification.ORDER.length - 1];
                    if (ev.detail.idComponent) {
                        idComponent = ev.detail.idComponent;
                    }
                    const messages = [];
                    const currentNotification = Notification.INSTANCES[idComponent];

                    if (currentNotification && currentNotification.state) {
                        currentNotification.state.infos.map((message) => {
                            if (message.id === ev.detail.id) {
                                currentNotification.deleteInfo(message);
                            }
                        });
                    }
                }
            });

            this.listen(CLEAN_ALL_NOTIFICATION_EVENT, (ev) => {
                for (const id in Notification.INSTANCES) {
                    this.fire(CLEAN_NOTIFICATION_EVENT.withData({ id, idComponent: undefined }));
                }
            });
            Notification.started = true;
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.debug("Notification render : ", this.state.id);

        return (
            <div id={this.state.id}>
                <NotificationContent
                    errorsTitle={this.state.errorsTitle}
                    errors={this.state.errors}
                    warningsTitle={this.state.warningsTitle}
                    warnings={this.state.warnings}
                    personnalsTitle={this.state.personnalsTitle}
                    personnals={this.state.personnals}
                    infosTitle={this.state.infosTitle}
                    infos={this.state.infos}
                    exceptions={this.state.exceptions}
                    color={this.state.color}
                    logo={this.state.logo}
                    ref={(component) => {
                        if (component === null) {
                            delete Notification.INSTANCES[this.state.id];
                            const idx = Notification.ORDER.indexOf(this.state.id);
                            Notification.ORDER.splice(idx, 1);
                        } else {
                            if (this.state.id in Notification.INSTANCES) {
                                const idx = Notification.ORDER.indexOf(this.state.id);
                                Notification.ORDER.splice(idx, 1);
                            }
                            Notification.ORDER.push(this.state.id);
                            Notification.INSTANCES[this.state.id] = component;
                        }
                    }}
                    idComponent={this.props.id}
                />
            </ div>);
    }

    /**
     * Permet de setter les notifications de type INFO
     * @param infos 
     */
    setInfos(infos) {
        this.fire(ADD_NOTIFICATION_EVENT.withData({ id: this.state.id, infos }));
    }

    /**
     * Permet de setter les notifications de type WARNING
     * @param warnings 
     */
    setWarnings(warnings) {
        this.fire(ADD_NOTIFICATION_EVENT.withData({ id: this.state.id, warnings }));
    }

    /**
     * Permet de setter les notifications de type ERROR
     * @param errors 
     */
    setErrors(errors) {
        this.fire(ADD_NOTIFICATION_EVENT.withData({ id: this.state.id, errors }));
    }

    /**
     * Permet de setter les notifications de type EXCEPTION
     * @param exceptions 
     */
    setExceptions(exceptions) {
        this.fire(ADD_NOTIFICATION_EVENT.withData({ id: this.state.id, exceptions }));
    }
}

/**
 * Composant Contenu de Notification
 */
export class NotificationContent extends HornetComponent<NotificationContentProps, any> {

    static firstRender = true;

    width;
    notif;
    listError: any = {};
    btnError: HTMLButtonElement;
    btnInfo: HTMLButtonElement;
    alertInfo: any;

    constructor(props?: NotificationProps, context?: any) {
        super(props, context);
        this.state = {
            ...this.state,
            isShowed: true
        }
    }


    componentDidMount() {
        super.componentDidMount();
        NotificationContent.firstRender = false;
        this.scrollToNotifications();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        super.componentDidUpdate(prevProps, prevState, prevContext);
        if (prevState !== this.state) {
            this.scrollToNotifications();
        }
        /** Si il y a des notifications de type erreurs, on place le focus sur 1 er champ */
        if (this.state.errors !== prevState.errors) {
            if (this.state.errors && Array.isArray(this.state.errors) && this.state.errors.length > 0) {
                const element = document.getElementsByName(
                    this.state.errors[0].field) ?
                    document.getElementsByName(this.state.errors[0].field)[0] :
                    document.getElementById(this.state.errors[0].field);
                if (element && element.focus) {
                    Accordion.handleFocusOnAccordion(element);
                    element.focus();
                } else {
                    setTimeout(() => {
                        document.getElementById(this.props.idComponent).scrollIntoView();
                        window.scroll(window.scrollX, window.scrollY - 59);
                    }, 250);
                }
            }
        }
    }

    /**
     * Fait défiler la page courante de façon à afficher le bloc de notifications
     */
    scrollToNotifications() {
        if (this.state.errors || this.state.exceptions) {
            const element = ReactDom.findDOMNode(this) as any;
            if (element) {
                ScrollingUtils.smoothScrollToElementWithStickyHeader(element);
            } else {
                logger.warn("Impossible de scroller sur les notifications.");
            }
        }
    }

    /**
     * supprime un message d'information
     * @param info
     */
    protected deleteInfo(info) {
        const index = this.state.infos.indexOf(info);
        if (index >= 0) {
            this.state.infos.splice(index, 1);
            this.forceUpdate();
        }
    }

    /**
     *
     * @param exception
     */
    protected exceptionStackDev(exception: BaseError) {
        let stack;
        if (process.env.NODE_ENV !== "production") {
            const stackToPrint = (exception.err_cause && exception.err_cause.message + "\n" + exception.err_cause.stack) || exception.stack;
            if (stackToPrint) {
                stack = (
                    <div className="stack-dev">
                        <div className="stack-dev-title">{"Development Stacktrace : "}</div>
                        {stackToPrint.split("\n").map(stackLine => {
                            return <div className="stack-dev-line">{stackLine}</div>;
                        })}
                    </div>
                );
            }
        }
        return stack;
    }

    /**
    * Rendu d'un message
    * @returns {any}
    */
    renderMessage(errors: [], notifType) {
        const idMessages = [];

        const generateMessage = (exception: BaseError, index) => {
            let text = "";
            let stack;
            try {
                text = exception.message != null && exception.message !== "" ?
                    exception.message : this.i18n("error.message." + exception.code, exception.args);
                stack = this.exceptionStackDev(exception);
            } catch (e) {
                logger.error("Impossible de récupérer l'exception d'origine", e, "Exception d'origine : ", exception);
                text = e.message;
            }
            const messageItemKey = (exception.code) ? exception.code : "message-item-" + index;
            return <MessageItem key={messageItemKey} text={text} className="error-message-text">{stack}</MessageItem>;
        };

        const messages = errors.map((message: any) => {
            if (notifType === notificationType.EXCEPTION) {
                if (Array.isArray(message.message)) {
                    return message.message.map(generateMessage);
                } else {
                    return generateMessage(message, 0);
                }
            } else {
                idMessages.push(message.id);
                return <MessageItem key={message.id} anchor={message.anchor} {...message}
                    className={notifType + "-message-text"} />;
            }
        });

        let button;
        const ariaControls = this.inferAriaControls(notifType);
        if (notifType !== notificationType.INFOS) {
            button = <button type="button" className="error-button-open" ref={(btnError) => (this.btnError = btnError)}
                onClick={this.handleClickShowError.bind(this)} aria-controls={ariaControls}
                title={this.i18n("notification.hideShowTitle")} aria-expanded={true} >
                    <SvgSprites icon={"top"} tabIndex={ -1 }/>
                    <SvgSprites icon={"bottom"} tabIndex={ -1 }/>
                </button>;
        } else {
            button = <button type="button" className="info-button" ref={(btnInfo) => (this.btnInfo = btnInfo)}
                onClick={this.handleClickRemove.bind(this, idMessages)} title={this.i18n("notification.deleteTitle")} >
                <SvgSprites icon={"close"} tabIndex={ -1 }/></button>;
        }

        const customContainertStyle = (notifType === notificationType.PERSONNALS) ? { border: "0.063em solid " + this.state.color } : {};
        const customContentStyle = (notifType === notificationType.PERSONNALS) ? {
            color: this.state.color,
            backgroundImage: "url('" + this.state.logo + "')",
        } : {};
        const ulStyle = (notifType === notificationType.PERSONNALS) ? { color: this.state.color } : {};
        let icoColor = 'red';
        
        notifType = (notifType === notificationType.EXCEPTION) ? "error" : notifType;

        const displayAlert = errors.map((display: any) => display ? display.isAlert : null);

        if(notifType === 'info' && displayAlert && displayAlert.indexOf(true) != -1) {
            return <AlertItem
                        action={() => this.handleClickRemove(messages.map(message => message.key))}
                        message={messages}
                        showed={this.state.isShowed}
                        button={button}
                        ref={(alertInfo) => (this.alertInfo = alertInfo)} />;
        } else {
            return (
                <section>
                    <div className={"messageBox " + notifType + "Box " + notifType + "-message"} style={customContainertStyle}>
                        <div ref={(elt) => {
                            this.notif = elt;
                        }}>
                            {button}
                            <h1 className={"title" + notifType + " " + notifType + "-message-title"}
                                style={customContentStyle}>
                                <span>
                                    <SvgSprites
                                        icon={notifType}
                                        color={notifType === 'warning' ? icoColor = 'orange' : notifType === 'info' ? icoColor = 'green' : icoColor }
                                        height="1.5em"
                                        width="1.5em" tabIndex={-1}/>
                                </span>
                                {this._getTitle()}
                            </h1>
                            <ul style={ulStyle} className={notifType + "-message-list"} role="alert"
                                id={ariaControls} ref={(listError) => {
                                    if (listError && !this.listError[this.props.idComponent + notifType]) {
                                        this.listError[this.props.idComponent + notifType] = listError;
                                        this.width = listError.clientWidth;
                                    }
                                }} >
                                {messages}
                            </ul>
                        </div>
                    </div >
                </section >
            )
        }
        
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        const { exceptions, errors, warnings, infos, personnals } = this.state;
        return (
            <span>
                {(exceptions && exceptions.length > 0) ? this.renderMessage(exceptions, notificationType.EXCEPTION) : null}
                {(errors && errors.length > 0) ? this.renderMessage(errors, notificationType.ERROR) : null}
                {(warnings && warnings.length > 0) ? this.renderMessage(warnings, notificationType.WARNING) : null}
                {(infos && infos.length > 0) ? this.renderMessage(infos, notificationType.INFOS) : null}
                {(personnals && personnals.length > 0) ? this.renderMessage(personnals, notificationType.PERSONNALS) : null}
            </span>
        );
    }

    /**
     * Affiche le titre de la notification
     */
    protected _getTitle() {

        if (this.state.infos) { return this.state.infosTitle || this.i18n("notification.infosTitle"); }
        if (this.state.warnings) { return this.state.warningsTitle || this.i18n("notification.warningsTitle"); }
        if (this.state.personnals) { return (this.state.personnalsTitle) || this.i18n("notification.personnalsTitle"); }
        if (this.state.errors || this.state.exceptions) { return this.state.errorsTitle || this.i18n("notification.errorsTitle"); }
    }

    /**
     * Affiche/Masque les erreurs dans la zone de notification
     *
     */
    handleClickShowError(e) {

        // change l'orientation de la fleche
        if (this.btnError && this.btnError.classList.contains("error-button-open")) {
            this.btnError.classList.add("error-button-close");
            this.btnError.classList.remove("error-button-open");
            this.btnError.setAttribute("aria-expanded", "false");
        } else {
            this.btnError.classList.add("error-button-open");
            this.btnError.classList.remove("error-button-close");
            this.btnError.setAttribute("aria-expanded", "true");
        }

        // affiche ou masque la liste
        if (this.listError) {

            const errorList = this.listError[this.props.idComponent + notificationType.ERROR]
                || this.listError[this.props.idComponent + notificationType.PERSONNALS]
                || this.listError[this.props.idComponent + notificationType.WARNING];

            if (errorList && errorList.classList && errorList.classList.contains("close")) {
                errorList.classList.remove("close");
            } else {
                errorList.classList.add("close");
            }

        }
        this.notif.style.width = (this.width) / 16 + "em";
    }

    /**
     * Suppression de la notification success(info)
     * @param items
     */
    handleClickRemove(items) {
        this.setState({ isShowed: false });
        setTimeout(() => {
            items.map((id) => {
                this.fire(CLEAN_NOTIFICATION_EVENT.withData({ id, idComponent: this.props.idComponent }));
            })
            this.setState({ isShowed: true });
        }, 200)
    }

    /**
     * Déduit la valeur de l'attribut aria-controls du button
     * @param {string} - notifType : le type de notification
     * @returns {string} - la valeur de l'attribut
     */
    inferAriaControls(notifType: string): string {
        // Les notifications de type EXCEPTION sont considérées comme des erreurs
        const realNotifType = notifType === notificationType.EXCEPTION ? "error" : notifType;
        return `${realNotifType}-message-list`;
    }
}
