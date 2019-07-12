/**
 * Copyright ou © ou Copr. Ministère de l"Europe et des Affaires étrangères (2017)
 * <p/>
 * pole-architecture.dga-dsi-psi@diplomatie.gouv.fr
 * <p/>
 * Ce logiciel est un programme informatique servant à faciliter la création
 * d"applications Web conformément aux référentiels généraux français : RGI, RGS et RGAA
 * <p/>
 * Ce logiciel est régi par la licence CeCILL soumise au droit français et
 * respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et l"INRIA
 * sur le site "http://www.cecill.info".
 * <p/>
 * En contrepartie de l"accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n"est
 * offert aux utilisateurs qu"une garantie limitée.  Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l"auteur du programme,  le
 * titulaire des droits patrimoniaux et les concédants successifs.
 * <p/>
 * A cet égard  l"attention de l"utilisateur est attirée sur les risques
 * associés au chargement,  à l"utilisation,  à la modification et/ou au
 * développement et à la reproduction du logiciel par l"utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant  des  connaissances  informatiques approfondies.  Les
 * utilisateurs sont donc invités à charger  et  tester  l"adéquation  du
 * logiciel à leurs besoins dans des conditions permettant d"assurer la
 * sécurité de leurs systèmes et ou de leurs données et, plus généralement,
 * à l"utiliser et l"exploiter dans les mêmes conditions de sécurité.
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
 * with a limited warranty  and the software"s author,  the holder of the
 * economic rights,  and the successive licensors  have only  limited
 * liability.
 * <p/>
 * In this respect, the user"s attention is drawn to the risks associated
 * with loading,  using,  modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean  that it is complicated to manipulate,  and  that  also
 * therefore means  that it is reserved for developers  and  experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software"s suitability as regards their
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
 * @author MEAE - Ministère de l"Europe et des Affaires étrangères
 * @version v5.4.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */
import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;

import * as React from "react";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Table } from "src/widget/table/table";
import { Header } from "src/widget/table/header";
const messages = require("hornet-js-core/src/i18n/hornet-messages-components.json");
import { Dropdown } from "src/widget/dropdown/dropdown";
import { I18nUtils } from "hornet-js-utils/src/i18n-utils";
import { MenuActions } from "src/widget/table/menu-actions";
import { ActionButton } from "src/widget/table/action-button";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { Column } from "src/widget/table/column";
import { Content } from "src/widget/table/content";
import { Columns } from "src/widget/table/columns";
import { SvgSprites } from 'src/widget/icon/svg-sprites';
Utils.setConfigObj({});

/** Tableau de liste de secteurs */

@Decorators.describe("Test Ajout de composant custom dans le Header d'un tableau")
class TableWithCustomHeaderTest extends HornetReactTest {
    tableElement: JSX.Element;
    tableElementWithMenuAction: JSX.Element;
    dataSource;
    data: any;

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
        Utils.setCls("hornet.internationalization", { messages });
        this.dataSource = new DataSource(this.data);

        this.tableElement = (
            <Table id="header-with-custom-header" className="testTableWithCustomHeader">
                <Header title={"Test avec custom header"}>
                    <ExportFileButton service="" dropDownId="test-export-cmp"></ExportFileButton>
                </Header>
            </Table>
        );

        this.tableElementWithMenuAction = (
            <Table id="header-with-custom-header-and-menu-action" className="testTableWithCustomHeaderAndMenuAction">
                <Header title={"Test avec custom header et menu action"} showIconInfo={true}>
                    <ExportFileButton service="" dropDownId="test-export-cmp-with-menu-action"></ExportFileButton>
                    <MenuActions>
                        <ActionButton title="Export CSV" label="Export CSV"
                            srcImg={<SvgSprites icon="csv" height="1.5em" width="1.5em" color="#08743b" />}
                            action={() => { }} />
                        <ActionButton title="Export PDF" label="Export PDF"
                            srcImg={<SvgSprites icon="pdf" height="1.5em" width="1.5em" color="#EA4C3A" />}
                            action={() => { }} />
                        <ActionButton title="Export ODT" label="Export ODT"
                            srcImg={<SvgSprites icon="odt" height="1.5em" width="1.5em" color="#000" />}
                            action={() => { }} />
                    </MenuActions>
                </Header>
                <Content dataSource={this.dataSource}>
                    <Columns>
                        <Column keyColumn="label" title={"libelle"} sortable={true} />
                        <Column keyColumn="desc" title={"desc"} sortable={true} />
                    </Columns>
                </Content>
            </Table>
        );
    }

    @Decorators.it("Test présence de l'élément custom dans le header")
    testCustomHeader() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.tableElement, id);
        expect(document.querySelector(`#${id} #header-with-custom-header`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} #test-export-cmp`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} #test-export-cmpcontent`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} li`)).to.exist;
        this.end();
    }

    @Decorators.it("Test présence de l'élément custom dans le header ayant un menu action")
    testCustomHeaderWithMenuAction() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.tableElementWithMenuAction, id);
        expect(document.querySelector(`#${id} #header-with-custom-header-and-menu-action`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} #test-export-cmp-with-menu-action`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} #test-export-cmp-with-menu-actioncontent`).innerHTML).to.exist;
        expect(document.querySelector(`#${id} li`)).to.exist;
        expect(document.querySelector(`#${id} #test-export-cmp-with-menu-action`).nextElementSibling).to.equal(document.querySelector(`#${id} .datatable-header-menu`));
        this.end();
    }
}


interface ExportFileButtonProps {
    dropDownId?: string;
    position?: any;
    data?: any;
    responsable?: boolean;
    service: any;
}

class ExportFileButton<P extends ExportFileButtonProps> extends React.Component<ExportFileButtonProps> {
    constructor(props?: P) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Dropdown
                id={this.props.dropDownId}
                position={this.props.position}
                items={[{ type: "PDF", picto: "pdf" }, { type: "ODS", picto: "ods" }, { type: "XLSX", picto: "xls" }].map(({ type, picto }) => ({
                    label: I18nUtils.getI18n("Export {type}", { type }),
                    action: () => {
                        console.log("Action en cours d'exécution");
                    },
                    className: "link",
                }))}
                icon="more-actions"
            />
        );
    }
}

// lancement des Tests
runTest(new TableWithCustomHeaderTest());
