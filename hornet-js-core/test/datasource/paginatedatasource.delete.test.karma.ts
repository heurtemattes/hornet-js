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
 * hornet-js-core - Ensemble des composants qui forment le coeur de hornet-js
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import { PaginateDataSource } from "src/component/datasource/paginate-datasource";
import { TestUtils } from "hornet-js-test/src/test-utils";
var expect: any = TestUtils.chai.expect;

@Decorators.describe("test de suppression dans le PaginateDatasource")
class PaginateDatasouceDeleteTest extends BaseTest {

    dataSource: PaginateDataSource<any>;

    @Decorators.beforeEach
    init() {
        let data = [];
        for (let i: number = 1; i < 5; i++) {
            data.push({ id: i, label: "libelle" + i });
        }
        this.dataSource = new PaginateDataSource(data, { itemsPerPage: 4 }, {});
    };

    @Decorators.it("Test passant")
    testCas1() {
        assert.equal(1, 1);
        this.end();
    };

    @Decorators.it("Suppression d'un element")
    testDelete() {
        this.dataSource.on("delete", (value) => {
            expect(this.dataSource.results).to.not.deep.include({id: 1, label: "libelle" + 1});
            this.end();
        });

        this.dataSource.delete(false, [ { id: 1, label: "libelle" + 1 } ]);
    }



    @Decorators.it("Ajout d'elements")
    testAjout() {
        this.dataSource.on("add", (value) => {
            try {
                expect(this.dataSource.results).to.deep.include({id: 5, label: "libelle" + 5});
                this.end();
            } catch (e) {
                this.end(e);
            }
        });

        this.dataSource.add(false, [{id: 5, label: "libelle" + 5}]);
    }

    @Decorators.it("Suppression de tous les elements de la derniere page")
    testDeleteAllItemOfLastPage() {
        this.dataSource.on("delete", (value) => {
            expect(this.dataSource.results).to.deep.include({id: 1, label: "libelle" + 1});
            expect(this.dataSource.pagination.pageIndex).to.be.equal(1);
            expect(this.dataSource.results).to.not.deep.include({id: 5, label: "libelle" + 5});
            this.end();
        });

        // le tableau contient 5 éléments et on est sur une pagination de 4 items par page.
        // Le tableau contient alors deux pages, une de 4 items et une d'un item.
        // Si on supprime l'item de la deuxième page alors on revient sur la première page
        this.dataSource.delete(false, [ { id: 5, label: "libelle" + 5 } ]);
    }


}
//lancement des Tests
runTest(new PaginateDatasouceDeleteTest());
