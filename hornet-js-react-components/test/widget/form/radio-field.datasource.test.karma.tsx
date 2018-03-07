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

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

var chai = require('chai');
const expect = chai.expect;
import * as React from "react";
import * as assert from "assert";

import { RadiosField } from "src/widget/form/radios-field";
import { Form } from "src/widget/form/form";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";

let element: JSX.Element;
let $element;

@Decorators.describe("Test Karma radio-field avec dataSource")
class RadioFieldDataSourceTest extends BaseTest {

    protected dataSet: any[] = [
        {
            isClient: true,
            libelle: "Client"
        }, {
            isClient: false,
            libelle: "Fournisseur"
        }
    ];

    protected dataSource1: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource2: DataSource<any> = new DataSource<any>(this.dataSet, {label: "libelle", value: "isClient"});
    protected dataSource3: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource4: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource5: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource6: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource7: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource8: DataSource<any> = new DataSource<any>(this.dataSet, {label: "libelle", value: "isClient"});

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    };

    @Decorators.it("Test radiofields 1 avec datasource sans valeur par défaut")
    testRadioField1() {
        element = (
            <div id="main1">
                <Form id="testForm-1">
                    <RadiosField
                        name="exampleRadio-1"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource1}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main1");
        let htmlElement = document.getElementById("exampleRadio-1-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Le radio 1 pour Client n'a pas bien été généré");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-1-Client ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-1-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Le radio 1 pour Fournisseur n'a pas bien été généré");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-1-Fournisseur ne doit pas être sélectionné");
        this.end();
    };

    @Decorators.it("Test radiofields 2 avec datasource avec valeur par défaut premier item")
    testRadioField2() {
        element = (
            <div id="main2">
                <Form id="testForm-2">
                    <RadiosField
                        name="exampleRadio-2"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource2}
                        currentChecked={true}
                        defaultValue={this.dataSet[0]}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main2");
        let htmlElement = document.getElementById("exampleRadio-2-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-2-Client doit être sélectionné");
        htmlElement = document.getElementById("exampleRadio-2-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-2-Fournisseur ne doit pas être sélectionné");
        this.end();
    };

    @Decorators.it("Test radiofields 3 avec datasource avec valeur par défaut premier item")
    testRadioField3() {
        element = (
            <div id="main3">
                <Form id="testForm-3">
                    <RadiosField
                        name="exampleRadio-3"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource3}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                        defaultValue={this.dataSet[0]}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main3");
        let htmlElement = document.getElementById("exampleRadio-3-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-3-Client doit être sélectionné");
        htmlElement = document.getElementById("exampleRadio-3-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-3-Fournisseur ne doit pas être sélectionné");
        this.end();
    };

    @Decorators.it("Test radiofields 4 avec datasource avec valeur par défaut deuxième item")
    testRadioField4() {
        element = (
            <div id="main4">
                <Form id="testForm-4">
                    <RadiosField
                        name="exampleRadio-4"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource4}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                        defaultValue={this.dataSet[1]}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main4");
        let htmlElement = document.getElementById("exampleRadio-4-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-4-Client ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-4-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-4-Fournisseur doit être sélectionné");

        this.end();
    };

    @Decorators.it("Test radiofields 5 avec datasource avec valeur par défaut deuxième item et gestion click")
    testRadioField5() {
        element = (
            <div id="main5">
                <Form id={"testForm-5"}>
                    <RadiosField
                        name="exampleRadio-5"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource5}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                        defaultValue={this.dataSet[1]}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main5");

        let htmlElement = document.getElementById("exampleRadio-5-Fournisseur");
        this.triggerMouseEvent(document.getElementById("exampleRadio-5-Client"), "click");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-5-Fournisseur ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-5-Client");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-5-Client doit être sélectionné");

        this.triggerMouseEvent(document.getElementById("exampleRadio-5-Fournisseur"), "click");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-5-Client ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-5-Fournisseur");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-5-Fournisseur doit être sélectionné");

        this.end();
    };

    @Decorators.it("Test radiofields 6 avec datasource avec valeur par défaut premier item")
    testRadioField6() {
        this.dataSource6.select(this.dataSet[0]);
        element = (
            <div id="main6">
                <Form id="testForm-6">
                    <RadiosField
                        name="exampleRadio-6"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource6}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main6");
        let htmlElement = document.getElementById("exampleRadio-6-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-6-Client doit être sélectionné");
        htmlElement = document.getElementById("exampleRadio-6-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-6-Fournisseur ne doit pas être sélectionné");
        this.end();
    };

    @Decorators.it("Test radiofields 7 avec datasource avec valeur par défaut deuxième item")
    testRadioField7() {
        this.dataSource7.select(this.dataSet[1]);
        element = (
            <div id="main7">
                <Form id="testForm-7">
                    <RadiosField
                        name="exampleRadio-7"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource7}
                        labelKey={"libelle"}
                        valueKey={"isClient"}
                        currentChecked={true}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main7");
        let htmlElement = document.getElementById("exampleRadio-7-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-7-Fournisseur doit être sélectionné");
        htmlElement = document.getElementById("exampleRadio-7-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-7-Client ne doit pas être sélectionné");

        this.triggerMouseEvent(document.getElementById("exampleRadio-7-Client"), "click");
        htmlElement = document.getElementById("exampleRadio-7-Fournisseur");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-7-Fournisseur ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-7-Client");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-7-Client doit être sélectionné");

        this.end();
    };

    @Decorators.it("Test radiofields 8 avec datasource avec valeur par défaut deuxième item")
    testRadioField8() {
        this.dataSource8.select(this.dataSet[1]);
        element = (
            <div id="main8">
                <Form id="testForm-8">
                    <RadiosField
                        name="exampleRadio-8"
                        label={"Type de partenaire"}
                        inline={RadiosField.Inline.FIELD}
                        dataSource={this.dataSource8}
                        currentChecked={true}
                    />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main8");
        let htmlElement = document.getElementById("exampleRadio-8-Fournisseur");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Fournisseur non trouvé");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-8-Fournisseur doit être sélectionné");
        htmlElement = document.getElementById("exampleRadio-8-Client");
        HornetTestAssert.assertNotNull(htmlElement, "Radio pour le libellé Client non trouvé");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-8-Client ne doit pas être sélectionné");

        this.triggerMouseEvent(document.getElementById("exampleRadio-7-Client"), "click");
        htmlElement = document.getElementById("exampleRadio-7-Fournisseur");
        HornetTestAssert.assertFalse((htmlElement as any).checked, "ExampleRadio-7-Fournisseur ne doit pas être sélectionné");
        htmlElement = document.getElementById("exampleRadio-7-Client");
        HornetTestAssert.assertTrue((htmlElement as any).checked, "ExampleRadio-7-Client doit être sélectionné");

        this.end();
    };
}


//lancement des Tests
runTest(new RadioFieldDataSourceTest());