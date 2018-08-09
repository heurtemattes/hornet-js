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
 * @version v5.2.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as React from "react";
import * as assert from "assert";
import { expect } from 'chai'

import { InputField } from "src/widget/form/input-field";
import { Form } from "src/widget/form/form";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from 'hornet-js-utils';


let elementBase, elementWithValue, elementWithValueEtCompteur: JSX.Element;
let $element;
let count: number = 0;

@Decorators.describe('Test Karma InputField')
class InputFieldTest extends HornetReactTest {
    protected inputField;

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages: messages });
        count++;
        elementBase = (
            <InputField name="prenom"
                id="prenom"
                label={"prénom"}
                required={true}
                requiredLabel="Prénom obligatoire"
                maxLength={50}
                resettable={true}
            />
        );

        elementWithValue = (
            <Form id={"id-form-" + count} defaultValues={{ prenom: "test" }}>
                <InputField name="prenom"
                    id="prenom"
                    label={"prénom"}
                    required={true}
                    requiredLabel="Prénom obligatoire"
                    maxLength={50}
                    resettable={true}
                    maxChar={25}
                />
            </Form>
        );

        elementWithValueEtCompteur = (<InputField name="nom"
            ref={elt => { this.inputField = elt; }}
            id="nom"
            label={"Nom"}
            required={true}
            requiredLabel="Prénom obligatoire"
            maxLength={50}
            resettable={true}
            maxChar={25}
            displayMaxCharInLabel={true}
            displayCharNumber={true}
            showAlert={true}
        />)
    };

    @Decorators.it('Test OK')
    testOk() {
        assert.equal(1, 1);
        this.end();
    };

    @Decorators.it("Vérifier l'existence du champ Input")
    testInput() {
        $element = this.renderIntoDocument(elementBase, "main1");
        expect(document.querySelector('#main1 #prenom'), "Problème élément Input non trouvé").to.exist;
        this.end();
    };

    @Decorators.it("Vérifier la non existence du bouton reset lorsqu'un champ est vide")
    testNoResetButton() {
        $element = this.renderIntoDocument(elementBase, "main2");
        expect(document.querySelector('#main2 #prenomResetButton.input-reset.input-reset-hidden'), "bouton reset trouvé").to.not.exist;
        this.end();
    };

    @Decorators.it("Vérifier l'existence du bouton reset lorsqu'un champ est valorisé")
    testResetButton() {
        $element = this.renderIntoDocument(elementWithValue, "main3");
        expect(document.querySelector("#main3 #prenomResetButton.input-reset"), "bouton reset non trouvé").to.exist;
        this.end();
    }

    @Decorators.it("Test reverseLabel")
    testReverseLabel() {
        const elementWithReverseLabel = (<InputField name="testReverseLabel"
            label={"testReverseLabel"}
            reverseLabel={true}
        />)
        const id = this.generateMainId();
        this.renderIntoDocument(elementWithReverseLabel, id);
        setTimeout(() =>{
            expect(document.querySelector(`#${id} .abstractfield-container-reverse-label`)).to.exist;
            this.end();
        }, 250);
    }

    @Decorators.it("Test du compte de caractère")
    testCharsCounter() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main400");
        const inputNom = document.querySelector("#main400 #nom") as HTMLTextAreaElement;
        this.triggerKeydownEvent(inputNom, "m", 77, true);
        setTimeout(() => {
            const charLabel = document.querySelector("#main400 .chars-counter") as HTMLDivElement;
            expect(charLabel).to.exist;
            expect(charLabel.innerHTML).to.equals("1 caractère");
            this.end();
        }, 250);
    }

    @Decorators.it("Test du compte de caractère avec setCurrentValue")
    testCharsCounterWithSetCurrentValue() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main401");
        this.inputField.setCurrentValue("Malam");
        const charLabel = document.querySelector("#main401 .chars-counter") as HTMLDivElement;
        setTimeout(() => {
            expect(charLabel).to.exist;
            expect(charLabel.innerHTML).to.equals("5 caractères");
            expect(charLabel.className).to.be.equals("chars-counter");
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage de l'alerte avec setCurrentValue")
    testCharsCounterWithAlertWithSetCurrentValue() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main402");
        this.inputField.setCurrentValue("Adria moratizna zenimaheri");
        const charLabel = document.querySelector("#main402 .chars-counter") as HTMLDivElement;
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("26 caractères");
            expect(charLabel.className).to.be.equals("chars-counter chars-counter-too-many-char");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            const alertTitle = document.querySelector(".widget-dialogue-title h1") as HTMLDivElement;
            const alertBody = document.querySelector(".widget-alert-body") as HTMLDivElement;
            expect(alertOk).to.exist;
            expect(alertTitle).to.exist;
            expect(alertTitle.innerText).to.be.equals("Nombre de caractères trop élevé");
            expect(alertBody).to.exist;
            expect(alertBody.innerText).to.be.equals("Le nombre de caractères renseignés est trop élevé par rapport au nombre maximum (26/25).");

            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage de l'alerte avec setCurrentValue")
    testAffichageAlert() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main403");
        const inputNom = document.querySelector("#main403 #nom") as HTMLTextAreaElement;
        let i;
        for (i = 0; i < 26; i++) {
            this.triggerKeydownEvent(inputNom, "m", 77, true);
        }
        const charLabel = document.querySelector("#main403 .chars-counter") as HTMLDivElement;
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("26 caractères");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            const alertTitle = document.querySelector(".widget-dialogue-title h1") as HTMLDivElement;
            const alertBody = document.querySelector(".widget-alert-body") as HTMLDivElement;
            expect(alertOk).to.exist;
            expect(alertTitle).to.exist;
            expect(alertTitle.innerText).to.be.equals("Nombre de caractères trop élevé");
            expect(alertBody).to.exist;
            expect(alertBody.innerText).to.be.equals("Le nombre de caractères renseignés est trop élevé par rapport au nombre maximum (26/25).");

            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de non activation du compteur")
    testNoCharsCount() {
        $element = this.renderIntoDocument(elementWithValue, "main404");
        const inputPrenom = document.querySelector("#main404 #prenom") as HTMLTextAreaElement;
        let i;
        for (i = 0; i < 30; i++) {
            this.triggerKeydownEvent(inputPrenom, "m", 77, true);
        }
        setTimeout(() => {
            const charLabel = document.querySelector("#main404 .chars-counter") as HTMLDivElement;
            expect(inputPrenom.hasAttribute("aria-labelledby")).to.be.true;
            expect(inputPrenom.getAttribute("aria-labelledby")).to.be.equals("prenom-span-label");
            expect(charLabel).to.be.null;
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'activation de l'alerte si dernier caractere est espace")
    testShowAlertWithEspaceInLastPosition() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main405");
        const inputNom = document.querySelector("#main405 #nom") as HTMLTextAreaElement;
        const charLabel = document.querySelector("#main405 .chars-counter") as HTMLDivElement;
        let i;
        for (i = 0; i < 25; i++) {
            this.triggerKeydownEvent(inputNom, "m", 77, true);
        }
        this.triggerKeydownEvent(inputNom, " ", 32, true);
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("26 caractères");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            expect(alertOk).to.exist;
            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage du label sans maxChar")
    testLabelWithoutMaxChar() {
        $element = this.renderIntoDocument(elementBase, "main406");
        const label = document.querySelector("#main406 .label") as HTMLSpanElement;
        setTimeout(() => {
            expect(label.innerHTML).to.be.equal("prénom");
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage du label avec maxChar")
    testLabelWithMaxChar() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main407");
        const label = document.querySelector("#main407 .label") as HTMLSpanElement;
        setTimeout(() => {
            expect(label.innerHTML).to.be.equal("Nom (limite 25 caractères)");
            this.end();
        }, 250);
    }

    @Decorators.it("Test des attributs RGAA")
    testAriaAttributes() {
        $element = this.renderIntoDocument(elementWithValueEtCompteur, "main408");
        const inputNom = document.querySelector("#main408 #nom") as HTMLTextAreaElement;
        const charLabel = document.querySelector("#main408 .chars-counter") as HTMLDivElement;
        setTimeout(() => {
            expect(inputNom.hasAttribute("aria-labelledby")).to.be.true;
            expect(inputNom.getAttribute("aria-labelledby")).to.be.equals("nom-span-label chars-counter-nom");

            expect(charLabel.hasAttribute("role")).to.be.true;
            expect(charLabel.getAttribute("role")).to.be.equals("log");

            this.end();
        }, 250);
    }

}

// lancement des Tests
runTest(new InputFieldTest());
