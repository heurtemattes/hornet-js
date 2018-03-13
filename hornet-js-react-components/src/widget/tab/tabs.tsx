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
 * @version v5.1.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import * as React from "react";
import * as classNames from "classnames";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "src/widget/component/hornet-component";
import { Tab } from "src/widget/tab/tab";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import * as ReactDOM from "react-dom";
import KeyboardEvent = __React.KeyboardEvent;
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import EventHandler = __React.EventHandler;
import FocusEventHandler = __React.FocusEventHandler;
import { TabHeader } from "src/widget/tab/tab-header";
import * as _ from "lodash";
const logger = Utils.getLogger("hornet-js-react-components.widget.tab.tabs");

export interface TabsProps extends HornetComponentProps {
    id: string;
    panelId?: string;
    selectedTabIndex?: number;
    dataSource?: DataSource<any>;
    beforeHideTab?: (tabRef?: Tab, index?: number) => void;
    afterShowTab?: (tabRef?: Tab, index?: number) => void;
    addTabFunction?: void | Function;
    addButtonTtitle?: string;
    deleteTabFunction?: void | Function;
    deleteButtonTitle?: string;
}

export enum TabsButtonScrolling {
    RIGHT,
    LEFT
}

export enum TabsKeyboardNavigation {
    PREVIOUS,
    NEXT,
    HOME,
    END
}

export interface TabsHeaderTechProps extends HornetComponentProps {
    index: number,
    tab: JSX.Element,
    id?: string,
    prefixWithId: Function,
    handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void,
    handleFocus: FocusEventHandler<HTMLElement>,
    castBooleanInNumber: Function,
    selected: boolean,
    isVisible?: boolean,
    isDeletable?: boolean,
    deleteTabFunction?: void | Function,
    deleteButtonTitle?: string
}

export class TabsHeaderTech extends HornetComponent<TabsHeaderTechProps, any> {

    constructor(props?: TabsHeaderTechProps, context?: any) {
        super(props, context);
        this.state.selected = this.props.selected;
        this.state.isVisible = (typeof this.props.isVisible === "undefined") ? true : this.props.isVisible;
    }

    protected getTabHeader(children): JSX.Element[] {
        let tableauDesTabHeader = [];
        React.Children.map(children, function (child: any) {
            if (child.type === TabHeader) {
                tableauDesTabHeader.push(child.props.children);
            }
        });
        return tableauDesTabHeader;
    }


    render(): JSX.Element {
        let header: any = this.getTabHeader(this.props.tab.props.children);

        if (header.length == 0) {
            header = this.props.tab.props.title;
        }

        let classNameLi = classNames({
            "tab": true,
            "tab-focused": true,
            "fl": true
        });

        let key = this.props.prefixWithId() + this.props.index;

        let classNameA = classNames({
            "tab-label": true,
            "tab-selected": this.state.selected,
            "pts": true,
            "pbs": true
        });

        let deleteButtonClasses = this.state.selected ? "delete-tab-button delete-tab-button-selected" : "delete-tab-button";

        let lTabIndex: number = this.props.index;

        return (
            <li style={{ "display": this.state.isVisible ? "block" : "none" }} id={key} className={classNameLi}
                role="presentation"
                key={"liTab-" + key}
                onKeyDown={this.handleKeyDown}
                onFocus={this.props.handleFocus}
                tabIndex={this.props.castBooleanInNumber(this.state.selected)}>
                <a className={classNameA} href="#"
                    role="tab"
                    id={this.props.prefixWithId() + "tabList-item-" + lTabIndex}
                    aria-selected={this.state.selected}
                    aria-controls={this.props.prefixWithId() + "sectionTabPanel-" + lTabIndex}
                    key={"aTab-" + key}
                    ref="link"
                    tabIndex={this.props.castBooleanInNumber(this.state.selected)}>
                    {header}
                </a>
                {this.props.isDeletable ?
                    <button id={key + "-delete-tab-button"}
                            type={"button"}
                            tabIndex={-1}
                            className={deleteButtonClasses}
                            onClick={this.deleteTabFunction}
                            title={this.props.deleteButtonTitle ? this.props.deleteButtonTitle : this.i18n("tabs.delete-button")}
                    >
                        <span className={"tabs-button-label"}>
                            {this.props.deleteButtonTitle ? this.props.deleteButtonTitle : this.i18n("tabs.delete-button")}
                        </span>
                    </button> : null}
            </li>
        );
    }

    /**
     * gestion navigation clavier
     * @param e
     */
    protected handleKeyDown(e) {
        if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
            let keyCode: number = e.keyCode;

            switch (keyCode) {
                case KeyCodes.DELETE:
                    this.deleteTabFunction();
                    break;
                default:
                    this.props.handleKeyDown(e);
                    break;
            }
        }
    }

    /**
     * appelle la fonciton de suppression du tab
     */
    protected deleteTabFunction() {
        if (this.props.deleteTabFunction) {
            return this.props.deleteTabFunction();
        }
    }

}

export class Tabs<P extends TabsProps> extends HornetComponent<TabsProps, any> {

    static defaultProps = {
        panelId: "panel",
        selectedTabIndex: 0
    };

    /** liste des instances Tab*/
    protected elementsTab: Array<Tab> = [];
    /** liste des JSX elements tab*/
    protected elementsTabReact: Array<JSX.Element> = [];

    /** liste des instances HeaderTech*/
    protected elementsHeaderTech: Array<TabsHeaderTech> = [];
    /** liste des JSX elements headerTech*/
    protected elementsHeaderReact: Array<JSX.Element> = [];


    protected tabRightPicto;


    protected tabLeftPicto;


    protected scrollGap: number;

    // protected tabsScroll: boolean;

    protected tabviewContentList;

    protected tabviewPictoList;

    protected isTouchScreen: boolean;

    protected resizeListener: EventListenerOrEventListenerObject = () => this.manageScrollButtonStyle();

    // index des tableaux
    protected tabsHeaderIndex = 0;
    protected tabsContentIndex = 0;

    constructor(props?: P, context?: any) {
        super(props, context);
        this.state.beforeSelected = -1;
    }

    /**
     * @inheritDoc
     */
    componentWillReceiveProps(nextProps, nextContext: any) {
        super.componentWillReceiveProps(nextProps, nextContext);
        this.showPanel(nextProps.selectedTabIndex);
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        let domElement = ReactDOM.findDOMNode(this);

        if (domElement) {
            let tabViewContentList = domElement.firstElementChild.firstElementChild.children[ 1 ];
            let tabViewList = tabViewContentList.firstElementChild;
            let listTabs = tabViewList.children;
            this.scrollGap = listTabs.item(0).clientWidth;
            window.addEventListener("resize", this.resizeListener);
            this.setState({ tabsScroll: tabViewContentList.clientWidth <= tabViewList.clientWidth });
            this.showPanel(this.state.selectedTabIndex)
        }
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeListener);
    }

    /**
     * retourne l'id en tant que prefixe
     */
    protected prefixWithId(): string {
        return this.state.id + "-";
    }

    /**
     * retourne le nombre d'onglet présent dans le tabs
     * @returns {number}
     */
    public getTabsNumber(): number {
        return this.elementsTabReact.length;
    }

    /**
     * retourne la position de l'onglet dans la liste des onglets
     * @param {number} index
     * @returns {number}
     */
    public getTabPosition(index: number) {
        return this.elementsTab.indexOf(this.getTabByIndex(index));
    }

    /**
     * retourne l'index de l'onglet à la position donnée
     * @param {number} position
     */
    public getIndexAt(position: number) {
        let elem = this.elementsTab[ position ];
        if (elem) {
            return elem.props.index;
        }
    }

    /**
     * rafraichit les onglets
     */
    public refresh() {
        this.elementsHeaderTech = [];
        this.elementsHeaderReact = [];
        this.elementsTabReact = [];
        this.elementsTab = [];
        this.forceUpdate();
    }

    /**
     * Permet d'ajouter des onglets
     * @param {number} position de l'onglet
     */
    public addElements(position: number, tab: JSX.Element | JSX.Element[], cb?) {
        let newTarget: number = position;
        let tabs: any = [];
        if (!Array.isArray(tab)) {
            tabs.push(tab)
        } else {
            tabs = tab;
        }

        tabs.forEach((newTab: JSX.Element) => {
            this.elementsHeaderReact.splice(newTarget, 0, this.createTabsHeader(newTab));
            this.elementsTabReact.splice(newTarget, 0, this.createWrap(newTab));
            newTarget++
        });
        this.forceUpdate(cb);
    }

    /**
     * Permet de supprimer des onglets
     * Attention les index n'ont pas de lien avec l'ordre d'affichage
     * @param {number[]} indexes : l'indice des onglets
     */
    public removeElementsByIndex(...indexes: number[]) {
        indexes.forEach((index: number) => {
            this.removeHeaderTech({ index: index });
            this.removeTab({ index: index });
        });
        this.forceUpdate();
    }

    /**
     * Permet de récup un onglet par son id
     * @param {number} id : l'id de l'onglets
     * @return the Tab
     */
    public getTabById(id: string) {
        return this.elementsTab ? _.find(this.elementsTab, { props: { id: id } }) : null;
    }

    /**
     * Permet de récup des onglet par son index
     * @param {number} id : l'id de l'onglets
     * @return the Tab
     */
    public getTabByIndex(index: number) {
        return this.elementsTab ? _.find(this.elementsTab, { props: { index: index } }) : null;
    }

    /**
     * Permet de supprimer des onglets
     * @param {number[]} id : l'id des onglets
     */
    public removeElementsById(...ids: string[]) {
        ids.forEach((id: string) => {
            this.removeHeaderTech({ id: id });
            this.removeTab({ id: id });
        });
        this.forceUpdate();
    }

    /**
     * Permet de supprimer des onglets et de passer un callback
     * @param {string | string[]} ids
     * @param cb
     */
    public removeElementsByIdWithCb(ids: string | string[], cb?) {
        if (ids instanceof Array) {
            ids.forEach((id: string) => {
                this.removeHeaderTech({ id: id });
                this.removeTab({ id: id });
            });
        } else {
            this.removeHeaderTech({ id: ids });
            this.removeTab({ id: ids });
        }
        this.forceUpdate(cb);
    }

    /**
     * @return renvoie l'indice de onglet courant
     */
    public getCurrentIndexSelected() {
        return this.state.selectedTabIndex;
    }

    /**
     * Permet de supprimer un TabsHeaderTech (instance + JSX.Element)
     */
    protected removeHeaderTech(criteria) {
        _.remove(this.elementsHeaderReact, { props: criteria });
        _.remove(this.elementsHeaderTech, { props: criteria });
    }

    /**
     * Permet de supprimer un Tab (instance + JSX.Element)
     */
    protected removeTab(criteria) {
        _.remove(this.elementsTabReact, { props: criteria });
        _.remove(this.elementsTab, { props: criteria });
    }


    /**
     * Création JSX.Element de TabsHeaderTech
     */
    protected createTabsHeader(tab: JSX.Element): JSX.Element {
        let index = this.tabsHeaderIndex;
        this.tabsHeaderIndex++;
        return (
            <TabsHeaderTech index={index}
                key={"tabHeadertech-" + index}
                isVisible={tab.props.isVisible}
                tab={tab}
                id={tab.props.id}
                prefixWithId={this.prefixWithId}
                handleKeyDown={this.handleKeyDown}
                handleFocus={this.handleFocus}
                castBooleanInNumber={this.castBooleanInNumber}
                deleteTabFunction={tab.props.deleteTabFunction ? tab.props.deleteTabFunction : this.props.deleteTabFunction}
                deleteButtonTitle={tab.props.deleteButtonTitle ? tab.props.deleteButtonTitle : this.props.deleteButtonTitle}
                isDeletable={tab.props.isDeletable}
                selected={this.state.selectedTabIndex === index}
                ref={(tabHeader) => {
                    if (tabHeader) {
                        this.elementsHeaderTech.push(tabHeader);
                    }
                }}
            />
        );
    }

    /**
     * Création d'un JSX.Element de Tab (Wrap)
     */
    protected createWrap(tab: JSX.Element): JSX.Element {
        // définition des props des composants enfants
        let currentIndex = this.tabsContentIndex;
        this.tabsContentIndex++;
        let childPropsSetByParent = {
            id: tab.props.id ? tab.props.id : this.prefixWithId() + currentIndex,
            panelId: tab.props.panelId ? tab.props.panelId : this.prefixWithId() + this.state.panelId + "-" + currentIndex,
            isVisible: (currentIndex === this.state.selectedTabIndex),
            prefixId: this.prefixWithId(),
            index: currentIndex,
            ref: (tab) => {
                if (tab) this.elementsTab.push(tab);
            },
            key: "tabContent" + this.prefixWithId() + currentIndex
        };
        return this.wrap(Tab, childPropsSetByParent, tab.props);


    }

    /**
     * @inheritDock
     */
    render(): JSX.Element {
        logger.trace("Rendu Onglets, Nombre de composants fils =", React.Children.count(this.state.children), this.elementsHeaderTech.length);
        let tableauDesTabs;
        if (this.elementsHeaderTech.length == 0) {
            tableauDesTabs = this.getTabs(this.state.children);
            _.forEach(tableauDesTabs, (item) => {
                this.elementsHeaderReact.push(this.createTabsHeader(item))
            });
        }

        if (this.elementsTab.length == 0) {
            _.forEach(tableauDesTabs, (item) => {
                this.elementsTabReact.push(this.createWrap(item))
            });
        }

        let classNameUl = classNames({
            "tabview-list": true,
            "txtcenter": true,
            "clearfix": true,
        });

        let classTabRightPicto = classNames({
            "tabs-arrow-right": true,
            "disabled": false,
            "fr": true
        });

        let classTabLeftPicto = classNames({
            "tabs-arrow-left": true,
            "disabled": true,
            "fr": true
        });

        let classTabviewPictoList = classNames({
            "tabviewPictoList": true,
            "tabviewPictoList-hidden": !this.state.tabsScroll
        });

        let classTabsViewHeader = classNames({
            "tabviewHeader": true,
            "tabs-group": true
        });

        return (
            <div className="tabview" onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchStart}>
                <div className="tabviewHeaderContent">
                    <div className={classTabsViewHeader}>
                        <div className={classTabviewPictoList} id={this.prefixWithId() + "tabviewPictoList"}
                            ref={(div) => {
                                this.tabviewPictoList = div
                            }}>
                            <a className={classTabRightPicto}
                                onClick={this.onClickRightPicto}
                                href="#"
                                title={this.i18n("tabs.arrow-right")}
                                ref={(a) => {
                                    this.tabRightPicto = a
                                }}>
                                <span className="tabs-arrow-hidden-label"> {this.i18n("tabs.arrow-right")}</span>
                            </a>
                            <a className={classTabLeftPicto}
                                onClick={this.onClickLeftPicto}
                                href="#"
                                title={this.i18n("tabs.arrow-left")}
                                ref={(a) => {
                                    this.tabLeftPicto = a
                                }}>
                                <span className="tabs-arrow-hidden-label"> {this.i18n("tabs.arrow-left")}</span>
                            </a>
                        </div>
                        <div className="tabviewContentList" id={this.prefixWithId() + "tabviewContentList"}
                            ref={(div) => {
                                this.tabviewContentList = div
                            }}
                            onTouchStart={this.handleTouchStart}
                            onTouchMove={this.handleTouchStart}>
                            <ul className={classNameUl} role="tablist">
                                {this.elementsHeaderReact}
                            </ul>
                            {this.state.addTabFunction ? <button className={"tabs-add-button"}
                                                                 type={"button"}
                                                                 title={this.props.addButtonTtitle ? this.props.addButtonTtitle : this.i18n("tabs.add-button")}
                                                                 onClick={this.state.addTabFunction}
                                                                 id={this.prefixWithId() + "add-button"}
                            >
                                <span className={"tabs-button-label"}>
                                    {this.props.addButtonTtitle ? this.props.addButtonTtitle : this.i18n("tabs.add-button")}
                                </span>
                            </button> : null}
                        </div>
                    </div>
                </div>
                <div className="tabViewBody">
                    {this.elementsTabReact}
                </div>
            </div>
        )
    }

    protected handleTouchStart() {
        this.isTouchScreen = true;
        let classTabViewContentList = classNames({
            "tabviewContentList": true,
            "touch": true
        });
        this.tabviewContentList.className = classTabViewContentList;

        let classTabviewPictoList = classNames({
            "tabviewPictoList": true,
            "touch": true
        });
        this.tabviewPictoList.className = classTabviewPictoList;
    }

    protected manageScrollButtonStyle(scroll?: TabsButtonScrolling) {
        if (!this.isTouchScreen) {
            let element = document.getElementById(this.prefixWithId() + "tabviewContentList");
            this.scrollElement(scroll, element);
            this.detectScrollRequired();
            this.setScrollButtonsStyle(element);
        }
    }

    protected setScrollButtonsStyle(element: HTMLElement) {
        let maxScrollLeft: number = element.scrollWidth - element.clientWidth;
        let isTabRightPictoDisabled: boolean = (element.scrollLeft == maxScrollLeft);
        let isTabLeftPictoDisabled: boolean = (element.scrollLeft == 0);
        let classTabRightPicto = classNames({
            "tabs-arrow-right": true,
            "disabled": isTabRightPictoDisabled,
            "fr": true
        });
        let classTabLeftPicto = classNames({
            "tabs-arrow-left": true,
            "disabled": isTabLeftPictoDisabled,
            "fr": true
        });
        let classTabviewPictoList = classNames({
            "tabviewPictoList": true,
            "tabviewPictoList-hidden": !this.state.tabsScroll
        });
        this.tabviewPictoList.className = classTabviewPictoList;
        this.tabRightPicto.className = classTabRightPicto;
        this.tabLeftPicto.className = classTabLeftPicto;
    }

    protected detectScrollRequired() {
        let domElement = ReactDOM.findDOMNode(this);
        if (domElement) {
            let tabViewContentList = domElement.firstElementChild.firstElementChild.children[ 1 ];
            let tabViewList = tabViewContentList.firstElementChild;
            this.setState({ tabsScroll: tabViewContentList.clientWidth <= tabViewList.clientWidth });
        }
    }

    protected scrollElement(scroll: TabsButtonScrolling, element: HTMLElement) {
        switch (scroll) {
            case TabsButtonScrolling.RIGHT:
                element.scrollLeft = element.scrollLeft + this.scrollGap;
                break;
            case TabsButtonScrolling.LEFT:
                element.scrollLeft = element.scrollLeft - this.scrollGap;
                break;
            default:
                break;
        }
    }

    protected onClickRightPicto() {
        this.manageScrollButtonStyle(TabsButtonScrolling.RIGHT);
    }

    protected onClickLeftPicto() {
        this.manageScrollButtonStyle(TabsButtonScrolling.LEFT);
    }

    protected getTabs(children) {
        let tableauDesTabs = [];
        React.Children.map(children, function (child: any) {
            if (child.type === Tab) {
                tableauDesTabs.push(child);
            }
        });
        return tableauDesTabs;
    }

    protected castBooleanInNumber(bool: boolean) {
        return (bool) ? null : -1;
    }

    /**
     * change l'onglet actif
     * @param index index de l'onglet a activé
     */
    showPanel(index) {
        if (this.state.beforeSelected != index) {
            if (this.state.beforeSelected != -1) {
                let tab = _.find(this.elementsTab, { props: { index: this.state.beforeSelected } });
                if (tab && this.props.beforeHideTab) {
                    this.props.beforeHideTab(tab, this.state.beforeSelected);
                }
            }
            this.state.beforeSelected = index;
            this.elementsTab.map((item) => {
                item.setState({ isVisible: false });
            });
            this.elementsHeaderTech.map((item) => {
                item.setState({ selected: false });
            });
            let tab = _.find(this.elementsTab, { props: { index: index } });

            let header = _.find(this.elementsHeaderTech, { props: { index: index } });
            if (tab) {
                if (tab.props.onClick) {
                    tab.props.onClick(tab, header, index);
                }
                header.setState({ selected: true });
                let isAsyncTab = !tab.state.mount;
                tab.setState({ isVisible: true, mount: true, spinner: true }, () => {
                    if (isAsyncTab) {
                        if (!(tab.state.children && tab.state.children.props && tab.state.children.props.dataSource)) {
                            tab.setState({ spinner: false });
                        }
                    } else {
                        tab.setState({ spinner: false });
                    }
                    if (this.props.afterShowTab) {
                        this.props.afterShowTab(tab, this.state.beforeSelected);
                    }
                });
            }
        }
    }

    protected setSelectedIndexByKeyboard(index, mode: TabsKeyboardNavigation): number {
        let tabCount: number = this.elementsHeaderReact.length;
        switch (mode) {
            case TabsKeyboardNavigation.NEXT:
                if (index < tabCount - 1) {
                    index++;
                } else {
                    index = 0;
                }
                break;
            case TabsKeyboardNavigation.PREVIOUS:
                if (index > 0) {
                    index--;
                } else {
                    index = tabCount - 1;
                }
                break;
            case TabsKeyboardNavigation.HOME:
                index = 0;
                break;
            case TabsKeyboardNavigation.END:
                index = tabCount - 1;
                break;
            default:
                break;
        }
        return index;
    }

    /**
     * Gère les évèvenements clavier déclenchés
     * @param e évènement
     */
    protected handleKeyDown(e: KeyboardEvent<HTMLElement>): void {
        if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
            let keyCode: number = e.keyCode;

            switch (keyCode) {
                case KeyCodes.RIGHT_ARROW:
                    this.rightArrowKeyDownHandler(e);
                    break;
                case KeyCodes.LEFT_ARROW:
                    this.leftArrowKeyDownHandler(e);
                    break;
                case KeyCodes.DOWN_ARROW:
                    this.downArrowKeyDownHandler(e);
                    break;
                case KeyCodes.UP_ARROW:
                    this.upArrowKeyDownHandler(e);
                    break;
                case KeyCodes.HOME:
                    this.homeKeyDownHandler(e);
                    break;
                case KeyCodes.END:
                    this.endKeyDownHandler(e);
                    break;
                case KeyCodes.PAGE_UP:
                    this.pageUpKeyDownHandler(e);
                    break;
                case KeyCodes.PAGE_DOWN:
                    this.pageDownKeyDownHandler(e);
                    break;
                case KeyCodes.ENTER:
                    this.enterKeyDownHandler(e);
                    break;
                case KeyCodes.F2:
                    this.f2KeyDownHandler(e);
                    break;
                case KeyCodes.ESCAPE:
                    this.escapeKeyDownHandler(e);
                    break;
                case KeyCodes.TAB:
                    this.tabKeyDownHandler(e);
                    break;
                default:
                    break;
            }
        }
    }

    protected handleFocus(e: React.FocusEvent<HTMLElement>) {
        let target = (e.currentTarget as any);
        let id: string = target.firstElementChild.id;
        this.state.selectedTabIndex = +id.replace(this.prefixWithId() + "tabList-item-", "");

        this.manageScrollButtonStyle();
        this.showPanel(this.state.selectedTabIndex);
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected rightArrowKeyDownHandler(e: KeyboardEvent<HTMLElement>): void {
        this.setSelectedTabIndexAndFocus(TabsKeyboardNavigation.NEXT);

    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected leftArrowKeyDownHandler(e: KeyboardEvent<HTMLElement>): void {
        this.setSelectedTabIndexAndFocus(TabsKeyboardNavigation.PREVIOUS);
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected downArrowKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected upArrowKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected homeKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
        this.setSelectedTabIndexAndFocus(TabsKeyboardNavigation.HOME);
    }


    protected setSelectedTabIndexAndFocus(mode: TabsKeyboardNavigation) {
        let source = _.findIndex(this.elementsHeaderReact, { props: { index: this.state.selectedTabIndex } });
        let next = this.setSelectedIndexByKeyboard(source, mode);
        this.state.selectedTabIndex = this.elementsHeaderReact[ next ].props.index;
        let target = _.find(this.elementsHeaderTech, { props: { index: this.state.selectedTabIndex } }) as any;
        target.refs.link.focus();
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected endKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
        this.setSelectedTabIndexAndFocus(TabsKeyboardNavigation.END);
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected pageUpKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected pageDownKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected enterKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected f2KeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    /**
     * A surcharger éventuellement
     * @param e
     */
    protected escapeKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }

    protected tabKeyDownHandler(e: KeyboardEvent<HTMLElement>) {
    }
}
