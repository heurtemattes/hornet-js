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

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";
import { SwitchField } from "src/widget/form/switch-field";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

let element: JSX.Element;
let element2: JSX.Element;
let element3: JSX.Element;
let element4: JSX.Element;
let switchfield: any;

@Decorators.describe("Test Karma textarea-field")
class SwitchFieldTestKarma extends BaseTest {

    protected test;
    protected test2;
    protected test3;
    protected test4;
    data = [{value: 1, label: "lundi"}, {value:2, label:"mardi"}, {value: 3, label: "mercredi"}, {value:4, label:"jeudi"}];

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });
        element = (
            <SwitchField
                id={"switch-field-one"}
                name={"swicth"}
                label={"test"}
                ref={(elt) => {
                    this.test = elt;
                }
                }
            />);

        element2 = (
            <SwitchField
                id={"switch-field-two"}
                name={"swicth-two"}
                label={"test"}
                datas={this.data}
                ref={(elt) => {
                    this.test2 = elt;
                }
                }
            />);

            element3 = (
                <SwitchField
                    id={"switch-field-three"}
                    name={"swicth-three"}
                    label={"test"}
                    datas={this.data}
                    ref={(elt) => {
                        this.test3 = elt;
                    }
                    }
                />);
                element4 = (
                    <SwitchField
                    defaultValue={{value: 2}}
                        id={"switch-field-four"}
                        name={"swicth-four"}
                        label={"test"}
                        datas={this.data}
                        ref={(elt) => {
                            this.test4 = elt;
                        }
                        }
                    />);

    }

    @Decorators.it("Test du add data")
    testAdd() {
        const id = this.generateMainId();
        switchfield = this.renderIntoDocument(element, id);
        this.test.addItems(this.data);
        setTimeout(() => {
            const lundi = document.querySelector(`#${id} input[id="switch-field-one-1"]`) as HTMLLabelElement;
            expect(lundi).to.exist;

            const lundiLabel = document.querySelector(`#${id} label[for="switch-field-one-1"] .switch-label-after`) as HTMLLabelElement;
            expect(lundiLabel.innerText).to.be.equals("lundi");

            const mardi = document.querySelector(`#${id} input[id="switch-field-one-2"]`) as HTMLLabelElement;
            expect(mardi).to.exist;

            const mardiLabel = document.querySelector(`#${id} label[for="switch-field-one-2"] .switch-label-after`) as HTMLLabelElement;
            expect(mardiLabel.innerText).to.be.equals("mardi");

            const mercredi = document.querySelector(`#${id} input[id="switch-field-one-3"]`) as HTMLLabelElement;
            expect(mercredi).to.exist;

            const mercrediLabel = document.querySelector(`#${id} label[for="switch-field-one-3"] .switch-label-after`) as HTMLLabelElement;
            expect(mercrediLabel.innerText).to.be.equals("mercredi");

            const jeudi = document.querySelector(`#${id} input[id="switch-field-one-4"]`) as HTMLLabelElement;
            expect(jeudi).to.exist;

            const jeudiLabel = document.querySelector(`#${id} label[for="switch-field-one-4"] .switch-label-after`) as HTMLLabelElement;
            expect(jeudiLabel.innerText).to.be.equals("jeudi");

            this.end();
        }, 250);
    }

    @Decorators.it("Test du delete data")
    testDelete() {
        const id = this.generateMainId();
        switchfield = this.renderIntoDocument(element2, id);
        this.test2.deleteItems([{value: 1, label: "lundi"}, {value:2, label:"mardi"}]);
        setTimeout(() => {
            const lundi = document.querySelector(`#${id} input[id="switch-field-two-1"]`) as HTMLLabelElement;
            expect(lundi).to.not.exist;

            const mardi = document.querySelector(`#${id} input[id="switch-field-two-2"]`) as HTMLLabelElement;
            expect(mardi).to.not.exist;

            const mercredi = document.querySelector(`#${id} input[id="switch-field-two-3"]`) as HTMLLabelElement;
            expect(mercredi).to.exist;

            const mercrediLabel = document.querySelector(`#${id} label[for="switch-field-two-3"] .switch-label-after`) as HTMLLabelElement;
            expect(mercrediLabel.innerText).to.be.equals("mercredi");

            const jeudi = document.querySelector(`#${id} input[id="switch-field-two-4"]`) as HTMLLabelElement;
            expect(jeudi).to.exist;

            const jeudiLabel = document.querySelector(`#${id} label[for="switch-field-two-4"] .switch-label-after`) as HTMLLabelElement;
            expect(jeudiLabel.innerText).to.be.equals("jeudi");

            this.end();
        }, 250);
    }

    @Decorators.it("Test du set items")
    testSetItems() {
        const id = this.generateMainId();
        switchfield = this.renderIntoDocument(element2, id);
        this.test2.setItems([{value: 5, label: "vendredi"}, {value:6, label:"samedi"}]);
        setTimeout(() => {
            const lundi = document.querySelector(`#${id} input[id="switch-field-two-1"]`) as HTMLLabelElement;
            expect(lundi).to.not.exist;

            const mardi = document.querySelector(`#${id} input[id="switch-field-two-2"]`) as HTMLLabelElement;
            expect(mardi).to.not.exist;

            const mercredi = document.querySelector(`#${id} input[id="switch-field-two-3"]`) as HTMLLabelElement;
            expect(mercredi).to.not.exist;

            const jeudi = document.querySelector(`#${id} input[id="switch-field-two-4"]`) as HTMLLabelElement;
            expect(jeudi).to.not.exist;

            const vendredi = document.querySelector(`#${id} input[id="switch-field-two-5"]`) as HTMLLabelElement;
            expect(vendredi).to.exist;

            const vendrediLabel = document.querySelector(`#${id} label[for="switch-field-two-5"] .switch-label-after`) as HTMLLabelElement;
            expect(vendrediLabel.innerText).to.be.equals("vendredi");

            const samedi = document.querySelector(`#${id} input[id="switch-field-two-6"] + label`) as HTMLLabelElement;
            expect(samedi).to.exist;

            const samediLabel = document.querySelector(`#${id} label[for="switch-field-two-6"] .switch-label-after`) as HTMLLabelElement;
            expect(samediLabel.innerText).to.be.equals("samedi");

            this.end();
        }, 250);
    }

    @Decorators.it("Test de la current value")
    testCurrentValue() {
        const id = this.generateMainId();
        switchfield = this.renderIntoDocument(element3, id);
        setTimeout(() => {
            this.test3.setCurrentValue({value: 2});
            setTimeout(() => {
                const checkedChoice = document.querySelector(`#${id} input[id="switch-field-three-2"]:checked`) as HTMLLabelElement;
                expect(checkedChoice).to.exist;

                expect(this.test3.getCurrentValue().value).to.be.equals(2);
                this.end();
            }, 250);
        }, 250);
    }

    @Decorators.it("Test de la default value")
    testDefaultValue() {
        const id = this.generateMainId();
        switchfield = this.renderIntoDocument(element4, id);
        setTimeout(() => {
            const checkedChoice = document.querySelector(`#${id} input[id="switch-field-four-2"]:checked`) as HTMLLabelElement;
            expect(checkedChoice).to.exist;
            this.end();
        }, 250);
    }

}

// lancement des Tests
runTest(new SwitchFieldTestKarma());
