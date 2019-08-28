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

import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "src/widget/component/hornet-component";
import { MenuItemConfig } from "src/widget/navigation/menu";
import { BreadCrumbItem } from "src/widget/navigation/bread-crumb-item";
import { NavigationUtils } from "hornet-js-components/src/utils/navigation-utils";
import { URL_CHANGE_EVENT } from "hornet-js-core/src/routes/router-client-async-elements";
import isEqual = require("lodash.isequal");

import "src/widget/navigation/sass/_breadcrumb.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.navigation.breadcrumb");

/**
 * Fil d'ariane
 */
export class BreadCrumb extends HornetComponent<HornetComponentProps, any> {

    /**
     * Construit une instance de BreadCrumb
     * @param props propriétés
     * @param context contexte
     */
    constructor(props: HornetComponentProps, context?: any) {
        super(props, context);

        this.state = {
            ...this.state,
            data: this.getItems(Utils.getCls("hornet.routePath")),
            currentPath: Utils.getCls("hornet.routePath"),
        };

        this.listen(URL_CHANGE_EVENT, this.handleChangePath);
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.debug("Breadcrumb render");
        return (
            (this.state.data.length) ? this.renderBreadCrumb() : null
        );
    }

    componentWillUnmount() {
        this.remove(URL_CHANGE_EVENT, this.handleChangePath);
    }

    renderBreadCrumb(): JSX.Element {
        return (
            <nav id="breadcrumb" aria-label={this.i18n("breadcrumb.arialabel")}>
                <ul className="fil-ariane">
                    {this.renderBreadCrumbElement()}
                </ul>
            </nav>
        );
    }

    /**
     * Rtourne les éléments que constitueront le breadCrumb depuis l'url courante
     * @param currentPath
     * @returns {Array}
     * @protected
     */
    protected getItems(currentPath: string) {

        const menuConfig = NavigationUtils.getConfigMenu();
        const currentItem = NavigationUtils.getCurrentItem(menuConfig, currentPath);
        let items = this.loopElement(menuConfig, currentPath, null, currentItem);
        const welcomePageUrl = Utils.appSharedProps.get("welcomePageUrl");
        // Suppression du fil d'ariane si page d'accueil
        if (items.length === 1 && items[ 0 ].url === welcomePageUrl) {
            items = [];
        }

        /* Ajout de accueil dans le cas ou on est sur une page differente de accueil */
        if (items.length >= 1 && items[ 0 ].url !== welcomePageUrl) {
            items.unshift({ text: "navigation.welcome", url: welcomePageUrl });
        }

        return items;
    }

    /**
     * Boucle sur chacun des éléments
     * @param menuDatas
     * @param currentPath
     * @param currentElement
     * @param currentItemSelected
     * @returns {Array}
     * @protected
     */
    protected loopElement(menuDatas: MenuItemConfig[], currentPath: string, currentElement: MenuItemConfig, currentItemSelected) {

        let datas = [];
        for (let i = 0; i < menuDatas.length; i++) {
            if (menuDatas[ i ].submenu) {
                datas = datas.concat(this.loopElement(menuDatas[ i ].submenu, currentPath, menuDatas[ i ], currentItemSelected));
            }
            if (datas.length === 0) {
                if (isEqual(menuDatas[ i ], currentItemSelected)) {

                    datas.unshift(menuDatas[ i ]);
                    break;
                }
            } else {
                const url = menuDatas[i].url;
                let newUrl = "";
                let separator = "";

                if (url) {
                    const splitUrl = url.split("/");
                    const splitcurrent = currentPath.split("/");

                    for ( let i = 0 ; i < splitUrl.length; i++) {
                        if (splitUrl[i] !== splitcurrent[i]) {
                            const match = (splitcurrent[i]).match(splitUrl[i]);
                            if (match && match.length > 1 && match[1] === splitcurrent[i]) {
                                newUrl += separator + splitcurrent[i];
                            }else {
                                newUrl += separator + splitUrl[i];
                            }
                        }else {
                            newUrl += separator + splitUrl[i];
                        }
                        if (i === 0 ) {
                            separator = "/";
                        }
                    }

                    menuDatas[i].url = newUrl;
                }
                datas.unshift(menuDatas[ i ]);
                break;
            }
        }
        return datas;
    }

    /**
     * Rendu d'un élément du breadCrumb
     * @returns {any}
     * @protected
     */
    protected renderBreadCrumbElement() {
        const items = this.state.data;
        const ln = items.length;

        return items.map(function (item, i) {

            const key = i + 1;
            const data = {
                maxIndice: ln,
                currentIndice: key,
                item,
            };

            return (
                <BreadCrumbItem key={key} data={data} />
            );
        });
    }

    /**
     * Méthode exécutée lors du Changement de currentPath
     * @param ev
     */
    handleChangePath(ev) {
        const currentPath = ev.detail.newPath;
        this.setState({
            currentPath,
            data: this.getItems(currentPath),
        });
    }
}
