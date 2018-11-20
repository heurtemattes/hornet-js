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
 * @version v5.2.3
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

"use strict";
import { runTest } from "hornet-js-test/src/test-run";

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";
import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import { CheckBoxField } from "src/widget/form/checkbox-field";

let formElement, switchField, checkboxElement: JSX.Element;

@Decorators.describe("Test Karma checkbox-field")
class CheckBoxFieldTest extends HornetReactTest {

    checkbox: CheckBoxField;
    switch: CheckBoxField;
    checkboxElement: CheckBoxField;
    @Decorators.beforeEach
    beforeEach() {

        checkboxElement = (
            <CheckBoxField name={"test-checkbox"}
                label="Test-checkbox" ref={(elt) => { this.checkboxElement = elt; }} />
        );

        formElement = (
            <CheckBoxField name={"test-checkbox"} readOnly={true}
                label="Test-checkbox" ref={(elt) => { this.checkbox = elt; }} />
        );

        switchField = (
            <CheckBoxField name={"test-switch"} readOnly={true} switch={true}
                label="Test-checkbox" ref={(elt) => { this.switch = elt; }} />
        );
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Test checkbox click")
    testClick() {
        const id = this.generateMainId();
        this.renderIntoDocument(checkboxElement, id);
        expect(document.querySelector(`#${id} label.checkbox-content`)).to.exist;
        expect(this.checkboxElement.getCurrentValue()).to.equal(false);
        // Clic sur la checkbox change la value
        this.triggerMouseEvent(document.querySelector(`#${id} label.checkbox-content`), "click");
        setTimeout(() => {
            expect(this.checkboxElement.getCurrentValue()).to.equal(true);
            // La touche entrée sur la checkbox change la value
            this.triggerKeydownEvent(document.querySelector(`#${id} label.checkbox-content`), "Enter", 13, true);
            setTimeout(() => {
                expect(this.checkboxElement.getCurrentValue()).to.equal(false);
                this.end();
            });

        });
    }

    @Decorators.it("Test aucune action possible lorsque le checkbox est readOnly")
    testReadOnly() {
        const id = this.generateMainId();
        this.renderIntoDocument(formElement, id);
        expect(document.querySelector(`#${id} label.checkbox-content`)).to.exist;
        expect(this.checkbox.getCurrentValue()).to.equal(false);
        // Clic sur la checkbox ne changera pas la value
        this.triggerMouseEvent(document.querySelector(`#${id} label.checkbox-content`), "click");
        setTimeout(() => {
            expect(this.checkbox.getCurrentValue()).to.equal(false);
            // La touche entrée sur la checkbox ne changera pas la value
            this.triggerKeydownEvent(document.querySelector(`#${id} label.checkbox-content`), "Enter", 13, true);
            setTimeout(() => {
                expect(this.checkbox.getCurrentValue()).to.equal(false);
                this.end();
            });

        });
    }

    @Decorators.it("Test aucune action possible lorsque le checkbox est disabled")
    testDisabled() {
        const id = this.generateMainId();
        this.renderIntoDocument(formElement, id);
        this.checkbox.setState({ readOnly: false, disabled: true }, () => {
            expect(document.querySelector(`#${id} label.checkbox-content`)).to.exist;
            expect(this.checkbox.getCurrentValue()).to.equal(false);
            // Clic sur la checkbox ne changera pas la value
            this.triggerMouseEvent(document.querySelector(`#${id} label.checkbox-content`), "click");
            setTimeout(() => {
                expect(this.checkbox.getCurrentValue()).to.equal(false);
                // La touche entrée sur la checkbox ne changera pas la value
                this.triggerKeydownEvent(document.querySelector(`#${id} label.checkbox-content`), "Enter", 13, true);
                setTimeout(() => {
                    expect(this.checkbox.getCurrentValue()).to.equal(false);
                    this.end();
                });
            });
        });
    }

    @Decorators.it("Test aucune action possible lorsque le checkbox est disabled et readOnly")
    testDisabledAndReadOnly() {
        const id = this.generateMainId();
        this.renderIntoDocument(formElement, id);
        this.checkbox.setState({ readOnly: true, disabled: true }, () => {
            expect(document.querySelector(`#${id} label.checkbox-content`)).to.exist;
            expect(this.checkbox.getCurrentValue()).to.equal(false);
            // Clic sur la checkbox ne changera pas la value
            this.triggerMouseEvent(document.querySelector(`#${id} label.checkbox-content`), "click");
            setTimeout(() => {
                expect(this.checkbox.getCurrentValue()).to.equal(false);
                // La touche entrée sur la checkbox ne changera pas la value
                this.triggerKeydownEvent(document.querySelector(`#${id} label.checkbox-content`), "Enter", 13, true);
                setTimeout(() => {
                    expect(this.checkbox.getCurrentValue()).to.equal(false);
                    this.end();
                });
            });
        });
    }

    @Decorators.it("Test aucune action possible lorsque le switch est readOnly")
    testReadOnlyOnSwitch() {
        const id = this.generateMainId();
        this.renderIntoDocument(switchField, id);
        expect(document.querySelector(`#${id} label.switch`)).to.exist;
        expect(this.switch.getCurrentValue()).to.equal(false);
        // Clic sur la checkbox ne changera pas la value
        this.triggerMouseEvent(document.querySelector(`#${id} label.switch`), "click");
        setTimeout(() => {
            expect(this.switch.getCurrentValue()).to.equal(false);
            // La touche entrée sur la checkbox ne changera pas la value
            this.triggerKeydownEvent(document.querySelector(`#${id} label.switch`), "Enter", 13, true);
            setTimeout(() => {
                expect(this.switch.getCurrentValue()).to.equal(false);
                this.end();
            });
        });
    }

    @Decorators.it("Test aucune action possible lorsque le switch est disabled")
    testDisabledOnSwitch() {
        const id = this.generateMainId();
        this.renderIntoDocument(switchField, id);
        this.switch.setState({ readOnly: false, disabled: true }, () => {
            expect(document.querySelector(`#${id} label.switch`)).to.exist;
            expect(this.switch.getCurrentValue()).to.equal(false);
            // Clic sur la checkbox ne changera pas la value
            this.triggerMouseEvent(document.querySelector(`#${id} label.switch`), "click");
            setTimeout(() => {
                expect(this.switch.getCurrentValue()).to.equal(false);
                // La touche entrée sur la checkbox ne changera pas la value
                this.triggerKeydownEvent(document.querySelector(`#${id} label.switch`), "Enter", 13, true);
                setTimeout(() => {
                    expect(this.switch.getCurrentValue()).to.equal(false);
                    this.end();
                });
            });
        });
    }

    @Decorators.it("Test aucune action possible lorsque le switch est disabled et readOnly")
    testDisabledAndReadOnlyOnSwitch() {
        const id = this.generateMainId();
        this.renderIntoDocument(switchField, id);
        this.switch.setState({ readOnly: true, disabled: true }, () => {
            expect(document.querySelector(`#${id} label.switch`)).to.exist;
            expect(this.switch.getCurrentValue()).to.equal(false);
            // Clic sur la checkbox ne changera pas la value
            this.triggerMouseEvent(document.querySelector(`#${id} label.switch`), "click");
            setTimeout(() => {
                expect(this.switch.getCurrentValue()).to.equal(false);
                // La touche entrée sur la checkbox ne changera pas la value
                this.triggerKeydownEvent(document.querySelector(`#${id} label.switch`), "Enter", 13, true);
                setTimeout(() => {
                    expect(this.switch.getCurrentValue()).to.equal(false);
                    this.end();
                });
            });
        });
    }
}

// lancement des Tests
runTest(new CheckBoxFieldTest());
