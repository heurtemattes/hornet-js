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

import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";


import { Tabs } from "src/widget/tab/tabs";
import { Tab } from "src/widget/tab/tab";
import * as _ from "lodash";

import { Form } from 'src/widget/form/form';
import { InputField } from 'src/widget/form/input-field';
const schema = require("./validation.json");
import { ButtonsArea } from 'src/widget/form/buttons-area';
import { Button } from 'src/widget/button/button';


let element: JSX.Element;

@Decorators.describe("Test Karma tabs gestion des erreurs")
class TabsErrorsTest extends BaseTest {
    formElement: Form;
    @Decorators.beforeEach
    beforeEach() {
        element = (
            <Form
                id="testForm"
                ref={(form) => {
                    this.formElement = form;
                }}
                onSubmit={(data) => { }}
                className="no-background"
                schema={schema}
            >
                <Tabs id="tabs" selectedTabIndex={0} beforeHideTab={() => {
                }} afterShowTab={() => {
                }}
                >
                    <Tab title="tab1">
                        <InputField name="nom" required label="Nom">
                        </InputField>
                    </Tab>
                    <Tab title="tab2">
                        <InputField name="adresse" required label="Adresse"></InputField>
                        <ButtonsArea>
                            <Button type="submit" id="envoi" name="action:envoi" className="hornet-button"
                                value="valider"
                                label="Valider"
                                title="Valider" />
                        </ButtonsArea>
                    </Tab>
                </Tabs>
            </Form>
        );

    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Affichage des erreurs et focus du champ en erreur au clic sur la notification correspondante")
    testHandleErrors() {
        const id = this.generateMainId();

        this.renderIntoDocument(element, id);
        expect(document.querySelector(`#${id} #tabs-1`)).to.exist;
        this.triggerMouseEvent(document.querySelector(`#${id} #tabs-1`), "click");
        setTimeout(() => {
            expect(document.querySelector(`#${id} #envoi`)).to.exist;
            this.triggerMouseEvent(document.querySelector(`#${id} #envoi`), "click");
            setTimeout(() => {
                expect(document.querySelector(`#${id} #ACTION_ERREUR_0`)).to.exist;
                expect(document.querySelector(`#${id} #ACTION_ERREUR_1`)).to.exist;
                expect(document.querySelector(`#${id} #tabs-0`).getAttribute("data-badge")).to.equal("1");
                expect(document.querySelector(`#${id} #tabs-1`).getAttribute("data-badge")).to.equal("1");
                this.triggerMouseEvent(document.querySelector(`#${id} #ACTION_ERREUR_1`), "click");
                setTimeout(() => {
                    expect(document.querySelector(`#${id} #tabs-0`).getAttribute("tabIndex")).to.equal("-1");
                    expect(document.querySelector(`#${id} #tabs-1`).getAttribute("tabIndex")).to.equal(null);
                    expect(document.querySelector(`#${id} #adresse`) === document.activeElement).to.equal(true);
                    

                    this.triggerMouseEvent(document.querySelector(`#${id} #ACTION_ERREUR_0`), "click");

                    setTimeout(() => {
                        expect(document.querySelector(`#${id} #tabs-0`).getAttribute("tabIndex")).to.equal(null);
                        expect(document.querySelector(`#${id} #tabs-1`).getAttribute("tabIndex")).to.equal("-1");
                        expect(document.querySelector(`#${id} #nom`) === document.activeElement).to.equal(true);
                        this.end();
                    }, 750);
                }, 750);
            }, 750);
        }, 750);
    }


}

// lancement des Tests
runTest(new TabsErrorsTest());
