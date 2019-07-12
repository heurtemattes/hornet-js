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

"use strict";
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;


import * as _ from "lodash";
import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";

import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { Table } from "src/widget/table/table";
import { Header } from "src/widget/table/header";
/* Composant Content */
import { Content } from "src/widget/table/content";
/*  Colonne du tableau */
import { Column } from "src/widget/table/column";
import { Columns } from "src/widget/table/columns";
import { CheckColumn } from "src/widget/table/column/check-column";
import { Footer } from "src/widget/table/footer";
import { Pager, PaginationProps } from "src/widget/pager/pager";
import { ActionColumn } from "src/widget/table/column/action-column";
import { MoreInfoColumn } from "src/widget/table/column/more-info-column";


@Decorators.describe("Test Karma table paginate")
class tableTest extends BaseTest {
    /** Tableau de liste de secteurs */
    private dataSource: PaginateDataSource<any>;
    private tableElement: JSX.Element;
    private tableElementWithTotal: JSX.Element;
    private tableElementWithActionColumns: JSX.Element;
    private tableElementWithActionColumnsSupprimer: JSX.Element;
    private table;
    private data;
    private id;

    @Decorators.before
    before() {
        this.data = [];
        let step = 1;
        for (let i: number = 1; i < 50; i++) {
            this.data.push({ id: i, label: "libelle" + i, desc: (step % 3 === 0) ? "desc" + 0 : "desc" + step++ });
        }
    }
    
    @Decorators.beforeEach
    beforeEach() {
        if(this.dataSource) {
            this.dataSource.removeAllListeners();
        }
        this.dataSource = new PaginateDataSource<any>(this.data, {
            pageIndex: 0,
            itemsPerPage: 10,
            totalItems: 0,
        }, {});

        this.tableElement = (
            <Table id="lite">
                <Header title={"Secteurs"}>
                </Header>
                <Content dataSource={this.dataSource}>
                    <Columns>
                        <CheckColumn keyColumn="id" />
                        <Column keyColumn="label" title={"libelle"} sortable={true} />
                        <Column keyColumn="desc" title={"desc"} sortable={true} />
                    </Columns>
                </Content>
                <Footer>
                    <Pager dataSource={this.dataSource} id="maTable-paginate" />
                </Footer>
            </Table>
        );

        this.tableElementWithActionColumns = (
            <Table id="table-with-action-column">
                <Header title={"Secteurs"}>
                </Header>
                <Content dataSource={this.dataSource}>
                    <Columns>
                        <CheckColumn keyColumn="id" />
                        <Column keyColumn="label" title={"libelle"} sortable={true} />
                        <Column keyColumn="desc" title={"desc"} sortable={true} />
                        <ActionColumn keyColumn="editer"
                            // srcImg={Picto.blue.editer}
                            alt={"Editer {label}"}
                            action={() => { }}
                            keyShouldComponentUpdate="id"/>
                        <MoreInfoColumn keyColumn="idMore" visible={(value) => true}
                            alt={"Plus d'info sur {label} {desc}"}
                            headers={[ "label", "desc" ]}>
                        </MoreInfoColumn>
                    </Columns>
                </Content>
                <Footer>
                    <Pager dataSource={this.dataSource} id="maTable-paginate-with-action-column" />
                </Footer>
            </Table>
        );

        this.tableElementWithActionColumnsSupprimer = (
            <Table id="table-with-action-column-supprimer">
                <Header title={"test"}>
                </Header>
                <Content dataSource={this.dataSource}>
                    <Columns>
                        <CheckColumn keyColumn="id" />
                        <Column keyColumn="label" title={"libelle"} sortable={true} />
                        <Column keyColumn="desc" title={"desc"} sortable={true} />
                        <ActionColumn keyColumn="supprimer"
                            // srcImg={Picto.white.supprimer}
                            titleAlert={"Suppression de ${label} alert title"}
                            messageAlert={"Voulez-vous vraiment supprimer ${label}"}
                            alt={"Supprimer {label}"}
                            action={() => { }}
                            keyShouldComponentUpdate="id" />
                        <ActionColumn keyColumn="editer"
                            // srcImg={Picto.white.supprimer}
                            alt={"Editer {label}"}
                            action={() => { }}
                            visible={(value) => value.label !== "libelle1"}
                            keyShouldComponentUpdate="id" />
                    </Columns>
                </Content>
                <Footer>
                    <Pager dataSource={this.dataSource} id="maTable-paginate-with-action-column-supprimer" />
                </Footer>
            </Table>
        );

        this.tableElementWithTotal = (
            <Table id="lite">
                <Header title={"Secteurs"}>
                </Header>
                <Content dataSource={this.dataSource}>
                    <Columns>
                        <CheckColumn keyColumn="id" />
                        <Column keyColumn="label" title={"libelle"} sortable={true} />
                        <Column keyColumn="desc" title={"desc"} sortable={true} />
                    </Columns>
                </Content>
                <Footer>
                    <Pager dataSource={this.dataSource} id="maTable-paginate" showTotalPage={true}/>
                </Footer>
            </Table>
        );
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("afficher 10 éléments par page à l'init")
    selectionUnElement() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElement, this.id);
        expect(document.querySelectorAll(`#${this.id} .datatable-data tr`).length).to.equal(10);
        this.end();
    }

    @Decorators.it("afficher la dernière page")
    goToLastPage() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElement, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(value.list.length).to.equal(9);
            expect(value.list[ 0 ].id).to.equal(41);
            expect(document.querySelector(`#${this.id} .datatable-data #lite-0-colBody-0-1`).innerHTML, value.list[ 0 ].label);
            this.end();
        });
        this.triggerMouseEvent(document.querySelector(`#${this.id} .datatable-pagination-button-lastpage`), "click");
    }

    @Decorators.it("supprimer la selection")
    deleteSelectedItem() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElement, this.id);
        this.dataSource.on("delete", () => {
            expect(this.dataSource.selected === undefined).to.true;
            expect(document.querySelectorAll(`#${this.id} .datatable-data tr`).length).to.equal(10);
            this.end();
        });
        this.dataSource.on("select", (value) => {
            if (value.length > 0) this.dataSource.deleteAll();

        });
        this.triggerMouseEvent(document.querySelector(`#${this.id} .datatable-data #lite-0-colBody-0-0 input`), "click");
    }

    @Decorators.it("test d'un appel de pagination programmatiquement")
    goToPageCall() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElement, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(document.querySelector(`#${this.id} .datatable-pagination-input`)[ "value" ]).to.equal("2");
            this.end();
        });
        this.dataSource.goToPage(2);
    }

    @Decorators.it("test du rendu de l'action column après pagination sur la page 2")
    testRenderActionColumnAfterPaginationToPage2() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithActionColumns, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(document.querySelector(`#${this.id} #table-with-action-column-0-colBody-0-3 a`)[ "title" ]).to.equal("Editer libelle11");
            expect(document.querySelector(`#${this.id} #table-with-action-column-0-colBody-0-4 a`)[ "title" ]).
                to.equal("Plus d'info sur libelle11 desc0");
            this.end();
        });
        this.dataSource.goToPage(2);
    }

    @Decorators.it("test du rendu de l'action column après pagination sur la page 3")
    testRenderActionColumnAfterPaginationToPage3() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithActionColumns, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(document.querySelector(`#${this.id} #table-with-action-column-0-colBody-0-3 a`)[ "title" ]).to.equal("Editer libelle21")
            expect(document.querySelector(`#${this.id} #table-with-action-column-0-colBody-0-4 a`)[ "title" ])
                .to.equal("Plus d'info sur libelle21 desc0");
            this.end();
        });
        this.dataSource.goToPage(3);
    }

    @Decorators.it("test du rendu de la modale suite au clic sur le bouton de l'action column supprimer après pagination sur la page 2")
    testRenderActionColumnAlertAfterPaginationToPage2() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithActionColumnsSupprimer, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-3 a`)[ "title" ])
                .to.equal("Supprimer libelle11");
            const selector = document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-3 a`);
            this.triggerMouseEvent(selector, "mousedown");
            setTimeout(() => {
                expect(document.querySelector(`.dialog-content-alert`), "alerte n'existe pas").to.exist;
                expect(document.querySelector(`#dialogue-title h1`), "h1 n'existe pas").to.exist;
                expect(document.querySelector(`#dialogue-title h1`).innerHTML, "vérification du libelle1 failed").to.equal("Suppression de libelle11 alert title");
                expect(document.querySelector(`#widget-alert-body`), "le widget alert n'existe pas").to.exist;
                expect(document.querySelector(`#widget-alert-body`).innerHTML, "vérification du libelle1 pour suppression failed").to.equal("Voulez-vous vraiment supprimer libelle11");
                this.triggerMouseEvent(document.querySelector("#confirmCancel"), "click");
                this.end();
            }, 750);
        });
        this.dataSource.goToPage(2);
    }

    @Decorators.it("test du rendu de la modale suite au clic sur le bouton de l'action column supprimer après pagination sur la page 3")
    testRenderActionColumnAlertAfterPaginationToPage3() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithActionColumnsSupprimer, this.id);
        this.dataSource.on("pagination", (value) => {
            expect(document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-3 a`)[ "title" ])
                .to.equal("Supprimer libelle21");
            this.triggerMouseEvent(document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-3 a`), "mousedown");
            setTimeout(() => {
                expect(document.querySelector(`.dialog-content-alert`), "alerte n'existe pas").to.exist;
                expect(document.querySelector(`#dialogue-title h1`), "h1 n'existe pas").to.exist;
                expect(document.querySelector(`#dialogue-title h1`).innerHTML).to.equal("Suppression de libelle21 alert title");
                expect(document.querySelector(`#widget-alert-body`)).to.exist;
                expect(document.querySelector(`#widget-alert-body`).innerHTML).to.equal("Voulez-vous vraiment supprimer libelle21");
                this.triggerMouseEvent(document.querySelector("#confirmCancel"), "click");
                this.end();
            }, 500);
        });
        this.dataSource.goToPage(3);
    }

    @Decorators.it("test de la props visible d'une actionColum avant et après pagination")
    testRenderActionColumnMaJPropsIsVisible() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithActionColumnsSupprimer, this.id);
        expect(document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-4`).innerHTML).to.equal("");

        this.dataSource.on("pagination", (value) => {
            setTimeout(() => {
                expect(document.querySelector(`#${this.id} #table-with-action-column-supprimer-0-colBody-0-4 a`).innerHTML).to.exist;
                this.end();
            }, 750);
        });
        this.dataSource.goToPage(2);

    }

    @Decorators.it("test de la props showTotalPage a true")
    testRenderTotalPage() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElementWithTotal, this.id);
        expect(document.querySelector(`#${this.id} .datatable-pagination-total-page`)).to.exist;
        this.end();
    }

    @Decorators.it("test de la props showTotalPage a false")
    testRenderTotalPageFalse() {
        this.id = this.generateMainId();
        this.table = this.renderIntoDocument(this.tableElement, this.id);
        expect(document.querySelector(`#${this.id} .datatable-pagination-total-page`)).to.not.exist;
        this.end();
    }
}

// lancement des Tests
runTest(new tableTest());
