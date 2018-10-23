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

import { Utils } from "hornet-js-utils";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Dropdown, Position } from "hornet-js-react-components/src/widget/dropdown/dropdown";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";

var chai = require('chai');
const expect = chai.expect;


function renderIntoDocument(element, id) {
    let div = document.createElement('div');
    if (id) {
        div.id = id;
    }
    document.body.appendChild(div);
    return ReactDom.render(element, div);
}

import forEach = require("lodash/forEach");
import { HornetTestAssert } from 'hornet-js-test/src/hornet-test-assert';
import { HornetReactTest } from 'hornet-js-test/src/hornet-react-test';
import { KeyCodes } from 'hornet-js-components/src/event/key-codes';
const logger = Utils.getLogger("hornet-js-react-components.test.dropdown.dropdown");
let element, element1: JSX.Element;


@Decorators.describe('Test Karma Dropdown')
class DropdownTest extends HornetReactTest {
    @Decorators.beforeEach
    beforeEach() {
        let dropdownItems = [];

        dropdownItems.push({ id: "item1", label: "text Label 1", /*action: ,*/className: "items-0", disabled: true });
        dropdownItems.push({ id: "item2", label: "text Label 2", /*action: ,*/className: "items-1", disabled: false });
        element = (
            <Dropdown
                className={"language"}
                id={"Change-Langauge"}
                items={dropdownItems}
                position={Position.TOPRIGHT}
                icon="language-arrow-down"
                valueCurrent={152}
            />);
        element1 = (
            <Dropdown
                className={"test"}
                id={"test"}
                items={dropdownItems}
                position={Position.TOPRIGHT}
                icon="test-arrow-down"
                valueCurrent={152}
                closeClick={false}
            />)


    }

    @Decorators.it('Test OK')
    testOk() {
        assert.equal(1, 1);
        this.end();
    };

    @Decorators.it("Test Affichage Dropdown")
    testAffichage() {
        const id = this.generateMainId();
        renderIntoDocument(element, id);

        /* Existance du boutton dropdown */
        expect(document.querySelector(`#${id} .language .dropdown-button .label`), "Problème élément Label non trouvé").to.exist;
        expect(document.querySelector(`#${id} .language .dropdown-button .icon`), "Problème élément Icon non trouvé").to.exist;
        /* Existance de la dropListe */
        expect(document.querySelector(`#${id} .language .dropdown-content.dropdown-content-hidden .dropdown-list `), "Problème élément dropdownlist non trouvé").to.exist;
        this.end();

    }

    @Decorators.it("Test clic Dropdown")
    testClickButton(done) {
        const id = this.generateMainId()
        renderIntoDocument(element, id);

        (document.querySelector(`#${id} .language .dropdown-button`) as any).click();
        expect(document.querySelector(`#${id} .language .dropdown-content-hidden .dropdown-list`), "Problème lors du clic sur le bouton pour ouvrir la dropbox").to.be.null;
        this.end();

    }

    @Decorators.it("Test clic à l'extérieur du Dropdown")
    testClickHorsDuDropdown(done) {
        const id = this.generateMainId();
        const elemntSuperflux = <div id="div-superflux"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p></div>;
        renderIntoDocument(element, id);
        renderIntoDocument(elemntSuperflux, id);

        // clic sur le bouton permettant d'ouvrir le dropdown
        this.triggerMouseEvent(document.querySelector(`#${id} .language .dropdown-button`), "click");

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            // Clic à l'exterieur du dropdown, sur un autre noeud du DOM
            this.triggerMouseEvent(document.querySelector(`#${id} #div-superflux`), "click");
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);

    }

    @Decorators.it("Test clic à l'interieur du DropDown avec l'attribut closeClick à true : Fermeture du dropdown")
    testClickDansLeDropdown(done) {
        const id = this.generateMainId();
        renderIntoDocument(element, id);

        // clic sur le bouton permettant d'ouvrir le dropdown
        this.triggerMouseEvent(document.querySelector(`#${id} .language .dropdown-button`), "click");

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            // Clic à sur un item du dropdown => fermeture du dropdown
            this.triggerMouseEvent(document.querySelector(`#${id} .dropdown-list .items-0`), "click");
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);


    }

    @Decorators.it("Test clic à l'interieur du DropDown avec l'attribut closeClick à false : Le dropdown reste ouvert")
    testClickDansLeDropdown1(done) {
        const id = this.generateMainId();
        renderIntoDocument(element1, id);

        // clic sur le bouton permettant d'ouvrir le dropdown
        this.triggerMouseEvent(document.querySelector(`#${id} .test .dropdown-button`), "click");

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .test .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #testcontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #testcontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            // Clic à sur un item du dropdown => le dropdon reste ouverte
            this.triggerMouseEvent(document.querySelector(`#${id} .dropdown-list .items-0`), "click");
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .test .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #testcontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
                HornetTestAssert.assertFalse(document.querySelector(`#${id} #testcontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);
    }

    @Decorators.it("Test Ouverture/fermeture du dropdown avec la touche espace")
    testOpenAndCloseWithESPACE() {
        const id = this.generateMainId();
        renderIntoDocument(element, id);
        this.triggerKeydownEvent(document.querySelector(`#${id} .language .dropdown-button`), " " , KeyCodes.SPACEBAR, false);

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            this.triggerKeydownEvent(document.querySelector(`#${id} .language .dropdown-button`), " " , KeyCodes.SPACEBAR, false);
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);
    }

    @Decorators.it("Test fermeture du dropdown avec la touche echap")
    testCloseWithESCAPE() {
        const id = this.generateMainId();
        renderIntoDocument(element, id);
        this.triggerKeydownEvent(document.querySelector(`#${id} .language .dropdown-button`), " " , KeyCodes.SPACEBAR, false);

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            this.triggerKeydownEvent(document.querySelector(`#${id} .language .dropdown-button`), " " , KeyCodes.ESCAPE, false);
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);
    }

    @Decorators.it("Test fermeture du dropdown avec la touche echap sur un item")
    testCloseWithESCAPEOnItem() {
        const id = this.generateMainId();
        renderIntoDocument(element, id);
        this.triggerKeydownEvent(document.querySelector(`#${id} .language .dropdown-button`), " " , KeyCodes.SPACEBAR, false);

        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            this.triggerKeydownEvent(document.querySelector(`#${id} .dropdown-list .items-0`), " " , KeyCodes.ESCAPE, false);
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                this.end();
            }, 250);
        }, 250);
    }

    @Decorators.it("Test fermeture du dropdown à l'ouverture un autre dropdown")
    testCloseDropdownWhenActivingOtherDropdown() {
        const id = this.generateMainId();
        renderIntoDocument(element, id);
        renderIntoDocument(element1, id);
        
        this.triggerMouseEvent(document.querySelector(`#${id} .language .dropdown-button`), "click");
        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "true", "L'attribut aria-expanded n'est pas à true");
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content"), "1-Le dropdown n'est ouvert");
            HornetTestAssert.assertFalse(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "2-Le dropdown n'est ouvert");
            this.triggerMouseEvent(document.querySelector(`#${id} .test .dropdown-button`), "click");
            setTimeout(() => {
                HornetTestAssert.assertTrue(document.querySelector(`#${id} .language .dropdown-button`).getAttribute("aria-expanded") === "false", "L'attribut aria-expanded n'est pas à false");
                HornetTestAssert.assertTrue(document.querySelector(`#${id} #Change-Langaugecontent`).classList.contains("dropdown-content-hidden"), "4-Le dropdown n'est ouvert");
                // fermer le dropdown
                this.triggerMouseEvent(document.querySelector(`#${id} .test .dropdown-button`), "click");
                this.end();
            }, 150);
        }, 150);

    }
}

//lancement des Tests
runTest(new DropdownTest());