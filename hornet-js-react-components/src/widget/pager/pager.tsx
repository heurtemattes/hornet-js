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
 * @version v5.2.2
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import * as _ from "lodash";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetComponent } from "src/widget/component/hornet-component";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Dropdown, Position } from "src/widget/dropdown/dropdown";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import * as classNames from "classnames";
import KeyboardEvent = React.KeyboardEvent;

const logger: Logger = Utils.getLogger("hornet-js-components.widget.pager.pager");

/**
 * Propriétés de pagination de tableau Hornet
 */
export interface PaginationProps {
    /** Indice de la page courante (1 pour la première page) */
    pageIndex: number;
    /** Nombre maximum d'éléments par page */
    itemsPerPage: number;
    /** Nombre total d'éléments */
    totalItems: number;
}

/**
 * Elément de sélection de taille de page
 */
export interface PageSizeItem {
    /** Taille de page */
    value: number;
    /** Clé du libellé internationalisé */
    textKey: string;
    /** Title du lien */
    title?: string;
}

/**
 * Propriétés du composant pagination de tableau Hornet
 */
export interface PagerProps extends HornetComponentProps {
    /** Propriétés de pagination courante */
    dataSource: PaginateDataSource<any>;
    /** Classe CSS personnalisée */
    className?: string;
    /** Messages internationalisés du tableau */
    message?: MessagesProps;
    /** Choix de taille de page disponibles */
    pageSizeSelect?: PageSizeItem[];
    /** id html */
    id: string;
    /** indicateur disabled */
    disabled?: boolean;

    nextPageTitle?: string;
    lastPageTitle?: string;
    previousPageTitle?: string;
    firstPageTitle?: string;
    inputLabelTitle?: string;

    summary?: string;
}

/**
 * Propriétés des Messages du tableau Hornet
 */
export interface MessagesProps {
    firstPage?: string;
    prevPage?: string;
    nextPage?: string;
    lastPage?: string;
    displayAll?: string;
    pageFooter?: string;
    inputPage?: string;
}

/**
 * Valeur de la propriété de pagination itemsPerPage correspondant à "Afficher tout" les éléments.
 * Egale à la constante Java Integer.MAX_VALUE (2^32 - 1)
 */
export const ITEMS_PER_PAGE_ALL: number = 2147483647;

/**
 * Outils de pagination de tableau
 */
export class Pager extends HornetComponent<PagerProps, any> {

    protected tableInputPager;

    static defaultProps = {
        message: HornetComponent.getI18n("table"),
        className: "",
        nextPageTitle: "table.nextPage",
        lastPageTitle: "table.lastPage",
        previousPageTitle: "table.prevPage",
        firstPageTitle: "table.firstPage",
        summary: "table.pagerSummary",
        inputLabelTitle: "table.pager.inputLabel",
        dropDownTitle: "table.pager.dropdownTitle",
    };
    protected defaultPageSizeSelect: PageSizeItem[] = [
        { value: 10, textKey: this.i18n("table.10") },
        { value: 20, textKey: this.i18n("table.20") },
        { value: 50, textKey: this.i18n("table.50") },
        { value: 100, textKey: this.i18n("table.100") },
        { value: ITEMS_PER_PAGE_ALL, textKey: this.i18n("table.displayAll") , title: this.i18n("table.pager.titleItemAll")},
    ];

    constructor(props: PagerProps, context?: any) {
        super(props, context);

        this.state = {
            ...this.state,
            i18n: this.i18n("table"),
            pagination: _.cloneDeep(this.props.dataSource.pagination),
            summary: this.i18n(this.props.summary),
        };

    }

    componentDidMount(): void {
        super.componentDidMount();
        this.props.dataSource.on("fetch", this.updateOnFetch);
        this.props.dataSource.on("pagination", (result) => {
            if (this.tableInputPager && result.pagination) {
                this.tableInputPager.value = result.pagination.pageIndex;
            }
            this.setState({ pagination: _.cloneDeep(result.pagination) });
        });
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.props.dataSource) {
            this.props.dataSource.removeListener("fetch", this.updateOnFetch);
            this.props.dataSource.removeListener("pagination", (result) => {
                this.setState({ pagination: _.cloneDeep(result.pagination) });
            });

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate: boolean = (this.state.pagination.pageIndex !== nextState.pagination.pageIndex
            && nextState.pagination.pageIndex !== "")
            || this.state.pagination.itemsPerPage !== nextState.pagination.itemsPerPage
            || this.state.pagination.totalItems !== nextState.pagination.totalItems
            || this.state.disabled !== nextState.disabled;
        logger.trace("shouldComponentUpdate", shouldUpdate);
        return shouldUpdate;
    }

    /**
     * met a jour la pagination dans le state et la valeur de la page courante.
     * @param result (liste des resultats du dataSource)
     */
    protected updateOnFetch(result) {
        this.setState({ pagination: (!result || result.length === 0) ? {} : _.cloneDeep(this.props.dataSource.pagination) });
        if (this.tableInputPager) {
            this.tableInputPager.value = this.state.pagination.pageIndex; // mise a jour de l'index de la page affichée
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("render");
        const className: ClassDictionary = {
            "datatable-pagination": true,
        };
        if (this.state.className) {
            className[ this.state.className ] = true;
        }

        const divProps: any = {
            className: classNames(className),
            id: this.props.id,
            disabled: this.state.disabled,
            key: "pagerTable-" + this.props.id,
        };

        return (
            this.state.pagination.pageIndex ?
                <div {...divProps}>
                    {this.renderSelectItemsPerPage()}
                    {this.getButtons()}
                </div> : <div />);
    }

    /**
     * Génère la liste déroulante permettant de sélectionner le nombre d'éléments par page.
     * @returns {ReactElement}
     */
    protected renderSelectItemsPerPage(): React.ReactElement<PagerProps> {
        logger.trace("renderSelectItemsPerPage");

        const pageSizeSelect = this.state.pageSizeSelect || this.defaultPageSizeSelect;

        const dropdownItems = [];
        pageSizeSelect.map((item: PageSizeItem, i: number) => {
            let disabled = false;
            if (this.state.pagination.itemsPerPage === item.value) {
                disabled = true;
            }
            dropdownItems.push({
                label: this.i18n(item.textKey, this.state),
                action: this.onFormChange.bind(this, item.value, false),
                className: "material-dropdown-menu__link",
                disabled,
                key: this.props.id + "dropdownmenu-" + i,
                title: this.i18n(item.title ? item.title : "table.pager.titleItem", {... item, summary: this.state.summary}) ,
            });
        });

        let selectedItem: PageSizeItem = { value: 0, textKey: "" };
        if (this.state.pagination.itemsPerPage) {
            for (let i = 0; i < pageSizeSelect.length; i++) {
                const item = pageSizeSelect[ i ];
                if (item.value === this.state.pagination.itemsPerPage) {
                    selectedItem = item;
                }
            }
        }
        const labelId = "label-" + this.props.id + "drop";

        return (
            <div key={"pagerTableDropDownContainer-" + this.props.id}>
                <span className="labelPager" id={labelId}>
                    {this.state.i18n.pageFooter}
                </span>
                <div className="datatable-pagination-content" key={"pagerTableDropDownSubContainer-" + this.props.id}>
                    <Dropdown
                        items={dropdownItems}
                        icon="caret-down"
                        id={this.props.id + "-drop"}
                        valueCurrent={this.state.pagination.itemsPerPage}
                        label={selectedItem.textKey}
                        ariaLabel={this.state.i18n.pageFooter + " " + this.state.pagination.itemsPerPage}
                        disabled={this.state.disabled}
                        position={Position.TOPLEFT}
                        title={this.i18n(this.state.dropDownTitle, this.state)}
                        ariaLabelledById={labelId}
                        key={"dropDownTable-" + this.props.id}
                    />
                </div>
            </div>
        );
    }

    /**
     * @param totalItems nombre total d'éléments
     * @param itemsPerPage nombre d'éléments par page
     * @return le nombre total de pages
     */
    public static getTotalPages(totalItems: number, itemsPerPage: number): number {
        return Math.max(1, Math.ceil(totalItems / itemsPerPage)) || 0;
    }

    /**
     * Méthode permettant de générer le code HTML lié aux boutons
     * @returns {JSX.Element[]}
     */
    protected getButtons(): JSX.Element[] {
        logger.trace("getButtons");

        let firstPage: number;
        let prevPage: number;
        let nextPage: number;
        let lastPage: number;
        firstPage = prevPage = nextPage = lastPage = 1;

        // calcul du nombre de pages
        const totalItems: number = this.state.pagination.totalItems;
        const itemsPerPage: number = this.state.pagination.itemsPerPage;
        let pageIndex: number = this.state.pagination.pageIndex;
        const totalPages: number = Pager.getTotalPages(totalItems, itemsPerPage);
        lastPage = totalPages;

        /* cas d'une nouvelle recherche quand on est positionné sur la dernière pagination et que le total est inférieur
         à l'ancienne recherche */
        if (pageIndex > totalPages) {
            pageIndex = 1;
        }

        let startOnClickActif: boolean = false;
        let endOnClickActif: boolean = false;

        if (totalItems > itemsPerPage && totalPages > 1) {
            if (pageIndex > 1) {
                prevPage = Number(pageIndex) - 1;
                startOnClickActif = true;
            }

            if (pageIndex < totalPages) {
                nextPage = Number(pageIndex) + 1;
                endOnClickActif = true;
            }
        }

        const i18nValues = {firstPage, totalPages, nextPage, prevPage, summary: this.state.summary};

        return [
            this.renderButton(this.i18n(this.state.firstPageTitle, i18nValues), firstPage, startOnClickActif, "firstPage"),
            this.renderButton(this.i18n(this.state.previousPageTitle, i18nValues), prevPage, startOnClickActif, "prevPage"),
            this.renderPageInput(firstPage, lastPage, this.i18n(this.state.inputLabelTitle, {summary: this.state.summary})),
            this.renderButton(this.i18n(this.state.nextPageTitle, i18nValues), nextPage, endOnClickActif, "nextPage"),
            this.renderButton(this.i18n(this.state.lastPageTitle, i18nValues), lastPage, endOnClickActif, "lastPage"),
        ];
    }

    /**
     * Génère le rendu d'un bouton de contrôle de pagination
     * @param infoTitle complement info title
     * @param page index de la page sélectionnée par le bouton
     * @param enabled indique si le bouton est actif
     * @param key clé de l'élément React
     * @returns l'élément React correspondant
     */
    protected renderButton(infoTitle: string, page: number, enabled: boolean, key: string): JSX.Element {
        logger.trace("renderButton");
        let className: string = "datatable-pagination-button datatable-pagination-button-" + key.toLowerCase();
        if (enabled) {
            className += " datatable-pagination-control-enabled";
        } else {
            className += " datatable-pagination-control-disabled";
        }

        return (
            <button
                type="button"
                className={className}
                onClick={() => {
                    this.props.dataSource.goToPage(page);
                    this.tableInputPager.value = page;
                }}
                disabled={!enabled || this.state.disabled}
                key={this.props.id + "-" + key}
                title={infoTitle}
            >
                {/*{texte}*/}
            </button>
        );
    }

    /**
     * Rendu de l'input de saisie pour aller à une page précise
     * @param firstPage numéro de la première page
     * @param lastPage numéro de la dernière page
     * @returns rendu du composant
     */
    protected renderPageInput(firstPage: number, lastPage: number, title: string) {
        const index = this.state.pagination.pageIndex;
        const defaultValue = (!index || index < 1) ? 1 : index;
        return (
            <div key={"pagerTablePageInputContainer-" + this.props.id}>
                <span id={this.props.id + "-label"}
                    className="datatable-pagination-input-label"
                    key={"labelNumPage-" + this.props.id}
                >
                    {title}
                </span>
                <input
                    defaultValue={defaultValue}
                    type={(!this.isMobile()) ? "number" : "tel"}
                    min={(!this.isMobile()) ? firstPage : undefined}
                    max={(!this.isMobile()) ? lastPage : undefined}
                    className="datatable-pagination-input"
                    ref={(element) => {
                        this.tableInputPager = element;
                    }}
                    name="tableInputPager"
                    onChange={this.handleChangeValue}
                    onKeyDown={this.handleInputKeyDown}
                    key={"numPage-" + this.props.id}
                    aria-labelledby={this.props.id + "-label"}
                    title={title}
                />
            </div>
        );
    }

    /**
     * Gestion de la validation clavier pour aller à la page saisie
     * dans l'input dédié
     * @param e : event
     */
    protected handleInputKeyDown(e: KeyboardEvent<HTMLElement>) {
        if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
            const keyCode: number = e.keyCode;
            if ((this.isMobile() && KeyCodes.TAB === keyCode) || KeyCodes.SPACEBAR === keyCode || KeyCodes.ENTER === keyCode) {
                if (this.tableInputPager.value >= 1 &&
                    this.tableInputPager.value <= Pager.getTotalPages(this.state.pagination.totalItems, this.state.pagination.itemsPerPage)) {
                    this.props.dataSource.goToPage(this.tableInputPager.value);
                    this.tableInputPager.value = this.tableInputPager.value;
                } else {
                    this.tableInputPager.value = this.state.pagination.pageIndex;
                }

                const pagination = _.cloneDeep(this.state.pagination);
                pagination.pageIndex = this.tableInputPager.value;
                this.setState({ pagination });
            }
        }
    }

    /**
     * L'index de page étant dans un input mappé par la prop value
     * React oblige l'utilisation d'un event sur onChange pour valider la modification
     * @param e
     */
    protected handleChangeValue(e) {
        const pagination = _.cloneDeep(this.state.pagination);
        const maxPages: number = Pager.getTotalPages(this.state.pagination.totalItems, this.state.pagination.itemsPerPage);

        // Si NaN, on rend une chaine vide
        pagination.pageIndex = !_.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : "";
        if (_.isNumber(pagination.pageIndex) && pagination.pageIndex < 1) {
            pagination.pageIndex = 1;
            this.tableInputPager.value = 1;
        }
        if (pagination.pageIndex > maxPages) {
            pagination.pageIndex = this.tableInputPager.value = maxPages;
        }
    }

    /**
     * Méthode déclenchée sur un changement d'état de du formulaire de pagination
     * @param value
     * @param pageChanged
     */
    protected onFormChange(value, pageChanged): void {
        logger.trace("onFormChange");

        if (pageChanged) {
            this.props.dataSource.goToPage(value);
            this.tableInputPager.value = value;
        } else {
            this.props.dataSource.updatePerPage(value);
            this.tableInputPager.value = 1;
        }
    }

    // Setters
    setClassName(className: string, callback?: () => any): this {
        this.setState({ className }, callback);
        return this;
    }

    setMessage(message: (PaginationProps) => void, callback?: () => any): this {
        this.setState({ message }, callback);
        return this;
    }

    setPageSizeSelect(pageSizeSelect: PageSizeItem[], callback?: () => any): this {
        this.setState({ pageSizeSelect }, callback);
        return this;
    }
}
