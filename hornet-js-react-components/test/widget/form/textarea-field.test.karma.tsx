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

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";
import * as assert from "assert";
import { TextAreaField } from "src/widget/form/textarea-field";
import { Form } from "src/widget/form/form";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

let element: JSX.Element;
let element2: JSX.Element;
let element3: JSX.Element;
let element4: JSX.Element;
let element5: JSX.Element;
let element6: JSX.Element;
let element7: JSX.Element;
let element8: JSX.Element;
let textarea;

@Decorators.describe("Test Karma textarea-field")
class TextareaFieldTestKarma extends HornetReactTest {

    protected test;

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });
        element = (
            <TextAreaField
                name={"textarea"}
                label={"test"}
                maxChar={255}
                readOnly={false}
                ref={(elt) => {
                    this.test = elt;
                }
                }
            />);

        element2 = (
            <TextAreaField
                name={"textarea"}
                charLabel={"{count} caractère"}
                label={"test"}
                maxChar={255}
                showAlert={false}
                readOnly={false}
                ref={(elt) => {
                    this.test = elt;
                }
                }
            />);

        element3 = (
            <TextAreaField
                name={"textarea"}
                label={"test"}
                maxChar={255}
                readOnly={false}
                alertMessage="alert message {count} superiere a {maxChar}"
                alertTitle="alert title"
                ref={(elt) => {
                    this.test = elt;
                }
                }
                displayMaxCharInLabel={true}
            />);

        element4 = (
            <Form id="test" readOnly={true}>
                <TextAreaField
                    name={"textarea"}
                    label={"test"}
                    maxChar={255}
                    ref={(elt) => {
                        this.test = elt;
                    }
                    }
                /></Form>
        );

        element5 = (
            <TextAreaField
                name={"textarea"}
                label={"test"}
                maxChar={255}
                currentValue="abracadabresque"
                ref={(elt) => {
                    this.test = elt;
                }
                } />
        );

        element6 = (
            <TextAreaField
                name={"textareaWithoutShowAlert"}
                label={"textareaWithoutShowAlert"}
                maxChar={25}
                readOnly={false}
                ref={(elt) => {
                    this.test = elt;
                }
                }
                showAlert={false}
                displayMaxCharInLabel={true}
            />);
        element7 = (
            <TextAreaField
                name={"textareaExtendableFalse"}
                label={"textareaExtendableFalse"}
                extendable={false}
                ref={(elt) => {
                    this.test = elt;
                }
                } />
        );

        element8 = (
            <TextAreaField
                name={"textareaExtendableTrue"}
                label={"textareaExtendableTrue"}
                extendable={true}
                ref={(elt) => {
                    this.test = elt;
                }
                } />
        );
    }

    @Decorators.it("Test de l' existence du textarea")
    testExist() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea`);
        expect(area).to.exist;
        this.end();
    }

    @Decorators.it("Test du compte de caractère")
    testCharNumber() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        this.triggerKeydownEvent(area, "", null, true);

        setTimeout(() => {
            expect(area.value).to.be.equal("");
            expect(charLabel.innerHTML).to.be.equal("0 caractère");
            this.triggerKeydownEvent(area, "m", 77, true);
            setTimeout(() => {
                expect(area.value).to.be.equal("m");
                expect(charLabel.innerHTML).to.be.equal("1 caractère");
                this.triggerKeydownEvent(area, "m", 77, true);
                setTimeout(() => {
                    expect(area.value).to.be.equal("mm");
                    expect(charLabel.innerHTML).to.be.equal("2 caractères");
                    this.end();
                });
            }, 250);
        }, 250);
    }

    @Decorators.it("Test de l'activation de l'alerte")
    testAlertActivation() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        let i;
        for (i = 0; i < 256; i++) {
            this.triggerKeydownEvent(area, "m", 77, true);
        }
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("256 caractères");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            const alertTitle = document.querySelector(".widget-dialogue-title h1") as HTMLDivElement;
            const alertBody = document.querySelector(".widget-alert-body") as HTMLDivElement;
            expect(alertOk).to.exist;
            expect(alertTitle).to.exist;
            // Etant donné qu'il n y a pas de prop alertTitle on utilise le title défini dans i18n (clé:textarea.alertTitle)
            const titre: string = "Nombre de caractères trop élevé";
            expect(alertTitle.innerText.toLowerCase()).to.be.equals(titre.toLowerCase());
            expect(alertBody).to.exist;
            // Etant donné qu'il n y a pas de prop alertMessage on utilise le title défini dans i18n (clé:textarea.alertMessage)
            expect(alertBody.innerText).to.be.equals("Le nombre de caractères renseignés est trop élevé par rapport au nombre maximum (256/255).");

            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'activation de l'alerte avec message et titre passés en props")
    testAlertActivationWithMessageAndTitleInProps() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element3, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        let i;
        for (i = 0; i < 256; i++) {
            this.triggerKeydownEvent(area, "m", 77, true);
        }
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("256 caractères");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            const alertTitle = document.querySelector(".widget-dialogue-title h1") as HTMLDivElement;
            const alertBody = document.querySelector(".widget-alert-body") as HTMLDivElement;
            expect(alertOk).to.exist;
            expect(alertTitle).to.exist;
            const titre: string = "alert title";
            expect(alertTitle.innerText.toLowerCase()).to.be.equals(titre.toLowerCase());
            expect(alertBody).to.exist;
            expect(alertBody.innerText).to.be.equals("alert message 256 superiere a 255");

            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de non activation de l'alerte")
    testNoAlert() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element2, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        let i;
        for (i = 0; i < 256; i++) {
            this.triggerKeydownEvent(area, "m", 77, true);
        }
        setTimeout(() => {
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.be.null;
            this.end();
        }, 250);
    }

    @Decorators.it("Test du className du charLabel")
    testCharLabelClassName() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element2, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        let i;
        for (i = 0; i < 256; i++) {
            this.triggerKeydownEvent(area, "m", 77, true);
        }
        setTimeout(() => {
            const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
            const className = charLabel.className;
            expect(className).to.be.equals("textarea-character-value textarea-too-many-char");
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'activation de l'alerte si dernier caractere est espace")
    tesAlertActivationWithEspaceInLastPosition() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        let i;
        for (i = 0; i < 255; i++) {
            this.triggerKeydownEvent(area, "m", 77, true);
        }
        this.triggerKeydownEvent(area, " ", 32, true);
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("256 caractères");
            const alert = document.querySelector(".widget-alert-body");
            expect(alert).to.exist;
            const alertOk = document.querySelector(".widget-dialogue-footer #alertOK");
            expect(alertOk).to.exist;
            (alertOk as any).click();
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage du compteur via setCurrentValue")
    testCharsCounterWithSetCurrentValue() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        this.test.setCurrentValue("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        setTimeout(() => {
            expect(charLabel.innerHTML).to.be.equal("123 caractères");
            expect(charLabel.className).to.be.equals("textarea-character-value");
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage du label sans maxChar")
    testLabelWithoutMaxChar() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const label = document.querySelector(`#${id} .label`) as HTMLSpanElement;
        setTimeout(() => {
            expect(label.innerHTML).to.be.equal("test");
            this.end();
        }, 250);
    }

    @Decorators.it("Test de l'affichage du label avec maxChar")
    testLabelWithMaxChar() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element3, id);
        const label = document.querySelector(`#${id} .label`) as HTMLSpanElement;
        setTimeout(() => {
            expect(label.innerHTML).to.be.equal("test (limite 255 caractères)");
            this.end();
        }, 250);
    }

    @Decorators.it("Test des attributs RGAA")
    testAriaAttributes() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element, id);
        const area = document.querySelector(`#${id} textarea[name="textarea"]`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} .textarea-character-value`) as HTMLDivElement;
        setTimeout(() => {
            expect(area.hasAttribute("aria-labelledby")).to.be.true;
            expect(area.getAttribute("aria-labelledby")).to.be.equals("textarea-span-label chars-counter-textarea");
            expect(area.hasAttribute("role-aria")).to.be.true;
            expect(area.getAttribute("role-aria")).to.be.equals("textbox");
            expect(area.hasAttribute("aria-multiline")).to.be.true;
            expect(area.getAttribute("aria-multiline")).to.be.equals("true");

            expect(charLabel.hasAttribute("role")).to.be.true;
            expect(charLabel.getAttribute("role")).to.be.equals("log");

            this.end();
        }, 250);
    }

    @Decorators.it("Test du passage de readonly dans un formulaire readonly")
    testReadOnly() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element4, id);
        const area = document.querySelector(`#${id} textarea`);
        setTimeout(() => {
            expect(area.hasAttribute("readonly")).to.be.true;
            this.end();
        }, 500);

    }

    @Decorators.it("Test valorisation de la prop currentValue")
    testCurrentValueProp() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element5, id);
        const area = document.querySelector(`#${id} textarea`);
        setTimeout(() => {
            expect(area.innerHTML).to.equal("abracadabresque");
            this.end();
        }, 250);

    }

    @Decorators.it("Test changement de classe du charCounter sans alert")
    testCharsCounterWithoutAlert() {
        const id = this.generateMainId();
        this.renderIntoDocument(element6, id);
        const textaeraTestWithoutAlert = document.querySelector(`#${id} #textareaWithoutShowAlert`) as HTMLTextAreaElement;
        const charLabel = document.querySelector(`#${id} #chars-counter-textareaWithoutShowAlert`) as HTMLDivElement;
        // Vérifier que label ne contient pas la classe textarea-too-many-char
        expect(
            charLabel.getAttribute("class").indexOf("textarea-too-many-char") === -1,
            "1: La classe 'textarea-too-many-char' est appliquée").to.be.true;
        let i;
        for (i = 0; i < 26; i++) {
            this.triggerKeydownEvent(textaeraTestWithoutAlert, "m", 77, true);
        }
        setTimeout(() => {
            // Vérifier que label contient la classe textarea-too-many-char
            expect(
                charLabel.getAttribute("class").indexOf("textarea-too-many-char") >= 0,
                "1 : La classe 'textarea-too-many-char' n'est pas appliquée").to.be.true;
            // Supprimer un caractère et vérifier que label ne contient pas la classe textarea-too-many-char
            // On passe de 26 caractères à 25
            this.test.setCurrentValue("mmmmmmmmmmmmmmmmmmmmmmmmm");
            setTimeout(() => {
                expect(
                    charLabel.getAttribute("class").indexOf("textarea-too-many-char") === -1,
                    "2 : La classe 'textarea-too-many-char' est appliquée").to.be.true;
                // Cliquer sur la croix et vérifier que label est vide
                this.triggerMouseEvent(document.querySelector(`#${id} #textareaWithoutShowAlertResetButton a`), "click");
                setTimeout(() => {
                    expect(charLabel.textContent, "Le chars counter existe").to.be.empty;
                    this.end();
                }, 250);
            }, 250);
        }, 250);
    }

    @Decorators.it("Test fonctionnement de la props onChange")
    testOnChangeProps() {
        let isEnd: boolean;
        let textareaValue: string;
        const onChangeHandler = (e) => {
            expect(e.target.value, `La e.target.value: ${e.target.value} n'est pas égale à textareaValue: ${textareaValue}`)
                .to.equal(textareaValue);
            if (isEnd) {
                this.end();
            }
        };
        const texteAreatag = (
            <TextAreaField
                name={"textarea-onChange-test"}
                label={"test textarea-onChange-test"}
                onChange={onChangeHandler}
            />);
        const id = this.generateMainId();
        this.renderIntoDocument(texteAreatag, id);
        textareaValue = "m";
        this.triggerKeydownEvent(document.querySelector(`#${id} #textarea-onChange-test`), "m", 77, true);
        setTimeout(() => {
            textareaValue = "";
            isEnd = true;
            this.triggerMouseEvent(document.querySelector(`#${id} #textarea-onChange-testResetButton a`), "click");
        }, 250);
    }

    @Decorators.it("Test comportement du textarea avec la props extendable=false")
    testTextAreaExtendableFalse() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element7, id);
        const area = document.querySelector(`#${id} textarea`);
        setTimeout(() => {
            // La props extendable est à false : le textarea doit avoir la classe textarea-resizable
            expect(area.getAttribute("class").indexOf("textarea-resizable") > -1, "la classe textarea-resizable n'est pas appliquée").to.be.true;
            expect(area.getAttribute("class").indexOf("textarea-unresizable") > -1, "la classe textarea-unresizable n'est pas appliquée").to.be.false;
            this.end();
        }, 250);
    }

    @Decorators.it("Test comportement du textarea avec la props extendable=true")
    testTextAreaExtendableTrue() {
        const id = this.generateMainId();
        textarea = this.renderIntoDocument(element8, id);
        const area = document.querySelector(`#${id} textarea`);
        setTimeout(() => {
            // La props extendable est à true : le textarea doit avoir la classe textarea-unresizable
            expect(area.getAttribute("class").indexOf("textarea-resizable") > -1, "la classe textarea-resizable n'est pas appliquée").to.be.false;
            expect(area.getAttribute("class").indexOf("textarea-unresizable") > -1, "la classe textarea-unresizable n'est pas appliquée").to.be.true;
            this.end();
        }, 250);
    }
}

// lancement des Tests
runTest(new TextareaFieldTestKarma());
