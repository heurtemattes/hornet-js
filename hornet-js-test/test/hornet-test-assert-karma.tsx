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
 * @version v5.2.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { BaseTest } from "hornet-js-test/src/base-test";


/**
 * Classe de test pour HornetTestAssert
 */
@Decorators.describe("Test Karma Assert")
class HornetTestAssertKarma extends BaseTest {

    @Decorators.it("Tests pour assertEquals")
    assertEqualsTest() {
        let value1 = "titi";
        let expected1 = "titi";
        HornetTestAssert.assertEquals(expected1, value1, "Les chaines de caractères identiques ne sont pas considérées comme tel");

        let value2 = 2;
        let expected2 = 2;
        HornetTestAssert.assertEquals(expected2, value2, "Les numériques identiques ne sont pas considérés comme tel");

        let value3 = { label: "titi", value: 2 };
        let expected3 = { label: "titi", value: 2 };
        HornetTestAssert.assertEquals(expected3, value3, "Les objets identiques ne sont pas considérés comme tel");
        this.end();
    };

    @Decorators.it("Tests pour assertNotEquals")
    assertNotEqualsTest() {
        let value1 = "titi";
        let expected1 = "toto";
        let value2 = 2;
        let expected2 = 22;
        let value3 = { label: "titi", value: 2 };
        let expected3 = { label: "titi", value: 44 };

        HornetTestAssert.assertNotEquals(expected1, value1, "Les chaines de caractères différentes sont considérées comme identiques");
        HornetTestAssert.assertNotEquals(expected2, value2, "Les numériques différents sont considérés comme identiques");
        HornetTestAssert.assertNotEquals(expected3, value3, "Les objets différents sont considérés comme identique");
        this.end();
    };

    @Decorators.it("Tests pour assertNull")
    assertNullTest() {
        HornetTestAssert.assertNull(null, "null n'est pas considéré comme null");
        this.end();
    };

    @Decorators.it("Tests pour assertNotNull")
    assertNotNullTest() {
        HornetTestAssert.assertNotNull(1, "1 est comme considéré comme null");
        HornetTestAssert.assertNotNull("titi", "la chaîne de caractère est comme considérée comme null");
        HornetTestAssert.assertNotNull({ label: "titi", value: 2 }, "l'objet est comme considérée comme null");
        this.end();
    };

    @Decorators.it("Tests pour assertTrue")
    assertTrueTest() {
        let obj = { label: "titi", value: 2 };
        HornetTestAssert.assertTrue(true, "true n'est pas considéré comme true");
        HornetTestAssert.assertTrue(1 == 1, "1 == 1 n'est pas considéré comme true");
        HornetTestAssert.assertTrue("titi" == "titi", "titi == titi n'est pas considéré comme true");
        HornetTestAssert.assertTrue(obj == obj, "objet == objet n'est pas considéré comme true");
        this.end();
    };

    @Decorators.it("Tests pour assertFalse")
    assertFalseTest() {
        let obj1 = { label: "titi", value: 2 };
        let obj2 = { label: "toto", value: 5 };
        let value1 = 1;
        let value2 = 2;
        let value3 = "titi";
        let value4 = "toto";
        HornetTestAssert.assertFalse(false, "false n'est pas considéré comme false");
        HornetTestAssert.assertFalse(value1 == value2, "1 == 2 n'est pas considéré comme false");
        HornetTestAssert.assertFalse(value3 == value4, "titi == toto n'est pas considéré comme false");
        HornetTestAssert.assertFalse(obj1 == obj2, "obj1 == obj2 n'est pas considéré comme false");
        this.end();
    };

    @Decorators.it("Tests pour assertGreaterThan")
    assertGreaterThanTest() {
        HornetTestAssert.assertGreaterThan(1, 2, "2 n'est pas plus grand que 1");
        this.end();
    };

    @Decorators.it("Tests pour assertLesserThan")
    assertLesserThanTest() {
        HornetTestAssert.assertLesserThan(2, 1, "2 n'est pas plus grand que 1");
        this.end();
    };
}

//lancement des Tests
runTest(new HornetTestAssertKarma());