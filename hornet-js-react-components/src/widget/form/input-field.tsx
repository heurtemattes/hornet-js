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

import * as React from "react";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import {
    AbstractField, HornetWrittableProps,
    HornetClickableProps, HornetBasicFormFieldProps, ReactFocusDOMAttributes, AbstractFieldProps,
} from "src/widget/form/abstract-field";
import { Picto } from "src/img/picto";
import * as _ from "lodash";
import * as classNames from "classnames";
import { fireHornetEvent } from "hornet-js-core/src/event/hornet-event";
import { VALUE_CHANGED_EVENT } from "src/widget/form/event";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { CharsCounter, HornetCharsCounterAttributes } from "src/widget/form/chars-counter";
import { ToolTip } from "src/widget/tool-tip/tool-tip";

const logger: Logger = Utils.getLogger("hornet-js-react-components.widget.form.input-field");

/**
 * Composant champ de formulaire : input html de type texte par défaut
 */

export interface InputFieldProps extends AbstractFieldProps, HornetWrittableProps,
    HornetClickableProps,
    HornetBasicFormFieldProps,
    HornetCharsCounterAttributes,
    ReactFocusDOMAttributes {
    resettable?: boolean;
    displayMaxCharInLabel?: boolean;
    displayCharNumber?: boolean;
    resetTitle?:string;
}

export class InputField<P extends InputFieldProps, S> extends AbstractField<InputFieldProps, S> {

    static defaultProps = _.assign({ type: "text", resettable: true,  resetTitle: "inputField.resetTitle"}, AbstractField.defaultProps);

    public readonly props: Readonly<InputFieldProps>;
    protected charsCounter: CharsCounter;

    /**
     * Génère le rendu spécifique du champ
     * @returns {any}
     * @override
     */
    renderWidget(): JSX.Element {
        const htmlProps = _.cloneDeep(this.getHtmlProps());

        if (this.state.currentValue != null) {
            _.assign(htmlProps, { defaultValue: this.props.currentValue });
        }

        const inputClasses: ClassDictionary = {
            "has-error": this.hasErrors(),
            input: true,
        };

        if (htmlProps[ "className" ]) {
            inputClasses[ htmlProps[ "className" ] ] = true;
        }

        if (this.state.alignment) {
            inputClasses[ this.state.alignment ] = true;
        }

        if (htmlProps[ "type" ] && htmlProps[ "type" ].toLowerCase() === "hidden") {
            htmlProps[ "type" ] = "text";
            htmlProps[ "hidden" ] = true;
        }

        htmlProps[ "onChange" ] = this.state.resettable ? this.handleChangeInput : htmlProps[ "onChange" ];
        htmlProps[ "className" ] = classNames(inputClasses);
        if (this.props.displayCharNumber) {
            const charsCounterId = `chars-counter-${this.state.id}`;
            htmlProps[ "aria-labelledby" ] = `${this.state.name}-span-label ${charsCounterId}`;
        } else {
            htmlProps[ "aria-labelledby" ] = `${this.state.name}-span-label`;
        }

        const message = this.props.alertMessage || "inputField.alertMessage";
        const title = this.props.alertTitle || "inputField.alertTitle";
        const label = this.props.charLabel || "inputField.charLabel";

        return (
            <div>
                <input ref={(elt) => this.registerHtmlElement(elt)} {...htmlProps} />
                {this.state.resettable && this.state.valued && !this.state.readOnly && !this.state.disabled
                    ? this.renderResetButton()
                    : <div />}
            </div>
        );
    }

    /**
     * Surcharge de la méthode
     * @param value
     * @returns {InputField}
     */
    setCurrentValue(value: any): this {
        super.setCurrentValue(value);
        if (this.charsCounter) {
            this.charsCounter.handleTextChange(value);
        }
        this.setState({ valued: (value !== "" && value) });
        return this;
    }

    isValued(): boolean {
        return this.state.valued || (this.props as any).value;
    }

    /**
     * rendu html du bouton reset
     * @returns {any}
     */
    renderResetButton(): JSX.Element {

        const htmlProps = _.cloneDeep(this.getHtmlProps());

        const hidden = htmlProps[ "type" ] === "hidden";

        const classList: ClassDictionary = {
            "input-reset": true,
            "input-reset-hidden": (!this.isValued() || hidden),
        };

        const aProps: any = {};
        if (this.isValued()) {
            aProps[ "onClick" ] = this.resetValue;
            aProps[ "tabIndex" ] = 0;
            aProps[ "title"] = this.i18n(this.state.resetTitle, {...this.state});
        }

        const prefixID: string = this.props.id || this.props.name;

        return (
            <span className={classNames(classList)}
                role="button"
                aria-hidden={!this.state.valued}
                id={prefixID + "ResetButton"}
                onKeyDown={this.handleResetKeyDown}
            >
                <a {...aProps}>
                    <img src={Picto.grey.close} alt={aProps.title} />
                </a>
            </span>
        );
    }

    handleResetKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
        const key: number = e.keyCode;
        if (key === KeyCodes.ENTER || key === KeyCodes.SPACEBAR) {
            e.preventDefault();
            e.stopPropagation();
            this.resetValue(e);
            this.htmlElement.focus();
        }
    }

    /**
     * Permet de rendre à null la valeur du champ et de masquer la colonne
     */
    resetValue(e): void {
        this.htmlElement.value = null;
        if (this.htmlElement && this.htmlElement.onchange) this.htmlElement.onchange();
        fireHornetEvent(VALUE_CHANGED_EVENT.withData(this.htmlElement));
        if (this.charsCounter) {
            this.charsCounter.handleTextChange(null);
        }
        this.setState({ valued: false }, () => {
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        });
    }

    /**
     * Action exécutée lors d'un changement de valeur du champ
     * @param e
     */
    handleChangeInput(e): void {
        if (this.htmlElement && this.htmlElement.value) {
            if (!this.state.valued) {
                this.setState({ valued: true });
            }
        } else if (this.state.valued) {
            this.setState({ valued: false });
        }

        const htmlProps = this.getHtmlProps();

        if (_.isFunction(htmlProps[ "onChange" ])) {
            htmlProps[ "onChange" ](e);
        }
        if (this.charsCounter) {
            this.charsCounter.handleTextChange(this.htmlElement.value);
        }
    }

    /**
     * Surcharge de la méthode de la classe mère pour ajouter la limite autorisée si le nombre de caractères maximum est défini
     * et si la props displayMaxCharInLabel est true
     * @param fieldId
     * @param fieldName
     * @param label
     * @param required
     */
    renderLabel(fieldId: string, fieldName: string, label: string, required: boolean): JSX.Element {
        let customLabel = label || "";
        if (this.props.displayMaxCharInLabel && this.props.maxChar) {
            customLabel = customLabel.concat(" ").concat(this.i18n("charsCounter.limitLabel", { maxChar: this.props.maxChar }));
        }

        const urlTheme = this.state.imgFilePath || AbstractField.genUrlTheme();
        const urlIcoTooltip = urlTheme + this.state.icoToolTip;

        if ((this.state as any).abbr && !this.state.lang) {
            logger.warn("Field ", fieldName, " Must have lang with abbr configuration");
        }

        const ariaDescribedby = { "aria-describedby": fieldName + "Tooltip" };
        const message = this.props.alertMessage || "inputField.alertMessage";
        const charTitle = this.props.alertTitle || "inputField.alertTitle";
        const charLabel = this.props.charLabel || "inputField.charLabel";

        return (
            <div className={this.state.labelClass + " label-container"}>
                {this.state.displayCharNumber ?
                    <CharsCounter maxChar={this.props.maxChar}
                        elementId={this.state.id}
                        text={this.state.currentValue}
                        charLabel={charLabel}
                        alertMessage={message}
                        showAlert={this.props.showAlert}
                        alertTitle={charTitle}
                        ref={(elt) => {
                            this.charsCounter = elt;
                        }
                        } /> : null}
                <label htmlFor={fieldId} id={fieldName + "Label"}
                    className="label-content" {...this.state.toolTip ? ariaDescribedby : null}>
                    {(this.state.abbr) ?
                        <abbr lang={this.state.lang} title={this.state.abbr}>
                            <span className="label-abbr" id={fieldName + "-span-label"}>{customLabel}</span>
                        </abbr> : <span className="label" id={fieldName + "-span-label"}>{customLabel}</span>}

                    {required && this.state.markRequired ?
                        <span className="label-required"><abbr title={this.getRequiredLabel()}>*</abbr></span> : null}

                    {this.state.toolTip ?
                        <ToolTip alt={this.state.toolTip} src={urlIcoTooltip} idSpan={fieldName + "Tooltip"} /> : null}
                </label>
            </div>
        );

    }
}
