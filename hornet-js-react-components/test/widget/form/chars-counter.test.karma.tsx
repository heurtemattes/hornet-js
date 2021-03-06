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

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as React from "react";
import * as assert from "assert";
import { expect } from "chai";

import { CharsCounter } from "src/widget/form/chars-counter";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from "hornet-js-utils";

let element;

let charsCounterElement, charsCounterElementWithoutAlert: JSX.Element;

@Decorators.describe("Test Karma charsCounter")
class CharsCounterTest extends HornetReactTest {
    protected charsCounterRef;

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });

        charsCounterElement = (
            <CharsCounter alertMessage="Le nombre de caractères saisi {count} dépasse le maximum {maxChar}"
                alertTitle="Max char titre"
                charLabel="{count, plural, =0 {0 caractère} =1 {1 caractère} other {# caractères}}"
                showAlert={true}
                maxChar={20}
                className="normal"
                tooManyCharsClassName="limite-depassee"
                elementId="id" text="Hello world!"
                ref={elt => { this.charsCounterRef = elt; }} />
        );

        charsCounterElementWithoutAlert = (
            <CharsCounter showAlert={false}
                maxChar={20}
                charLabel="{count, plural, =0 {0 caractère} =1 {1 caractère} other {# caractères}}"
                className="normal"
                tooManyCharsClassName="limite-depassee"
                elementId="id1" text="Unybnezfyhbhzbhuaaaaa"
                ref={elt => { this.charsCounterRef = elt; }} />
        );
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Affichage charsCounter limite pas dépassée")
    testCharsCounter() {
        const id = this.generateMainId();
        element = this.renderIntoDocument(charsCounterElement, id);
        const charsCounter = document.querySelector(`#${id} #chars-counter-id`);
        expect(charsCounter).to.exist;
        expect(charsCounter.innerHTML).to.equals("12 caractères");
        expect(charsCounter.hasAttribute("class")).to.be.true;
        expect(charsCounter.getAttribute("class")).to.be.equals("normal");
        this.end();
    }

    @Decorators.it("Affichage charsCounter limite dépassée")
    testCharsCounterWithChangeText() {
        const id = this.generateMainId();
        element = this.renderIntoDocument(charsCounterElement, id);
        const charsCounter = document.querySelector(`#${id} #chars-counter-id`);
        expect(charsCounter).to.exist;
        this.charsCounterRef.handleTextChange("sdjnfjioskcnuilnqze12");
        setTimeout(() => {
            expect(charsCounter.innerHTML).to.equals("21 caractères");
            expect(charsCounter.hasAttribute("class")).to.be.true;
            expect(charsCounter.getAttribute("class")).to.be.equals("normal limite-depassee");
            const alert = document.querySelector(".widget-alert-body");

            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            const alertTitle = document.querySelector(".widget-dialogue-title h1") as HTMLDivElement;
            const alertBody = document.querySelector(".widget-alert-body") as HTMLDivElement;
            expect(alertOk).to.exist;
            expect(alertTitle).to.exist;
            const titre: string = "Max char titre";
            expect(alertTitle.innerText.toLowerCase()).to.be.equals(titre.toLowerCase());
            expect(alertBody).to.exist;
            expect(alertBody.innerText).to.be.equals("Le nombre de caractères saisi 21 dépasse le maximum 20");

            (alertOk as any).click();
            this.end();
        },         250);
    }

    @Decorators.it("Affichage charsCounter limite dépassée sans alert")
    charsCounterWithoutAlert() {
        const id = this.generateMainId();
        element = this.renderIntoDocument(charsCounterElementWithoutAlert, id);
        const charsCounter = document.querySelector(`#${id} #chars-counter-id1`);
        expect(charsCounter).to.exist;
        setTimeout(() => {
            expect(charsCounter.innerHTML).to.equals("21 caractères");
            expect(charsCounter.hasAttribute("class")).to.be.true;
            expect(charsCounter.getAttribute("class")).to.be.equals("normal limite-depassee");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.not.exist;
            this.end();
        },         250);
    }
}

// lancement des Tests
runTest(new CharsCounterTest());
