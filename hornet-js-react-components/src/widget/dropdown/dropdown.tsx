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
 * @version v5.4.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import * as React from "react";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "src/widget/component/hornet-component";
import { DropdownItem } from "src/widget/dropdown/dropdown-item";
import classNames from "classnames";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { HornetEvent, fireHornetEvent } from "hornet-js-core/src/event/hornet-event";
import { SvgSprites } from "src/widget/icon/svg-sprites";

import "src/widget/dropdown/sass/_dropdown.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.dialog.dropdown");

interface DropdownActivationEventDetail { id: string; }
const DROPDOWN_ACTIVATION_EVENT = new HornetEvent<DropdownActivationEventDetail>("DROPDOWN_ACTIVATION_EVENT");

export enum Position {
    BOTTOMLEFT = 0,
    BOTTOMRIGHT = 1,
    TOPLEFT = 2,
    TOPRIGHT = 3,

}

/**
 * Propriétés Dropdown
 */
export interface DropdownProps extends HornetComponentProps {

    id: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    className?: string;
    label?: string;
    /** className facultatif à appliquer au label */
    labelClassName?: string;
    disabled?: boolean;
    /** Icone svg du composant */
    icon?: string;
    srcImg?: string;
    items?: any;
    valueCurrent?: number;
    // label du lien généré par le dropdown
    ariaLabel?: string;
    /** parametre pour afficher le dropdown qui prendre en valeur un enum Position (ci-dessus) */
    position?: Position;
    /** Option qui affiche ou non la petite fleche pour la box dropdown */
    drawArrow?: boolean;
    /** boolean qui cache ou non le dropdown apres le click sur un item */
    closeClick?: boolean;
    title?: string;
    type?: string;
    // identifiant de l'élément lié répresentant le label du composant
    ariaLabelledById?: string;
}

/**
 * Composant Dropdown
 */
export class Dropdown extends HornetComponent<DropdownProps, any> {

    static defaultProps = {
        disabled: false,
        position: Position.BOTTOMRIGHT,
        drawArrow: true,
        closeClick: true,
    };
    /** bouton du dropdown */
    button: any;
    /** Liste des items du dropdown */
    items = [];
    dropDown: any;
    /** Tableau pour matcher Enum avec className */
    lstPosition = ["position-bottom-left", "position-bottom-right", "position-top-left", "position-top-right"];
    boxStyle: any;
    arrowStyle: any;

    constructor(props, context?: any) {
        super(props, context);
        this.state = {
            ...this.state, isActive: false,
        };

        this.listen(DROPDOWN_ACTIVATION_EVENT, this.handleOtherDropdownActivation);
    }

    /**
     * @inheritDoc
     */
    componentDidUpdate() {
        // when the component is updated
        // make sure you remove the listener on document
        // and the component panel is not expand
        if (typeof document !== undefined && !this.state.isActive) {
            document.removeEventListener("click", this.handleExpandOutside, false);
        }
        // add event listener for clicks on document
        // when state is expand
        else if (typeof document !== undefined && this.state.isActive) {
            document.addEventListener("click", this.handleExpandOutside, false);
        }
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.calculPositionBox();
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        this.remove(DROPDOWN_ACTIVATION_EVENT, () => { });
    }

    /**
     * @inheritDoc
     */
    componentWillUpdate() {
        this.calculPositionBox();
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.debug("Dropdown render :", this.state.id);

        const dropdownClasses = {
            "dropdown-container": true,
        };

        if (this.state.className) {
            dropdownClasses[this.state.className] = true;
        }

        return (
            <div id={this.state.id} title={this.state.title} className={classNames(dropdownClasses)}>
                {(this.props.type === "button") ? this.renderButton() : this.renderLink()}
                {this.renderDropDown()}
            </div>
        );
    }

    /**
     * retourne l'image du dropdown
     */
    getImage() {

        let img = null;
        if (this.props.icon) {
            logger.deprecated("Ne plus utiliser la props icon mais srcImg avec <SvgSprites icon='monicin'>");
            img = <SvgSprites icon={this.props.icon} width="1.5em" tabIndex={ -1 } height="1.5em" ariaLabel={this.props.title} />
        } else {
            if (this.props.srcImg) {
                if (typeof this.props.srcImg === "string") {
                    img = <img
                        src={this.props.srcImg}
                        className={this.props.className+"-img icon"}
                        alt={this.props.title} />;
                } else {
                    img = this.props.srcImg;
                }
            } else {
                this.props.srcImg ? img = this.props.srcImg : img = null;
            }
        }

        return img;
    }

    renderLink() {
        const img = this.getImage();

        const labelClass: string = this.props.labelClassName || "dropdown-label-span";

        const aProps: any = {
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDownDropDown,
            role: "button",
            href: "#",
            tabIndex: 0,
            ref: (button) => {
                this.button = button;
            },
            className: `dropdown-button button-action`,
            disabled: this.state.disabled,
            "aria-expanded": this.state.isActive ? "true" : "false",
            "aria-haspopup": true,
        };

        if (this.props.ariaLabelledById) {
            aProps["aria-labelledby"] = this.props.ariaLabelledById;
        }

        return (
            <a {...aProps}>
                {this.state.label ? null : <span className="dropdown-hidden-label">{this.props.ariaLabel}</span>}
                <span
                    className={"label" + " " + labelClass}>{this.props.label ? this.props.label : this.props.valueCurrent}</span>
                {img}
            </a>
        );
    }

    renderButton() {

        const img = this.getImage();

        const buttonProps: any = {
            onClick: this.handleClick,
            onKeyDown: this.handleKeyDownDropDown,
            role: "button",
            tabIndex: 0,
            ref: (button) => {
                this.button = button;
            },
            className: `button-action`,
            disabled: this.state.disabled,
            "aria-expanded": this.state.isActive ? "true" : "false",
            "aria-haspopup": true,
            "aria-label": this.props.ariaLabel,
            type: "button",
        };

        const labelClass: string = this.props.labelClassName || "dropdown-label-span";
        return (
            <button {...buttonProps}>
                {img}
                {<span className="dropdown-hidden-label">{this.props.title}</span>}
                <span className={"label" + " " + labelClass}>{this.props.label ? this.props.label : this.props.valueCurrent}</span>
            </button>
        );

    }

    /**
     * Rendu type Dropdown
     * @returns {any}
     * @protected
     */
    renderDropDown(): JSX.Element {
        let items;
        const buildItem = (item, index) => {

            const dropdownItemsProps = {
                label: item.label,
                url: item.url,
                className: item.className,
                srcImg: item.srcImg,
                icon: item.icon,
                key: `dropdown-${this.props.id}-${index}`,
                handleKeyDown: this.handleKeyDownDropDownItem,
                getRef: item => this.items.push(item),
                disabled: item.disabled,
                valueCurrent: item.valueCurrent,
                lang: item.lang,
                title: item.title,
                id: item.id,
            };

            if (item.action) {
                dropdownItemsProps["action"] = item.action;
            }

            return <DropdownItem {...dropdownItemsProps} />;
        };

        if (this.state.items && this.state.items.length > 0) {
            items = this.state.items.map((item, index) => buildItem(item, index));
        } else if (this.state.children && this.state.children.length > 0) {

            items = [];
            this.state.children.map((item, index) => {
                items.push(React.cloneElement(item, {
                    key: `li-dropdown-${this.props.id}-${index}`,
                    onKeyDown: this.handleKeyDownDropDownItem,
                    ref: item => this.items.push(item),
                }));
            });
        }

        const dropDownClasses = {
            "dropdown-content": true,
            "dropdown-content-hidden": !this.state.isActive,
        };
        const classStyle = this.lstPosition[this.props.position];
        const position = (this.props.drawArrow) ? classStyle : "";

        return (
            <div id={this.state.id + "content"} className={classStyle + " " + classNames(dropDownClasses)}
                style={this.boxStyle}>
                <span style={this.arrowStyle} className={"arrow " + position} />
                <ul
                    className={"dropdown-list " + position}
                    ref={dropDown => this.dropDown = dropDown}
                >
                    {items}
                </ul>
            </div>);
    }

    calculPositionBox() {
        let valRightArrow = 0;
        let valLeftBox = 0;
        let valLeftArrow = 0;
        const icon = this.button.getElementsByClassName("icon");
        const label = this.button.getElementsByClassName("label");
        const widthIcon = icon && icon[0] && icon[0].getBoundingClientRect ? icon[0].getBoundingClientRect().width : 1;
        const widthLabel = label && label[0] && label[0].getBoundingClientRect() ? label[0].getBoundingClientRect().width : 1;
        switch (this.props.position) {

            case Position.BOTTOMRIGHT:
            case Position.TOPRIGHT:
                /* 5px decalement de la box -0.5em // -5px suppression de la moitié de la fleche*/
                valRightArrow = (widthIcon / 2) + 5;
                this.arrowStyle = {
                    right: valRightArrow + "px",
                };
                break;
            case Position.TOPLEFT:
            case Position.BOTTOMLEFT:
                if (this.props.valueCurrent) {
                    valLeftBox = widthLabel;
                }
                valLeftArrow = (widthIcon / 2);
                this.arrowStyle = {
                    left: valLeftArrow + "px",
                };
                this.boxStyle = {
                    left: valLeftBox + "px",
                };
                break;
        }
    }

    /* Evenement sur le onClick */
    handleClick() {
        if (this.state.isActive) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    /**
     * ouvre le dropdown, le focus reste sur le bouton appelant
     */
    openPanel() {
        fireHornetEvent(DROPDOWN_ACTIVATION_EVENT.withData({ id: this.state.id }));
        this.setState({ isActive: true });
    }

    /**
     * ferme le dropdown et focus le bouton parent
     */
    closePanel() {
        this.setState({ isActive: false }, () => {
            this.button.focus();
        });
    }

    /**
     * Gère les événements clavier sur le dropdown
     * @param e Event
     */
    handleKeyDownDropDown = (e) => {
        switch (e.keyCode) {
            // la touche echappe ferm le panneau
            case KeyCodes.ESCAPE:
                this.closePanel();
                break;

            // la barre d'espace ouvre ou ferme le
            // panneau suivant son état
            case KeyCodes.SPACEBAR:
                if (this.state.type !== "button") {
                    e.preventDefault();
                    this.handleClick();
                }
                break;
            default:
                break;
        }
    }

    /**
     * Gère les événements clavier sur un item du dropdown
     *
     * @param e Event
     * @param action Function
     * @param url String
     */
    handleKeyDownDropDownItem = (e, action, url) => {
        // current event
        let item;
        switch (e.keyCode) {
            // la touche echappe ferme le panneau
            case KeyCodes.ESCAPE:
                this.closePanel();
                break;
            // la barre d'espace et entrer executent l'action
            // portée par l'item et ferment le
            // panneau
            case KeyCodes.ENTER:
            case KeyCodes.SPACEBAR:
                e.preventDefault();
                if (this.state.isActive) {
                    if (typeof action !== "undefined") action();
                    else if (url !== "undefined") window.location.href = url;
                    this.handleClick();
                }
                break;

            case KeyCodes.UP_ARROW:
                e.preventDefault();
                if ((e.currentTarget as any).parentNode.previousElementSibling) {
                    item = (e.currentTarget as any).parentNode.previousElementSibling.firstElementChild;
                    if (item) item.focus();
                }
                break;
            case KeyCodes.TAB:
                if (e.shiftKey) { /** SHIFT+TAB */
                    if ((e.currentTarget as any).parentNode.previousElementSibling.nodeName !== "LI") {
                        this.closePanel();
                    }
                }
                else { /** TAB */
                    if (!(e.currentTarget as any).parentNode.nextElementSibling) {
                        this.closePanel();
                    }
                }
                break;
            case KeyCodes.DOWN_ARROW:
                e.preventDefault();
                if ((e.currentTarget as any).parentNode.nextElementSibling) {
                    item = (e.currentTarget as any).parentNode.nextElementSibling.firstElementChild;
                    if (item) item.focus();
                }
                break;
            default:
                break;
        }
    }

    /**
     * Ferme la liste lorsque le clic est en dehors de la div
     * @param e Event
     */
    handleExpandOutside(e) {
        e.stopPropagation();
        if (document.getElementById(this.state.id + "content") != null) {
            if (!document.getElementById(this.state.id + "content").contains(e.target)) {
                // the click was outside your component, so handle closing here
                this.setState({ isActive: false });
            } else if (this.state.isActive && this.state.closeClick) {
                this.closePanel();
            }
        }
    }

    /**
     * Ferme le dropdown courrant à l'ouverture d'un autre dropdown
     * @param event
     */
    private handleOtherDropdownActivation(event) {
        if (this.state.isActive && event && event.detail && event.detail.id !== this.state.id) {
            this.setState({ isActive: false });
        }
    }

}
