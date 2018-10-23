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
 * @version v5.2.2
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import * as React from "react";
import * as assert from "assert";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import { NotificationManager, Notifications } from "hornet-js-core/src/notification/notification-manager";
import { Modal } from "src/widget/dialog/modal";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";

import * as schema2 from "test/widget/notification/validation2.json";

let formElement: JSX.Element;
let renderedElement;
let maModal1: Modal;
let maModal2: Modal;

/**
 * Tests visant à s'assurer que l'on peut dispatcher les notifications de formulaire
 * d'une pop in vers une zone de notification sur une page
 */
@Decorators.describe("Test Karma Notification pop in to page")
class NotificationFormDispatchingTest extends HornetReactTest {

    @Decorators.before
    before() {
        formElement = (
            <div>
                <Notification id="notifZone" />
                <Modal ref={(modal: Modal) => {
                    maModal1 = modal
                }}
                    withoutOverflow={true} underlayClickExits={false}
                    focusDialog={false} onClickClose={this.closeModal1}>
                    <Form id={"modalForm1"} onSubmit={this.onSubmitModalForm1}>
                        {this.renderButtons("modalForm1")}
                    </Form>
                </Modal>
                <Modal ref={(modal: Modal) => {
                    maModal2 = modal
                }}
                    withoutOverflow={true} underlayClickExits={false}
                    focusDialog={false} onClickClose={this.closeModal2}>
                    <Form id={"modalForm2"} onSubmit={this.onSubmitModalForm2} schema={schema2}>
                        <InputField
                            name={"input6"}
                            label="Champ à renseigner"
                            required={true}
                            maxLength={250}
                        />
                        {this.renderButtons("modalForm2")}
                    </Form>
                </Modal>
            </div>
        );
        renderedElement = this.renderIntoDocument(formElement, "main1");
        maModal1.open();
    };

    protected closeModal1(): void {
        maModal1.close();
    }

    protected closeModal2(): void {
        maModal2.close();
    }

    protected onSubmitModalForm1() {
        maModal1.close();
        NotificationManager.cleanAll();
        NotificationManager.notify(null, null, null,
            Notifications.makeSingleNotification("", "Formulaire 1 Validé"));
    }

    protected onSubmitModalForm2() {
        maModal2.close();
        NotificationManager.cleanAll();
        NotificationManager.notify(null, null, null,
            Notifications.makeSingleNotification("", "Formulaire 2 Validé"));
    }

    protected renderButtons(formName: string): JSX.Element {
        return (
            <ButtonsArea>
                <Button type="submit" id={"envoi-" + formName} name={"action:" + formName} className="hornet-button"
                    value={"valider"}
                    label={"valider"}
                    title={"valider"} />
            </ButtonsArea>
        );
    }

    protected onSubmit() {
        let notifText: string = "Validation du formulaire";
        console.log(notifText);
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    };

    /**
     * Le formulaire 1 envoie ses notifications info vers la zone de notification partagée
     */
    @Decorators.it("Validation ok du formulaire d'une pop in")
    validerPopInForm() {
        this.triggerMouseEvent(document.querySelector("#envoi-modalForm1"), "click");
        setTimeout(() => {
            HornetTestAssert.assertFalse(maModal1.state.isVisible, "le modal modal1 ne doit plus être visible");
            let element = this.getNotificationMessageListForm("notifZone", "info-message-list");
            HornetTestAssert.assertEquals(1, element.length, "La zone de notification doit contenir un message d'info");
            this.end();
        }, 500);
    };

    /**
     * Le formulaire 2 envoie ses notifications d'erreur dans la pop in
     */
    @Decorators.it("Validation ko du formulaire d'une pop in")
    validerKOPopInForm() {
        maModal2.open();
        setTimeout(() => {
            this.triggerMouseEvent(document.querySelector("#envoi-modalForm2"), "click");
            setTimeout(() => {
                HornetTestAssert.assertTrue(maModal2.state.isVisible, "Le modal maModal2 doit être visible");
                let element = this.getNotificationMessageListForm("Form-1", "error-message-list");
                HornetTestAssert.assertEquals(1, element.length, "La zone de notification doit contenir un message d'error");
                this.end();
            }, 500);
        }, 500);
    };

    protected getNotificationMessageListForm(form: string, className: string) {
        let formElement = document.getElementById(form);
        let messageList = formElement.getElementsByClassName(className)[ 0 ];
        return (messageList) ? messageList.children : null;
    }
}

//lancement des Tests
runTest(new NotificationFormDispatchingTest());