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

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;

import * as React from "react";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { AutoCompleteField } from "src/widget/form/auto-complete-field";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";

@Decorators.describe("Test Karma auto-complete-field selection lors d'une tabulation")
class AutoCompleteFieldSelectOnTabTest extends HornetReactTest {
    @Decorators.it("selectionner un element dans l'autocomplete lors de la tabulation sans tenir compte de la casse")
    testselect() {
        const listeData = [
            { id: 1, libelle: "Madame" },
            { id: 2, libelle: "Monsieur" },
            { id: 3, libelle: "Monsieur Jourdain" },
            { id: 4, libelle: "Mademoiselle" },
        ];
        let instance;

        const dataSourceData = new DataSource<any>(listeData, { value: "id", text: "libelle" });
        const autocomplete = <AutoCompleteField
                                dataSource={dataSourceData}
                                name="lstData"
                                label="Test selection peu importe la casse"
                                labelKey="libelle"
                                valueKey="id"
                                ref={(elt) => instance=elt}/>;

        const id = this.generateMainId();
        this.renderIntoDocument(autocomplete, id);
        const element = document.querySelector(`#${id} #lstData`);
        setTimeout(() => {
            expect(element, "l'autocomplete n'existe pas").to.exist;
            this.handleChangeValueOnElement(true, document.querySelector(`#${id} #lstData`), "monsieur");
            this.triggerFocusOnElement(element);
            setTimeout(() => {
                this.triggerKeydownEvent(element, "\t", KeyCodes.TAB, false);
                setTimeout(() => {
                    expect(document.querySelector(`#${id} input[name='lstData.id']`), "le champ ayant le name 'lstData.id' n'existe pas").to.exist;
                    expect(instance.getCurrentValue(), "la currentValue de l'autocomplete n'est pas égale à 2").to.equal("2");
                    expect((document.querySelector(`#${id} input[name='lstData.id']`) as any).value, "la value n'est pas égale à 2").to.equal("2");
                    this.end();
                }, 500);
            }, 250);
        }, 250);
    }
}

// lancement des Tests
runTest(new AutoCompleteFieldSelectOnTabTest());
