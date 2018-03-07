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

import { TestLogger } from "hornet-js-test/src/test-logger";
import {Logger} from "hornet-js-utils/src/logger";
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

import { TestUtils } from "hornet-js-test/src/test-utils";
import { ReactTestUtils } from "hornet-js-test/src/react-test-utils";
import { Utils } from "hornet-js-utils";
import * as React from "react";
import { NavigationUtils } from "hornet-js-components/src/utils/navigation-utils";
import * as _ from "lodash";

const expect = TestUtils.chai.expect;
const render = ReactTestUtils.render;
const proxyquire = require("proxyquire").noCallThru();

class NavigationUtilsMock extends NavigationUtils {
    public static getConfigMenu() {
        return require("test/widget/navigation/menu-test-app-conf").menu;
    }
}

var PlanNS = proxyquire("src/widget/navigation/plan", {
    "hornet-js-components/src/utils/navigation-utils": {NavigationUtils: NavigationUtilsMock},
});

/* Composant utilisé pour debug Webstorm avec chemin en absolu */
// var PlanNS = proxyquire("src/navigation/plan", {
//     "src/navigation/utils/navigation-utils": { NavigationUtils: NavigationUtilsMock }
// });

/* Setter pour le contextPath pour debug Webstorm */
Utils.config.setConfigObj({
    contextPath: "applitutoriel"
})


var cls = Utils.getContinuationStorage();
var contextMock = {"hornet.user": {name: "admin", roles: [{"id": 1, "name": "admin"}, {"id": 2, "name": "user"}]}};
describe("PlanSpec", () => {

    it("doit afficher le plan de l'application avec restriction sur les rôles => user non connecté", () => {
        // Act
        var $ = render(() =>
                <div id="planDuSiteTest">
                    <PlanNS.Plan/>
                </div>);

        // Assert
        expect($("a[href=\"/applitutoriel/cas1\"]")).to.exist;
        expect($("a[href=\"/applitutoriel/cas2\"]")).to.not.exist;
        expect($("a[href=\"/applitutoriel/cas3\"]")).to.not.exist;

    });

    it("doit afficher le plan de l'application avec restriction sur les rôles => user connecté en tant qu'ADMIN", cls.bind(() => {
        // Act
        var $ = render(() =>
                <div id="planDuSiteTest">
                    <PlanNS.Plan/>
                </div>);

        // Assert
        expect($("a[href=\"/applitutoriel/cas1\"]")).to.exist;
        expect($("a[href=\"/applitutoriel/cas2\"]")).to.exist;
        expect($("a[href=\"/applitutoriel/cas3\"]")).to.not.exist;
        expect($("a[href=\"/applitutoriel/cas4\"]")).to.not.exist;
        expect($("a[href=\"/applitutoriel/cas4.1\"]")).to.not.exist;
        expect($("a[href=\"/applitutoriel/cas5\"]")).to.not.exist;
    }, _.clone(contextMock)));
});