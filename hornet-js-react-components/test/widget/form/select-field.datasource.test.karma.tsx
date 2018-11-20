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

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

var chai = require('chai');
const expect = chai.expect;
const ReactTestUtils = require("react-dom/test-utils");
import * as ReactDOM from "react-dom";

import * as React from "react";
import * as assert from "assert";

import { RadiosField } from "src/widget/form/radios-field";
import { Form } from "src/widget/form/form";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { SelectField } from "src/widget/form/select-field";
import { Table } from "src/widget/table/table";
import { Header } from "src/widget/table/header";
import { Content } from "src/widget/table/content";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";

import { TestLogger } from "hornet-js-test/src/test-logger";
import { Logger } from "hornet-js-utils/src/logger";
Logger.prototype.buildLogger = TestLogger.getLoggerBuilder({
    "appenders": {
        "console": {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[%d{ISO8601}|%p|%c|%m%]"
            }
        }
    },
    "categories": {
        "default": { "appenders": [ "console" ], "level": "TRACE" }
    }
});

let element: JSX.Element;
let $element;

@Decorators.describe("Test Karma select-field avec dataSource")
class SelectFieldDataSourceTest extends BaseTest {

    protected referencedElement;

    protected dataSet: Array<any> = [
        {
            value: "1",
            label: "Wilfried"
        }, {
            value: "2",
            label: "Yann-Yves",
        }, {
            value: "3",
            label: "Tediaga"
        }, {
            value: "4",
            label: "Florent"
        }, {
            value: "5",
            label: "Muriel"
        }, {
            value: "6",
            label: "Marck"
        }, {
            value: "7",
            label: "Sébastien"
        }
    ];

    protected tableDataSet: Array<any> = [
        { cas: "cas 1", developer: "2", nom: "Yann-Yves" }, { cas: "cas 2", developer: "3", nom: "Tediaga" }, { cas: "cas 3", developer: "4", nom: "Florent" }
    ];

    protected dataSource1: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource2: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource3: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource4: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource5: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource6: DataSource<any> = new DataSource<any>(this.dataSet);
    protected dataSource7: DataSource<any> = new DataSource<any>(this.dataSet);

    @Decorators.it('Test OK')
    testOk() {
        assert.equal(1, 1);
        this.end();
    };


    @Decorators.it("Test selectfield avec datasource sans valeur par défaut")
    testSelectField1() {
        element = (
            <div id="main1">
                <Form id={"testForm-1"}>
                    <SelectField name={"selectTypePartenaire1"}
                        label={"Type de partenaire"}
                        dataSource={this.dataSource1} />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main1");
        const htmlElement = document.getElementById("selectTypePartenaire1");
        HornetTestAssert.assertEquals(this.dataSet[ 0 ].value, (htmlElement as any).value, "SelectField doit être valorisé par le premier élément");
        HornetTestAssert.assertEquals(undefined, this.dataSource1.selected, "Le dataSource ne doit pas être valorisé");
        this.end();
    };

    @Decorators.it("Test selectfield avec datasource, set currentValue")
    testSelectField2() {
        let passed: boolean = false;
        element = (
            <div id="main2">
                <Form id={"testForm-2"}>
                    <SelectField name={"selectTypePartenaire2"}
                        label={"Type de partenaire"}
                        dataSource={this.dataSource2}
                        ref={(element) => { this.referencedElement = element }} />
                </Form>
            </div>
        );

        this.dataSource2.on("select", (result) => {
            if (!passed) {
                HornetTestAssert.assertEquals(this.dataSet[ 3 ], this.dataSource2.selected, "Le dataSource doit être valorisé avec l'élement ayant l'id 4");
                passed = true;
                this.end();
            }
        });

        $element = this.renderIntoDocument(element, "main2");
        this.referencedElement.setCurrentValue("4");

        let htmlElement = document.getElementById("selectTypePartenaire2");
        HornetTestAssert.assertEquals(this.dataSet[ 3 ].value, (htmlElement as any).value, "1SelectField doit être valorisé avec l'élement ayant l'id 4");
    };

    @Decorators.it("Test selectfield avec datasource, currentValue en valeur par défaut")
    testSelectField3() {
        element = (
            <div id="main3">
                <Form id={"testForm-3"}>
                    <SelectField name={"selectTypePartenaire3"}
                        label={"Type de partenaire"}
                        dataSource={this.dataSource3}
                        currentValue={"5"}
                        ref={(element) => { this.referencedElement = element }} />
                </Form>
            </div>
        );

        $element = this.renderIntoDocument(element, "main3");

        const htmlElement = document.getElementById("selectTypePartenaire3");
        HornetTestAssert.assertEquals(this.dataSet[ 4 ].value, (htmlElement as any).value, "SelectField doit être valorisé avec l'élement ayant l'id 5");
        HornetTestAssert.assertEquals(this.dataSet[ 4 ], this.dataSource3.selected, "Le dataSource doit être valorisé avec l'élement ayant l'id 5");

        this.end();
    };

    @Decorators.it("Test selectfield avec datasource, trig select on dataSource")
    testSelectField4() {
        let passed: boolean = false;
        element = (
            <div id="main4">
                <Form id={"testForm-4"}>
                    <SelectField name={"selectTypePartenaire4"}
                        label={"Type de partenaire"}
                        dataSource={this.dataSource4}
                        ref={(element) => { this.referencedElement = element }} />
                </Form>
            </div>
        );

        this.dataSource4.on("select", (result) => {
            if (!passed) {
                passed = true;
                const htmlElement = document.getElementById("selectTypePartenaire4");
                HornetTestAssert.assertEquals(this.dataSet[ 0 ].value, (htmlElement as any).value, "SelectField doit être valorisé avec l'élement ayant l'id 1 par défaut, c'est au projet de se mettre à jour");
                HornetTestAssert.assertEquals(this.dataSet[ 3 ], this.dataSource4.selected, "Le dataSource doit être valorisé avec l'élement ayant l'id 4");

                this.end();
            }
        });

        $element = this.renderIntoDocument(element, "main4");
        this.dataSource4.select(this.dataSet[ 3 ]);
    };

    @Decorators.it("Test radiofields avec datasource sans valeur par défaut, ajout au datasource")
    testSelectField5() {
        element = (
            <div id="main5">
                <Form id={"testForm-5"}>
                    <SelectField name={"selectTypePartenaire5"}
                        label={"Type de partenaire"}
                        dataSource={this.dataSource5} />
                </Form>
            </div>
        );

        this.dataSource5.on("fetch", (result) => {
            const htmlElement = document.getElementById("selectTypePartenaire5");
            HornetTestAssert.assertEquals(this.dataSet[ 0 ].value, (htmlElement as any).value, "SelectField doit être valorisé par le premier élément");
            HornetTestAssert.assertEquals(undefined, this.dataSource1.selected, "Le dataSource ne doit pas être valorisé");
            this.end();
        });
        $element = this.renderIntoDocument(element, "main5");
        const htmlElement = document.getElementById("selectTypePartenaire5");
        HornetTestAssert.assertEquals(this.dataSet[ 0 ].value, (htmlElement as any).value, "SelectField doit être valorisé par le premier élément");
        HornetTestAssert.assertEquals(undefined, this.dataSource1.selected, "Le dataSource ne doit pas être valorisé");
        this.dataSource5.add(true, { id: "8", nom: "Vincent" });
    };

    @Decorators.it("Test selectfields avec datasource mappé")
    testSelectFieldMapped() {
        let passed: boolean = false;

        let options = [
            {id: 1, libelle: "option 1"},
            {id: 2, libelle: "option 2"},
            {id: 3, libelle: "option 3"},
            {id: 4, libelle: "option 4"},
        ];

        let dataSourceOption = new DataSource<any>(options, {value: "id", label: "libelle"});

        element = (
            <SelectField
                name= {"optionlist"}
                label= {"liste d'option"}
                dataSource= {dataSourceOption}
                ref={(element) => { this.referencedElement = element }}
            />
        );
        dataSourceOption.on("select", (result) => {
            if (!passed) {
                HornetTestAssert.assertEquals(options[3].id, dataSourceOption.selected.value, "Le dataSource doit être valorisé avec l'élement ayant l'id 4");
                HornetTestAssert.assertEquals(options[3].libelle, dataSourceOption.selected.label, `Le dataSource doit être valorisé avec l'élement ayant le libelle "option 4"`);
                passed = true;
                this.end();
            }
        });

        $element = this.renderIntoDocument(element, "mainTestSelectFieldMapped");
        this.referencedElement.setCurrentValue("4");

        let htmlElement = document.getElementById("optionlist");
        HornetTestAssert.assertEquals(options[3].id.toString(), (htmlElement as any).value, "2SelectField doit être valorisé avec l'élement ayant l'id 4");
    }

    @Decorators.it("Test selectfield avec datasource et déclenchement du select")
    testSelectFieldSelected() {
        let passed:boolean = false;
        element = (<div id="main2">
                    <Form id={"testForm-2"}>
                        <SelectField name={"selectTypePartenaire2"} label={"Type de partenaire"}
                            dataSource={this.dataSource2} ref={(element) => { this.referencedElement = element }} />
                    </Form>
        </div>);
        
        this.dataSource2.on("select", (result) => { 
            if (!passed) {
                HornetTestAssert.assertEquals(this.dataSet[3], this.dataSource2.selected, "Le dataSource doit être valorisé avec l'élement ayant l'id 4");
            }
            passed = true;
            this.end();
        });

        $element = this.renderIntoDocument(element, "main2");
        this.referencedElement.setCurrentValue("4");

        let htmlElement = document.getElementById("selectTypePartenaire2");
        HornetTestAssert.assertEquals(this.dataSet[3].value, (htmlElement as any).value, "3SelectField doit être valorisé avec l'élement ayant l'id 4");
        (htmlElement as any).selectedIndex=1;
        HornetTestAssert.assertEquals(this.dataSet[1].value, (htmlElement as any).value, "4SelectField doit être valorisé avec l'élement ayant l'id 4");

    };

    @Decorators.it("Test selectfield avec datasource et déclenchement du select")
    testSelectFieldSelectedOption() {
        let passed:boolean = false;
        element = (<div id={this.generateMainId()}>
                    <Form id={"testForm-2"}>
                        <SelectField id={"selectTypePartenaire7"} name={"selectTypePartenaire7"} label={"Type de partenaire"}
                            dataSource={this.dataSource7} ref={(element) => { this.referencedElement = element }} />
                    </Form>
        </div>);
        
        this.dataSource7.on("select", (result) => { 
            if (!passed) {
                HornetTestAssert.assertEquals(this.dataSet[1], this.dataSource7.selected, "Le dataSource doit être valorisé avec l'élement ayant l'id 4");
            }
            passed = true;
            this.end();
        });
        $element = this.renderIntoDocument(element, this.generateMainId());
        let htmlElement = document.getElementById("selectTypePartenaire7");
        (htmlElement as any).selectedIndex=1;
        this.referencedElement.value = '1';
        ReactTestUtils.Simulate.change(htmlElement);

    };

}


// lancement des Tests
runTest(new SelectFieldDataSourceTest());
