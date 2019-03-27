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
 * @version v5.3.0
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

"use strict";
const chai = require("chai");
const expect = chai.expect;
import * as React from "react";

import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";
import * as assert from "assert";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { InputField } from "src/widget/form/input-field";
import { Row } from "src/widget/form/row";
import { ButtonsArea } from "src/widget/form/buttons-area";
import { Button } from "src/widget/button/button";
import { RadiosField } from "src/widget/form/radios-field";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { AutoCompleteField } from 'src/widget/form/auto-complete-field';
import { DefaultSort } from 'hornet-js-core/src/component/datasource/options/datasource-option';
import { SortData } from 'hornet-js-core/src/component/sort-data';
import { HornetEvent, fireHornetEvent, listenHornetEvent } from 'hornet-js-core/src/event/hornet-event';

let formWithOmitNull, formWithoutOmitNull, formWithOmitNullFullfilled, formWithoutOmitNullFullfilled: JSX.Element;
const SUBMIT_EVENT_FORM_OMIT_NULL: HornetEvent<any> = new HornetEvent<any>("SUBMIT_EVENT_FORM_OMIT_NULL");

const SUBMIT_EVENT_FORM: HornetEvent<any> = new HornetEvent<any>("SUBMIT_EVENT_FORM");

const SUBMIT_EVENT_FORM_OMIT_NULL_FULLFILLED: HornetEvent<any> = new HornetEvent<any>("SUBMIT_EVENT_FORM_OMIT_NULL_FULLFILLED");
const SUBMIT_EVENT_FORM_FULLFILLED: HornetEvent<any> = new HornetEvent<any>("SUBMIT_EVENT_FORM_FULLFILLED");

@Decorators.describe("Test Karma Form, données après soumission")
class TestFormDataAfterSubmit extends BaseTest {
    @Decorators.beforeEach
    beforeEach() {
        const listeIsClient = [
            {
                desc: true,
                libelle: "client",
            },
            {
                desc: false,
                libelle: "fournisseur",
            },
        ];

        const dataSourceIsClient = new DataSource(listeIsClient, { value: "desc", label: "libelle" });

        const dataSourceCivilite = new DataSource<any>([
            { id: 1, libelle: "Mr" },
            { id: 2, libelle: "Mme" }], {
                value: "id",
                text: "libelle",
            }, [new DefaultSort([{ key: "text" } as SortData])]);

        formWithOmitNull = (
            <div>
                <Form
                    id="formWithOmitNull"
                    onSubmit={this.submitForm.bind(null, SUBMIT_EVENT_FORM_OMIT_NULL)}
                    omitNull={false}>
                    <Row>
                        <RadiosField name="desc" label="description"
                            required={false} size={40} maxLength={200} dataSource={dataSourceIsClient} />
                    </Row>
                    <Row>
                        <InputField name="num" label="Num"
                            required={false} size={40} maxLength={50} type="number" />
                    </Row>
                    <Row>
                        <AutoCompleteField dataSource={dataSourceCivilite}
                            maxHeight={200}
                            name="civilite"
                            label={"Test civilité"}
                            required={false}
                            labelKey="libelle"
                            valueKey="id"
                            writable={false} />
                    </Row>
                    <ButtonsArea>
                        <Button type="submit" id="enregistrer_formWithOmitNull" name="action:save"
                            value="Enregistrer" className="hornet-button" label="Enregistrer"
                            title="validTitle" />
                        <Button type="button" id="cancel_formWithOmitNull" name="action:cancel"
                            value="Annuler" className="hornet-button" label="Annuler"
                            title="cancelTitle" />
                    </ButtonsArea>
                </Form>
            </div>
        );

        formWithOmitNullFullfilled = (
            <div>
                <Form
                    id="formWithOmitNullFullfilled"
                    onSubmit={this.submitForm.bind(null, SUBMIT_EVENT_FORM_OMIT_NULL_FULLFILLED)}
                    defaultValues={{ num: 45, civilite: { id: 1, libelle: "Mme" } }}>
                    <Row>
                        <RadiosField name="desc" label="description"
                            required={false} size={40} maxLength={200} dataSource={dataSourceIsClient} />
                    </Row>
                    <Row>
                        <InputField name="num" label="Num"
                            required={false} size={40} maxLength={50} type="number" />
                    </Row>
                    <Row>
                        <AutoCompleteField dataSource={dataSourceCivilite}
                            maxHeight={200}
                            name="civilite"
                            label={"Test civilité"}
                            required={false}
                            labelKey="libelle"
                            valueKey="id"
                            writable={false} />
                    </Row>
                    <ButtonsArea>
                        <Button type="submit" id="enregistrer_formWithOmitNullFullfilled" name="action:save"
                            value="Enregistrer" className="hornet-button" label="Enregistrer"
                            title="validTitle" />
                        <Button type="button" id="cancel_formWithOmitNullFullfilled" name="action:cancel"
                            value="Annuler" className="hornet-button" label="Annuler"
                            title="cancelTitle" />
                    </ButtonsArea>
                </Form>
            </div>
        );

        formWithoutOmitNull = (
            <div>
                <Form
                    id="formWithoutOmitNull"
                    onSubmit={this.submitForm.bind(null, SUBMIT_EVENT_FORM)}>
                    <Row>
                        <RadiosField name="desc" label="description"
                            required={false} size={40} maxLength={200} dataSource={dataSourceIsClient} />
                    </Row>
                    <Row>
                        <InputField name="num" label="Num"
                            required={false} size={40} maxLength={50} type="number" />
                    </Row>
                    <Row>
                        <AutoCompleteField dataSource={dataSourceCivilite}
                            maxHeight={200}
                            name="civilite"
                            label={"Test civilité"}
                            required={false}
                            labelKey="libelle"
                            valueKey="id"
                            writable={false} />
                    </Row>
                    <ButtonsArea>
                        <Button type="submit" id="enregistrer_formWithoutOmitNull" name="action:save"
                            value="Enregistrer" className="hornet-button" label="Enregistrer"
                            title="validTitle" />
                        <Button type="button" id="cancel_formWithoutOmitNull" name="action:cancel"
                            value="Annuler" className="hornet-button" label="Annuler"
                            title="cancelTitle" />
                    </ButtonsArea>
                </Form>
            </div>
        );

        formWithoutOmitNullFullfilled = (
            <div>
                <Form
                    id="formWithoutOmitNullFullfilled"
                    onSubmit={this.submitForm.bind(null, SUBMIT_EVENT_FORM_FULLFILLED)}
                    omitNull={false}
                    defaultValues={{ num: 45, civilite: { id: 1, libelle: "Mme" } }}>
                    <Row>
                        <RadiosField name="desc" label="description"
                            required={false} size={40} maxLength={200} dataSource={dataSourceIsClient} />
                    </Row>
                    <Row>
                        <InputField name="num" label="Num"
                            required={false} size={40} maxLength={50} type="number" />
                    </Row>
                    <Row>
                        <AutoCompleteField dataSource={dataSourceCivilite}
                            maxHeight={200}
                            name="civilite"
                            label={"Test civilité"}
                            required={false}
                            labelKey="libelle"
                            valueKey="id"
                            writable={false} />
                    </Row>
                    <ButtonsArea>
                        <Button type="submit" id="enregistrer_formWithoutOmitNullFullfilled" name="action:save"
                            value="Enregistrer" className="hornet-button" label="Enregistrer"
                            title="validTitle" />
                        <Button type="button" id="cancel_enregistrer_formWithoutOmitNullFullfilled" name="action:cancel"
                            value="Annuler" className="hornet-button" label="Annuler"
                            title="cancelTitle" />
                    </ButtonsArea>
                </Form>
            </div>
        );
    }
    @Decorators.it("Test OK")
    testOk() {
        assert.equal(1, 1);
        this.end();
    }

    @Decorators.it("Test soumission de form avec omitNull")
    testWithOmitNull() {
        const id = this.generateMainId();
        this.renderIntoDocument(formWithOmitNull, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer_formWithOmitNull`), "click");
        listenHornetEvent(SUBMIT_EVENT_FORM_OMIT_NULL, (event: any) => {
            const data = event.detail;
            expect(data != null).to.equal(true);
            expect(data.civilite).to.equal(null);
            expect(data.desc).to.equal(null);
            expect(isNaN(data.num)).to.equal(true);
            this.end();
        });
    }

    @Decorators.it("Test soumission de form sans omitNull")
    testWithoutOmitNull() {
        const id = this.generateMainId();
        this.renderIntoDocument(formWithoutOmitNull, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer_formWithoutOmitNull`), "click");
        listenHornetEvent(SUBMIT_EVENT_FORM, (event: any) => {
            const data = event.detail;
            expect(data != null).to.equal(true);
            expect(Object.keys(data).length).to.equal(1);
            expect(data.civilite !== null).to.equal(true);
            this.end();
        });
    }

    @Decorators.it("Test soumission de form avec omitNull avec champs renseignés")
    testWithOmitNullFullfilled() {
        const id = this.generateMainId();
        this.renderIntoDocument(formWithOmitNullFullfilled, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer_formWithOmitNullFullfilled`), "click");
        listenHornetEvent(SUBMIT_EVENT_FORM_OMIT_NULL_FULLFILLED, (event: any) => {
            const data = event.detail;
            expect(data != null).to.equal(true);
            expect(Object.keys(data).length).to.equal(2);
            expect(data.civilite !== null).to.equal(true);
            expect(data.civilite.id).to.equal("1");
            expect(data.civilite.libelle).to.equal("Mme");
            expect(data.num).to.equal(45);
            this.end();
        });
    }

    @Decorators.it("Test soumission de form sans omitNull avec champs renseignés")
    testWithoutOmitNullFullfilled() {
        const id = this.generateMainId();
        this.renderIntoDocument(formWithoutOmitNullFullfilled, id);
        this.triggerMouseEvent(document.querySelector(`#${id} #enregistrer_formWithoutOmitNullFullfilled`), "click");
        listenHornetEvent(SUBMIT_EVENT_FORM_FULLFILLED, (event: any) => {
            const data = event.detail;
            expect(data != null).to.equal(true);
            expect(data.civilite !== null).to.equal(true);
            expect(data.civilite.id).to.equal("1");
            expect(data.civilite.libelle).to.equal("Mme");
            expect(data.num).to.equal(45);
            expect(data.desc).to.equal(null);
            this.end();
        });
    }



    submitForm(event: HornetEvent<any>, data: any) {
        fireHornetEvent(event.withData(data));
    }

}

// lancement des Tests
runTest(new TestFormDataAfterSubmit());
