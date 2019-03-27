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

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import * as schema from "hornet-js-react-components/test/widget/form/form-validate.submit.json";
import { InputField } from "src/widget/form/input-field";
import { CalendarField } from "src/widget/form/calendar-field";
import { Row } from "src/widget/form/row";
import { ButtonsArea } from "src/widget/form/buttons-area";
import { Button } from "src/widget/button/button";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { Utils } from "hornet-js-utils";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";

let element: JSX.Element;
const dataSet = { nom: "Secteur9", desc: "Secteur 9", date: new Date("2015-03-25") };

@Decorators.describe("Test Karma Form validation et soumission")
class FormValidateSubmit extends BaseTest {
    protected className: string = "FormValideSubmit";
    /** Formulaire d'édition de secteur */
    private monForm: Form;

    @Decorators.beforeEach
    beforeEach() {
        Utils.setCls("hornet.internationalization", { messages });
        element = (
            <div>
                <Form
                    id="modalForm"
                    ref={(form: Form) => {
                        this.monForm = form;
                        if (this.monForm) {
                            this.monForm.updateFields(dataSet);
                        }
                    }}
                    schema={schema}
                >
                    <Row>
                        <InputField name="nom" label="nom"
                            required={true} size={40} maxLength={50} />
                    </Row>
                    <Row>
                        <InputField name="desc" label="description"
                            required={true} size={40} maxLength={200} />
                        <CalendarField
                            valideOnForm={false}
                            label={"Test date alt props"}
                            alt={"test alt props"}
                            name="date"
                        />
                    </Row>
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
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Test validation du formulaire avec schema par défaut")
    testDefaultValidationForm() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, `${this.className}-main${id}`);
        let form = document.getElementById("modalForm");
        HornetTestAssert.assertNotNull(form, " le form est présent");
        const valide: boolean = this.monForm.validate(false);
        HornetTestAssert.assertTrue(valide, "Le formulaire n'est pas correctement validé");
        this.end();
    }

    @Decorators.it("Test validation du formulaire avec schema custom")
    testCustomValidationForm() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, `${this.className}-main${id}`);
        const valide: boolean = this.monForm.validate(false, schema);
        HornetTestAssert.assertTrue(valide, "Le formulaire n'est pas correctement validé");
        this.end();
    }

    @Decorators.it("Test invalidation du formulaire avec schema par défaut")
    testDefaultInvalidationForm() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, `${this.className}-main${id}`);
        const invalideData = { desc: "Secteur 9" };
        this.monForm.updateFields(invalideData);
        const valide: boolean = this.monForm.validate(false);
        HornetTestAssert.assertFalse(valide, "Le formulaire n'aurait pas dû être validé");
        this.end();
    }

    @Decorators.it("Test invalidation du formulaire avec schema custom")
    testCustomInvalidationForm() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, `${this.className}-main${id}`);
        const invalideData = { nom: "Secteur 9" };
        this.monForm.updateFields(invalideData);
        const valide: boolean = this.monForm.validate(false, schema);
        HornetTestAssert.assertFalse(valide, "Le formulaire n'aurait pas dû être validé");
        const messageList = this.getNotificationMessageListForm(`FormValideSubmit-main${id}`, "error-message-list");
        HornetTestAssert.assertNull(messageList, "Il est anormal de récupérer des notifications quand elles sont désactivées");
        this.end();
    }

    @Decorators.it("Test invalidation du formulaire avec schema par défaut et notification des erreurs")
    testCustomInvalidationFormWithNotify() {
        const id = this.generateMainId();
        this.renderIntoDocument(element, `${this.className}-main${id}`);
        const invalideData = { nom: "Secteur 9" };
        this.monForm.updateFields(invalideData);
        const valide: boolean = this.monForm.validate(true);
        HornetTestAssert.assertFalse(valide, "Le formulaire n'aurait pas dû être validé");
        const messageList = this.getNotificationMessageListForm(`FormValideSubmit-main${id}`, "error-message-list");
        HornetTestAssert.assertNotNull(messageList, "Aucune notification récupérée par la validation");
        this.end();
    }

    protected getNotificationMessageListForm(divName: string, className: string) {
        const div: HTMLElement = document.getElementById(divName);
        const messageList = div.getElementsByClassName(className)[ 0 ];
        return (messageList) ? messageList.children : null;
    }
}

// lancement des Tests
runTest(new FormValidateSubmit());
