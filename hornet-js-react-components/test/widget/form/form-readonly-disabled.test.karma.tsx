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
import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;

import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import { Form } from "src/widget/form/form";
import { InputField } from "src/widget/form/input-field";

@Decorators.describe("Test Karma Form readonly et disabled")
class TestFormReadonlyDisabled extends BaseTest {

    form1;
    form2;
    form3;
    form4;
    form5;
    form6;

    refForm4: Form;
    refForm2: Form;
    refForm3: Form;
    refForm5: Form;
    refForm6: Form;
    nom: InputField<any, any>;
    nom2: InputField<any, any>;

    @Decorators.beforeEach
    beforeEach() {

        this.refForm2 = null;
        this.refForm4 = null;
        this.refForm3 = null;
        this.refForm5 = null;
        this.refForm6 = null;
        this.nom = null;
        this.nom2 = null;

        this.form1 = (
            <div>
                <Form id="form1">
                    <InputField name="nom" label="Nom" readOnly={true} />
                    <InputField name="prenom" label="Prenom" disabled={true}/>
                </Form>
            </div>
        );

        this.form2 = (
            <div>
                <Form id="form2" readOnly={true} ref={(form) => this.refForm2 = form}>
                    <InputField name="nom" label="Nom"/>
                    <InputField name="prenom" label="Prenom" readOnly={false}/>
                    <InputField name="truc" label="Truc" readOnly={true}/>
                </Form>
            </div>
        );

        this.form3 = (
            <div>
                <Form id="form3" disabled={true} ref={(form) => this.refForm3 = form}>
                    <InputField name="nom" label="Nom" ref={(nom) => this.nom = nom}/>
                    <InputField name="prenom" label="Prenom" disabled={false}/>
                    <InputField name="truc" label="Truc" disabled={true}/>
                </Form>
            </div>
        );

        this.form4 = (
            <div>
                <Form id="form4" readOnly={false} ref={(form) => this.refForm4 = form}>
                    <InputField name="nom" label="Nom"/>
                    <InputField name="prenom" label="Prenom"readOnly={false}/>
                    <InputField name="truc" label="Truc" readOnly={true}/>
                </Form>
            </div>
        );

        this.form5 = (
            <div>
                <Form id="form5" disabled={false} ref={(form) => this.refForm5 = form}>
                    <InputField name="nom" label="Nom" ref={(nom) => this.nom2 = nom}/>
                    <InputField name="prenom" label="Prenom" disabled={false}/>
                    <InputField name="truc" label="Truc" disabled={true}/>
                </Form>
            </div>
        );
    }

    getNom(id: string) {
        return document.querySelector(`#${id} #nom`);
    }

    getPrenom(id: string) {
        return document.querySelector(`#${id} #prenom`);
    }

    getTruc(id: string) {
        return document.querySelector(`#${id} #truc`);
    }

    @Decorators.it("Test form sans disabled ou readOnly sur le form")
    testNothing() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form1, id);

        setTimeout(() => {

            const nom = this.getNom(id);
            if (nom) {
                expect(nom.hasAttribute("readonly")).to.be.true;
            }

            const prenom = this.getPrenom(id);
            if (prenom) {
                expect(prenom.hasAttribute("disabled")).to.be.true;
            }

            const truc = this.getTruc(id);
            if (truc) {
                expect(truc.hasAttribute("readonly")).to.be.false;
                expect(truc.hasAttribute("disabled")).to.be.false;
            }
            this.end();
        },         250);
    }

    @Decorators.it("Test form readonly true")
    testReadOnlyTrue() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form2, id);

        setTimeout(() => {

            const nom = this.getNom(id);
            if (nom) {
                expect(nom.hasAttribute("readonly")).to.be.true;
            }

            const prenom = this.getPrenom(id);
            if (prenom) {
                expect(prenom.hasAttribute("readonly")).to.be.true;
            }

            const truc = this.getTruc(id);
            if (truc) {
                expect(truc.hasAttribute("readonly")).to.be.true;
            }
            this.end();
        },         250);
    }

    @Decorators.it("Test form disabled true")
    testDisabledTrue() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form3, id);
        setTimeout(() => {

            const nom = this.getNom(id);
            if (nom) {
                expect(nom.hasAttribute("disabled")).to.be.true;
            }

            const prenom = this.getPrenom(id);
            if (prenom) {
                expect(prenom.hasAttribute("disabled")).to.be.true;
            }

            const truc = this.getTruc(id);
            if (truc) {
                expect(truc.hasAttribute("disabled")).to.be.true;
            }
            this.end();
        },         250);
    }

    @Decorators.it("Test form readonly false")
    testReadOnlyFalse() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form4, id);
        setTimeout(() => {

            const nom = this.getNom(id);
            if (nom) {
                expect(nom.hasAttribute("readonly")).to.be.false;
            }

            const prenom = this.getPrenom(id);
            if (prenom) {
                expect(prenom.hasAttribute("readonly")).to.be.false;
            }

            const truc = this.getTruc(id);
            if (truc) {
                expect(truc.hasAttribute("readonly")).to.be.true;
            }
            this.end();
        },         250);
    }

    @Decorators.it("Test form disabled false")
    testDisabledFalse() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form5, id);
        setTimeout(() => {

            const nom = this.getNom(id);
            if (nom) {
                expect(nom.hasAttribute("disabled")).to.be.false;
            }

            const prenom = this.getPrenom(id);
            if (prenom) {
                expect(prenom.hasAttribute("disabled")).to.be.false;
            }

            const truc = this.getTruc(id);
            if (truc) {
                expect(truc.hasAttribute("disabled")).to.be.true;
            }
            this.end();
        },         250);
    }

    @Decorators.it("Test form readonly false to true")
    testreadonlyFalseToTrue() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form4, id);
        setTimeout(() => {
            this.refForm4.setReadOnly(true);
            setTimeout(() => {
                const nom = this.getNom(id);
                if (nom) {
                    expect(nom.hasAttribute("readonly")).to.be.true;
                }

                const prenom = this.getPrenom(id);
                if (prenom) {
                    expect(prenom.hasAttribute("readonly")).to.be.true;
                }

                const truc = this.getTruc(id);
                if (truc) {
                    expect(truc.hasAttribute("readonly")).to.be.true;
                }
                this.end();
            },         250);
        },         250);
    }

    @Decorators.it("Test form readonly true to false")
    testreadonlyTrueToFalse() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form2, id);
        setTimeout(() => {
            this.refForm2.setReadOnly(false);
            setTimeout(() => {
                const nom = this.getNom(id);
                if (nom) {
                    expect(nom.hasAttribute("readonly")).to.be.false;
                }

                const prenom = this.getPrenom(id);
                if (prenom) {
                    expect(prenom.hasAttribute("readonly")).to.be.false;
                }

                const truc = this.getTruc(id);
                if (truc) {
                    expect(truc.hasAttribute("readonly")).to.be.true;
                }
                this.end();
            },         250);
        },         250);
    }

    @Decorators.it("Test form disabled false to true")
    testDisabledFalseToTrue() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form5, id);
        setTimeout(() => {
            this.refForm5.setDisabled(true);
            setTimeout(() => {
                const nom = this.getNom(id);
                if (nom) {
                    expect(nom.hasAttribute("disabled")).to.be.true;
                }

                const prenom = this.getPrenom(id);
                if (prenom) {
                    expect(prenom.hasAttribute("disabled")).to.be.true;
                }

                const truc = this.getTruc(id);
                if (truc) {
                    expect(truc.hasAttribute("disabled")).to.be.true;
                }
                this.end();
            },         250);
        },         250);
    }

    @Decorators.it("Test form disabled true to false")
    testDisabledTrueToFalse() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form3, id);
        setTimeout(() => {
            this.refForm3.setDisabled(false);
            setTimeout(() => {
                const nom = this.getNom(id);
                if (nom) {
                    expect(nom.hasAttribute("disabled")).to.be.false;
                }

                const prenom = this.getPrenom(id);
                if (prenom) {
                    expect(prenom.hasAttribute("disabled")).to.be.false;
                }

                const truc = this.getTruc(id);
                if (truc) {
                    expect(truc.hasAttribute("disabled")).to.be.true;
                }
                this.end();
            },         250);
        },         250);
    }

    @Decorators.it("Test form disabled set disabled field")
    testField() {
        const id = this.generateMainId();
        this.renderIntoDocument(this.form3, id);
        setTimeout(() => {
            this.refForm3.setDisabled(false);
            setTimeout(() => {
                const nom = this.getNom(id);
                if (nom) {
                    expect(nom.hasAttribute("disabled")).to.be.false;
                }

                this.nom.setDisabled(true);
                setTimeout(() => {
                    const nom = this.getNom(id);
                    if (nom) {
                        expect(nom.hasAttribute("disabled")).to.be.true;
                    }
                    this.refForm3.setDisabled(true);
                    setTimeout(() => {
                        const nom = this.getNom(id);
                        if (nom) {
                            expect(nom.hasAttribute("disabled")).to.be.true;
                        }
                        this.nom.setDisabled(false);
                        setTimeout(() => {
                            const nom = this.getNom(id);
                            if (nom) {
                                expect(nom.hasAttribute("disabled")).to.be.false;
                            }
                            this.end();
                        },         250);
                    },         250);
                },         250);
            },         250);
        },         250);
    }
}

// lancement des Tests
runTest(new TestFormReadonlyDisabled());
