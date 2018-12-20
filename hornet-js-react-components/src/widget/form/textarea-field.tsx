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

import * as React from "react";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import {
    AbstractField, HornetWrittableProps,
    HornetClickableProps, HornetBasicFormFieldProps, AbstractFieldProps,
} from "src/widget/form/abstract-field";
import * as _ from "lodash";
import { Picto } from "src/img/picto";
import * as classNames from "classnames";
import { InputField } from "src/widget/form/input-field";
import { VALUE_CHANGED_EVENT } from "./event";
import { fireHornetEvent } from "hornet-js-core/src/event/hornet-event";
import * as ReactDOM from "react-dom";
import { Alert } from "src/widget/dialog/alert";
import { CharsCounter, HornetCharsCounterAttributes } from "src/widget/form/chars-counter";
import { ToolTip } from "src/widget/tool-tip/tool-tip";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";

const logger: Logger = Utils.getLogger("hornet-js-react-components.widget.form.textarea-field");

/**
 * Champ de formulaire Hornet de type zone de texte (textarea)
 */

export interface TextAreaFieldProps extends AbstractFieldProps, HornetWrittableProps,
    HornetClickableProps,
    HornetBasicFormFieldProps,
    HornetCharsCounterAttributes {
    resettable?: boolean;
    extendable?: boolean;
    displayMaxCharInLabel?: boolean;
    displayCharNumber?: boolean;
    resetTitle?:string;
}

export class TextAreaField extends AbstractField<TextAreaFieldProps, any> {

    protected element;
    protected charsCounter: CharsCounter;
    protected minHeight: number;

    public readonly props: Readonly<TextAreaFieldProps>;

    static defaultProps = _.assign(_.cloneDeep(AbstractField.defaultProps), {
        rows: 6,
        resettable: true,
        displayCharNumber: true,
        extendable: true,
        showAlert: true,
        resetTitle: "textarea.resetTitle",
    });

    /**
     * @inheritDoc
     */
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.valued !== nextState.valued
            || this.state.currentValue !== nextState.currentValue
            || this.state.errors !== nextState.errors
            || this.state.readOnly !== nextState.readOnly
            || this.state.disabled !== nextState.disabled;
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this.setMinHeight();
        this.setClientHeight();
    }

    /**
     * Génère le rendu spécifique du champ
     * @returns {any}
     * @override
     */
    renderWidget(): JSX.Element {

        logger.debug("TextAreaField renderWidget : ", this.state.id ? this.state.id : this.state.name);

        const htmlProps = this.getHtmlProps();
        const hasError = this.hasErrors() ? " has-error" : "";
        const charsCounterId = `chars-counter-${this.state.id}`;
        _.assign(htmlProps, {
            className: htmlProps["className"] ? htmlProps["className"] + hasError : hasError,
            "role-aria": "textbox",
            "aria-multiline": "true",
            "aria-labelledby": `${this.state.name}-span-label ${charsCounterId}`,
        });
        const classList = {
            "textarea-resizable": (this.props.extendable),
            "textarea-unresizable": (!this.props.extendable)};
        const classListStr = classNames(classList);
        _.assign(htmlProps, { className: `${htmlProps["className"]} ${classListStr}` });

        return (
            <div className={"textarea-container"}>
                <textarea onChange={this.valueChange} readOnly = {this.state.readOnly} ref={
                    (elt) => {
                        this.registerHtmlElement(elt);
                        this.element = elt;
                    }} {...htmlProps}>
                    {this.state.currentValue}
                </textarea>
                {this.state.resettable && this.state.valued && !this.state.readOnly && !this.state.disabled ? this.renderResetButton() :
                    <div />}
            </div>
        );
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
        const message = this.props.alertMessage || "textarea.alertMessage";
        const charTitle = this.props.alertTitle || "textarea.alertTitle";
        const charLabel = this.props.charLabel || "textarea.charLabel";

        const ariaDescribedby = { "aria-describedby": fieldName + "Tooltip" };

        return (
            <div className={this.state.labelClass + " label-container-textarea label-container"}>
            {this.state.displayCharNumber ?
                <CharsCounter maxChar={this.props.maxChar}
                          elementId={this.state.id}
                          className="textarea-character-value"
                          tooManyCharsClassName="textarea-too-many-char"
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

    /**
     * rendu html du bouton reset
     * @returns {any}
     */
    renderResetButton(): JSX.Element {

        const htmlProps = _.cloneDeep(this.getHtmlProps());

        const hidden = htmlProps["type"] === "hidden";

        const classList: ClassDictionary = {
            "input-reset textarea-reset": true,
            "input-reset-hidden": (!this.isValued() || hidden),
        };

        const aProps: any = {};
        if (this.isValued()) {
            aProps[ "onClick" ] = this.resetValue;
            aProps[ "tabIndex" ] = 0;
            aProps[ "title"] = this.i18n(this.state.resetTitle, {...this.state});
        }

        const identifiant = this.getResetButtonId();

        return (
            <span className={classNames(classList)}
                role="button"
                aria-hidden={!this.state.valued}
                onKeyDown={this.handleResetKeyDown}
                id={ identifiant }>
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
            this.resetValue();
            this.htmlElement.focus();
        }
    }

    protected getResetButtonId(): string {
        return this.props.id || this.props.name + "ResetButton";
    }

    protected setMinHeight(): void {
        this.minHeight = this.element.clientHeight;
    }

    /**
     * règle la taille du textarea en fonction du texte présent à l'intérieur de celui ci
     * @param event
     */
    private setClientHeight(event?): void {
        if (this.props.extendable) {
            const text = event ? event.target.value : this.element.textContent;
            if (text !== undefined && text !== null) {
                const height = (text.split("\n").length + 1) * 25;
                let finalHeight = this.props.maxLength && this.props.maxLength < this.state.height ? this.props.maxLength : height;
                finalHeight = (finalHeight < this.minHeight) ? this.minHeight : finalHeight;
                this.element.style.height = finalHeight + "px";
                this.element.height = finalHeight;

                // recalcul de la hauteur à l'aide de la taille du scroll
                const elem = document.getElementById(this.element.id) as any;
                let elemheight = elem.height;
                // cas de lapparition du scroll
                while (elemheight < this.element.scrollHeight) {
                    elemheight = elemheight + 25;
                }
                let elemFinalHeight = (this.props.maxLength && this.props.maxLength < this.state.height)
                    ? this.props.maxLength
                    : elemheight;
                elemFinalHeight = (elemFinalHeight < this.minHeight) ? this.minHeight : elemFinalHeight;
                elem.style.height = elemFinalHeight + "px";
                elem.height = elemFinalHeight;

            }
        } else {
            // Cas d'un textarea pouvant avoir un scrollbar
            const elem = document.getElementById(this.element.id) as any;
            const resetElement = document.getElementById(this.getResetButtonId()) as any;
            if (elem.clientHeight < this.element.scrollHeight && resetElement) {
                if (resetElement.className.indexOf("textarea-reset-scrollbar") < 0) {
                    resetElement.className = resetElement.className.replace("textarea-reset", "textarea-reset-scrollbar");
                }
            } else if (resetElement) {
                if (resetElement.className.indexOf("textarea-reset-scrollbar") > 0) {
                    resetElement.className = resetElement.className.replace("textarea-reset-scrollbar", "textarea-reset");
                }
            }
        }
    }

    /**
     * Calcule si le champs à une valeur ou non
     * @param event
     */
    valueChange(event: any) {
        // if (this.state.extendable) {
        this.setClientHeight(event);
        // }

        // mise à jour du texte d'affichage du nombre de caractère
        const value = event.target.value;

        if (value) {
            this.setState({ valued: true, currentValue: value });
        } else if (!value && this.state.valued) {
            this.setState({ valued: false, currentValue: value });
        }
        if (this.charsCounter) {
            this.charsCounter.handleTextChange(value);
        }
    }

    /**
     * Surcharge de la méthode
     * @param value
     * @returns {InputField}
     */
    setCurrentValue(value: any): this {
        super.setCurrentValue(value);
        this.setState({ valued: (value !== "" && value), currentValue: value });
        if (this.charsCounter) {
            this.charsCounter.handleTextChange(value);
        }
        this.setClientHeight();
        return this;
    }

    /**
     * teste si le champs n'est pas vide
     * @returns {boolean|any}
     */
    isValued(): boolean {
        return this.state.valued || (this.props as any).value;
    }

    /**
     * Permet de rendre à null la valeur du champ
     */
    resetValue(): void {

        if (this.htmlElement && this.htmlElement.onchange) {
            this.htmlElement.onchange();
        }
        this.htmlElement.value = "";
        fireHornetEvent(VALUE_CHANGED_EVENT.withData(this.htmlElement));
        this.charsCounter.handleTextChange(null);
        this.setState({ valued: false, currentValue: undefined }, () => {
            this.setClientHeight();
        });
    }

}
