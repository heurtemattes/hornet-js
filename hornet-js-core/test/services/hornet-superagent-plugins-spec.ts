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
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { TestUtils } from "hornet-js-test/src/test-utils";
import { ServiceRequest } from "src/services/service-request";
import { ConfigLib } from "hornet-js-utils/src/config-lib";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Utils } from "hornet-js-utils";
import { NodeApiResultBuilder } from "src/services/service-api-results";
import { NotFoundError } from "hornet-js-utils/src/exception/not-found-error";
import { CacheKey, HornetSuperAgent, HornetPluginConfig } from 'src/services/hornet-superagent';
import * as superAgentPlugins from "hornet-js-core/src/services/superagent-hornet-plugins";

const expect = TestUtils.chai.expect;
const assert = TestUtils.chai.assert;

let _app;
let _port = 3007;
let _server;
let _config: ConfigLib;
let _actionContext;
let defaultMessage = "Message de test";
let _errorMessage = defaultMessage + " : [KO]";
let dateCache = undefined;
let count = 0;

process.on("unhandledRejection", function (reason, promise) {
    console.error("service-api-spec", reason);
    throw reason;
});


process.env.HORNET_CONFIG_DIR_APPLI = __dirname + "/config";

class MyService extends ServiceRequest {

    sending(data): Promise<any> {
        const buildUrl = this.buildUrl("/plugins-test");
        return this.fetch({ method: "get", url: buildUrl, data: data});
    }

    public getFetcher(): HornetSuperAgent {
        return new TestHornetSuperAgent();
    }
}


class TestHornetSuperAgent extends HornetSuperAgent {
    constructor(timeToliveInCache?: number, cacheKey?: CacheKey) {
        super(timeToliveInCache, cacheKey);
        const tempParam = new Date();
        if (count % 2 === 0) {
            // pair
            this.plugins.push(new HornetPluginConfig('AddTempParamDate', superAgentPlugins.AddParam, ['pair', true]));
            this.plugins.push(new HornetPluginConfig('AddTempParam', superAgentPlugins.AddParam, ['fake', count]));
        } else {
            // impair
            this.plugins.push(new HornetPluginConfig('AddTempParamDate', superAgentPlugins.AddParam, ['pair', false]));
            this.plugins.push(new HornetPluginConfig('AddTempParam', superAgentPlugins.AddParam, ['fake', undefined]));
        }
        count+=1;

    }
}

describe("hornet superagent plugins", () => {

    before(function (done) {
        _app = express();

        _app.use(bodyParser.json()); // to support JSON-encoded bodies

        _app.get("/service-api-spec-service/plugins-test", function (req, res) {
            console.debug("/ok");
            res.json(req.query);
        });


        const testConfig = {
            defaultServices: {
                host: "http://localhost:" + _port + "/",
                name: "service-api-spec-service",
            },request: {
                enabled: false,
                cache: {
                  client: {
                    enabled: false,
                    "timetolive": 60
                  },
                  server: {
                    enabled: false,
                    timetolive: 60
                  }
                }
              }
        };

        Utils.setConfigObj(testConfig);

        TestUtils.startExpressApp(_app, _port, function (server, port, err) {
            _server = server;
            _port = port;
            _config = new ConfigLib();
            _config.setConfigObj(testConfig);
            done(err);
        });
    });

    after(() => {
        _server && _server.close();
    });

    it("should resolve with impair and pair", (done) => {

        const service = new MyService();

        service.sending({}).then((result: any) => {
            expect(result).to.exist;
            expect(result.fake).to.be.equal("0");
            expect(result.pair).to.be.equal("true");
            service.sending({}).then((result: any) => {
                expect(result).to.exist;
                expect(result.pair).to.be.equal("false");
                expect(result.fake).to.not.exist;
                service.sending({}).then((result: any) => {
                    expect(result).to.exist;
                    expect(result.pair).to.be.equal("true");
                    expect(result.fake).to.be.equal("2");
                    done();
                });
            });
        });
    });

});
