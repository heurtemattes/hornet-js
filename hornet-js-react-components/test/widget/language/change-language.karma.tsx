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
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});



import SyntheticEvent = React.SyntheticEvent;
import { User } from "src/widget/user/user";
import { isArray } from "util";
import { ChangeLanguage } from "src/widget/language/change-language";
import { Dropdown, Position } from "src/widget/dropdown/dropdown";


const handleChangeLanguage = (i18nLocale: string) => {
    console.log(i18nLocale);
};


let changeLanguageElement: JSX.Element;
let changeLanguage;
@Decorators.describe("Test Karma ChangeLanguage")
class userTest extends BaseTest {
    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });
        Utils.appSharedProps.set("listLanguage",
                                 [
                { langShort: "fr", locale: "Française", langLabel: "française" },
                { langShort: "en", locale: "english", langLabel: "english" } ]);
        changeLanguageElement = (
            <ChangeLanguage handleChangeLanguage={handleChangeLanguage} position={Position.BOTTOMRIGHT} />
        );
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("affichage composant ChangeLanguage")
    displayUserComponent() {
        const id = this.generateMainId();
        changeLanguage = this.renderIntoDocument(changeLanguageElement, id);
        expect(document.querySelector(`#${id} .dropdown-list`).children.length).to.be.equal(2);
        expect(document.querySelector(`.position-bottom-right.dropdown-content.dropdown-content-hidden`)).to.exist;
        this.end();
    }

    @Decorators.it("Clic sur le bouton")
    testClicButtonUser() {
        const id = this.generateMainId();
        changeLanguage = this.renderIntoDocument(changeLanguageElement, id);
        const element = document.getElementById(id);
        expect(element.querySelector(`#${id} .dropdown-button.button-action`)).to.exist;
        expect(element.querySelector(`#${id} .dropdown-content-hidden`)).to.exist;
        const aElement = element.querySelector(`#${id} .button-action`);
        expect(aElement).to.exist;
        (aElement as any).click();
        setTimeout(() => {
            expect(element.querySelector(`#${id} .dropdown-content`)).to.exist;
            this.end();
        },         500);
    }    
}

// lancement des Tests
runTest(new userTest());
