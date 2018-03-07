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
 * hornet-js-core - Ensemble des composants qui forment le coeur de hornet-js
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.1.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { SortData, SortDirection } from "src/component/sort-data";
import { SpinnerType } from "src/services/hornet-superagent-request";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { DatasourceSortOption } from "src/component/datasource/options/datasource-sort-option";
import { CodesError } from "hornet-js-utils/src/exception/codes-error";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
const logger: Logger = Utils.getLogger("hornet-js-core.component.datasource.options.datasource-option");

export interface DataSourceOption {
    sendToFetch(): boolean;
}


export enum CompareMethod {
    COMPARE_DEFAULT = 1,
    COMPARE_WITH_LOWERCASE = 2,
    COMPARE_WITH_UPPERCASE = 3
}

export type CompareFn = (sortData, a: any, b: any) => number

/**
 * Option de tri par defaut dans un datasourcede
 */
export class DefaultSort implements DatasourceSortOption {

    /***
     * @param {SortData[]} sort  données de tri
     * @param {(a: any, b: any) => number} Fonction de comparaison (optionnel).
     * @param {boolean} sendFetch définit si l'option doit être envoyée au fetch ou pas.
     * 
     */
    constructor(public sort: SortData[], public initCompare: CompareMethod | CompareFn = CompareMethod.COMPARE_DEFAULT, public sendFetch: boolean = false) {
    }

    /**
     * définit si l'option doit être envoyée au fetch ou pas
     * @returns {boolean}
     */
    public sendToFetch(): boolean {
        return this.sendFetch;
    }
    public getCompareFunction(number: number): Function {
        switch (number) {
            case CompareMethod.COMPARE_WITH_LOWERCASE:
                return this.compareLowerCase;
            case CompareMethod.COMPARE_WITH_UPPERCASE:
                return this.compareUpperCase;
            default:
                return this.compare;
        }
    }
    public compare = function (sort, a, b): number {
        if (arguments.length < 3) {
            let msg: string = "3 arguments sont necessaires [sortData, a, b]";
            logger.error(msg);
            throw new TechnicalError("ERR_TECH_" + CodesError.DATASOURCE_SORT_ARGS_ERROR, { errorMessage: CodesError.DEFAULT_ERROR_MSG }, null);

        }
        if (this.initCompare && typeof this.initCompare == "function") {
            return this.initCompare(a, b);
        } else {
            let sortDatas = sort ? sort : (this.sort && this.sort.length > 0) ? this.sort : [];
            let result: number;
            sortDatas.every((sortData) => {

                let aValue = a[ sortData[ "key" ] ];
                let bValue = b[ sortData[ "key" ] ];

                if (aValue < bValue) {
                    result = (sortData.dir == SortDirection.ASC) ? -1 : 1;
                    return false
                }

                if (aValue == bValue) {
                    return true;
                }

                if (aValue > bValue) {
                    result = (sortData.dir == SortDirection.ASC) ? 1 : -1;
                    return false;
                }
            });
            return result;
        }
    }

    public compareUpperCase = function (sort, a, b): number {
        if (arguments.length < 3) {
            let msg: string = "3 arguments sont necessaires [sortData, a, b]";
            logger.error(msg);
            throw new TechnicalError("ERR_TECH_" + CodesError.DATASOURCE_SORT_ARGS_ERROR, { errorMessage: CodesError.DEFAULT_ERROR_MSG }, null);

        }

        let sortDatas = sort ? sort : (this.sort && this.sort.length > 0) ? this.sort : [];
        let result: number;
        sortDatas.every((sortData) => {

            let aValue = a[ sortData[ "key" ] ];
            let bValue = b[ sortData[ "key" ] ];


            aValue = (typeof a[ sortData[ "key" ] ] == "string") ? a[ sortData[ "key" ] ].toUpperCase() : (typeof a[ sortData[ "key" ] ] == "undefined") ? "" : a[ sortData[ "key" ] ];
            bValue = (typeof b[ sortData[ "key" ] ] == "string") ? b[ sortData[ "key" ] ].toUpperCase() : (typeof b[ sortData[ "key" ] ] == "undefined") ? "" : b[ sortData[ "key" ] ];


            if (aValue < bValue) {
                result = (sortData.dir == SortDirection.ASC) ? -1 : 1;
                return false
            }

            if (aValue == bValue) {
                return true;
            }

            if (aValue > bValue) {
                result = (sortData.dir == SortDirection.ASC) ? 1 : -1;
                return false;
            }
        });
        return result;
    }

    public compareLowerCase = function (sort, a, b): number {
        if (arguments.length < 3) {
            let msg: string = "3 arguments sont necessaires [sortData, a, b]";
            logger.error(msg);
            throw new TechnicalError("ERR_TECH_" + CodesError.DATASOURCE_SORT_ARGS_ERROR, { errorMessage: CodesError.DEFAULT_ERROR_MSG }, null);

        }

        let sortDatas = sort ? sort : (this.sort && this.sort.length > 0) ? this.sort : [];
        let result: number;
        sortDatas.every((sortData) => {

            let aValue = a[ sortData[ "key" ] ];
            let bValue = b[ sortData[ "key" ] ];

            aValue = (typeof a[ sortData[ "key" ] ] == "string") ? a[ sortData[ "key" ] ].toLowerCase() : (typeof a[ sortData[ "key" ] ] == "undefined") ? "" : a[ sortData[ "key" ] ];
            bValue = (typeof b[ sortData[ "key" ] ] == "string") ? b[ sortData[ "key" ] ].toLowerCase() : (typeof b[ sortData[ "key" ] ] == "undefined") ? "" : b[ sortData[ "key" ] ];



            if (aValue < bValue) {
                result = (sortData.dir == SortDirection.ASC) ? -1 : 1;
                return false
            }

            if (aValue == bValue) {
                return true;
            }

            if (aValue > bValue) {
                result = (sortData.dir == SortDirection.ASC) ? 1 : -1;
                return false;
            }
        });
        return result;
    }
}

export class SpinnerOption implements DataSourceOption {

    /**
     * @param {SpinnerType} type : type de spinner
     * @param {boolean} sendFetch définit si l'option doit être envoyée au fetch ou pas.
     */
    constructor(public type: SpinnerType, public sendFetch?: boolean) {
    }

    /**
     * définit si l'option doit etre envoyée au fetch ou pas
     * @returns {boolean}
     */
    public sendToFetch(): boolean {
        return false;
    }
}

/**
 * Mode d'initialisation de l'init dans un datasource
 */
export class InitAsync implements DataSourceOption {
    /**
     * @param {boolean} isAsync : type d'initialisation
     * @param {boolean} sendFetch définit si l'option doit être envoyée au fetch ou pas.
     */
    constructor(public isAsync: boolean, public sendFetch?: boolean) {
    }

    /**
     * définit si l'option doit etre envoyée au fetch ou pas
     * @returns {boolean}
     */
    public sendToFetch(): boolean {
        return false;
    }
}