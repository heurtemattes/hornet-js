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
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import * as React from "react";
import * as classNames from "classnames";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
import { fireHornetEvent, HornetEvent } from "hornet-js-core/src/event/hornet-event";
import { ADD_NOTIFICATION_EVENT,
        CLEAN_NOTIFICATION_EVENT,
        CLEAN_ALL_NOTIFICATION_EVENT } from "hornet-js-core/src/notification/notification-events";
import { AccordionHeader } from "src/widget/accordion/accordion-header";
import { AccordionInfo } from "hornet-js-react-components/src/widget/accordion/accordion-info";
import KeyboardEvent = __React.KeyboardEvent;
const logger = Utils.getLogger("hornet-js-react-components.widget.accordion.accordion");

export const TAB_ID_NAME = "tab";
export const FOCUS_ON_ACCORDION = new HornetEvent<string>("FOCUS_ON_ACCORDION");

/**
 * Propriétés de l'accordion
 */
export interface AccordionProps extends HornetComponentProps {
    id?: string;
    key?: string;
    title?: string;
    isOpen?: boolean;
    panelIndex?: number;
    handleClickAccordion?: Function;
    handleFocusAccordion?: Function;
    tabIndex?: string;
    infoAccordion?: string;
}

/**
 * Composant Accordion
 */
export class Accordion extends HornetComponent<AccordionProps, any> {

    protected errors: number = 0;

    constructor(props?: AccordionProps, context?: any) {
        super(props, context);
        this.state = {
            ...this.state, id: this.props.id + this.props.panelIndex,
            };

    }

    componentDidMount() {
        super.componentDidMount();
        this.trackInputFieldFromChildren(document.getElementById(this.getAccordionLiId()));
        this.listen(FOCUS_ON_ACCORDION, this.focusInputAccordion);

        this.listen(ADD_NOTIFICATION_EVENT, this.accordionHasError);
        this.listen(CLEAN_NOTIFICATION_EVENT, this.accordionHasError);
        this.listen(CLEAN_ALL_NOTIFICATION_EVENT, this.accordionHasError);
    }

    focusInputAccordion(ev: HornetEvent<string>) {

            if (ev.detail === this.getAccordionPanelId()) {
                const element = document.getElementById(ev.detail);
                element.className = element.className.replace("hidden", "visible");
            }

    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        super.componentWillUnmount();
        this.remove(ADD_NOTIFICATION_EVENT, this.accordionHasError);
        this.remove(CLEAN_NOTIFICATION_EVENT, this.accordionHasError);
        this.remove(CLEAN_ALL_NOTIFICATION_EVENT, this.accordionHasError);
        this.remove(FOCUS_ON_ACCORDION, this.focusInputAccordion);
    }

    protected getAccordionPanelId(): string {
        return this.state.id + "-" + "panel";
    }

    protected getAccordionLiId(): string {
        return this.state.id + "-" + "li";
    }

    protected trackInputFieldFromChildren(node) {
        if (node) {
            if (Array.isArray(node)) {
                node.forEach(element => {
                    this.trackInputFieldFromChildren(element);
                });
            } else {
                if (node.localName === "input" || node.localName === "textarea" && !node.hidden) {
                    node.setAttribute("accordion", this.getAccordionPanelId());
                    node.setAttribute("accordionIndex", this.state.panelIndex);
                } else if (node.children) {
                    this.trackInputFieldFromChildren(node.children);
                } else if (node instanceof HTMLCollection) {
                    for (let i = 0; i < node.length; i++) {
                        this.trackInputFieldFromChildren(node[ i ]);
                    }
                }
            }
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {

        logger.debug("Accordion render : ", this.state.id);

        const classNameLi = classNames({
            "accordion-header": true,
            "accordion-selected": this.state.isOpen,
        });

        const handClick = () => {
            this.state.handleClickAccordion(this.state.panelIndex);
        };

        const handleFocus = (e) => {
            this.state.handleFocusAccordion(this.state.panelIndex, e, e.target);
        };

        const classNameDivContent = classNames({
            "accordion-content": true,
            visible: this.state.isOpen,
            hidden: !this.state.isOpen,
        });

        const classAccordionPicto = classNames({
            "accordion-arrow-close": !this.state.isOpen,
            "accordion-arrow-open": this.state.isOpen,
            fr: true,
        });

        const classAccordionErrors = classNames({
            "accordion-errors-close": !this.state.isOpen,
            "accordion-errors-open": this.state.isOpen,
            fr: true,
        });

        const classNameAccordion = classNames({
            "accordion-label": true,
            "accordion-label-open": this.state.isOpen,
        });

        let errorMessage = "";
        if (this.state.errors > 0) {
            errorMessage = this.state.errors + " ";
            errorMessage += this.state.errors === 1 ? this.i18n("form.accordion.error") : this.i18n("form.accordion.errors");
        }

        let header;
        React.Children.map(this.props.children, (child: React.ReactChild) => {
            if ((child as React.ReactElement<any>).type === AccordionHeader) {
                header = child;
            }
        });

        let info;
        React.Children.map(this.props.children, (child: React.ReactChild) => {
            if ((child as React.ReactElement<any>).type === AccordionInfo) {
                info = child;
            }
        });

        return (
            <li className={classNameLi}
                onKeyDown={this.handleKeyDownButton}
                onFocus={handleFocus}
                role="heading"
                id={this.getAccordionLiId()}>
                <a href="#" className={classNameAccordion}
                    onClick={handClick}
                    id={this.state.id + "-" + TAB_ID_NAME}
                    aria-expanded={this.state.isOpen}
                    role="button"
                    aria-level={3}
                    tabIndex={this.state.tabIndex}
                    aria-controls={this.getAccordionPanelId()}>{header ? header : this.props.title}
                    <div id={this.state.id + "-" + "arrow-content"}
                        className={"arrow-content " + classAccordionPicto}>{info ? info : this.props.infoAccordion}</div>
                    <div id={this.state.id + "-" + "errors-content"}
                        className={"errors-content " + classAccordionErrors}>{errorMessage}</div>
                </a>

                <div className={classNameDivContent}
                    id={this.getAccordionPanelId()}
                    role="region"
                    aria-labelledby={this.state.id + "-" + TAB_ID_NAME}>
                    {React.Children.map(this.state.children,
                                        (child: React.ReactElement<any>) => {
                            if (((child as React.ReactElement<any>).type !== AccordionHeader) &&
                                ((child as React.ReactElement<any>).type !== AccordionInfo)) {
                                return React.cloneElement(child);
                            }
                        })
                    }
                </div>
            </li>
        );
    }

    /**
     * Gestion aux clavier
     * @param e
     */
    handleKeyDownButton(e: KeyboardEvent<HTMLElement>): void {

        /* On ne prend en compte que les évènements clavier sans modificateur, pour ne pas surcharger
         * des raccourcis standards tels Alt+ArrowLeft */

        const keyCode: number = e.keyCode;
        let preventDefault: boolean = true;
        const maxAccordion = ((this.props as any).totalAccordion - 1);

        if (e.ctrlKey) {
            this.handleKeyDownPanel(e, preventDefault);
        } else {
            /** Si c'est différent d */
            if ((e.target as any).className !== "accordion-label accordion-label-open"
            && (e.target as any).className !== "accordion-label") {
                e.stopPropagation();
                preventDefault = false;
            } else {
                switch (keyCode) {
                    case KeyCodes.LEFT_ARROW:
                    case KeyCodes.UP_ARROW:
                        logger.trace("Focus sur header precedent");
                        if (this.state.panelIndex > 0) {
                            this.Panelfocus(this.state.panelIndex - 1);
                        } else {
                            this.Panelfocus(maxAccordion);
                        }
                        break;
                    case KeyCodes.RIGHT_ARROW:
                    case KeyCodes.DOWN_ARROW:
                        logger.trace("Focus sur header suivant");

                        if (this.state.panelIndex >= 0 && this.state.panelIndex < maxAccordion) {
                            this.Panelfocus(this.state.panelIndex + 1);
                        } else {
                            this.Panelfocus(0);
                        }
                        break;
                    case KeyCodes.HOME:
                        logger.trace("Focus sur le premier header de l'accordion");
                        this.Panelfocus(0);
                        break;
                    case KeyCodes.END:
                        logger.trace("focus sur le dernier header de l'accordion");
                        this.Panelfocus(maxAccordion);
                        break;
                    case KeyCodes.ENTER:
                    case KeyCodes.SPACEBAR:
                        logger.trace("Ouverture  de l'accordion");
                        this.setState({ isOpen: !this.state.isOpen });
                        break;

                    default:
                        preventDefault = false;
                }
            }
            /* On supprime le comportement par défaut pour les touches utilisées pour la navigation :
             pour éviter par exemple de faire défiler les ascenseurs */
            if (preventDefault) {
                e.preventDefault();
            }
        }
    }

    /**
     * gestion du clavier lors de la touche CTRL ou SHIFT
     * @param e
     * @param preventDefault
     */
    handleKeyDownPanel(e, preventDefault) {
        logger.trace("navigation avec la touche ctrl");

        if (e.ctrlKey) {
            switch (e.keyCode) {
                case KeyCodes.UP_ARROW:
                case KeyCodes.LEFT_ARROW:
                    logger.trace(" accordion ctrl + UP ou  ctrl + LEFT");
                    this.Panelfocus(this.state.panelIndex);
                    break;

                case KeyCodes.DOWN_ARROW:
                case KeyCodes.RIGHT_ARROW:
                    logger.trace(" accordion ctrl + UP ou  ctrl + LEFT");
                    this.Panelfocus(this.state.panelIndex + 1);
                    break;

                /* Ne fonctionne pas sous chrome */
                case KeyCodes.PAGE_UP:
                    logger.trace(" accordion ctrl + PAGE_UP");
                    break;

                case KeyCodes.PAGE_DOWN:
                    logger.trace(" accordion ctrl + PAGE_DOWN");
                    break;
                default:
                    preventDefault = false;
            }
        }

        if (preventDefault) {
            e.preventDefault();
        }
    }

    /**
     * Place le focus sur l'accordeon dont l'index est passer en parametre
     * si l'index n'existe pas, le focus est placer sur l'accordeon 0
     * @param index
     */
    Panelfocus(index) {
        const element = document.getElementById(this.props.id + index + "-" + TAB_ID_NAME);
        if (element && element.focus) {
            element.focus();
        } else {
            if (index !== 0) {
                this.Panelfocus(0);
            }
        }
    }

    static handleFocusOnAccordion(element: HTMLElement) {
        const accordionAttribute = element.getAttribute("accordion");
        if (accordionAttribute) {
            fireHornetEvent(FOCUS_ON_ACCORDION.withData(accordionAttribute));
        }
    }

    /**
     * teste si l'accordion a des erreurs
     * @param ev
     */
    protected accordionHasError(ev: HornetEvent<any>) {
        if (ev && ev.detail && this.isLinkedWithFormManager(ev.detail.idComponent)) {
            this.errors = 0;
            if (ev.detail && ev.detail.errors && ev.detail.errors.notifications) {
                ev.detail.errors.notifications.map((error) => {
                    React.Children.map(this.state.children,
                                       (child: React.ReactElement<any>) => {
                            this.errors += this.isErrorInAccordion(child, error);
                        });
                });
            }
            if (this.errors !== this.state.errors) {
                this.setState({ errors: this.errors });
            }
        }
    }

    /**
     * teste si l'erreur se trouve dans l'enfant présent dans l'accordion
     * @param elem enfant de l'accordion
     * @param error erreur recherchée
     * @returns {number}
     */
    protected isErrorInAccordion(elem, error) {
        let errors = 0;
        if (elem && elem.props) {

            // Gestion de champs dans un tableau
            // todo: améliorer la recherche des champs en erreur présents dans un tablea éditable
            const tableIdTmp = error.field.split(".");
            let tableId = "";
            if (Array.isArray(tableIdTmp) && tableIdTmp.length > 0) {
                tableId = tableIdTmp[ 0 ].split("-").splice(0, tableIdTmp[ 0 ].split("-").length - 1).join("-");
            }

            if ((elem.props.id && elem.props.id === error.field && !elem.props.keyColumn) ||
                (elem.props.name && elem.props.name === error.field && !elem.props.keyColumn) ||
                (elem.props.labelKey && elem.props.name && (elem.props.name + "." + elem.props.labelKey) === error.field && !elem.props.keyColumn) ||
                (elem.props.id === tableId)) {
                errors++;
            }
            if (elem.props.children) {
                if (elem.props.children instanceof Array) {
                    elem.props.children.map((child) => {
                        errors += this.isErrorInAccordion(child, error);
                    });
                } else {
                    errors += this.isErrorInAccordion(elem.props.children, error);
                }
            }
        }
        return errors;

    }

    /**
     * Recherche un lien de parenté entre le composant déclenchant la notification
     * et l'accordion
     * @param {string} idComponent
     * @returns {boolean}
     */
    protected isLinkedWithFormManager(idComponent: string): boolean {
        let result: boolean = false;
        if (idComponent) {
            const accordionHtmlElement = document.getElementById(this.getAccordionLiId());
            // parcourir les children de l'accordion pour trouver le form dont l'id est idComponent
            result = this.isHtmlElementFoundThroughChildren(accordionHtmlElement, idComponent);
            // si il n'est pas enfant, on vérifie si il est parent
            if (!result && idComponent) {
                const formHtmlElement = document.getElementById(idComponent);
                // parcourir les children du form pour trouver l'accordion
                result = this.isHtmlElementFoundThroughChildren(formHtmlElement, this.getAccordionLiId());
            }
        }
        return result;
    }

    protected isHtmlElementFoundThroughChildren(element: Element, targetedId: string): boolean {
        let result: boolean = false;
        if (element) {
            result = element.id === targetedId;
            if (!result && element.children) {
                let i: number = 0;
                while (!result && i < element.children.length) {
                    result = this.isHtmlElementFoundThroughChildren(element.children[ i ], targetedId);
                    i++;
                }
            }
        }
        return result;
    }
}
