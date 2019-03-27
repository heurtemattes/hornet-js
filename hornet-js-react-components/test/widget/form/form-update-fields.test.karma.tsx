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

"use strict";
const chai = require("chai");
const expect = chai.expect;
import * as React from "react";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Form } from "src/widget/form/form";
import { InputField } from "src/widget/form/input-field";
import { CalendarField } from "src/widget/form/calendar-field";
import { TextAreaField } from "src/widget/form/textarea-field";
import { CheckBoxField } from "src/widget/form/checkbox-field";
import { AutoCompleteField } from "src/widget/form/auto-complete-field";
import { AutoCompleteMultiField } from "src/widget/form/auto-complete-multi-field";
import { Row } from "src/widget/form/row";
import { RadiosField } from "src/widget/form/radios-field";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";

let element: JSX.Element;
@Decorators.describe("Test Karma Form updateFields")
class FormUpdateFieldsTest extends HornetReactTest {
    private monForm: Form;
    private radioDesc: RadiosField;
    private checkBoxIsSportif: CheckBoxField;
    private inputNom: InputField<any, any>;
    private calendarDNN: CalendarField<any, any>;
    private textAreaDetails: TextAreaField;
    private autoCompleteCivilite: AutoCompleteField<any>;
    private autoCompleteMultiCDI: AutoCompleteMultiField<any, any>;

    @Decorators.beforeEach
    beforeEach() {
        const listeIsClient = [
            {
                desc: true,
                libelle: "client",
            },
            {
                desc: false,
                libelle: "fournisseur",
            },
        ];

        const dataSourceIsClient = new DataSource(listeIsClient, { value: "desc", label: "libelle" });

        const listeCivilites = [
            { id: 1, libelle: "Madame" },
            { id: 2, libelle: "Monsieur" },
            { id: 3, libelle: "Monsieur Jourdain" },
            { id: 4, libelle: "Mademoiselle" },
        ];

        const civiliteDataSource = new DataSource<any>(listeCivilites, { value: "id", text: "libelle" });

        const listeCentreDinterets = [
            { id: 1, libelle: "Sport" },
            { id: 2, libelle: "Musique" },
            { id: 3, libelle: "Cinéma" },
            { id: 4, libelle: "Danse" },
            { id: 5, libelle: "Voyage" },
        ];

        const centreDInterets = new DataSource<any>(listeCentreDinterets, { value: "id", text: "libelle" });
        return (
            element = (
                <div>
                    <Form
                        id="formUpdateFieldtest"
                        ref={(form: Form) => { this.monForm = form; }} >
                        <Row>
                            <RadiosField name="desc" label="description" dataSource={dataSourceIsClient} ref={(elt) => this.radioDesc = elt} />
                        </Row>
                        <Row>
                            <CheckBoxField name="isSportif" label="est sportif" ref={(elt) => this.checkBoxIsSportif = elt} />
                        </Row>
                        <Row>
                            <InputField name="nom" label="nom" type="text" ref={(elt) => this.inputNom = elt} />
                        </Row>
                        <Row>
                            <CalendarField name="dateNaissance" dateFormats={["DD/MM/YYYY"]} label="Date de naissance" title="Date de naissance" ref={(elt) => this.calendarDNN = elt} />
                        </Row>
                        <Row>
                            <TextAreaField name="details" ref={(elt) => this.textAreaDetails = elt}></TextAreaField>
                        </Row>
                        <Row>
                            <AutoCompleteField name="civilite" dataSource={civiliteDataSource} ref={(elt) => this.autoCompleteCivilite = elt}></AutoCompleteField>
                        </Row>
                        <Row>
                            <AutoCompleteMultiField name="centreDInterers" dataSource={centreDInterets} ref={(elt) => this.autoCompleteMultiCDI = elt}></AutoCompleteMultiField>
                        </Row>
                    </Form>
                </div>
            )
        );
    }

    @Decorators.it("Test updateFields total (paramètre partial=false)")
    testUpdateFieldTotal() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, id);
        // Premier updateField pour valoriser les champs
        this.monForm.updateFields(
            {
                desc: false,
                isSportif: true,
                nom: "Lelarard",
                dateNaissance: "24/12/2014",
                "civilite.value": 2,
                "civilite.text": "Monsieur",
                "centreDInterers.value": ["1", "2"],
            },
            false);

        setTimeout(() => {
            // Deuxième updateFields avec data ={} et partial = false
            this.monForm.updateFields({}, false);
            // Vérifier que les champs réinitialisés
            setTimeout(() => {
                expect(this.radioDesc.getCurrentValue(), "Le radioField desc n'est pas null").to.equal(null);
                expect(this.checkBoxIsSportif.getCurrentValue(), "Le checkBoxField isSportif n'est pas false").to.equal(false);
                expect(this.inputNom.getCurrentValue(), "L'inputField nom n'est pas égal à ''").to.equal("");
                expect(this.calendarDNN.getCurrentValue(), "Le calendardField n'est pas '").to.be.equal("");
                expect(this.textAreaDetails.getCurrentValue(), "Le textAreaField n'est pas égal à ''").to.equal("");
                expect(this.autoCompleteCivilite.getCurrentValue(), "La value de l'autocomplete autoCompleteCivilite n'est pas ''")
                    .to.equal("");
                expect(this.autoCompleteMultiCDI.getCurrentValue().length, "La value de l'autocompleteMulti contient deux éléments")
                    .to.equal(0);
                this.end();
            }, 250);

        }, 250)
    }

    @Decorators.it("Test updateFields partiel (paramètre partial=true)")
    testUpdateFieldPartiel() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, id);
        // Premier updateFields pour valoriser les champs
        this.monForm.updateFields(
            {
                desc: false,
                isSportif: true,
                nom: "Lelarard",
                dateNaissance: "24/12/2014",
                details: "be a coder be a hero...",
                "civilite.value": 2,
                "civilite.text": "Monsieur",
                "centreDInterers.value": ["1", "2"],
            });
        setTimeout(() => {
            // Deuxième updateFields avec data vide et patial=true
            this.monForm.updateFields({}, true);
            // Vérification que les champs ne sont pas écrasés
            expect(this.radioDesc.getCurrentValue(), "Le radioField desc n'est pas false").to.equal("false");
            expect(this.checkBoxIsSportif.getCurrentValue(), "Le checkBoxField isSportif n'est pas true").to.equal(true);
            expect(this.inputNom.getCurrentValue(), "L'inputField nom n'est pas égal à 'Lelarard'").to.equal("Lelarard");
            expect(this.calendarDNN.getCurrentValue().getFullYear(), "L'année du calendardField n'est pas 2014").to.be.equal(2014);
            expect(this.calendarDNN.getCurrentValue().getMonth(), "Le mois du calendardField n'est pas 11").to.be.equal(11);
            expect(this.calendarDNN.getCurrentValue().getDate(), "Le jiur du calendardField n'est pas 24").to.be.equal(24);
            expect(this.textAreaDetails.getCurrentValue(), "Le textAreaField n'est pas égal à 'be a coder be a hero...'")
                .to.equal("be a coder be a hero...");
            expect(this.autoCompleteCivilite.getCurrentValue(), "La value de l'autocomplete autoCompleteCivilite n'est pas 2")
                .to.equal("2");
            expect(this.autoCompleteMultiCDI.getCurrentValue().length, "La value de l'autocompleteMulti ne contient pas deux éléments")
                .to.equal(2);
            expect(this.autoCompleteMultiCDI.getCurrentValue()[0], "Le premier élément de la value de l'autocompleteMulti n'est pas 1'")
                .to.equal(1);
            expect(this.autoCompleteMultiCDI.getCurrentValue()[1], "Le deuxième élément de la value de l'autocompleteMulti n'est pas 2")
                .to.equal(2);
            this.end();
        }, 250)
    }

}

// lancement des Tests
runTest(new FormUpdateFieldsTest());
