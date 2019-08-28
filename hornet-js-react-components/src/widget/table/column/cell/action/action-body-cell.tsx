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
import { AbstractBodyCell, AbstractBodyCellProps } from "src/widget/table/column/cell/abstract-body-cell";
import * as React from "react";
import { Template } from "hornet-js-utils/src/template";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import isNull = require("lodash.isnull");
import classNames from "classnames";
import { SvgSprites } from 'src/widget/icon/svg-sprites';

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.table.column.cell.action.action-body-cell");

export interface ActionBodyCellProps extends AbstractBodyCellProps {
    /** src de l'image */
    srcImg?: JSX.Element | string | SvgSprites;
    /** className de l'image */
    classNameImg?: string;
    /** Url de l'action à déclencher */
    url?: string;
    /** action à déclencher */
    action?: Function;
    /** Fonction appelée pour rendre visible on non la cellule */
    visible?: Function;
    /** fonction appelée si une confirmation est demandée */
    showAlert?: Function;
    /** Message de confirmation à afficher sur l'action */
    messageAlert?: string;
    /** Titre du message de confirmation à afficher sur l'action */
    titleAlert?: string;
    /** Indicateur d'ouverture d'un popup suite à clic sur bouton */
    hasPopUp?: string;

    label?: string;

    /** Clé sur laquelle se base la méthode shouldComponentUpdate */
    keyShouldComponentUpdate?: string;

}

export class ActionBodyCell<P extends ActionBodyCellProps, S> extends AbstractBodyCell<P, S> {
    protected title: string;
    private inferedAlertMessage: string;
    private inferedAlertTitle: string;
    protected disabled: boolean = false;

    static defaultProps = {
        keyShouldComponentUpdate: "id",
    };

    constructor(props: P, context: any) {
        super(props, context);

        this.state = {
            ...this.state,
            hasPopUp: this.props.messageAlert,
            visible: this.isVisible(),
        };

    }

    /**
     * @inheritDoc
     */
    shouldComponentUpdate(nextProps: any, nextState: any) {
        return super.shouldComponentUpdate(nextProps, nextState)
        || this.calculVisiblity(nextProps) !== this.state.visible
        || (this.props.value && nextProps.value &&
            this.props.value[this.props.keyShouldComponentUpdate] !== nextProps.value[this.props.keyShouldComponentUpdate]);
    }

    /**
     * indique si le composant est visible ou non
     */
    isVisible() {
        return this.calculVisiblity(this.props);
    }

    /**
     * calcul de la visibilité en fonction des propriétés passées
     * @param props propriétés prises en compte pour le calcul de la visibilité
     */
    protected calculVisiblity(props: ActionBodyCellProps){
        return (props.visible && (typeof props.visible === "function")) ? props.visible(props.value) : true;
    }

    /**
     * @inheritDoc
     */
    renderCell(): JSX.Element {
        logger.debug("render ActionBodyCell-> column:", this.props.coordinates.column, " - line:", this.props.coordinates.row);
        this.title = this.getCellTitleWithProps(this.props);

        const classes = {
            "button-action": true,
            "picto-svg": true,
        };

        if (this.state.className) {
            classes[this.state.className] = true;
        }

        this.disabled = (typeof this.state.disabled === "function") ? this.state.disabled(this.props.value) : this.state.disabled;

        const aProps: any = {
            href: this.props.url && this.genUrlWithParams(this.props.url, this.props.value) || "#",
            className: classNames(classes),
            title: this.state.titleCell instanceof Function ? this.state.titleCell(this.props.value) :
                this.state.titleCell ? this.state.titleCell : this.title,
            onMouseDown: this.onClick,
            disabled: (this.props.contentState.itemInEdition && this.state.isEditing === false) || this.disabled,
            tabIndex: -1,
            onKeyDown: this.handleKeyDownButton,
            role: "button",
        };

        let img = null;
        if (typeof this.props.srcImg === "string") {
            img = <SvgSprites icon={this.state.srcImg} ariaLabel={aProps.title}  tabIndex={-1} />
        } else if (this.props.srcImg) {
            img = React.createElement((this.props.srcImg as JSX.Element).type, { ...(this.props.srcImg as JSX.Element).props, tabIndex:-1, ariaLabel: aProps.title });
        }

        if (this.props.messageAlert) {
            this.inferedAlertMessage = this.props.messageAlert
                && new Template(this.props.messageAlert).process(this.props.value, this.props.replaceUndef || "?");
            this.inferedAlertTitle = this.props.messageAlert
                && new Template(this.props.titleAlert).process(this.props.value, this.props.replaceUndef || "?");
        }

        // Ne pas retirer cette ligne, sert a l'update du composant
        this.state = {...this.state, visible: this.isVisible()};

        return (
            this.isVisible() ?
                <a {...aProps}>
                    {img}
                    {this.state.label ? <span className="label-button-action">{this.state.label}</span> : null}
                </a>
                : null
        );
    }

    /**
     * Gestion de la touche espace et entre
     * @param e
     */
    handleKeyDownButton(e: React.KeyboardEvent<HTMLElement>): void {
        if (e.keyCode === KeyCodes.ENTER || e.keyCode === KeyCodes.SPACEBAR) {
            e.preventDefault();
            e.stopPropagation();
            !this.disabled && !this.state.isEditing && this.onClick(e);
        }
    }

    /**
     * @inheritDoc
     */
    getCellTitleWithProps(props) {
        return (props.alt || props.title) ? this.i18n(props.alt || props.title, props.value) : null;
    }

    /**
     * Click sur le lien
     */
    onClick(e): void {
        if ((!e.button || (e.button && e.button !== 2)) && !this.disabled) {
            if (this.props.messageAlert) {
                e.persist();
                e.stopPropagation();
                setTimeout(() => {
                    this.props.showAlert(this.inferedAlertMessage, this.inferedAlertTitle, ()=>{this.onAction(e)});
                },         150);
            } else {
                if (e.button && e.button === 1 && this.state.url) {
                    const url = this.props.url && this.genUrlWithParams(this.props.url, this.props.value);
                    window.open(url, "_blank");
                }else{
                    this.onAction(e);
                }
            }
        }
    }

    /**
     * action sur la confirmation
     */
    onAction(e): void {
        if (this.state.url) {
            window.location.href = this.props.url && this.genUrlWithParams(this.props.url, this.props.value);
        } else if (this.props.action) {
            this.props.action(this.props.value, e);
        }
    }

    /**
     * met a true la props isEditing a true lorsque la cellule est en cours d'edition
     * @param lineIndex
     */
    handleEdition(lineIndex: number) {
        const nameClass: string = "default-body-cell";
        const sortableColumnCass: string = "datatable-header-sortable-column";

        if (isNull(lineIndex)) {
            this.setState({ isEditing: false });
            this.tableCellRef.removeAttribute("disabled");
            this.tableCellRef.classList.remove("datatable-cell-in-edition");

        } else if (lineIndex === this.props.coordinates.row) {
            this.setState({ isEditing: (lineIndex === this.props.coordinates.row) });
            this.tableCellRef.classList.add("datatable-cell-in-edition");
            this.tableCellRef.setAttribute("disabled", "true");
        } else if (this.tableCellRef.localName === "th") {
            this.tableCellRef.classList.add("is_disabled");
            this.tableCellRef.classList.remove(sortableColumnCass, "datatable-header-sorted", "datatable-header-sorted-asc");
        } else {
            this.tableCellRef.setAttribute("disabled", "true");
        }
    }
}
