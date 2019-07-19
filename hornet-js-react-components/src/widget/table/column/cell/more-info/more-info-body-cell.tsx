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
import { ActionBodyCell, ActionBodyCellProps } from "src/widget/table/column/cell/action/action-body-cell";
import * as React from "react";
import classNames from "classnames";
import { SvgSprites } from 'src/widget/icon/svg-sprites';
import { LineAfter } from 'src/widget/table/line/line-after';
import { LineBefore } from 'src/widget/table/line/line-before';

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.table.column.cell.more-info.more-info-body-cell");

const LINE_BEFORE = "before";
const LINE_AFTER = "after";

export interface MoreInfoBodyCellProps extends ActionBodyCellProps {
    /** Clé sur laquelle se base la méthode shouldComponentUpdate */
    keyShouldComponentUpdate?: string;
}

export class MoreInfoBodyCell<P extends MoreInfoBodyCellProps, S> extends ActionBodyCell<P, any> {

    link: HTMLLinkElement;

    static defaultProps = {
        keyShouldComponentUpdate: "id",
    };

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            ...this.state,
            url: (props.url) ? this.genUrlWithParams(props.url, props.value) : null,
            visible: (this.props.visible) ? this.props.visible(this.props.value) : true,

        };
    }

    /**
     * @inheritDoc
     */
    componentWillReceiveProps(nextProps: MoreInfoBodyCellProps, context) {
        super.componentWillReceiveProps(nextProps as any, context);
        // Ne pas utiliser this.setState pour ne pas avoir plusieurs appels au render
        this.state = {
            ...this.state, ...nextProps,
            url: (nextProps.url) ? this.genUrlWithParams(nextProps.url, nextProps.value) : null,
            visible: (nextProps.visible) ? nextProps.visible(nextProps.value) : true,
        };
    }

    /**
     * @inheritDoc
     */
    renderCell(): JSX.Element {
        logger.debug(`render MoreInfoBodyCell-> column, ${this.props.coordinates.column} - line , ${this.props.coordinates.row}`);

        this.title = this.getCellTitleWithProps(this.props);

        const classes = {
            "button-action": true,
        };
        if (this.state.className) {
            classes[this.state.className] = true;
        }
        const aProps: any = {
            href: this.state.url || "#",
            className: classNames(classes),
            title: this.title,
            onClick: this.onClick,
            disabled: this.props.contentState.itemInEdition && this.state.isEditing === false,
            tabIndex: -1,
            onKeyDown: this.handleKeyDownButton,
            role: "button",
            "aria-controls": this.buildExpandableLineId(),
            "aria-expanded": false,
            ref: (a) => { this.link = a; },
        };

        return (
            this.state.visible ?

                <a {...aProps}>
                    <SvgSprites icon="user" color="#0579BE" ariaLabel={aProps.title} tabIndex={-1} />
                    <span className="label-button-action">
                        {this.state.label}
                    </span>
                </a>
                : null
        );
    }

    /**
     * Click sur le lien
     */
    onClick(e): void {
        // toggle line
        this.expandLine();
    }

    /**
     * Permet de masquer/afficher  une ligne de tableau
     */
    expandLine() {
        const selector: string = this.buildExpandableLineId();

        const element = document.getElementById(selector);

        if (element && element.classList && element.classList.contains("datatable-expandable-line-hidden")) {
            element.classList.remove("datatable-expandable-line-hidden");
            element.classList.add("datatable-expandable-line-displayed");
            this.setLinkAriaExpandedAttribute(true);

        } else if (element) {
            element.classList.remove("datatable-expandable-line-displayed");
            element.classList.add("datatable-expandable-line-hidden");
            this.setLinkAriaExpandedAttribute(false);
        }

        if (this.props.action) {
            this.props.action(this.props.value);
        }
    }

    /**
     * Valorise l'attribut aria-expanded du lien avec la value passée en paramètre
     * @param {boolean} - value : Valeur de l'attribut aria-expanded du lien
     */
    setLinkAriaExpandedAttribute(value: boolean) {
        if (this.link) {
            this.link.setAttribute("aria-expanded", `${value}`);
        }
    }

    /**
     * Construit l'id de l'expandable line
     * @returns {string} - l'id de l'expandable line
     */
    buildExpandableLineId(): string {
        const childrenType = this.props.children && (this.props.children as React.ReactElement<any>).type;
        let lineType:string;
        if (childrenType == LineAfter) {
            lineType = LINE_AFTER;
        } else if (childrenType == LineBefore) {
            lineType = LINE_BEFORE;
        }
        return this.props.coordinates && `${this.props.id}-expandable-line-${lineType}-${this.props.coordinates.row}`;
    }
}
