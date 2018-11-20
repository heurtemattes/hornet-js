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
const chai = require("chai");
const expect = chai.expect;
import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

import { Tabs } from "hornet-js-react-components/src/widget/tab/tabs";
import { Tab } from "hornet-js-react-components/src/widget/tab/tab";

import { Form } from 'src/widget/form/form';
import { InputField } from 'src/widget/form/input-field';
import * as schemaTabsInForm from "./validation-tabs-in-form.json";
import * as schemaFormInTabs from "./validation-form-in-tabs.json";
import { ButtonsArea } from 'src/widget/form/buttons-area';
import { Button } from 'src/widget/button/button';
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});



@Decorators.describe("Test Karma tabs gestion des erreurs")
class NotificationTabsErrorsTest extends BaseTest {
    formElement: Form;

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });
    }

    @Decorators.it("Test erreur d'un formulaire contenant un tabs")
    testNotifTabsInForm() {
        const element = (
            <Form
                id="testFormNotiftabs"
                onSubmit={(data) => { }}
                className="no-background"
                schema={schemaTabsInForm}>
                <Tabs id="tabs" selectedTabIndex={0} beforeHideTab={() => {
                }} afterShowTab={() => {
                }}
                >
                    <Tab title="tab1">
                        <InputField name="nom" required label="Nom">
                        </InputField>
                    </Tab>
                    <Tab title="tab2" >
                        <InputField name="adresse" required label="Adresse"></InputField>
                        <ButtonsArea>
                            <Button type="submit" id="envoi-testFormNotiftabs" name="action:envoi" className="hornet-button"
                                value="valider"
                                label="Valider"
                                title="Valider" />
                        </ButtonsArea>
                    </Tab>
                </Tabs>
            </Form>
        );
        const id = this.generateMainId();

        this.renderIntoDocument(element, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #envoi-testFormNotiftabs`), "click");
        setTimeout(() => {
            expect(document.querySelector(`#${id} #ACTION_ERREUR_0`).innerHTML).to.equal("Onglet tab1 - Le champ « Nom » est obligatoire. Veuillez saisir ce champ.");
            expect(document.querySelector(`#${id} #ACTION_ERREUR_1`).innerHTML).to.equal("Onglet tab2 - Le champ « Adresse » est obligatoire. Veuillez saisir ce champ.");
            this.end();
        }, 500);
    }

    @Decorators.it("Test erreur d'un formulaire contenu dans un tabs")
    testNotifFormInTabs() {
        const element = (
            <Tabs id="tabs-testFormNotiftabs1" selectedTabIndex={0} beforeHideTab={() => {
            }} afterShowTab={() => {
            }}>
                <Tab title="tab1">
                    <Form
                        id="testFormNotiftabs1"
                        onSubmit={(data) => { }}
                        className="no-background"
                        schema={schemaFormInTabs}>
                        <InputField name="nom1" required label="Nom">
                        </InputField>
                        <InputField name="adresse1" required label="Adresse"></InputField>
                        <ButtonsArea>
                            <Button type="submit" id="envoi-testFormNotiftabs1" name="action:envoi" className="hornet-button"
                                value="valider"
                                label="Valider"
                                title="Valider" />
                        </ButtonsArea>
                    </Form>
                </Tab>
                <Tab title="tab2">
                    <div>Hello team hornet-js</div>
                </Tab>
            </Tabs >
        );
        const id = this.generateMainId();

        this.renderIntoDocument(element, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #envoi-testFormNotiftabs1`), "click");
        setTimeout(() => {
            expect(document.querySelector(`#${id} #ACTION_ERREUR_0`).innerHTML).to.equal("Le champ « Nom » est obligatoire. Veuillez saisir ce champ.");
            expect(document.querySelector(`#${id} #ACTION_ERREUR_1`).innerHTML).to.equal("Le champ « Adresse » est obligatoire. Veuillez saisir ce champ.");
            this.end();
        }, 500);
    }


}

// lancement des Tests
runTest(new NotificationTabsErrorsTest());

