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

import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import { Form } from "src/widget/form/form";
import { InputField } from 'src/widget/form/input-field';
import { Button } from 'src/widget/button/button';
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";

@Decorators.describe("Test Karma Notifications cleaning with form")
class TestNotificationCleaningFormTest extends BaseTest {
    element: JSX.Element;
    elementNoClean: JSX.Element;
    clean: boolean = true;
    protected monForm: Form;
    protected monForm2: Form;
    protected schema = {
        "$schema": "http://json-schema.org/schema#",
        "title": "Formulaire autocomplete et gestion notification de validation",
        "description": "Validation des données de formulaire d'un secteur",
        "type": "object",
        "required": [
          "nom",
          "prenom"
        ],
        "properties": {
          "nom": {
            "description": "nom",
          },
          "mySlaveField": {
            "description": "prenom",
          }
        }
      };

    @Decorators.beforeEach
    beforeEach() {
        this.element = (
            <div>
                <Form
                    id="modalForm"
                    ref={(form: Form) => {
                        this.monForm = form;
                    }}
                    schema={this.schema}>
                    <InputField
                        name={"nom"}
                        label={"nom"}
                        required={true} />
                    <InputField
                        name={"prenom"}
                        label={"prenom"}
                        required={true} />
                </Form>
                <Button onClick={() =>{this.validateFunction(this.clean)}} id="menuRafraichir"
                            label={"Rafraichir"}/>
            </div>
        );
    }
    @Decorators.it("Test avec clean notification")
    testWithClean() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.element, id);
        let button = document.getElementById("menuRafraichir");
        button.click();
        setTimeout(() => {
            let notif = document.getElementsByClassName("error-message-list");
            HornetTestAssert.assertTrue(notif && notif.length > 0, "La notification doit etre présente");

            let errorNom = document.getElementById("nom-ACTION_ERREUR_0-error");
            HornetTestAssert.assertNotNull(errorNom, "l'erreur sur le champs nom est présente");

            let errorPrenom = document.getElementById("prenom-ACTION_ERREUR_1-error");
            HornetTestAssert.assertNotNull(errorPrenom, "l'erreur sur le champs prenom est présente");


            this.monForm.updateFields({nom : "a", prenom: "b"});
            setTimeout(() => {
                button = document.getElementById("menuRafraichir");
                button.click();
                setTimeout(() => {
                    notif = document.getElementsByClassName("error-message-list");
                    HornetTestAssert.assertTrue(!notif || notif && notif.length === 0, "La notification ne doit pas etre présente");

                    errorNom = document.getElementById("nom-ACTION_ERREUR_0-error");
                    HornetTestAssert.assertNull(errorNom, "l'erreur sur le champs nom n'est pas présente");

                    errorPrenom = document.getElementById("prenom-ACTION_ERREUR_1-error");
                    HornetTestAssert.assertNull(errorPrenom, "l'erreur sur le champs prenom n'est pas présente");

                    this.end();
                }, 250);
            },250);
        }, 250);
    }

    @Decorators.it("Test sans clean notification")
    testWithoutClean() {
        this.clean = false;
        const id = this.generateMainId();
        this.renderIntoDocument(this.element, id);
        let button = document.querySelector(`#${id} #menuRafraichir`);
        (button as HTMLElement).click();
        setTimeout(() => {
            let notif = document.querySelector(".error-message-list");
            HornetTestAssert.assertNotNull(notif, "La notification doit etre présente 1");

            let errorNom = document.querySelector(`#${id} #nom-ACTION_ERREUR_0-error`);
            HornetTestAssert.assertNotNull(errorNom, "l'erreur sur le champs nom est présente 1");

            let errorPrenom = document.querySelector(`#${id} #prenom-ACTION_ERREUR_1-error`);
            HornetTestAssert.assertNotNull(errorPrenom, "l'erreur sur le champs prenom est présente 1");

            this.monForm.updateFields({nom : "a", prenom: "b"});
            setTimeout(() => {
                button = document.querySelector(`#${id} #menuRafraichir`);
                (button as HTMLElement).click();
                setTimeout(() => {
                    notif = document.querySelector(".error-message-list");
                    HornetTestAssert.assertNotNull(notif , "La notification doit etre présente 1");

                    errorNom = document.querySelector(`#${id} #nom-ACTION_ERREUR_0-error`);
                    HornetTestAssert.assertNotNull(errorNom, "l'erreur sur le champs nom est présente 2");

                    errorPrenom = document.querySelector(`#${id} #prenom-ACTION_ERREUR_1-error`);
                    HornetTestAssert.assertNotNull(errorPrenom, "l'erreur sur le champs prenom est présente 2");

                    this.end();
                }, 250);
            },250);
        }, 250);
    }

    protected validateFunction(clean: boolean) {
        const response = this.monForm.validate(true, this.schema, clean);
        console.log("validation response", response);
    }
}

// lancement des Tests
runTest(new TestNotificationCleaningFormTest());
