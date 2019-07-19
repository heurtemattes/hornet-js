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

"use strict";
import { runTest } from "hornet-js-test/src/test-run";
import "hornet-js-test/src/test-run";

import { TestUtils } from "hornet-js-test/src/test-utils";
const expect = TestUtils.chai.expect;

import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import * as React from "react";

import { HornetReactTest } from "hornet-js-test/src/hornet-react-test";
import { Decorators } from "hornet-js-test/src/decorators";

import * as moment from "moment";
import { CalendarField } from "src/widget/form/calendar-field";

let simpleCalendar: JSX.Element;
let multipleFormatsCalendar: JSX.Element;
let form;

@Decorators.describe("Test Karma calendar-field propriété dateFormats")
class CalendarFieldFormatsTest extends HornetReactTest {

    calendarSimple: any;
    calendarMultiple: any;

    @Decorators.beforeEach
    beforeEach() {

        Utils.setCls("hornet.internationalization",
                     {
                messages: {
                    calendar: {
                        agendaTitle: "Agenda",
                        choiceDate: "Choisir une date",
                        today: "Aujourd'hui",
                        now: "Maintenant",
                        ok: "Ok",
                        clear: "Effacer",
                        month: "Mois",
                        year: "Année",
                        hourPanelTitle: "Choisir une heure",
                        minutePanelTitle: "Choisir une minute",
                        secondPanelTitle: "Choisir une seconde",
                        monthSelect: "Choisir un mois",
                        yearSelect: "Choisir une année",
                        decadeSelect: "Choisir une décade",
                        yearFormat: "YYYY",
                        dateFormat: "DD\u002FMM\u002FYYYY",
                        monthYearFormat: "MMMM YYYY",
                        monthFormat: "MMMM",
                        monthBeforeYear: true,
                        timezoneOffset: 60,
                        firstDayOfWeek: 1,
                        minimalDaysInFirstWeek: 1,
                        placeHolder: "JJ\u002FMM\u002FAAAA",
                    },
                },
            });

        simpleCalendar = (
                <CalendarField name={"test"}
                ref={(cal)=>{this.calendarSimple = cal}}
                label={"Test date"} />
        );

        multipleFormatsCalendar = (
                <CalendarField
                            ref={(cal)=>{this.calendarMultiple = cal}}
                            label={"test1"}
                            name="test1"
                            title={"test1"}
                            dateFormats={["DD/MM/YYYY", "YYYY/DD/MM", "DD-MM-YYYY", "YYYY-DD-MM"]}
                        />
        );
    }

    @Decorators.it("Affichage du champs calendar sans dateFormats")
    testSimpleCalendar() {
        const id = this.generateMainId();
        form = this.renderIntoDocument(simpleCalendar, id);
        expect(document.querySelector(`#${id} .calendar-input`)).to.exist;
        expect(document.querySelector(`#${id} .agenda`)).to.exist;

        this.triggerMouseEvent(document.querySelector(`#${id} .agenda`), "click");
        expect(document.querySelector(".widget-dialogue-header")).to.exist;

        this.triggerMouseEvent(document.querySelector(".rc-calendar-selected-day"), "click");
        expect((document.querySelector(`#${id} #test`) as any).value).to.be.equal(moment().locale("fr").format("DD/MM/YYYY"));

        setTimeout(() => {
            const value = this.calendarSimple.getCurrentValue();
            const today = moment().toDate();
            expect(value.getFullYear()).to.be.equal(today.getFullYear());
            expect(value.getMonth()).to.be.equal(today.getMonth());
            expect(value.getDate()).to.be.equal(today.getDate());

            this.end();
        }, 250);
    }

    @Decorators.it("Champs calendar avec dateFormats - date du jour cliquée")
    testMultipleCalendarTodayValue() {
        const id = this.generateMainId();
        form = this.renderIntoDocument(multipleFormatsCalendar, id);

        this.triggerMouseEvent(document.querySelector(`#${id} .agenda[title="test1"]`), "click");

        this.triggerMouseEvent(document.querySelector(".rc-calendar-selected-day"), "click");
        expect((document.querySelector(`#${id} #test1`) as any).value).to.be.equal(moment().locale("fr").format("DD/MM/YYYY"));

        this.end();
    }

    @Decorators.it("Champs calendar avec dateFormats - changements de date")
    testMultipleCalendar() {
        const id = this.generateMainId();
        form = this.renderIntoDocument(multipleFormatsCalendar, id);

        const dateInput = (document.querySelector(`#${id} #test1`));

        this.triggerKeyPressEvent(dateInput, "24-10-2012", 0, true);
        setTimeout(() => {
            const value = this.calendarMultiple.getCurrentValue();
            expect(value.getFullYear()).to.be.equal(2012);
            expect(value.getMonth()).to.be.equal(9);
            expect(value.getDate()).to.be.equal(24);

            this.triggerMouseEvent(document.querySelector(`#${id} #test1ResetButton a`), "click");
            setTimeout(() => {

                this.triggerKeyPressEvent(dateInput, "2018/22/03", 0, true);
                setTimeout(() => {
                    const value = this.calendarMultiple.getCurrentValue();
                    expect(value.getFullYear()).to.be.equal(2018);
                    expect(value.getMonth()).to.be.equal(2);
                    expect(value.getDate()).to.be.equal(22);

                    this.triggerMouseEvent(document.querySelector(`#${id} #test1ResetButton a`), "click");
                    setTimeout(() => {
                        this.calendarMultiple.setCurrentValue(new Date());
                        setTimeout(() => {
                            const value = this.calendarMultiple.getCurrentValue();
                            const today = moment().toDate();
                            expect(value.getFullYear()).to.be.equal(today.getFullYear());
                            expect(value.getMonth()).to.be.equal(today.getMonth());
                            expect(value.getDate()).to.be.equal(today.getDate());
                            this.triggerMouseEvent(document.querySelector(`#${id} #test1ResetButton a`), "click");
                            setTimeout(() => {
                                this.triggerKeyPressEvent(dateInput, "0099/21/04", 0, true);
                                setTimeout(() => {
                                    const value = this.calendarMultiple.getCurrentValue();
                                    expect(value.getFullYear()).to.be.equal(99);
                                    expect(value.getMonth()).to.be.equal(3);
                                    expect(value.getDate()).to.be.equal(21);
                                    this.end();
                                }, 250);
                            }, 250);
                        }, 250);
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    }

    @Decorators.it("Test fonctionnement de la props onChange")
    testOnChangeProps() {
        let isEnd: boolean;
        let calendarValue: string;
        const onChangeHandler = (e) => {
            expect(e.target.value, `La e.target.value: ${e.target.value} n'est pas égale à calendarValue: ${calendarValue}`)
                .to.equal(calendarValue);
            if (isEnd) {
                this.end();
            }
        };
        const calendarTag = (
            <CalendarField name={"testOnChangeProps"}
            ref={(cal)=>{this.calendarSimple = cal}}
            onChange={onChangeHandler}
            label={"Test date avec une props onChange"} />
    );
        const id = this.generateMainId();
        this.renderIntoDocument(calendarTag, id);
        calendarValue = "24/12/2014";
        this.triggerKeyPressEvent(document.querySelector(`#${id} #testOnChangeProps`), "24/12/2014", 0, true);
        setTimeout(() => {
            calendarValue = "";
            isEnd = true;
            this.triggerMouseEvent(document.querySelector(`#${id} #testOnChangePropsResetButton a`), "click");
        }, 250);
    }
}

// lancement des Tests
runTest(new CalendarFieldFormatsTest());
