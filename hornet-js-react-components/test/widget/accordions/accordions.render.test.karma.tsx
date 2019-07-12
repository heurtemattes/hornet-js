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
 * @version v5.4.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;

import * as _ from "lodash";
import * as React from "react";

import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import { Accordions } from "src/widget/accordion/accordions";
import { Accordion } from "src/widget/accordion/accordion";
import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { Form } from "src/widget/form/form";
import { InputField } from "src/widget/form/input-field";
import { RadiosField } from "src/widget/form/radios-field";
const schema = require("hornet-js-react-components/test/widget/form/form-validate-required-fields.json");
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { ButtonsArea } from "src/widget/form/buttons-area";
import { Button } from "src/widget/button/button";


let cpt = [];
let rdrCpt = [];

class Test extends Accordion{

    componentDidMount() {
        super.componentDidMount();
        cpt[this.props.title] = cpt[this.props.title] ? cpt[this.props.title] + 1 : 1;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        super.componentDidUpdate(prevProps, prevState, prevContext);
        cpt[this.props.title] = cpt[this.props.title] ? cpt[this.props.title] + 1 : 1;
    }

    render(): JSX.Element {
        const res = super.render();
        rdrCpt[this.props.title] = rdrCpt[this.props.title] ? rdrCpt[this.props.title] + 1 : 1;
        return res;
    }
}

@Decorators.describe("Test render Karma Accordions")
class AccordionRenderTest extends HornetReactTest {

    /** Formulaire d'édition de secteur */
    protected monForm: Form;
    protected readonly dataSet = {nom: 1, desc: false};
    protected accordion1: Test;
    protected accordion2: Test;
    protected accordion3: Test;

    element: JSX.Element;
    elementMulti: JSX.Element;
    title1 = "accordion de test 1";
    title2 = "accordion de test 2";
    title3 = "accordion de test 3";

    @Decorators.beforeEach
    beforeEach() {
        cpt[this.title1] = 0;
        cpt[this.title2] = 0;
        cpt[this.title3] = 0;

        this.elementMulti = (
            <Accordions multiSelectable={true} id="testMulti">
                <Test title={this.title1} isOpen={false}><div>Content 1</div></Test>
                <Test title={this.title2} isOpen={false}><div>Content 2</div></Test>
                <Test title={this.title3} isOpen={false}><div>Content 3</div></Test>
            </Accordions>
        );

        this.element = (
            <Accordions multiSelectable={false} id="test">
                <Test title={this.title1} isOpen={false}><div>Content 1</div></Test>
                <Test title={this.title2} isOpen={false}><div>Content 2</div></Test>
                <Test title={this.title3} isOpen={false}><div>Content 3</div></Test>
            </Accordions>
        );
    }

    @Decorators.it("Test 1 -  Accordions multiselectable")
    testRenderAccordionsMultiSelectable() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.elementMulti, `${id}`);
        const acc1 = document.querySelector(`#${id} #testMulti-0-tab`);
        const acc2 = document.querySelector(`#${id} #testMulti-1-tab`);
        const acc3 = document.querySelector(`#${id} #testMulti-2-tab`);
        this.triggerMouseEvent(acc1, "click");
        setTimeout(() => {
            expect(cpt[this.title1], "click 1 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
            expect(cpt[this.title2], "click 1 : Problème nombre de rendu de l'accordéon 2 non égal à 1").to.be.equals(1);
            expect(cpt[this.title3], "click 1 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
            this.triggerMouseEvent(acc2, "click");
            setTimeout(() => {
                expect(cpt[this.title1], "click 2 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
                expect(cpt[this.title2], "click 2 : Problème nombre de rendu de l'accordéon 2 non égal à 2").to.be.equals(2);
                expect(cpt[this.title3], "click 2 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
                this.triggerMouseEvent(acc3, "click");
                setTimeout(() => {
                    expect(cpt[this.title1], "click 3 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
                    expect(cpt[this.title2], "click 3 : Problème nombre de rendu de l'accordéon 2 non égal à 2").to.be.equals(2);
                    expect(cpt[this.title3], "click 3 : Problème nombre de rendu de l'accordéon 3 non égal à 2").to.be.equals(2);
                    this.end();
                }, 500);
            }, 500);
        }, 500);
    }

    @Decorators.it("Test 1 -  Accordions non multiselectable")
    testRenderAccordions() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.element, `${id}`);
        const acc1 = document.querySelector(`#${id} #test-0-tab`);
        const acc2 = document.querySelector(`#${id} #test-1-tab`);
        const acc3 = document.querySelector(`#${id} #test-2-tab`);
        this.triggerMouseEvent(acc1, "click");
        setTimeout(() => {
            expect(cpt[this.title1], "click 1 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
            expect(cpt[this.title2], "click 1 : Problème nombre de rendu de l'accordéon 2 non égal à 1").to.be.equals(1);
            expect(cpt[this.title3], "click 1 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
            this.triggerMouseEvent(acc2, "click");
            setTimeout(() => {
                expect(cpt[this.title1], "click 2 : Problème nombre de rendu de l'accordéon 1 non égal à 3").to.be.equals(3);
                expect(cpt[this.title2], "click 2 : Problème nombre de rendu de l'accordéon 2 non égal à 2").to.be.equals(2);
                expect(cpt[this.title3], "click 2 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
                this.triggerMouseEvent(acc3, "click");
                setTimeout(() => {
                    expect(cpt[this.title1], "click 3 : Problème nombre de rendu de l'accordéon 1 non égal à 3").to.be.equals(3);
                    expect(cpt[this.title2], "click 3 : Problème nombre de rendu de l'accordéon 2 non égal à 3").to.be.equals(3);
                    expect(cpt[this.title3], "click 3 : Problème nombre de rendu de l'accordéon 3 non égal à 2").to.be.equals(2);
                    this.end();
                }, 500);
            }, 500);
        }, 500);
    }

    @Decorators.it("Test rendering uniquement si besoin en cas d'erreur")
    testRenderingAccordionWithError() {
        rdrCpt[this.title1] = 0;
        rdrCpt[this.title2] = 0;
        rdrCpt[this.title3] = 0;

        const dataSourceIsClient = new DataSource([], {value: "desc", label: "libelle"});
        const element = (
            <div>
                <Form
                    id="formWithError"
                    ref={(form: Form) => { this.monForm = form }}
                    schema={schema}>
                    <Accordions id="accordionsWithError">
                        <Test title={this.title1} ref={(element) => this.accordion1 = element}>
                            <RadiosField name="desc" label="description"
                                required={true} size={40} maxLength={200} dataSource={dataSourceIsClient}/>
                        </Test>
                        <Test title={this.title2} ref={(element) => this.accordion2 = element}>
                            <InputField name="nom" label="nom"
                                required={true} size={40} maxLength={50} type="number"/>
                        </Test>
                        <Test title={this.title3} ref={(element) => this.accordion3 = element}>
                        </Test>
                    </Accordions>
                    <ButtonsArea>
                        <Button type="submit" id="enregistrer" name="action:save"
                            value="Enregistrer" className="hornet-button" label="Enregistrer"
                            title="validTitle" />
                        <Button type="button" id="cancel" name="action:cancel"
                            value="Annuler" className="hornet-button" label="Annuler"
                            title="cancelTitle" />
                    </ButtonsArea>
                </Form>
            </div>
        );
        const id = this.generateMainId();
        this.renderIntoDocument(element, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer`), "click");
        setTimeout(() => {
            expect(rdrCpt[this.title1], "click 1 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
            expect(rdrCpt[this.title2], "click 1 : Problème nombre de rendu de l'accordéon 2 non égal à 2").to.be.equals(2);
            expect(rdrCpt[this.title3], "click 1 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
            this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer`), "click");
            setTimeout(() => {
                expect(rdrCpt[this.title1], "click 2 : Problème nombre de rendu de l'accordéon 1 non égal à 2").to.be.equals(2);
                expect(rdrCpt[this.title2], "click 2 : Problème nombre de rendu de l'accordéon 2 non égal à 2").to.be.equals(2);
                expect(rdrCpt[this.title3], "click 2 : Problème nombre de rendu de l'accordéon 3 non égal à 1").to.be.equals(1);
                this.end();
            }, 750);
        }, 750);
    }
}
// lancement des Tests
runTest(new AccordionRenderTest());
