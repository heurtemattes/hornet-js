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
import * as React from "react";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import * as assert from "assert";

import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { Table } from "src/widget/table/table";
import { Header } from "src/widget/table/header";
/* Composant Content */
import { Content } from "src/widget/table/content";
/*  Colonne du tableau */
import { Column } from "src/widget/table/column";
import { Columns } from "src/widget/table/columns";
import { EditionActionColumn } from "src/widget/table/column/edition-action-column";
import { Notification } from "src/widget/notification/notification";

import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";

/** Tableau de liste de secteurs */
let dataSourceTableEditable: DataSource<any>;
let tableEditableElement: JSX.Element;
let data;

@Decorators.describe('Test Karma table editable')
class tableTest extends HornetReactTest {


    @Decorators.beforeEach
    beforeEach() {
        data = [];
        let step = 1;
        for (let i: number = 1; i < 3; i++) {
            data.push({ id: i, label: "libelle" + i, desc: (step % 3 == 0) ? "desc" + 0 : "desc" + step++ });
        }

        dataSourceTableEditable = new DataSource(data);

        tableEditableElement = (
            <div>
                <Notification id="notifTest" />
                <Table id="lite1">
                    <Header title={"Tableau editable"}>
                    </Header>
                    <Content dataSource={dataSourceTableEditable} notifId={"notifTest"} >
                        <Columns>
                            <Column keyColumn="label" title={"libelle"} sortable={true} editable={true} />
                            <Column keyColumn="desc" title={"desc"} sortable={true} />
                            <EditionActionColumn keyColumn="id"
                                titleEdit={"modif rapide"}
                                titleSave={"Enregistrer"}
                                titleCancel={"Annuler"}
                                messageAlert={"Voulez vous annuler votre modification"}
                                titleAlert={"Annuler"}
                            />
                        </Columns>
                    </Content>
                </Table>
            </div>
        );
    };


    @Decorators.it('afficher une cellule editable ')
    editerElement() {
        const id = this.generateMainId();
        this.renderIntoDocument(tableEditableElement, id);
        dataSourceTableEditable.on("fetch", (value) => {
            this.triggerMouseEvent(document.querySelector(`#${id} #lite1-0-colBody-0-2 .edition-button-action-before`), "click");
            const cellElement = document.querySelector(`#${id} #lite1-0-colBody-0-0 .table-cell-input`);
            HornetTestAssert.assertNotNull(cellElement, "L'élement basé sur table-cell-input aux coordonées 0-0 n'a pas été trouvé");
            const buttonElement = document.querySelectorAll(`#${id} #lite1-0-colBody-0-2 .edition-button-action`);
            HornetTestAssert.assertEquals(2, buttonElement.length, "buttonElement devrait contenir une collection de deux éléments");
            this.end();
        });
        dataSourceTableEditable.reload();
    }

    @Decorators.it("Annuler modification cellule editable")
    annulerElement() {
        const id = this.generateMainId();
        this.renderIntoDocument(tableEditableElement, id);

        this.triggerMouseEvent(document.querySelector(`#${id} #lite1-0-colBody-0-2 .edition-button-action-before`), "click");
        setTimeout(() => {
            HornetTestAssert.assertNotNull(document.querySelector(`#${id} #lite1-0-colBody-0-0 .table-cell-input`), "L'élement basé sur table-cell-input aux coordonées 0-0 n'a pas été trouvé");
            HornetTestAssert.assertNotNull(document.querySelector(`#${id} #lite1-0-colBody-0-2 button[title=Annuler]`), "L'élement bouton aux coordonnées 0-2 n'a pas été trouvé");
            this.triggerMouseEvent(document.querySelector(`#${id} #lite1-0-colBody-0-2 button[title=Annuler]`), "click");

            setTimeout(() => {
                HornetTestAssert.assertNotNull(document.querySelector(".widget-dialogue-header"), "widget-dialogue-header non trouvé");
                HornetTestAssert.assertNotNull(document.querySelector("#confirmOK"), "Le bouton de confirmation n'a pas été trouvé");
                //Annimation fermeture de la boite de dialog
                this.triggerMouseEvent(document.querySelector("#confirmOK"), "click");
                setTimeout(() => {
                    HornetTestAssert.assertNull(document.querySelector(".widget-dialogue-header"), "Le header ne devrait pas être trouvé");
                    HornetTestAssert.assertTrue(document.activeElement == document.querySelector(`#${id} #lite1-0-colBody-0-2 .edition-button-action-before`),
                        "L'élémet ayant le focus n'est pas l'action bouton d'id lite1-0-colBody-0-2");
                    dataSourceTableEditable.removeAllListeners();
                    this.end();
                }, 250);
            }, 250);
        }, 250);
    }

    @Decorators.it("Tester la présence du button reset à l'affichage de l'input")
    testPresenceResetButton() {
        const id = this.generateMainId();
        this.renderIntoDocument(tableEditableElement, id);

        this.triggerMouseEvent(document.querySelector(`#${id} #lite1-0-colBody-0-2 .edition-button-action-before`), "click");
        setTimeout(() => {
            HornetTestAssert.assertTrue(document.querySelector(`#${id} #labelResetButton`) !== null, "Le bouton reset n'est pas présent");
            this.end();
        }, 250);
    }

}

//lancement des Tests
runTest(new tableTest());