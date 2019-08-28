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
 * hornet-js-database - Ensemble des composants de gestion de base hornet-js
 *
 * @author 
 * @version v5.4.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import * as Sequelize from "sequelize";
import { DbConnect } from "src/sequelize/dbconnect-sequelize";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { CodesError } from "hornet-js-utils/src/exception/codes-error";
import { Class } from "hornet-js-utils/src/typescript-utils";
import assignIn = require("lodash.assignin");

export type HornetEntity<T> = Class<Sequelize.Model<T>> & { entityName?: string; };

/**
 * Décorator pour entity.
 * Déclare une entity à partir du nom de la table cible et du type défini pour sequelize
 * Si freezeTableName est activé, Sequelize prendra le nom de la table tableName tel quel
 * pour trouver la table dans la base de données.
 * La classe portant les annotations Entity doit implémenter IModelDAO
 * @param tableName : nom de la table cible [obligatoire]
 * @param Model : type retourné par sequelize [obligatoire]
 * @param options: objet de configuration pour Sequelize [optionnel]
 * { 
 *   freezeTableName : activer l'option freezeTableName de sequelize - [default = true]
 *   schema : schema où se situe la table
 *   ...
 * }
 */
export function Entity(tableName: string, Model: Sequelize.ModelAttributes, options?: any|{version?: Version}) {
    return (target: Object, propertyKey: string | symbol) => {
        let confOptions = options || {};
        let conFreezeTableName: boolean;

        conFreezeTableName = (options && options.freezeTableName) ? options.freezeTableName : true;
        confOptions.freezeTableName = conFreezeTableName;
        Object.defineProperty(target, propertyKey.toString(), {
            get: function () {
                if (!target["__inner__" + propertyKey.toString()]) {
                    let innerOptions = {};
                    const myEntity = target["config"][propertyKey.toString()];
                    for (let i = 0; i < Object.keys(myEntity).length; i++) {
                        if (Object.keys(myEntity)[i].toString() !== "table"
                            && Object.keys(myEntity)[i].toString() !== "Model") {
                            const tmpObject = {};
                            tmpObject[Object.keys(myEntity)[i].toString()] = myEntity[Object.keys(myEntity)[i]];
                            innerOptions = assignIn(innerOptions, tmpObject);
                        }
                    }
                    target["__inner__" + propertyKey.toString()] = DbConnect.getGlobal(this["configDatabase"])
                        .sequelize.define(myEntity.table, myEntity.Model, innerOptions);
                    target["__inner__" + propertyKey.toString()].entityName = propertyKey.toString();

                    if (innerOptions && innerOptions["schema"]) {
                        target["__inner__" + propertyKey.toString()].schema(innerOptions["schema"]);
                    }
                }
                return target["__inner__" + propertyKey.toString()];
            }, enumerable: true
        });
        if (!target["config"]) {
            target["config"] = {};
        }
        const myObject = assignIn({ table: tableName, Model: Model }, confOptions);


        if(confOptions.version && (!myObject.hooks || !myObject.hooks.beforeUpdate)) {
            myObject.hooks = myObject.hooks || {};
            myObject.hooks.beforeUpdate = instance => {
                let versionAttributName = confOptions.version.attributName ||  "version";
                if(instance[versionAttributName] !== instance._previousDataValues[versionAttributName]) {
                    throw new TechnicalError("ERR_TECH_" + CodesError.SEQUELIZE_OPTIMISTIC_LOCK_ERROR, {errorMessage: `Entity Version not match, current in database ${instance[versionAttributName]} and your is ${instance.dataValues[versionAttributName]}`});
                }
                instance.dataValues[versionAttributName] = (confOptions.version.nextVal || nextversionTimestamp)(instance[versionAttributName]);//Date.now();
            }
        }

        target["config"][propertyKey.toString()] = myObject;
    };
}

export const nextversionTimestamp = Date.now;
export const nextversionInteger = (version: number) => { return version + 1};

export interface Version {
    attributName?: string;
    nextVal?: (currentValue) => any;
}