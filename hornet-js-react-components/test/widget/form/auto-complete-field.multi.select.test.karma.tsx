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
 * @version v5.4.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import isEqual = require("lodash.isequal");
const expect = require('chai').expect;
import * as React from "react";
import * as assert from "assert";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { IService } from "hornet-js-core/src/services/service-api";
import { AutoCompleteMultiField } from "src/widget/form/auto-complete-multi-field";
import { DataSourceConfig } from 'hornet-js-core/src/component/datasource/config/service/datasource-config';
import { Promise } from "hornet-js-utils/src/promise-api";
const ReactTestUtils = require("react-dom/test-utils");

let reactElement: JSX.Element;
let reactElement2: JSX.Element;
let reactElement3: JSX.Element;
let reactElement4: JSX.Element;
let reactElement5: JSX.Element;
let reactElement6: JSX.Element;
let l =1;
@Decorators.describe("Test Karma auto-complete-multi-field")
class AutoCompleteMultiFieldTest extends HornetReactTest {
    private dataSource: DataSource<any>;
    private dataSourceService: DataSource<any>;

    @Decorators.beforeEach
    beforeEach() {

        if (this.dataSourceService) {
            this.dataSourceService.removeAllListeners();
        }

        const data = [];
        for (let i: number = 1; i < 50; i++) {
            data.push({ id: i, label: "libelle" + i });
        }
        this.dataSource = new DataSource(data, { value: "id", text: "label" });

       

        reactElement = (
            <AutoCompleteMultiField dataSource={this.dataSource}
                maxHeight={200}
                name="civilite"
                label="civilite"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test"
                init={true}

            />);

        reactElement2 = (
            <AutoCompleteMultiField dataSource={this.dataSource}
                maxHeight={200}
                name="test"
                label="test"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test"
                init={true}
            />);

        reactElement3 = (
            <AutoCompleteMultiField dataSource={this.dataSource}
                maxHeight={200}
                name="test2"
                label="test2"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test2"
                withChips={false}
                init={true}
            />);

        reactElement4 = (
            <AutoCompleteMultiField dataSource={this.dataSource}
                maxHeight={200}
                name="test3"
                label="test3"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test3"
                withChipsInitials={true}
                init={true}
            />);

        

       
    }

    


    @Decorators.it("selectionner un element dans l'autocomplete multiple")
    testselect() {
        let index = 0;
        const id = this.generateMainId();
        const items = [];
        this.dataSource.on("select", (result) => {
            if (result && result.length > 0) {
                index++;
                items.push(index);
                items.forEach((item, ind) => {
                    expect(isEqual(this.dataSource.selected[ind].value, item), `L'item situé à l'index ${ind} n'est pas le même que celui du tableau this.dataSource.selected`).to.be.true;
                });

                if (index === this.dataSource.results.length - 1) {
                    this.end();
                }
            }
        });

        this.renderIntoDocument(reactElement, id);

        this.dataSource.on("fetch", () => {
            const elts = document.querySelectorAll(`#${id} .autocomplete-item`);
            setTimeout(() => {
                this.dataSource.results.forEach((value, index) => {
                    this.triggerMouseEvent(elts[index], "mousedown");
                });
                this.end();
            });
        });
        (document.querySelector(`#${id} #civilite`) as any).click();
    }

    @Decorators.it("Autant de chips que d'éléments dans la liste")
    testChipsselect() {
        let index = 0;
        const id = this.generateMainId();
        const items = [];
        this.dataSource.on("select", (result) => {
            if (result && result.length > 0) {
                index++;
                items.push(index);
                items.forEach((item, ind) => {
                    expect(isEqual(this.dataSource.selected[ind].value, item), `L'item situé à l'index ${ind} n'est pas le même que celui du tableau this.dataSource.selected`).to.be.true;
                })

                if (index == this.dataSource.results.length - 1) {
                    setTimeout(() => {
                        assert.equal((document.querySelector(`#${id} .autocomplete-item`) as any).length, (document.querySelector(`#${id} .chips-content`) as any).length, 'Le nombre de chips ne correspond pas au nombre d\'éléments sélectionnés');
                        this.end();
                    }, 300)

                }
            }
        });

        this.renderIntoDocument(reactElement2, id);

        this.dataSource.on("fetch", () => {
            const elts = document.querySelectorAll(`#${id} .autocomplete-item`);
            this.dataSource.results.forEach((value, index) => {
                this.triggerMouseEvent(elts[index], "mousedown");
            });
        });
        (document.querySelector(`#${id} #test`) as any).click();
    }

    @Decorators.it("pas de chips")
    testNoChipsselect() {
        let index = 0;
        const id = this.generateMainId();
        const items = [];
        this.dataSource.on("select", (result) => {
            if (result && result.length > 0) {
                index++;
                items.push(index);
                items.forEach((item, ind) => {
                    expect(isEqual(this.dataSource.selected[ind].value, item), `L'item situé à l'index ${ind} ne correspond pas à celui du même index dans this.dataSource.selected`).to.be.true;
                })

                if (index === this.dataSource.results.length - 1) {
                    setTimeout(() => {
                        expect(document.querySelector(`#${id} .chips-content`), 'Il n\' y a pas de chips').to.not.exist;
                        this.end();
                    }, 300)

                }
            }
        });

        this.renderIntoDocument(reactElement3, id);

        this.dataSource.on("fetch", () => {
            const elts = document.querySelectorAll(`#${id} .autocomplete-item`);
            this.dataSource.results.forEach((value, index) => {
                this.triggerMouseEvent(elts[index], "mousedown");
            });
        });
        (document.querySelector(`#${id} #test2`) as any).click();
    }

    @Decorators.it("Autant de chips avec initiales que d'éléments dans la liste")
    testChipsselectWithInitials() {
        let index = 0;
        const id = this.generateMainId();
        const items = [];
        this.dataSource.on("select", (result) => {
            if (result && result.length > 0) {
                index++;
                items.push(index);
                items.forEach((item, ind) => {
                    expect(isEqual(this.dataSource.selected[ind].value, item), `L'item situé à l'index ${ind} ne correspond pas à celui du même index dans this.dataSource.selected`).to.be.true;
                })

                if (index === this.dataSource.results.length - 1) {
                    setTimeout(() => {
                        assert.equal((document.querySelector(`#${id} .autocomplete-item`) as any).length, (document.querySelector(`#${id} .chips-icon`) as any).length, 'Le nombre de chips ne correspond pas au nombre d\'éléments sélectionnés');
                        this.end();
                    }, 300)

                }
            }
        });

        this.renderIntoDocument(reactElement4, id);

        this.dataSource.on("fetch", () => {
            const elts = document.querySelectorAll(`#${id} .autocomplete-item`);
            this.dataSource.results.forEach((value, index) => {
                this.triggerMouseEvent(elts[index], "mousedown");
            });
        });
        (document.querySelector(`#${id} #test3`) as any).click();
    }





    @Decorators.it("test la surcharge du label")
    testNoResultLabel() {
        const data = [];
        for (let i: number = 1; i < 50; i++) {
            data.push({ id: i, label: "libelle" + i });
        }
        const id = this.generateMainId();
        this.dataSource = new DataSource([], { value: "id", text: "label" });
        this.renderIntoDocument(reactElement, id);

        this.dataSource.on("add", () => {
            const element = document.querySelector(`#${id} #civilite`);
            this.triggerFocusOnElement(element);
            (element as any).value = "madid";
            ReactTestUtils.Simulate.change(element);
            expect(document.querySelector(`#${id} ul.autocomplete-selector-list div`).innerHTML, "La valeur du selecteur n'est pas test").to.be.equal("test");
            this.dataSource.removeAllListeners();
            this.end();
        });
        this.dataSource.add(true, data);
    }

    @Decorators.it("Conservation des éléments précédemment sélectionnnés après nouvelle recherche avec un dataSource de type array")
    testConserveSelectedItemAfterNewSearchWithDataSourceArray() {

        const data = [];
        for (let i: number = 1; i < 50; i++) {
            data.push({ id: i, label: "libelle" + i });
        }
        const dataSource = new DataSource(data, { value: "id", text: "label" });
        reactElement5 = (
            <AutoCompleteMultiField dataSource={dataSource}
                maxHeight={200}
                name="test5"
                label="test5"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test5"
                withChipsInitials={true}
                init={true}
            />);
        const id = this.generateMainId();
        this.renderIntoDocument(reactElement5, id);

        let selectedItem = [];
        let finish: boolean = false;
        dataSource.on("select", (selected) => {
            if (selected && Array.isArray(dataSource.selected)) {
                expect(dataSource.selected.length, "La taille du tableau dataSource.selected. n'est pas la même que celle de selectedItem").to.be.equal(selectedItem.length);
                dataSource.selected.forEach((item, index) => {
                    expect(item.value, `La value de l'item ${index} n'est pas la même que celle du tableau selectedItem`).to.be.equal(selectedItem[index].value);
                    expect(item.text, `La texte de l'item ${index} n'est pas le même que celle du tableau selectedItem`).to.be.equal(selectedItem[index].text);
                });

            }
            if (finish) {
                dataSource.removeAllListeners();
                this.end();
            }
        });
        const element = document.querySelector(`#${id} #test5`);
        (element as any).value = "libelle2";
        ReactTestUtils.Simulate.change(element);
        selectedItem.push({ value: 2, text: "libelle2" });
        setTimeout(() => {
            // sélectionner item libelle2
            this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-1`), "mousedown");
            // sélectionner item libelle22
            selectedItem.push({ value: 22, text: "libelle22" });
            setTimeout(() => {
                this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-21`), "mousedown");
                // rechercher les items commençants par libelle44
                (element as any).value = "libelle44";
                ReactTestUtils.Simulate.change(element);
                setTimeout(() => {
                    selectedItem.push({ value: 44, text: "libelle44" });
                    // sélectionner item libelle44
                    this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-43`), "mousedown");
                    setTimeout(() => {

                        selectedItem = selectedItem.filter(i => {
                            return i.value !== 2;
                        });

                        finish = true;
                        // désélectionner l'item libelle2
                        this.triggerMouseEvent(document.querySelector(`#${id} #libelle-2-2-2`), "click");
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }
    
    @Decorators.it("Conservation des éléments précédemment sélectionnnés après nouvelle recherche avec un dataSource de type service")
    testConserveSelectedItemAfterNewSearchWithDataSourceService() {
         const dataSourceService = new DataSource(new DataSourceConfig(new MockService(), "findItems"), { value: "id", text: "label" });
        reactElement6 = (
            <AutoCompleteMultiField dataSource={dataSourceService}
                maxHeight={200}
                name="test6"
                label="test6"
                required={true}
                labelKey="libelle"
                valueKey="id"
                noResultLabel="test6"
                withChipsInitials={true}
                init={true}
            />);
        let selectedItem = [];
        let finish1: boolean = false;
        dataSourceService.on("select", (selected) => {
            if (selected && Array.isArray(dataSourceService.selected)) {
                expect(dataSourceService.selected.length, "La taille du tableau dataSource.selected. n'est pas la même que celle de selectedItem").to.be.equal(selectedItem.length);
                dataSourceService.selected.forEach((item, index) => {
                    expect(item.value, `La value de l'item ${index} n'est pas la même que celle du tableau selectedItem`).to.be.equal(selectedItem[index].value);
                    expect(item.text, `La texte de l'item ${index} n'est pas le même que celle du tableau selectedItem`).to.be.equal(selectedItem[index].text);
                });

            }
            if (finish1) {
                dataSourceService.removeAllListeners();
                this.end();
            }
        });
        const id = this.generateMainId();
        this.renderIntoDocument(reactElement6, id);
        const element1 = document.querySelector(`#${id} #test6`);
        // rechercher les items commençants par libelle2
        (element1 as any).value = "libelle2";
        ReactTestUtils.Simulate.change(element1);
        selectedItem.push({ value: 2, text: "libelle2" });
        setTimeout(() => {
            // sélectionner item libelle2
            this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-0`), "mousedown");
            selectedItem.push({ value: 22, text: "libelle22" });
            setTimeout(() => {
                // sélectionner item libelle22
                this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-3`), "mousedown");
                expect(element1, "l'autocomplete n'est pas disponible").to.not.equal(null);
                // rechercher les items commençants par libelle44
                (element1 as any).value = "libelle44";
                ReactTestUtils.Simulate.change(element1);
                // sélectionner item libelle44
                setTimeout(() => {
                    selectedItem.push({ value: 44, text: "libelle44" });
                    expect(document.querySelector(`#${id} #autocomplete-selector-checkbox-0`), "le selecteur n'est pas encore disponible " + id).to.not.equal(null);
                    this.triggerMouseEvent(document.querySelector(`#${id} #autocomplete-selector-checkbox-0`), "mousedown");
                    setTimeout(() => {
                        selectedItem = selectedItem.filter(i => {
                            return i.value !== 2;
                            // Suppression de l'item libelle2
                        })
                        finish1 = true;
                        this.triggerMouseEvent(document.querySelector(`#${id} #libelle-2-2-2`), "click");
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }

    @Decorators.after
    after() {
        if (this.dataSource) {
            this.dataSource.removeAllListeners();
        }
    }
}



class MockService implements IService {
    private data = [];
    constructor() {
        for (let i: number = 1; i < 50; i++) {
            this.data.push({ id: i, label: "libelle" + i });
        }
    }
    findItems(libelle: string): Promise<any> {
        const result = this.data.filter(item => {
            return item.label.startsWith(libelle);
        })
        return new Promise(resolve => {
            resolve(result);
        });
    }

}

// lancement des Tests
runTest(new AutoCompleteMultiFieldTest());
