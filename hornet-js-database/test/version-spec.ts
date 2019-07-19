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
// dossiers de configuration
process.env.HORNET_CONFIG_DIR_APPLI = __dirname + "/config";

import { TestUtils } from "hornet-js-test/src/test-utils";
import { Logger } from "hornet-js-logger/src/logger";
import { TestLogger } from "hornet-js-test/src/test-logger";
import { CodesError } from "hornet-js-utils/src/exception/codes-error";

Logger.prototype.buildLogger = TestLogger.getLoggerBuilder({
    "appenders": {
        "console": {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[%d{ISO8601}|%p|%c|%m%]"
            }
        }
    },
    "categories": {
        "default": { "appenders": ["console"], "level": "INFO" }
    }
});
import { Utils } from 'hornet-js-utils';
import * as path from "path";
let conf = Utils.config.getConfigObj();
if (!conf.database) {
    conf.database = {
        "configTest": {
          "basename": "sequelizeOne",
          "username": "test",
          "password": "test",
          "options": {
              "dialect": "sqlite",
              "storage": "/database/database.sqlite",
              "pool": {
                  "max": 15,
                  "min": 0,
                  "idle": 1000
              },
              "timestamps": false,
              "loggingLevel": "INFO",
              "define": {
                  "timestamps": false,
                  "version": false
              }
          },
          "reload": true
        },
        "configTestBis": {
          "basename": "sequelizeTwo",
          "username": "test",
          "password": "test",
          "options": {
            "dialect": "sqlite",
            "storage": "/database/database.1.sqlite",
            "pool": {
              "max": 15,
              "min": 0,
              "idle": 1000
            },
            "timestamps": false,
            "loggingLevel": "DEBUG",
            "define": {
              "timestamps": false,
              "version": false
            }
          },
          "reload": true
    
        }
      }
      conf.database.configTestBis.options.storage = path.join(__dirname, "..", "..", "test", conf.database.configTestBis.options.storage);
}
console.log(conf.database.configTestBis.options.storage);
Utils.config.setConfigObj(conf);
let expect = TestUtils.chai.expect;

import { Database } from "src/sequelize/database";
import { UtilisateursDAO } from "test/dao/utilisateurs-dao";
import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";
import { ModelDAO } from "test/dao/model-dao";

const dbConfig2 = "configTestBis";
describe("Test LockOptimistic Sequelize", () => {

    before((done) => {
        const files = [__dirname + "/../../test/database/01_createTablesSqlite.sql", __dirname + "/../../test/database/02_initDataSqlite.sql"];
        if (!Injector.getRegistered("databaseConfigName")) {
            Injector.register("databaseConfigName", dbConfig2);
        } else if (Injector.getRegistered("databaseConfigName") !== dbConfig2) {
            Injector.removeRegistered("databaseConfigName");
            Injector.register("databaseConfigName", dbConfig2);
        }

        Database.runScripts([ {
            configName: dbConfig2,
            files: files
        }]).then(() => {
            if (Injector.getRegistered(ModelDAO)) {
                Injector.removeRegistered(ModelDAO);
            }
            Injector.register(ModelDAO, ModelDAO, Scope.SINGLETON_EAGER);
            done();
        }).catch(e => { done(e) });
    });
    

    it("Test chargement de données", (done) => {
        new UtilisateursDAO().listerUtilisateurs().
        then((lUtilisateurs) => {
            expect(lUtilisateurs).to.be.an('array').that.is.not.empty;
            expect(lUtilisateurs).to.have.lengthOf(3);
            done();
        }).catch(e => done(e));
    });

    it("Test de la version", (done) => {
        new UtilisateursDAO().findOne({where: {login: "admin"}}).
        then((utilisateur) => {
            expect(utilisateur).to.not.be.undefined;
            expect(utilisateur.login).to.equal("admin");
            expect((utilisateur as any).version).to.equal(0);
            done();
        }).catch(e => done(e));
    });


    it("Test Maj Auto version", (done) => {
        new UtilisateursDAO().findOne({where: {login: "admin"}}).
        then((utilisateur) => {
            new UtilisateursDAO().updateById(utilisateur.id, utilisateur).
            then((updateInfo) => {
                expect(updateInfo).to.be.an('array').that.is.not.empty;
                expect(updateInfo[0]).to.equal(1);
                new UtilisateursDAO().findOne({where: {login: "admin"}}).
                then((utilisateur) => {
                    expect((utilisateur as any).version).to.equal(1);
                    done();
                });
            });
        }).catch(e => done(e));
    });

    it("Test Lock Optimistic", (done) => {
        let utilisateurBeforeUpdate;
        new UtilisateursDAO().findOne({where: {login: "admin"}}).
        then((utilisateur) => {
            utilisateurBeforeUpdate = utilisateur;
            new UtilisateursDAO().updateById(utilisateur.id, utilisateur).
            then((updateInfo) => {
                expect(updateInfo).to.be.an('array').that.is.not.empty;
                expect(updateInfo[0]).to.equal(1);
                new UtilisateursDAO().updateById(utilisateurBeforeUpdate.id, utilisateurBeforeUpdate).
                catch(e => {
                    expect(e.code).to.equal("ERR_TECH_" + CodesError.SEQUELIZE_OPTIMISTIC_LOCK_ERROR);
                    done();
                })
            });
        }).catch(e => done(e));
    });
});
