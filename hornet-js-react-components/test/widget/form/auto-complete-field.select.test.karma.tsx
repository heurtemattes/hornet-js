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

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

const chai = require("chai");
const expect = chai.expect;
import * as React from "react";
import * as assert from "assert";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import forEach = require("lodash/forEach");
import { AutoCompleteField } from "src/widget/form/auto-complete-field";

let dataSource: DataSource<any>;
let element: JSX.Element;
let autocomplete;
let elementDisabled: JSX.Element;
let autocomp;



@Decorators.describe("Test Karma auto-complete-field")
class AutoCompleteFieldTest extends BaseTest {


    @Decorators.beforeEach
    beforeEach() {
        const data = [];
        for (let i: number = 1; i < 50; i++) {
            data.push({ id: i, label: "libelle" + i });
        }
        dataSource = new DataSource(data, { value: "id", text: "label" });

        element = (
            <AutoCompleteField dataSource={dataSource}
                maxHeight={200}
                name="civilite"
                label="civilite"
                required={true}
                labelKey="libelle"
                valueKey="id"
            />);

            elementDisabled = (
                <AutoCompleteField dataSource={dataSource}
                    maxHeight={200}
                    name="civilite"
                    label="civilite"
                    required={true}
                    labelKey="libelle"
                    valueKey="id"
                    ref = {(value) => autocomp = value}
                />);
        
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("selectionner un element dans l'autocomplete")
    testselect() {
        let index = 0;
        dataSource.on("select", () => {
            index++;
            expect(_.isEqual(dataSource.selected.value, index), ("L'élément sélectionner dans le datasource " + dataSource.selected.value + " doit être identique à l'element suivant : " + index)).to.be.true;
            if (index === dataSource.results.length - 1) this.end();
        });

        autocomplete = this.renderIntoDocument(element, "main1");

        dataSource.on("fetch", () => {
            (document.querySelector("#civilite") as any).click();
            const elts = document.querySelectorAll("#main1 .autocomplete-item");
            dataSource.results.forEach((value, index) => {
                this.triggerMouseEvent(elts[ index ], "mousedown");
            });
        });

        dataSource.reload();
    }

    @Decorators.it("croix de suppression pour autocomplete disabled")
    testdisabled() {
        const id = this.generateMainId();
        autocomplete = this.renderIntoDocument(elementDisabled, id);
        setTimeout( () => { 
            autocomp.setDisabled(true).setReadOnly(true);
            setTimeout( () => { 
                const croix = document.querySelector("#" + id + " #civiliteResetButton");
                expect(croix).to.be.null;
                this.end();
            },          250);
        },          250);
    }

}

// lancement des Tests
runTest(new AutoCompleteFieldTest());
