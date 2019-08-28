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
import { NotificationManager } from "hornet-js-core/src/notification/notification-manager";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { Template } from "hornet-js-utils/src/template";
import classNames from "classnames";
import { SvgSprites } from 'src/widget/icon/svg-sprites';

import "src/widget/table/sass/_datatable-sortable.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.table.column.cell.action.edition-action-body-cell");

export interface EditionActionBodyCellProps extends AbstractBodyCellProps {
    /** Fonction appelée pour rendre visible on non la cellule */
    visible?: Function;
    /** Titre du bouton edition d'une ligne du tableau */
    titleEdit?: string;
    /** Titre du bouton enregistrer l'edition d'une ligne du tableau */
    titleSave?: string;
    /** Titre du bouton annulation de l'edition d'une ligne du tableau */
    titleCancel?: string;
    /** Message de confirmation à afficher sur l'action */
    messageAlert?: string;
    /** Titre du message de confirmation à afficher sur l'action */
    titleAlert?: string;
    /** fonction appelée si une confirmation est demandée */
    showAlert?: Function;
    /** chaine de remplacement des valeurs undefined dans le templating */
    replaceUndef?: string;
    /** Fonction exécutée au moment de l'annulation de l'edition d'une ligne */
    handleCancel?: Function;
}

export class EditionActionBodyCell<P extends EditionActionBodyCellProps, S> extends AbstractBodyCell<P, S> {

    // gestion de la liste des refs des boutons
    protected buttonsRef: Array<any>;

    protected editionButton: any;
    protected focusEdition: boolean = false;

    constructor(props: P, context: any) {
        super(props, context);

        this.state = {
            ...this.state,
            submitFocused: false,
            visible: props.visible ? this.props.visible(props.value) : true,
            messageAlert: props.messageAlert && new Template(props.messageAlert).process(props.value, props.replaceUndef || "?"),
            titleAlert: props.messageAlert && new Template(props.titleAlert).process(props.value, props.replaceUndef || "?"),
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return super.shouldComponentUpdate(nextProps, nextState) || nextState.isEditing !== this.state.isEditing;
    }

    componentDidUpdate(nextProps, nextState, nextContent){
        super.componentDidUpdate(nextProps, nextState, nextContent);
        if (this.editionButton && this.focusEdition && (this.editionButton as HTMLElement).focus) {
            (this.editionButton as HTMLElement).focus();
            this.focusEdition = false;
        }
    }

    /**
     * @inheritDoc
     */
    renderCell(): JSX.Element {
        logger.debug("render EditableActionBodyCell-> column:", this.props.coordinates.column, " - line:", this.props.coordinates.row);

        const classes = {
            "edition-button-action": true,
            "button-action": true,
        };

        const classesBefore = {
            "button-action": true,
            "edition-button-action-before": true,
        };

        if (this.state.className) {
            classes[ this.state.className ] = true;
        }

        // initialisation de la liste de ref  des boutons
        this.buttonsRef = [];

        return (
            this.state.visible ?
                !this.state.isEditing ? this.renderEditionBoutton(classesBefore) : this.renderSaveCancelBoutton(classes)
                : null
        );
    }

    /**
     * @inheritDoc
     */
    getCellTitle() {
        return "";
    }


    /**
     * Gestion de la touche espace et entre
     * @param e
     */
    handleKeyDownButton(e: React.KeyboardEvent<HTMLElement>): void {
        if (e.keyCode === KeyCodes.ENTER || e.keyCode === KeyCodes.SPACEBAR) {
            e.preventDefault();
            e.stopPropagation();
            !this.state.isEditing && this.onClick(e);
        }
    }

    /**
     * clic sur l'icone d'edition
     * @param e
     */
    onClick = (e) => {
        if (this.buttonsRef.indexOf(e.currentTarget) === 1 && this.props.messageAlert && this.props.showAlert) {
            e.stopPropagation();
            this.props.showAlert(this.state.messageAlert, this.state.titleAlert, this.setItemInEdition);
            this.focusEdition = true;
        } else {
            this.setItemInEdition();
        }
    }

    /**
     * Permet de stocker l'item du tableau qui est en cours d'edition
     */
    setItemInEdition(): void {
        // remove tous les messages d'erreur
        NotificationManager.cleanAll();
        this.props.contentState.setItemInEdition(
            this.state.isEditing ? null : this.props.value,
            this.state.isEditing ? null : this.props.coordinates.row);

        if (this.state.isEditing && this.props.handleCancel) {
            this.props.handleCancel(this.props.value, this.props.coordinates.row);
        }
    }

    /**
     *
     * @param classes
     * @returns {any}
     */
    renderEditionBoutton(classes: { [id: string]: any;}): JSX.Element {
        return (<a
        ref={(ref) =>{this.editionButton = ref;}}
            className={classNames(classes)}
            title={this.i18n(this.state.titleEdit, this.props.value)}
            aria-label={this.i18n(this.state.titleEdit, this.props.value)}
            onClick={this.onClick}
            tabIndex={-1}
            onKeyDown={this.handleKeyDownButton}
            role="button"
        >
            <SvgSprites icon="quickEdit" color="#0579be" width="2em" height="2em" tabIndex={-1}/>
        </a>
        );
    }

    /**
     * Rendu des boutons save et cancel
     * @param classes
     * @returns {any}
     */
    renderSaveCancelBoutton(classes: { [id: string]: any;}): JSX.Element {
        return (
            <div onKeyDown={this.switchFocus}>
                <button ref={(elt) => {
                    this.setButtonsRef(elt);
                }}
                    className={classNames(classes)}
                    title={this.state.titleSave}
                    aria-label={this.state.titleSave}
                    type="submit"
                    tabIndex={0}>
                    <SvgSprites icon="registerEdit" color="#006400" width="2em" height="2em" tabIndex={-1}/>
                </button>

                <button ref={(elt) => {
                    this.setButtonsRef(elt);
                }}
                    className={classNames(classes)}
                    title={this.state.titleCancel}
                    aria-label={this.state.titleCancel}
                    onClick={this.onClick}
                    type="button"
                    tabIndex={0}>
                    <SvgSprites icon="cancelEdit" color="#D60000" width="2em" height="2em" tabIndex={-1}/>
                </button>
            </div>
        );
    }

    /**
     * permet de stocker les references des boutons de la cellule
     * @param ref
     */
    protected setButtonsRef(ref): void {
        if (ref) {
            this.buttonsRef.push(ref);
        }

    }

    /**
     * Permet de switcher le focus entre les deux boutons de la cellule
     * @param e
     */
    protected switchFocus(e): void {
        e.stopPropagation();
        const indexBtnSave = 0;
        const indexBtnCancel = 1;
        if (!this.state.isEditing) {
            this.handleKeyDown(e);
        } else if (e.keyCode === KeyCodes.RIGHT_ARROW && this.state.submitFocused) {
            this.buttonsRef[ indexBtnCancel ].focus();
        } else if (e.keyCode === KeyCodes.LEFT_ARROW && !this.state.submitFocused) {
            this.buttonsRef[ indexBtnSave ].focus();
        } else {
            this.handleKeyDown(e);
        }

        this.setState({ submitFocused: !this.state.submitFocused });

    }

    /**
     * Méthode permettant de mettre le focus sur le bouton
     * @inheritDoc
     */
    handleCellFocus(tableCellRef) {
        if (this.buttonsRef.indexOf(document.activeElement) === -1) {
            if (tableCellRef instanceof HTMLButtonElement || tableCellRef.tagName === "A") {
                this.setState({ submitFocused: (tableCellRef as HTMLElement).getAttribute("type") === "submit" });
                (tableCellRef as HTMLElement).focus();

            } else if (tableCellRef && tableCellRef.children) {
                this.handleCellFocus(tableCellRef.children[ 0 ]);
            }
        }
    }
}
