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
process.env.HORNET_CONFIG_DIR_APPLI = __dirname + "/config";

import { TestLogger } from "hornet-js-test/src/test-logger";
import { Logger } from "hornet-js-logger/src/logger";

Logger.prototype.buildLogger = TestLogger.getLoggerBuilder({
    appenders: {
        console: {
            type: "console",
            layout: {
                type: "pattern",
                pattern: "%[%d{ISO8601}|%p|%c|%m%]"
            }
        }
    },
    categories: {
        default: { appenders: ["console"], level: "INFO" }
    }
});
import { Utils } from "hornet-js-utils";
import { TestUtils } from "hornet-js-test/src/test-utils";
import { Injector } from "hornet-js-core/src/inject/injector";
import { Database } from "src/sequelize/database";
import { ModelDAO } from "test/dao/model-dao";
import { Scope } from "hornet-js-core/src/inject/injectable";
import * as path from "path";
import { Decorators } from 'hornet-js-test/src/decorators';
import { BaseMochaTest } from 'hornet-js-test/src/base-mocha-test';
import { runTest } from 'hornet-js-test/src/test-run';
import { UtilisateursDAO } from 'test/dao/utilisateurs-dao';
import { RoleDAO } from 'test/dao/role-dao';
import { Transactional } from 'src/decorators/dec-transactional';
import { HornetTestAssert } from 'hornet-js-test/src/hornet-test-assert';
import { Promise } from "hornet-js-utils/src/promise-api";

const expect = TestUtils.chai.expect;
const dbConfig1 = "configTest";
const dbConfig2 = "configTestBis";
const conf = Utils.config.getConfigObj();

conf.database = {
    "configTest": {
        "basename": "sequelizeOne",
        "username": "test",
        "password": "test",
        "options": {
            "dialect": "sqlite",
            "pool": {
                "max": 15,
                "min": 0,
                "idle": 1000
            },
            "define": {
                "timestamps": false,
                "version": false
            },
            "loggingLevel": "DEBUG"
        },
        "reload": true
    },
    "configTestBis": {
        "basename": "sequelizeTwo",
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

    }
}

if (conf.database.configTestBis.options.storage && !conf.database.configTestBis.options.storage.includes("test")) {
    conf.database.configTestBis.options.storage = path.join(__dirname, "..", "..", "test", conf.database.configTestBis.options.storage);
    Utils.config.setConfigObj(conf);
}

@Decorators.describe("Test du decorator Transactional")
class TransactionalTest extends BaseMochaTest {

    @Decorators.beforeEach
    beforeEach(done) {
        const files = [__dirname + "/../../test/database/01_createTablesSqlite.sql", __dirname + "/../../test/database/02_initDataSqlite.sql"];
        if (!Injector.getRegistered("databaseConfigName")) {
            Injector.register("databaseConfigName", dbConfig1);
        } else if (Injector.getRegistered("databaseConfigName") !== dbConfig1) {
            Injector.removeRegistered("databaseConfigName");
            Injector.register("databaseConfigName", dbConfig1);
        }
        Database.runScripts([{
            configName: dbConfig1,
            files: files
        }]).then(() => {
            if (Injector.getRegistered(ModelDAO)) {
                Injector.removeRegistered(ModelDAO);
            }
            Injector.register(ModelDAO, ModelDAO, Scope.SINGLETON_EAGER);
            done();
        }).catch(e => { done(e) });
    }

    @Decorators.it("Test de transaction ok")
    testTransactionOk() {
        this.udpateUserAndRole("admin", "root", "APPLI_TUTO_ADMIN", "APPLI_TUTO_ROOT").then((result) => {
            // vérifier que le user root existe  bien
            new UtilisateursDAO().findOne({ where: { login: "root" } }).then(user => {
                HornetTestAssert.assertNotNull(user, "Le résultat est null");
            }).then((r) => {
                // vérifier que le admin n'existe plus
                new UtilisateursDAO().findOne({ where: { login: "admin" } }).then(user => {
                    expect(user, "Le user n'est pas null").to.be.undefined;
                }).then(r => {
                    // vérifier que le role APPLI_TUTO_ROOT existe  bien
                    new RoleDAO().findOne({ where: { rolNom: "APPLI_TUTO_ROOT" } }).then(role => {
                        HornetTestAssert.assertNotNull(role, "Le résultat est null");
                    });
                }).then(r => {
                    // vérifier que le role APPLI_TUTO_ADMIN  n'existe plus
                    new RoleDAO().findOne({ where: { rolNom: "APPLI_TUTO_ADMIN" } }).then(role => {
                        expect(role, "Le user n'est pas null").to.be.undefined;
                        this.end();
                    });
                });;
            })
        }).catch(e => { this.end(e) });
    }

    @Decorators.it("Test de transaction ko")
    testTransactionKo() {
        this.udpateUserAndRole("admin", "root", "APPLI_TUTO_ADMIN", "APPLI_TUTO_ROOT_APPLI_TUTO_ROOT_APPLI_TUTO_ROOT").catch((result) => {
            // vérifier que le user root n'existe pas suite au rollback du par la tentative d'enregistrer un rolName qui dépasse 30 caractères
            new UtilisateursDAO().findOne({ where: { login: "root" } }).then(user => {
                expect(user, "Le user n'est pas null").to.be.undefined;
            }).then((r) => {
                //Vérifier quer le user admin existe bien
                new UtilisateursDAO().findOne({ where: { login: "admin" } }).then(user => {
                    HornetTestAssert.assertNotNull(user, "Le résultat est null");
                }).then(r => {
                    // vérifier que le role APPLI_TUTO_ROOT_APPLI_TUTO_ROOT_APPLI_TUTO_ROOT n'existe  pas
                    new RoleDAO().findOne({ where: { rolNom: "APPLI_TUTO_ROOT_APPLI_TUTO_ROOT_APPLI_TUTO_ROOT" } }).then(role => {
                        expect(role, "Le role n'est pas null").to.be.undefined;
                    }).then((r) => {
                        // Vérifier que le role APPLI_TUTO_ADMIN existe bien
                        new RoleDAO().findOne({ where: { rolNom: "APPLI_TUTO_ADMIN" } }).then(role => {
                            HornetTestAssert.assertNotNull(role, "Le résultat est null");
                            this.end();
                        })
                    });
                })
            });
        }).catch(e => {
            this.end(e);
        });
    }

    /**
     * Méthode transactionnelle : cherche le user ayant le login loginToFind puis modifie son login par newLogin
     * et cherche le role roleToFind puis le modifie par newRole
     * @param loginToFind : le login du user à chercher
     * @param newLogin : le nouveau login 
     * @param roleToFind : le role à chercher
     * @param newRole : le nouveau role
     */
    @Transactional({ configDatabase: "configTest" })
    udpateUserAndRole(loginToFind, newLogin, roleToFind, newRole): Promise<any> {
        return new UtilisateursDAO().findOne({ where: { login: loginToFind } }).then((user) => {
            user.login = newLogin;
            return new UtilisateursDAO().updateById(user.id, user).then((result) => {
                return new RoleDAO().findOne({ where: { rolNom: roleToFind } }).then((role) => {
                    return new RoleDAO().updateByIdGeneric(role.id, { rolNom: newRole });
                });
            });
        });
    }
}

// lancement des Tests
runTest(new TransactionalTest());
