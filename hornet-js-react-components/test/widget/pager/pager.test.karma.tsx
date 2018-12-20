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
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import * as React from "react";
import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Pager } from "hornet-js-react-components/src/widget/pager/pager";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { Decorators } from "hornet-js-test/src/decorators";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Header } from "hornet-js-react-components/src/widget/table/header";
/* Composant Content */
import { Content } from "hornet-js-react-components/src/widget/table/content";
/*  Colonne du tableau */
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import * as assert from "assert";
import * as messages from "hornet-js-core/src/i18n/hornet-messages-components.json";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";

var chai = require('chai');


const logger = Utils.getLogger("hornet-js-react-components.test.pager.pager");
let element: JSX.Element;
let $element;


@Decorators.describe("Test Karma Pager")
class PagerTest extends HornetReactTest {
    @Decorators.beforeEach
    beforeEach() {

        Utils.setCls("hornet.internationalization", { messages });

        let data = [];

        for (let i: number = 1; i < 150; i++) {
            data.push({ key: "a" + i, value: "aaa" + i });
        }

        const source = new PaginateDataSource(data, { itemsPerPage: 10 }, {});

        element = (<div >(<Table id="table-test">
            <Header title={"data test"}>
            </Header>
            <Content dataSource={source}>
                <Columns>
                    <Column keyColumn="key" title={"ID"} sortable={true} />
                    <Column keyColumn="value" title={"libelle"} sortable={true} />
                </Columns>
            </Content>
        </Table>
            <Pager dataSource={source} id="pager-test" />
        </div>);
    }

    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Test Affichage Pager")
    testAffichage() {
        const id = this.generateMainId();
        $element = this.renderIntoDocument(element, id);
        /* Existance du boutton dropdown */
        HornetTestAssert.assertNotNull(document.querySelector(`#${id} .datatable-pagination`), "Problème élément Label non trouvé");
        HornetTestAssert.assertEquals("15",document.querySelector(`#${id} .datatable-pagination-input`)[ "max" ], "");
        this.end();
    }

    @Decorators.it("Test navigation Pager")
    testNavigationPager() {
        const id = this.generateMainId();
        $element = this.renderIntoDocument(element, id);

        /* Existance du boutton dropdown */
        HornetTestAssert.assertNotNull(document.querySelector(`#${id} .datatable-pagination`), "Problème élément Label non trouvé");
        this.triggerMouseEvent(document.querySelector(`#${id} .datatable-pagination-button-nextpage`),
            "click");
        setTimeout(() => {
            HornetTestAssert.assertEquals("2", document.querySelector(`#${id} .datatable-pagination-input`)[ "value" ], "");
            document.querySelector(`#${id} .datatable-pagination-input`)[ "value" ] = "";
            this.triggerKeyPressEvent(document.querySelector(`#${id} .datatable-pagination-input`), "3", "3".charCodeAt(0), true);
            this.triggerKeydownEvent(document.querySelector(`#${id} .datatable-pagination-input`), "Enter", 13, false); // Appuie de la touche Entrer
            setTimeout(() => {
                HornetTestAssert.assertEquals("3", document.querySelector(`#${id} .datatable-pagination-input`)[ "value" ], "");
                HornetTestAssert.assertEquals("Aller à la page suivante (page 4 sur 15) du tableau", document.querySelector(`#${id} .datatable-pagination .datatable-pagination-button-nextpage`)[ "title" ], "");
                this.end();
            }, 250);
        }, 1000);

    }
}

//lancement des Tests
runTest(new PagerTest());
