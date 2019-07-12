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
import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";

import { AbstractCell, AbstractCellProps } from "src/widget/table/column/cell/abstract-cell";
import { Template } from "hornet-js-utils/src/template";
import classNames from "classnames";

import "src/widget/table/sass/_datatable-sortable.scss";

export interface AbstractBodyCellProps extends AbstractCellProps {
    /** chaine de remplacement des valeurs undefined dans le templating */
    replaceUndef?: string;
}

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.table.column.cell.abstract-body-cell");

/**
 * Classe permettant de générer le rendu html d'un cellule du corps d'un tableau
 */
export class AbstractBodyCell<P extends AbstractBodyCellProps, S> extends AbstractCell<P, S> {

    protected defaultClassName: string;
    protected focus: boolean = false;

    constructor(props: P, context?: any) {
        super(props, context);
        const altValue = (typeof props.value[ props.keyColumn ] === "number") ? "0" : "";
        this.defaultClassName = "default-body-cell";

        this.state = {
            ...this.state,
            value: AbstractBodyCell.getTemplatedValue(props),
            titleCell: AbstractBodyCell.getTemplatedTitleCell(props),
        };
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return super.shouldComponentUpdate(nextProps, nextState) ||
            this.state.value !== nextState.value;
    }

    componentDidUpdate(nextProps: any, nextState: any, nextContext: any) {
        super.componentDidUpdate(nextProps, nextState, nextContext);
        if (this.focus) {
            this.props.contentState.setFocusOn(this.props.coordinates);
            this.focus = false;
        }
    }

    componentWillReceiveProps(nextProps: P, nextContext: any): void {
        const altValue = (typeof nextProps.value[ nextProps.keyColumn ] === "number") ? "0" : "";
        const newValue = AbstractBodyCell.getTemplatedValue(nextProps);

        if (newValue !== this.state.value) {
            this.setState({
                value: newValue,
                titleCell: AbstractBodyCell.getTemplatedTitleCell(nextProps),
            });
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {

        logger.debug(
            "render BodyCell -> column:",
            this.props.coordinates.column, " - line:",
            this.props.coordinates.row, "- isFocused:",
            this.state.isFocused, "- tabIndex:",
            this.state.tabIndex);

        return (
            <td {...this.getDefaultTdProps()}>
                {this.renderCell()}
            </td>
        );
    }

    /**
     * Retourne la value de la cellule du tableau grâce au mapping du keyColumn
     * // WARNING: keyColumn, value et replaceUndef sont obligatoire
     * @param props
     */
    static getTemplatedValue(props) {
        const altValue = (typeof props.value[ props.keyColumn ] === "number") ? "0" : "";
        return new Template("${" + props.keyColumn + "}").process(props.value, props.replaceUndef || altValue);
    }

    /**
     * Retourne le title de la cellule du tableau grâce au mapping du keyColumn
     * // WARNING: keyColumn, value et replaceUndef sont obligatoire
     * @param props
     */
    static getTemplatedTitleCell(props) {
        const altValue = (typeof props.value[ props.keyColumn ] === "number") ? "0" : "";
        return (props.titleCell && new Template(props.titleCell).process(props.value, props.replaceUndef || "?"));
    }

    renderCell() {
        return (
            this.state.value
        );
    }

    /**
     * gestion de l'event on hover
     */
    getCellTitle() {

        return "";
    }

    /**
     * Return l'indicateur Disabled
     * @returns {boolean}
     */
    setDisabled(): boolean {
        return this.props.contentState.itemInEdition !== undefined
            && this.props.contentState.itemInEdition !== null
            && this.state.isEditing === false;
    }

    /***
     * Retourne les propriétés par défaut d'un élément de type Td
     * @returns {{ref: ((instance:HTMLTableCellElement)=>undefined), className: string, onKeyDown: any, tabIndex: number, aria-selected: (((props:any)=>boolean)|any), onFocus: any, style: any}}
     */
    getDefaultTdProps() {
        const classes: { [id: string]: any;} = { "datatable-cell": true };
        classes[ "datatable-cell-custom-" + this.props.keyColumn ] = true;
        classes[ "datatable-cell-in-edition" ] = this.props.contentState.itemInEdition && this.state.abstractisEditing;
        const key = this.props.id + "-colBody-" + this.props.coordinates.row + "-" + this.props.coordinates.column;
        if (this.props.coordinates.column === 0 && this.props.contentState.itemInEdition) {
            this.focus = true;
        }
        classes[ this.props.id + "-" + this.props.keyColumn ] = true;
        classes[ this.defaultClassName ] = true;
        classes[ this.props.className ] = this.props.className ? true : false;

        return ({
            ref: (instance: HTMLTableCellElement) => {
                this.tableCellRef = instance;
            },
            className: classNames(classes),
            onKeyDown: this.props.handleKeyDown || this.handleKeyDown.bind(this),
            tabIndex: this.getTabIndex(),
            "aria-selected": this.state.isFocused,
            onFocus: (e) => {
                this.props.contentState.setFocusOn(this.props.coordinates);
                this.moveCaretAtEnd(e);
            },
            // disabled s'il existe un item en cours d'edition et l'indicateur isEditing  est a false pour cette cellule
            disabled: this.setDisabled(),
            style: this.props.style,
            key,
            id: key,
            title: this.state.visible !== false ? (this.state.titleCell instanceof Function ? this.state.titleCell(this.props.value) :
                this.state.titleCell ? this.state.titleCell : this.getCellTitle()) : null,
        });
    }

    /**
     *
     * @param e
     */
    moveCaretAtEnd(e) {
        const temp_value = e.target.value;
        e.target.value = "";
        e.target.value = temp_value;
    }
}
