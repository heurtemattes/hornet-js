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
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";

import { Tabs } from "hornet-js-react-components/src/widget/tab/tabs";
import { Tab } from "hornet-js-react-components/src/widget/tab/tab";
import * as _ from "lodash";

let tabsElement: JSX.Element;
let tabs;
let beforeHideTabCount = 0;
let idPanel;

@Decorators.describe("Test Karma tabs")
class tabsAddButtonTest extends HornetReactTest {
    @Decorators.before
    beforeEach() {
        tabs = null;
        beforeHideTabCount = 0;
        idPanel = this.generateMainId();

        tabsElement = (
            <Tabs id="tabs" selectedTabIndex={0} beforeHideTab={() => {
                beforeHideTabCount++;
                console.log("beforeHideTabCount", beforeHideTabCount, beforeHideTabCount%2);
                return beforeHideTabCount%2 == 0;
            }}
            ref={(node) => {tabs=node}} 
            >
                <Tab title="tab1">
                    <div>TabContent1</div>
                </Tab>
                <Tab title="tab2">
                    <div>TabContent2</div>
                </Tab>
            </Tabs>
        );
    }

    @Decorators.it("init")
    testTabExist() {
        tabs = this.renderIntoDocument(tabsElement, idPanel);
        expect(document.querySelector(`#tabs-panel-1 > div`)).to.exist;
        expect((document.querySelector(`#tabs-panel-1 > div`) as any).innerText).to.exist;
        expect((document.querySelector(`.tab-panel-selected > div`) as any).innerText, "Premier affichage, on doit arriver sur l'onglet 1")
        .to.equal("TabContent1", "");
        this.end();
    }

    @Decorators.it("1er click ne change pas l'onglet actif")
    testTabNoChange() {
        console.log(`#${idPanel} #tabs-1 > a`);
        this.triggerMouseEvent(document.querySelector(`#${idPanel} #tabs-1`), "focus");
        expect((document.querySelector(`.tab-panel-selected > div`) as any).innerText, "On doit rester sur l'onglet 1")
        .to.equal("TabContent1");
        this.triggerMouseEvent(document.querySelector(`#${idPanel} #tabs-1`), "focus");
        expect((document.querySelector(`.tab-panel-selected > div`) as any).innerText, "On a affiché l'onglet 2")
        .to.equal("TabContent2");
        this.triggerMouseEvent(document.querySelector(`#${idPanel} #tabs-0`), "focus");
        expect((document.querySelector(`.tab-panel-selected > div`) as any).innerText, "On doit rester sur l'onglet 2")
        .to.equal("TabContent2");
        this.triggerMouseEvent(document.querySelector(`#${idPanel} #tabs-0`), "focus");
        expect((document.querySelector(`.tab-panel-selected > div`) as any).innerText, "On a affiché l'onglet 1")
        .to.equal("TabContent1");
        this.end();
    }

}

// lancement des Tests
runTest(new tabsAddButtonTest());
