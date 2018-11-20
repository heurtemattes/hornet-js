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
 * @version v5.2.3
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetComponent } from "src/widget/component/hornet-component";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Header } from "src/widget/table/header";
import { Content, UNIT_SIZE } from "src/widget/table/content";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { Columns } from "src/widget/table/columns";
import { Footer } from "src/widget/table/footer";
import { TableState, ContentState } from "src/widget/table/table-state";
import { Notification } from "src/widget/notification/notification";
import { ToggleColumnsButton } from "src/widget/table/toggle-columns-button";
import { CheckColumn } from "src/widget/table/column/check-column";

const logger: Logger = Utils.getLogger("hornet-js-components.widget.table.table");

/**
 * Propriétés du composant Table
 */
export interface TableProps extends HornetComponentProps {
    /** identifiant unique  */
    id: string;
    /** Classe CSS personnalisée */
    className?: string;

    width?: number;
    /** Tableau visible ou non */
    isVisible?: boolean;
}

/**
 * Component Table
 */
export class Table extends HornetComponent<TableProps, any> {

    protected tableState: TableState;
    protected contentState: ContentState;

    static defaultProps = {
        className: "hornet-datatable-header",
        isVisible: true,
    };

    constructor(props: TableProps, context?: any) {
        super(props, context);

        this.tableState = new TableState();
        this.contentState = new ContentState();
        if (!props.width) {
            this.tableState.once(TableState.RESIZE_EVENT, this.handleResize.bind(this));
        }

        this.state = {
            ...this.state,
            isMounted: false,
        };

        this.contentState.setHasCheckColumnMassSelection(this.hasCheckColumnChildren());
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isVisible !== nextState.isVisible;
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.tableState.removeContents();
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.setState({ isMounted: true });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.debug("Table render : ", this.props.id);

        // si au moins un content n'a pas de notifId specifé, on instancie le composant Notification
        const myContents: any[] = this.getComponentsBy(Content);
        const notifId: string = "notif-" + this.props.id;
        let componentContent: any;
        if (myContents && myContents.length > 0) {
            myContents.map((myContent) => {
                if (!myContent.props.notifId && myContent.props.onSubmit) {
                    componentContent = myContent;
                }
            });
        }

        if (this.state.isVisible) {
            return componentContent ?
                <div><Notification id={notifId} /> {this.renderTable(myContents)}</div> :
                <div> {this.renderTable(myContents)} </div>;
        }

        return <div />;
    }

    /**
     * Méthode de redimensionnement du s
     * @param width
     */
    handleResize(width: number) {
        this.setState({ width });
    }

    /**
     * rendu du composant table
     * @returns {any}
     */
    protected renderTable(myContents): JSX.Element {
        const myHeader: any = this.getComponentBy(Header);
        return (
            <div className="datatable-container">
                {this.renderHeader(myHeader, myContents)}
                {this.renderContent(myHeader, myContents)}
                <div className="hornet-datatable-bottom">
                    {this.renderFooter()}
                </div>
            </div>
        );
    }

    /**
     * Méthode permettant de remonter les informations liées aux colonnes
     * @returns {Array}
     */
    protected getColumnsInformation(myContents) {
        let infoColumns = {};
        let id: string = this.props.id;

        if (myContents && myContents.length > 0) {
            myContents.map((myContent, index) => {
                const myColumns: any[] = HornetComponent.getChildrenFrom(myContent, Columns);
                const keyColumns = [];
                id += "-" + index;
                if (myColumns.length > 0) {
                    myColumns.map((column) => {
                        if (column && column.props && column.props.hiddenable) {
                            keyColumns.push({
                                keyColumn: column.props.keyColumn,
                                title: column.props.title,
                                width: (column.props.defaultWidth || column.props.width) + UNIT_SIZE,
                            });
                        }
                    });
                }

                infoColumns = { columns: keyColumns, id };
            });
        }
        return infoColumns;
    }

    /**
     * fonction qui retourne la liste des PaginateDataSource de tous les contents du composant table
     * @returns {PaginateDataSource<any>[]}
     */
    protected getContentsDataSources(myContents): PaginateDataSource<any>[] {
        const listPaginateDataSource: PaginateDataSource<any>[] = [];
        myContents.map((myContent) => {
            listPaginateDataSource.push(myContent.props.dataSource);
        });

        return listPaginateDataSource;
    }

    /**
     * Création d'un composant React
     * @returns {any}
     */
    protected renderHeader(myComponent, myContents): JSX.Element {
        if (myComponent) {
            const key = "header-" + this.props.id ;
            const props = {...myComponent.props,
                parentId: this.props.id,
                key,
                tableState: this.tableState,
                contentState: this.contentState,
                dataSourcesList: this.getContentsDataSources(myContents),
                tabIndex: -1,
                columns: this.getColumnsInformation(myContents),
                hiddenColumns: this.getHiddenColumns(myComponent)};
            return React.createElement(Header, props);
        } else {
            return <div tabIndex={-1} />;
        }
    }

    /**
     * Création d'un composant React
     * @returns {any}
     */
    protected renderFooter(): JSX.Element {
        const myComponent: any = this.getComponentBy(Footer);
        if (myComponent) {
            return <Footer {...myComponent.props} contentState={this.contentState} />;
        } else {
            return <div />;
        }
    }

    /**
     * Rendu Html du/des content(s) du Table
     * @param myHeader
     * @param myContents
     * @returns {any}
     */
    protected renderContent(myHeader, myContents) {

        const Contents = [];
        if (myContents && myContents.length > 0) {
            myContents.map((myContent, index) => {
                if (this.state.isMounted || this.state.isVisible) {
                    this.tableState.addContent(this.contentState);

                    const id: string = myContent.props.id || this.props.id + "-" + index;
                    const width: number = (this.props.width || this.state.width) / 13 - 0.3;
                    const key = "content-" + this.props.id + "-" + index ;
                    const notifId = myContent.props.notifId || "notif-" + this.props.id;
                    const props = {...myContent.props,
                        id,
                        key,
                        contentState: this.contentState,
                        width,
                        notifId,
                        tabIndex: -1,
                        hiddenColumns: this.getHiddenColumns(myHeader),
                        title: (!myContent.props.title && myHeader && myHeader.props && myHeader.props.title) ? myHeader.props.title : myContent.props.title};
                    Contents.push(React.createElement(Content, props ));
                }
            });
            return Contents;
        } else {
            return <div tabIndex={-1} />;
        }
    }

    /**
     * Permet de récupérer les colonnes masquées par défaut
     * @param myHeader
     * @returns {any}
     */
    protected getHiddenColumns(myHeader) {
        let myToggleColumnsButton = null;
        if (myHeader) {
            React.Children.map(myHeader.props.children, (child: React.ReactChild) => {
                if ((child as React.ReactElement<any>).type === ToggleColumnsButton) {
                    myToggleColumnsButton = child;
                }
            }) || null;

            if (myToggleColumnsButton
                && (myToggleColumnsButton as React.ReactElement<any>).props
                && (myToggleColumnsButton as React.ReactElement<any>).props[ "hiddenColumns" ]) {
                return (myToggleColumnsButton as React.ReactElement<any>).props[ "hiddenColumns" ];
            }
        }

        return {};
    }

    protected hasCheckColumnChildren(): boolean {
        let res: boolean;
        const children = this.getCheckColumnChildrenDeep(this);
        res = (children && children.length > 0);

        if (res) {
            if (children[ 0 ].props && children[ 0 ].props.keyColumn) {
                this.contentState.setKeycolumnMassSelection(children[ 0 ].props.keyColumn);
            }
        }

        return res;
    }

    protected getCheckColumnChildrenDeep(startElement: any, childrenList?: any[]): any[] {
        let children: any[] = childrenList ? childrenList : [];

        React.Children.map(startElement.props.children, (child: React.ReactChild) => {
            const reactElement = (child as React.ReactElement<any>);
            if (reactElement) {
                if (reactElement.type === CheckColumn) {
                    children.push(child);
                    children = this.getCheckColumnChildrenDeep(child, children);
                } else if (Array.isArray(reactElement.props.children)) {
                    React.Children.map(startElement.props.children, (subChild: React.ReactChild) => {
                        children = this.getCheckColumnChildrenDeep(subChild, children);
                    });
                } else {
                    children = this.getCheckColumnChildrenDeep(child, children);
                }
            }
        });
        return children.filter((element) => (element != null && element));
    }
}
