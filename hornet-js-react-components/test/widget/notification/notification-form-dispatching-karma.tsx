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
import * as React from "react";
import * as assert from "assert";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";
import { Accordions } from "hornet-js-react-components/src/widget/accordion/accordions";
import { Accordion } from "hornet-js-react-components/src/widget/accordion/accordion";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";

import * as schema from "test/widget/notification/validation1.json";
import * as schema2 from "test/widget/notification/validation2.json";
import * as schema3 from "test/widget/notification/validation3.json";
import * as schema4 from "test/widget/notification/validation4.json";

let formElement: JSX.Element;
let renderedElement;

/**
 * Tests visant à s'assurer que l'on peut dispatcher correction les notifications de formulaire
 * pour chaque formulaire. Chaque formulaire génère sa propre zone de notification
 */
@Decorators.describe("Test Karma Notification form dispatching")
class NotificationFormDispatchingTest extends HornetReactTest {


    @Decorators.before
    before() {
        formElement = (
            <div>
                {this.generateAccordionsIntoForm()}
                {this.generateFormsIntoAccordions()}
            </div>
        );
        renderedElement = this.renderIntoDocument(formElement, "main1");
    };

    /**
     * Cas de test où un formulaire contient un ensemble d'accordions
     * @returns {JSX.Element}
     */
    protected generateAccordionsIntoForm(): JSX.Element {
        return (
            <Form id={"form1"}
                  onSubmit={this.onSubmit}
                  schema={schema}>
                <Accordions id="id-accordions-form-1"
                            multiSelectable={false}>
                    <Accordion>
                        <Row>
                            <InputField
                                name={"input1"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                    </Accordion>
                    <Accordion>
                        <Row>
                            <InputField
                                name={"input2"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        <Row>
                            <InputField
                                name={"input3"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                    </Accordion>
                    <Accordion>
                        <Row>
                            <InputField
                                name={"input4"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        <Row>
                            <InputField
                                name={"input5"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                    </Accordion>
                </Accordions>
                {this.renderButtons("form1")}
            </Form>
        );
    }

    /**
     * Cas de test d'un Accordions qui contient un formulaire par accordion
     */
    protected generateFormsIntoAccordions(): JSX.Element {
        return (
            <Accordions id="id-accordions-form-2"
                        multiSelectable={true}>
                <Accordion>
                    <Form id={"form2"}
                          onSubmit={this.onSubmit}
                          schema={schema2}>
                        <Row>
                            <InputField
                                name={"input6"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        {this.renderButtons("form2")}
                    </Form>
                </Accordion>
                <Accordion>
                    <Form id={"form3"}
                          onSubmit={this.onSubmit}
                          schema={schema3}>
                        <Row>
                            <InputField
                                name={"input7"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        <Row>
                            <InputField
                                name={"input8"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        {this.renderButtons("form3")}
                    </Form>
                </Accordion>
                <Accordion>
                    <Form id={"form4"}
                          onSubmit={this.onSubmit}
                          schema={schema4}>
                        <Row>
                            <InputField
                                name={"input9"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        <Row>
                            <InputField
                                name={"input10"}
                                label="Champ à renseigner"
                                required={true}
                                maxLength={250}
                            />
                        </Row>
                        {this.renderButtons("form4")}
                    </Form>
                </Accordion>
            </Accordions>
        );
    }

    protected renderButtons(formName: string): JSX.Element {
        return (
            <ButtonsArea>
                <Button type="submit" id={"envoi-"+formName} name={"action:"+formName} className="hornet-button"
                        value={"valider"}
                        label={"valider"}
                        title={"valider"} />
            </ButtonsArea>
        );
    }

    protected onSubmit() {
        let notifText: string = "mon texte de notification";
        console.log("Validation du formulaire");
    }


    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    };

    @Decorators.it("Valider formulaire 1")
    validerForm1() {
        this.triggerMouseEvent(document.querySelector("#main1 #envoi-form1"), "click");
        setTimeout(() => {
            let element = this.getNotificationMessageListForm("Form-0", "error-message-list");
            HornetTestAssert.assertEquals(5, element.length, "La zone de notification doit contenir 5 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-0-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-1-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-2-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            let accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("form1", "errors-content");
            HornetTestAssert.assertEquals(5, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 5 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-0-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-1-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-2-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            this.end();
        }, 500);
    };

    protected getNotificationMessageListForm(form: string, className: string) {
        let formElement = document.getElementById(form);
        let messageList = formElement.getElementsByClassName(className)[0];
        return (messageList) ? messageList.children : null;
    }

    protected getNotificationNumberErrorAccordionForm(form: string, className: string): number {
        let formElement = document.getElementById(form);
        let errorTagAccordion = formElement.getElementsByClassName(className);
        let count: number = 0;
        for(let i=0;i<errorTagAccordion.length;i++) {
            count += Number(errorTagAccordion[i].textContent.split(" ")[0]);
        }
        return count;
    }

    @Decorators.it("Valider formulaire 2")
    validerForm2() {
        this.triggerMouseEvent(document.querySelector("#main1 #envoi-form2"), "click");
        setTimeout(() => {
            let element = this.getNotificationMessageListForm("Form-0", "error-message-list");
            HornetTestAssert.assertEquals(5, element.length, "La zone de notification doit contenir 5 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-0-li", "error-message-list");
            HornetTestAssert.assertEquals(1, element.length, "La zone de notification doit contenir 1 message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-1-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-2-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            let accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("form1", "errors-content");
            HornetTestAssert.assertEquals(5, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 5 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-0-li", "errors-content");
            HornetTestAssert.assertEquals(1, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 1 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-1-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-2-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            this.end();
        }, 500);
    };

    @Decorators.it("Valider formulaire 3")
    validerForm3() {
        this.triggerMouseEvent(document.querySelector("#main1 #envoi-form3"), "click");
        setTimeout(() => {
            let element = this.getNotificationMessageListForm("Form-0", "error-message-list");
            HornetTestAssert.assertEquals(5, element.length, "La zone de notification doit contenir 5 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-0-li", "error-message-list");
            HornetTestAssert.assertEquals(1, element.length, "La zone de notification doit contenir 1 message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-1-li", "error-message-list");
            HornetTestAssert.assertEquals(2, element.length, "La zone de notification doit contenir 2 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-2-li", "error-message-list");
            HornetTestAssert.assertNull(element, "La zone de notification ne doit contenir aucun message d'erreur");
            let accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("form1", "errors-content");
            HornetTestAssert.assertEquals(5, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 5 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-0-li", "errors-content");
            HornetTestAssert.assertEquals(1, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 1 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-1-li", "errors-content");
            HornetTestAssert.assertEquals(2, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 2 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-2-li", "errors-content");
            HornetTestAssert.assertEquals(0, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 0 erreur");
            this.end();
        }, 500);
    };

    @Decorators.it("Valider formulaire 4")
    validerForm4() {
        this.triggerMouseEvent(document.querySelector("#main1 #envoi-form4"), "click");
        setTimeout(() => {
            let element = this.getNotificationMessageListForm("Form-0", "error-message-list");
            HornetTestAssert.assertEquals(5, element.length, "La zone de notification doit contenir 5 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-0-li", "error-message-list");
            HornetTestAssert.assertEquals(1, element.length, "La zone de notification doit contenir 1 message d'erreur");
            element = this.getNotificationMessageListForm("id-accordions-form-2-1-li", "error-message-list");
            HornetTestAssert.assertEquals(2, element.length, "La zone de notification doit contenir 2 messages d'erreurs");
            element = this.getNotificationMessageListForm("id-accordions-form-2-2-li", "error-message-list");
            HornetTestAssert.assertEquals(2, element.length, "La zone de notification doit contenir 2 messages d'erreurs");
            let accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("form1", "errors-content");
            HornetTestAssert.assertEquals(5, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 5 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-0-li", "errors-content");
            HornetTestAssert.assertEquals(1, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 1 erreur");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-1-li", "errors-content");
            HornetTestAssert.assertEquals(2, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 2 erreurs");
            accordionsTagErrorNumber = this.getNotificationNumberErrorAccordionForm("id-accordions-form-2-2-li", "errors-content");
            HornetTestAssert.assertEquals(2, accordionsTagErrorNumber, "Les tags de l'accordions doivent indiquer 2 erreurs");
            this.end();
        }, 500);
    };

}

//lancement des Tests
runTest(new NotificationFormDispatchingTest());