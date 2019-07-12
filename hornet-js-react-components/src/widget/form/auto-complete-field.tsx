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

import { Utils } from "hornet-js-utils";
import * as React from "react";
import {
    AbstractField,
    HornetBasicFormFieldProps,
    HornetClickableProps,
    HornetWrittableProps,
    AbstractFieldProps,
} from "src/widget/form/abstract-field";
import { AutoCompleteSelector } from "src/widget/form/auto-complete-selector";
import { FieldErrorProps } from "src/widget/form/field-error";
import * as _ from "lodash";
import { HornetComponentChoicesProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponentDatasourceProps } from "src/widget/component/hornet-component";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { INotificationType } from "hornet-js-core/src/notification/notification-manager";
import { AutoCompleteState } from "src/widget/form/auto-complete-state";
import { DataSourceMaster } from "hornet-js-core/src/component/datasource/datasource-master";
import { AbstractFieldDatasource } from "src/widget/form/abstract-field-datasource";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { Logger } from "hornet-js-logger/src/logger";
import * as classNames from "classnames";
import { SvgSprites } from '../icon/svg-sprites';

import "src/widget/form/sass/_autocomplete.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.form.auto-complete-field");

export enum FilterTextType {
    beginWith = 1,
    indexOf = 2,
}

/**
 * Propriétés du composant d'auto-complétion
 */
export interface AutoCompleteFieldProps extends AbstractFieldProps, HornetWrittableProps,
    HornetClickableProps,
    HornetBasicFormFieldProps,
    HornetComponentDatasourceProps,
    HornetComponentChoicesProps {
    // Longueur minimale de texte libre permettant la proposition des choix
    minValueLength?: number;
    // Nombre maximum de choix à proposer
    maxElements?: number;
    // Délai minimal en millisecondes entre deux déclenchements de l'action de chargement de choix
    delay?: number;
    // Hauteur maximum de la popin de choix à proposer (en pixels)
    maxHeight?: number;
    // Lance un init sur le datasource à l'initialisation du composant
    init?: boolean;

    autoCompleteState?: AutoCompleteState;
    // définit si l'autocomplete est editable ou non
    writable?: boolean;
    // message qui s'affiche lors de la selection des items
    itemSelectedLabel?: string;

    filterText?: FilterTextType | Function;

    name: string;

    // surcharge du label lors qu'on a pas de resultat
    noResultLabel?: string;

    // définit si le champs peut être réinitialiser
    resettable?: boolean;
    // définit le title du bouton si le champs peut être réinitialiser
    resetTitle?: string;

    // force le filtre de la liste de choix par rapport à l'élément sélectionné
    autoFilter?: boolean;
}

/**
 * Composant d'auto-complétion.
 * Les fonctions getCurrentValue et setCurrentValue s'appuient sur le champ caché contenant la valeur sélectionnée.
 */
export class AutoCompleteField<P extends AutoCompleteFieldProps> extends AbstractFieldDatasource<AutoCompleteFieldProps, any> {
    public readonly props: Readonly<AutoCompleteFieldProps>;

    static defaultProps: any = _.assign({
        minValueLength: 1,
        readOnly: false,
        disabled: false,
        delay: 1000,
        valueKey: "value",
        labelKey: "text",
        maxHeight: null,
        writable: true,
        filterText: FilterTextType.indexOf,
        resettable: true,
        resetTitle: "form.autoCompleteField.resetTitle",
        init: true,
        autoFilter: false
    },
        AbstractField.defaultProps);

    protected _throttledTriggerAction: Function;

    /** Référence vers le champ caché contenant la valeur de l'élément sélectionné */
    protected hiddenInput: HTMLInputElement;

    /** Référence vers le champ de saisie libre */
    protected textInput: HTMLInputElement;

    protected autoCompleteState: AutoCompleteState;

    /** Indicateur si la valeur dans l'autocomplete a changé depuis le dernier focus */
    protected isUpdated: boolean;
    protected typedValueOnFocus: string;
    protected isTyping: boolean;

    constructor(props: P, context?: any) {
        super(props, context);

        const ariaSelectorId: string = props.name + "_select";

        this.state = {
            ...this.state,
            choices: [], // liste des choix possibles
            selectedIndex: null, // item sélectionné
            shouldShowChoices: false, // indique si la liste des choix est visible ou non
            ariaSelectorId, // identifiant du selector
            isApiLoading: false, // loader
            allChoices: (this.props.dataSource.results) ? this.props.dataSource.results : [], // liste de tous les choix (non filtré par le texte),
        };

        this.autoCompleteState = new AutoCompleteState();
    }

    /**
     * Setter indiquant que l'API est en cours d'exécution
     * @param value valeur à utiliser
     * @param callback fonction de callback éventuelle
     * @returns {AutoComplete}
     */
    public setIsApiLoading(value: boolean, callback?: () => any): this {
        this.setState({ isApiLoading: value }, callback);
        return this;
    }

    /**
     * Setter des choix du composant
     * @param value tableau de choix
     * @param callback fonction de callback éventuelle
     * @returns {AutoComplete}
     */
    setChoices(value: any[], callback?: () => any): this {
        let choices: any[] = [];
        if (value && !Array.isArray(value)) {
            choices.push(value);
        } else {
            choices = value;
        }
        this.setState({ choices }, callback);
        return this;
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {

        if (!Utils.isServer) {
            if (!_.isUndefined(this.props["var"])) {
                logger.warn("The var props is only available in DEV");
            }
        }

        this.mounted = true;
        logger.trace("auto-complete componentDidMount");

        this._throttledTriggerAction = _.throttle(this.triggerAction, this.state.delay);

        this.props.dataSource.on("fetch", this.fetchEventCallback);
        this.props.dataSource.on("add", this.addEventCallback);
        this.props.dataSource.on("delete", this.setDeleteResultCallback);
        this.props.dataSource.on("sort", this.setResultCallback);
        this.props.dataSource.on("filter", this.filterEventCallback);
        this.props.dataSource.on("init", this.initEventCallback);
        this.props.dataSource.on("loadingData", this.displaySpinner);
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        super.componentWillUnmount();

        this.mounted = false;
        this.props.dataSource.removeListener("fetch", this.fetchEventCallback);
        this.props.dataSource.removeListener("add", this.addEventCallback);
        this.props.dataSource.removeListener("filter", this.filterEventCallback);
        this.props.dataSource.removeListener("init", this.initEventCallback);
        this.props.dataSource.removeListener("delete", this.setDeleteResultCallback);
        this.props.dataSource.removeListener("sort", this.setResultCallback);
        this.props.dataSource.removeListener("loadingData", this.displaySpinner);
    }

    /**
     * @inheritDoc
     */
    componentWillUpdate(nextProps: AutoCompleteFieldProps, nextState: any, nextContext: any): void {
        super.componentWillUpdate(nextProps, nextState, nextContext);
        if (this.state.delay !== nextState.delay) {
            /* Le délai d'appel de l'action a changé : on doit donc refaire ici l'encaspulation avec _.throttle */
            this._throttledTriggerAction = _.throttle(this.triggerAction, nextState.delay);
        }
    }

    /**
     * @inheritDoc
     */
    shouldComponentUpdate(nextProps: AutoCompleteFieldProps, nextState: any, nextContext: any) {
        if (this.state.shouldShowChoices !== nextState.shouldShowChoices
            || this.state.listDefaultValue !== nextState.listDefaultValue
            || ((nextState.choices && !this.state.choices)
                || (!nextState.choices && this.state.choices)
                || (nextState.choices && this.state.choices.length !== nextState.choices.length))
            || !_.isEqual(nextState.choices, this.state.choices)
            || (this.state.errors !== nextState.errors)
            || (this.state.readOnly !== nextState.readOnly)
            || (this.state.disabled !== nextState.disabled)
            || (this.state.label !== nextState.label)
            || (this.state.placeholder !== nextState.placeholder)
            || (this.state.required !== nextState.required)
            || (this.state.selectedIndex !== nextState.selectedIndex)
        ) {
            return true;
        }
        return false;
    }

    /**
     * Génère le rendu spécifique du champ
     * @returns {any}
     */
    renderWidget(): JSX.Element {
        const id = this.state.id ? this.state.id : this.getFreeTypingFieldName();
        logger.debug("AutoCompleteField renderWidget : ", id);

        if (this.state.readOnly && this.state.writable) {
            logger.warn("L'autocomplete ne peut pas être readonly et writable.. on considère donc qu'il est readonly");
        }

        const shouldShow: boolean = this.shouldShowChoices();

        const hasError = this.hasErrors() ? " has-error" : "";
        let className = " autocomplete-content" + hasError;
        if (this.state.className) {
            className += " " + this.state.className;
        }

        let htmlProps: React.HTMLAttributes<HTMLElement> = this.getHtmlProps();
        htmlProps = _.assign(htmlProps, {
            onKeyDown: this.handleKeyDown,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onDoubleClick: this.handleDoubleClick,
            onClick: this.handleClick,
            onChange: this.handleChangeTextInput,
            autoComplete: "off",
            "aria-autocomplete": "list",
            "aria-expanded": shouldShow,
            "aria-owns": this.state.ariaSelectorId,
            "aria-activedescendant": shouldShow ? this.state.ariaSelectorId + "_" + this.state.selectedIndex : undefined,
            id,
            type: "text",
            name: this.getFreeTypingFieldName(),
            className,
        } as React.HTMLAttributes<HTMLElement>);

        // Dans le cas où l'autocomplete est mis à jour avec une donnée sélectionnée depuis le datasource
        // la liste des choix du selector est uniquement alimentée par le choix sélectionné comme si il avait été saisi à la main
        // const choices = (this.state.dataSource.selected) ? this.state.dataSource.selected : this.state.choices;

        /* Le champ caché contient l'identifiant de l'élément sélectionné. C'est cet identifiant qui est ensuite
         utilisé par les actions. */
        return (

            <div className="autocomplete-container">
                <input type="hidden" name={this.getValueFieldName()} ref={this.registerHiddenInput} />

                {/* Champ de saisie libre */}
                <input {...htmlProps}
                    ref={this.registerTextInput}
                    readOnly={this.state.readOnly || !this.state.writable} data-writable={this.state.writable}
                />
                {this.state.disabled || !this.state.resettable ? null : this.renderResetButton()}
                <AutoCompleteSelector
                    ref="selector"
                    choices={this.state.choices}
                    onOptionSelected={this.onListWidgetSelected}
                    selectorId={this.state.ariaSelectorId}
                    maxHeight={this.props.maxHeight}
                    showComponent={shouldShow}
                    choicesSelected={this.state.listDefaultValue}
                    autoCompleteState={this.autoCompleteState}
                    disabled={this.state.disabled || this.state.readOnly}
                    noResultLabel={this.state.noResultLabel}
                />
            </div>
        );
    }

    /**
     * Gère l'évènement focus sur l'autocomplete
     * @param {any} event l'évènement focus
     */
    protected handleFocus(event: any) {
        (this.state as any).focused = true;
        // L'attribut DOM onBlur est éventuellement aussi renseigné sur le composant auto-complete
        if (this.state.onFocus) {
            this.state.onFocus(event);
        }
    }

    /**
     * Gère l'évènement doubleclick sur l'autocomplete
     * @param {any} event l'évènement focus
     */
    protected handleDoubleClick(event: any) {
        this.handleClickAndDoubleClick(event);
    }

    /**
     * Gère l'évènement click sur l'autocomplete
     * @param {any} event l'évènement focus
     */
    protected handleClick(event: any) {
        this.handleClickAndDoubleClick(event);
    }

    /**
     * rendu html du bouton reset
     * @returns {any}
     */
    renderResetButton(): JSX.Element {
        const htmlProps = _.cloneDeep(this.getHtmlProps());

        const hidden = htmlProps["type"] === "hidden";

        const classList: classNames.ClassDictionary = {
            "input-reset autocomplete-reset": true,
            "input-reset-hidden": (!this.isValued() || hidden),
        };

        const aProps: any = {};
        if (this.isValued()) {
            aProps["onClick"] = this.reset;
            aProps["tabIndex"] = 0;
            aProps["title"] = this.i18n(this.state.resetTitle, { ...this.state });
            aProps["role"] = "button";
        }

        let spanProps: React.HTMLAttributes<HTMLElement> = {};
        spanProps = _.assign(spanProps, {
            id: this.inferResetButtonId(),
            "aria-hidden": !this.isValued(),
            className: classNames(classList),
            onKeyDown: this.handleResetKeyDown,
        } as React.HTMLAttributes<HTMLElement>);
        logger.trace("render resetButton", spanProps, aProps);
        return (
            <span {...spanProps}>
                <a {...aProps}>
                    <SvgSprites icon="close" color="#757575" />
                </a>
            </span>
        );
    }

    handleResetKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
        const key: number = e.keyCode;
        if (key === KeyCodes.ENTER || key === KeyCodes.SPACEBAR) {
            e.preventDefault();
            e.stopPropagation();
            this.reset(e);
        }
    }

    clear(event) {
        if (event) {
            event.preventDefault();
        }
        this.resetField();
        this.emitDataSourceSelectEvent(null);
        if (this.state.onChange) {
            this.state.onChange({
                target: this.textInput,
                currentTarget: this.textInput,
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
        this.clearFilterData();
        this.setFocus();
    }


    reset(event) {
        this.clear(event);
        this.handleClickAndDoubleClick();
    }

    isValued(): boolean {
        if (this.textInput) {
            return this.textInput.value !== null && this.textInput.value !== "";
        }
        return false;
    }

    /**
     *
     * @param result
     */
    protected fetchEventCallback(result) {
        this.choicesLoaderCallback(result);
        // dans le cas writable, le composant n'a pas besoin de recharger la liste des choix
        // elle est disponible directement
        if (this.props.writable) {
            this.prepareChoices();
        } else {
            this.showChoices();
        }
    }

    /**
     * récupération des choix dans le datasource
     * @param result
     */
    protected addEventCallback(result) {
        this.setResultCallback(result);
    }

    /**
     * récupération des choix dans le datasource
     * @param result
     */
    protected setResultCallback(result) {
        (this.state as any).allChoices = this.props.dataSource.results;
    }

    /**
     * récupération des choix dans le datasource
     * mise à jour des choix possibles
     * @param result
     */
    protected setDeleteResultCallback(result) {
        this.setResultCallback(result);
        this.choicesLoaderCallback(result);
    }

    /**
     * récupération des choix possibles dans le datasource
     * @param filtered
     */
    protected filterEventCallback(filtered) {
        (this.state as any).allChoices = filtered;
        this.choicesLoaderCallback(filtered);
    }

    /**
     * récupération des choix à l'initialisation
     * @param result
     */
    protected initEventCallback(result) {
        (this.state as any).allChoices = result;
    }

    /**
     * retourne le texte saisi
     * @return {any} le texte actuellement saisi dans le champ de saisie libre
     */
    getCurrentText(): string {
        let text: string = "";
        if (this.textInput) {
            text = this.textInput.value;
        }
        return text;
    }

    /**
     * Modifie la valeur du texte présent dans l'input
     * @param value texte à mettre dans l'input
     */
    setCurrentText(value: string): void {
        this.textInput.value = value;
    }

    /**
     * Réinitialise le champs autocomplete
     */
    public resetField() {
        this.setState({ selectedIndex: -1 });
        this.resetSelectedText();
        this.resetSelectedValue();
        return this;
    }

    /**
     * Réinitialise la valeur de l'élément sélectionné contenu dans le champ caché
     */
    protected resetSelectedValue(): void {
        if (this.hiddenInput) {
            this.hiddenInput.value = "";
        }
        this.autoCompleteState.choiceFocused = null;
    }

    /**
     * Réinitialise la valeur de l'élément sélectionné contenu dans le champ caché
     */
    protected resetSelectedText(): void {
        if (this.textInput) {
            this.textInput.value = "";
        }
        if (this.refs.selector) {
            (this.refs.selector as AutoCompleteSelector).setCurrentTypedText("");
        }
    }

    /**
     * Fonction appelée lors d'un appui de touche sur le champ de saisie libre
     * @param e évènement
     * @protected
     */
    protected handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        // L'attribut DOM onKeyDown est éventuellement aussi renseigné sur le composant auto-complete
        if (this.state.onKeyDown) {
            this.state.onKeyDown(event);
        }

        const key: number = e.keyCode;

        const shouldShow: boolean = this.state.shouldShowChoices === true;

        if (key === KeyCodes.DOWN_ARROW) {
            if (e.altKey) {
                this.autoCompleteState.setFocusOn(this.state.selectedIndex, this.hiddenInput.value, null);
                this.handleClickAndDoubleClick();
                this.showChoices();
            } else {
                this.navigateInChoices(1);
                this.isUpdated = true;
            }
            e.preventDefault();
        } else if (key === KeyCodes.UP_ARROW) {
            if (e.altKey) {
                this.hideChoices();
            } else {
                this.navigateInChoices(-1);
                this.isUpdated = true;
            }
            e.preventDefault();
        } else if (key === KeyCodes.ESCAPE) {
            // clear la zone de saisie et le datasource (règle d'acccéssibilité)
            this.clear(e);
            // On demande le masquage des choix
            this.hideChoices();
            e.preventDefault();
        } else if (key === KeyCodes.ENTER) {
            // valide un choix si on est sur un autocomplete simple et writable
            // ne fait rien sinon (valide le formulaire)
            if (this.state.shouldShowChoices) {
                e.preventDefault();
                if (this.state.choices && this.state.choices.length > 0) {
                    this.validateSelectedValue(shouldShow);
                }
            }
        } else if (key === KeyCodes.SPACEBAR && !this.state.writable) {
            // valide un choix si on est sur un autocomplete et non writable
            if (this.state.shouldShowChoices) {
                e.preventDefault();
                this.validateSelectedValue(shouldShow);
            }
        } else if (key === KeyCodes.TAB && !e.shiftKey && this.state.shouldShowChoices) {
            this.tabHandlerForValueChange(e, shouldShow);
        } else if (key === KeyCodes.TAB && e.shiftKey) {
            this.tabHandlerForValueChange(e, shouldShow);
        } else if (key === KeyCodes.HOME) {
            if (shouldShow) {
                (this.state as any).selectedIndex = null;
                this.navigateInChoices(1);
            } else {
                (this.state as any).selectedIndex = 0;
                this.selectCurrentIndex();
                this.hideChoices();
            }
            this.isUpdated = true;
            e.preventDefault();
        } else if (key === KeyCodes.END) {
            if (shouldShow) {
                (this.state as any).selectedIndex = null;
                this.navigateInChoices(-1);
            } else {
                (this.state as any).selectedIndex = this.state.choices.length - 1;
                this.selectCurrentIndex();
                this.hideChoices();
            }
            this.isUpdated = true;
            e.preventDefault();
        }
    }

    /**
     * gère la tabulation
     * @param {React.KeyboardEvent<HTMLElement>} e
     * @param {boolean} shouldShow
     * @param {boolean} preventDefault
     */
    protected tabHandlerForValueChange(e: React.KeyboardEvent<HTMLElement>, shouldShow: boolean) {
        if (this.isUpdated) {
            this.validateSelectedValue(shouldShow);
            this.isUpdated = false;
        } else {
            this.selectCurrentIndex();
            this.hideChoices();
        }
    }

    /**
     * valide le choix sélectionné
     * @param shouldShow indique si les résultats doivent être affichés
     */
    protected validateSelectedValue(shouldShow: boolean): void {
        if (shouldShow) {
            // place le selectedIndex sur le choix
            if (!this.state.selectedIndex) {
                this.state.choices.map((element, index) => {
                    const isElementContainsText = element && element.text;
                    const currentText = this.getCurrentText();
                    if (isElementContainsText && currentText && element.text.toLowerCase() === currentText.toLowerCase()) {
                        (this.state as any).selectedIndex = index;
                    }
                });
            }
            // choix sélectionné
            const selection: any = this.state.choices[this.state.selectedIndex];
            if (selection != null) {
                this.setCurrentValue(selection.value);
                this.emitDataSourceSelectEvent(selection);
            } else {
                this.setCurrentValue(undefined);
                this.emitDataSourceSelectEvent(undefined);
            }

            this.selectCurrentIndex();
            this.hideChoices();
        } else {
            this.showChoices();
        }
    }

    /**
     * Emet l'évènement select sur le dataSource
     * si l'objet déjà sélectionné est différent de celui en paramètre
     * @param {any} - nouvelle sélection
     */
    emitDataSourceSelectEvent(newSelection) {
        const actualSelection = this.props.dataSource.selected;
        if ((!actualSelection && newSelection)
            || (actualSelection && !newSelection)
            || (actualSelection
                && newSelection
                && (actualSelection.text !== newSelection.text || actualSelection.value !== newSelection.value))
            || (actualSelection !== newSelection)) {
            this.props.dataSource.select(newSelection);
        }
    }

    /**
     * Initialise les tableaux allChoices choices du state
     */
    initChoicesAndAllChoices() {
        (this.state as any).allChoices = [];
        (this.state as any).choices = [];
    }

    /**
     * Méthode déclenchée lors du click ou doubleClick sur le champ autocomplete
     * @param {any} event évènement propagé
     */
    protected handleClickAndDoubleClick(event?: any): void {
        this.prepareChoices();
        this.typedValueOnFocus = this.getCurrentText();

        if (!this.isValidText(this.typedValueOnFocus) && this.state.allChoices) {
            this.initChoicesAndAllChoices();
        }
        if (!this.props.dataSource.isSlave && ((!this.isValidText(this.typedValueOnFocus) && this.props.init) || !this.props.writable)) {
            // Si le nombre de caractères saisi dans l'input est inférieur au minimum requis  et que la props init est à true
            // ou si l'autocomplete n'est pas writtable, on initialise le datasource
            this._throttledTriggerAction(this.typedValueOnFocus);
        } else if (!this.props.dataSource.isSlave) {
            this.showChoices();
        } else if ((this.props.dataSource.getFetchArgs(null, null)
            || (this.props.init && !this.props.dataSource.isDatasourceArray()))
            && !this.isValidText(this.typedValueOnFocus)) {
            this._throttledTriggerAction(this.typedValueOnFocus);
            this.showChoices();
        } else {
            if (this.props.init && !this.isValidText(this.typedValueOnFocus)) {
                (this.state as any).choices = this.props.dataSource.getResultBackup();
                if (!this.state.choices || this.state.choices.length === 0) {
                    this._throttledTriggerAction(this.typedValueOnFocus);
                } else {
                    this.props.dataSource.results = this.props.dataSource.getResultBackup();
                }
            } else if (!this.isValidText(this.typedValueOnFocus)) {
                this.initChoicesAndAllChoices();
            }
            this.showChoices();
        }

        if (!this.hiddenInput || this.hiddenInput.value.length === 0 || !this.textInput || this.textInput.value.length === 0) {
            this.clearFilterData();
            (this.state as any).selectedIndex = -1;
            this.autoCompleteState.setFocusOn(this.state.selectedIndex, "", null);
        } else {
            (this.state as any).selectedIndex = _.findIndex(this.state.choices, { text: this.typedValueOnFocus });
            this.autoCompleteState.setFocusOn(this.state.selectedIndex, this.hiddenInput.value, null);
        }
    }

    /**
     * Fonction déclenchée lorsque le champ de saisie libre perd le focus
     * @param event
     */
    protected handleBlur(event: React.FocusEvent<HTMLElement>): void {
        (this.state as any).focused = false;
        // L'attribut DOM onBlur est éventuellement aussi renseigné sur ce composant auto-complete
        if (this.state.onBlur) {
            this.state.onBlur(event);
        }

        if (!this.props.dataSource.selected || (this.props.dataSource.selected &&
            this.props.dataSource.selected.value &&
            this.props.dataSource.selected.value.toString() !== this.hiddenInput.value)) {
            if (!this.hiddenInput || !this.hiddenInput.value || this.hiddenInput.value.length === 0) {
                this.clearFilterData();
                if (!this.state.isShiftTab) {
                    this.emitDataSourceSelectEvent(null);
                }
            } else {
                let val;
                if (this.state.allChoices.length > 0) {
                    val = (typeof this.state.allChoices[0]
                        .value === "number") ? parseInt(this.hiddenInput.value, 10) : this.hiddenInput.value;
                }
                this.emitDataSourceSelectEvent(_.find(this.state.allChoices, { value: val }));
            }
        }
        this.hideChoices();
        this.isUpdated = false;
    }

    /**
     * Déduit l'id du button reset de l'autocomplete
     * @returns {string} id du bouton reset
     */
    protected inferResetButtonId(): string {
        return this.props.id || this.props.name + "ResetButton";
    }

    /**
     * indique aux élément esclave qu'un filter a été fait sur le maitre si le datasource en est un
     */
    clearFilterData() {
        if (this.props.dataSource instanceof DataSourceMaster) {
            this.props.dataSource.getSlaves().forEach((item: DataSource<any>) => {
                item.emit("filter", []);
            });
        }
    }

    protected onChangeForceEmit(event): void {
        if (this.state.onChange) {
            this.state.onChange(event);
        }
    }

    /**
     * Fonction déclenchée sur une modification du champ de saisie libre
     * @param event
     */
    protected handleChangeTextInput(event?: React.FormEvent<HTMLElement>): void {
        this.isTyping = true;
        logger.trace("auto-complete handleChangeTextInput");
        // Le texte a changé donc on réinitialise la valeur
        this.resetSelectedValue();
        (this.state as any).selectedIndex = null;

        // L'attribut DOM onChange est éventuellement aussi renseigné sur le composant auto-complete
        if (event) {
            this.onChangeForceEmit(event);
        }

        const newText = this.getCurrentText();

        this.clearFilterData();
        this.isUpdated = true;

        if (this.refs.selector) {
            (this.refs.selector as AutoCompleteSelector).setCurrentTypedText(newText);
        }

        // Si le texte saisi contient le nombre de caractères minumum pour lancer la recherche
        // ou si rien n'est saisi mais qu'il faut afficher tout les choix par défaut, alors
        // on lance la recherche
        if ((this.isValidText(newText)
            || (!newText && this.state.init)
            || !this.state.writable)
            && (!this.props.dataSource.isSlave
                || this.props.dataSource.getFetchArgs(null, null)
                || this.state.init)) {
            logger.trace("auto-complete : prise en compte du texte saisi : ", newText);
            this._throttledTriggerAction(newText);
        } else if (this.props.dataSource.isSlave && !this.props.dataSource.getFetchArgs(null, null)) {
            this.initChoicesAndAllChoices();
            this.emitDataSourceSelectEvent(null);
            this.forceUpdate();
        } else {
            this.initChoicesAndAllChoices();
            this.hideChoices();
            this.emitDataSourceSelectEvent(null);
        }
    }

    /**
     * si il n'y a plus qu'un choix écrit dans sa totalité,
     * valid ele choix
     * @param {string} newText
     */
    protected changeSelectedChoiceWhenOneChoice(newText: string): void {
        if (this.state.choices && this.state.choices[0] && this.state.choices.length === 1
            && _.deburr(newText).toLowerCase() === _.deburr(this.state.choices[0].text).toLowerCase()) {
            this.changeSelectedChoice(this.state.choices[0]);
            if (this.props.dataSource.selected !== this.state.choices[0]) {
                this.emitDataSourceSelectEvent(this.state.choices[0]);
            }
            this.autoCompleteState.setFocusOn(0, this.state.choices[0].value, 0);
        }
    }

    /**
     * change la valeur courrante
     * @param value
     * @returns {this}
     */
    setCurrentValue(value: any): this {
        super.setCurrentValue(value);
        this.setState({ listDefaultValue: value });
        return this;
    }

    /**
     * Déclenche le chargement des éléments correspondant au texte saisi
     * @param newText texte saisi
     */
    protected triggerAction(newText: string) {
        logger.trace("triggerAction texte ", newText);
        this.setIsApiLoading(true);
        this.props.dataSource.fetch(true, newText, true);
    }

    /**
     * Controle la longeur du text saisie avant de déclancher la recherche
     * @param cnt : boolean
     */
    protected isMaxElementNumberReached(cnt: number): boolean {
        return this.state.maxElements && cnt >= this.state.maxElements;
    }

    /**
     * Charge la liste de choix dans le composant
     */
    protected prepareChoices(): void {
        const newText = this.getCurrentText();
        if (this.isValidText(newText) || (!newText && this.state.init) || !this.state.writable) {
            const choicesListToUse = (this.state.choices && this.state.choices.length > 0) ? this.state.choices : this.state.allChoices;
            const newChoices = this.inferNewChoices(choicesListToUse, newText);

            // mets a jour la liste des choix
            this.setChoices(newChoices, () => {
                if (newChoices.length > 0) {
                    // si il n'y a plus qu'un choix on le valide
                    this.changeSelectedChoiceWhenOneChoice(this.getCurrentText());
                    this.showChoices();
                } else if (newChoices.length === 0) {
                    this.hiddenInput.value = "";
                    this.emitDataSourceSelectEvent(null);
                }
            });
        }
    }

    /**
     * Calculer la nouvelle liste des choix à afficher
     * @param {Array} - actualChoices : liste des choix actuelle
     * @param {string} - inputValue : la valeur du champ autocomplete
     * @returns {Array} - la nouvelle liste de choix
     */
    protected inferNewChoices(actualChoices, inputValue): any[] {
        let newChoices = [];
        if (actualChoices) {
            newChoices = actualChoices;
            const maxElements = this.state.maxElements ? this.state.maxElements : actualChoices.length;
            // Dans le cas d'un datasource array, le filter est pour l'instant porté par l'autocomplete
            if (this.props.dataSource && (this.props.autoFilter || this.isTyping)) {
                newChoices = actualChoices.filter((choice: any) => {
                    return this.findText(choice, inputValue.toLowerCase());
                });
                this.isTyping = false;
            }

            newChoices = newChoices.filter((item, index) => {
                return index < maxElements;
            });
        }
        return newChoices;
    }

    /**
     * Fonction déclenchée une fois les éléments de choix obtenus par la fonction choicesLoader
     * @param resultItems éléments obtenus. ceux-ci doivent contenir une propr
     */
    protected choicesLoaderCallback(resultItems: any[]): void {
        const newText = this.getCurrentText();
        if (this.isValidText(newText) || (!newText && this.state.init) || !this.state.writable) {
            this.setIsApiLoading(false);
            this.setChoices(resultItems);
            this.setResultCallback(resultItems);
        }
    }

    /**
     * test si le choix choice commence par current
     * @param choice
     * @param current
     * @returns {boolean}
     */
    protected startsWithText(choice: any, current: string) {
        const choiceText: string = choice ? choice["text"] ? choice["text"].toLowerCase() : null : null;
        return _.startsWith(choiceText, current);
    }

    /**
     * teste si le texte current est contenu dans le choix choice
     * @param choice
     * @param current
     * @returns {boolean}
     */
    protected indexOfText(choice: any, current: string) {
        const choiceText: string = choice ? choice["text"] ? choice["text"].toLowerCase() : null : null;
        if (choiceText && (choiceText.indexOf(current) >= 0)) {
            return true;
        }
        return false;
    }

    /**
     * indique si le texte current se trouve dans le choix
     * @param choice
     * @param current
     * @returns {boolean}
     */
    protected findText(choice: any, current: string): boolean {

        if (typeof this.props.filterText === "function") {
            return this.props.filterText(choice, current);
        }
        if (this.props.filterText === FilterTextType.beginWith) {
            return this.startsWithText(choice, current);
        }
        if (this.props.filterText === FilterTextType.indexOf) {
            return this.indexOfText(choice, current);
        }

        return false;
    }

    /**
     * Fonction appelée lorsque l'utilisateur a choisi un élément de la liste de choix.
     * @param choice élément sélectionné
     */
    public changeSelectedChoice(choice?: any) {
        this.textInput.value = choice ? choice.text : "";
        this.hiddenInput.value = choice ? choice.value : "";
    }

    /**
     * Recupere l'index de l'element selectionné
     * @param choice
     */
    selectedChoice(choice) {
        let indexSelected = null;
        if (this.state.choices) {
            this.state.choices.map((item, index) => {
                if (item.value === choice) {
                    indexSelected = index;
                }
            });
            this.setCurrentValue(choice);
        }
    }

    /**
     * Fonction appelée lorsque l'utilisateur clique sur un item de la liste des valeurs possibles
     * @param event
     */
    protected onListWidgetSelected(event: React.MouseEvent<HTMLElement>, choice: any): void {
        if (choice) {
            logger.trace("Selection click [", choice.value, "]:", choice.text);
            const index = _.findIndex(this.state.choices, choice);
            (this.state as any).selectedIndex = index;
            this.autoCompleteState.choiceFocused = index;
            this.changeSelectedChoice(choice);
            this.hiddenInput.value = choice.value;
            this.selectedChoice(choice.value);
            this.emitDataSourceSelectEvent(choice);

            this.onChangeForceEmit({
                target: this.textInput,
                currentTarget: this.textInput,
                preventDefault: () => { },
                stopPropagation: () => { },
            });
        }
        this.hideChoices();
    }

    /**
     * Retourne true si le texte indiqué correspond aux critères de taille minimale
     * @param text
     * @returns {boolean}
     * @protected
     */
    protected isValidText(text: string) {
        return (text != null && text.length >= this.state.minValueLength);
    }

    /**
     * Navigue au sein de la liste de choix
     * @param delta {number} indique de combien d'éléments on doit se déplacer par rapport à l'élément actuellement sélectionné
     * @protected
     */
    protected navigateInChoices(delta: number) {
        let newIndex: number = this.state.selectedIndex === null ? (delta === 1 ? 0 : delta) : this.state.selectedIndex + delta;
        const choicesLength: number = this.state.choices ? this.state.choices.length : 0;

        if (newIndex < 0) {
            // On va à la fin
            newIndex = choicesLength - 1;
        } else if (newIndex >= choicesLength) {
            // On retourne au début
            newIndex = 0;
        }

        const selection: any = (this.state.choices[newIndex]);
        if (selection != null) {
            this.changeSelectedChoice(selection);
            super.setCurrentValue(selection.value);
            this.setState({ currentValue: selection.value, selectedIndex: newIndex });
        }

        this.onChangeForceEmit({
            target: this.textInput,
            currentTarget: this.textInput,
            preventDefault: () => { },
            stopPropagation: () => { },
        });
        this.autoCompleteState.setFocusOn(newIndex, this.hiddenInput.value, newIndex);

    }

    /**
     * Selectionne l'élement actuellement en surbrillance dans la liste de choix
     * @return boolean si une sélection a effectivement eu lieu
     * @protected
     */
    protected selectCurrentIndex(): boolean {
        const selection: any = (this.state.choices || [])[this.state.selectedIndex];
        if (selection != null) {
            this.changeSelectedChoice(selection);
            return true;
        }
        return false;
    }

    /**
     * Demande l'affichage du composant de choix
     * @public
     */
    public showChoices(): void {
        if (this.state.shouldShowChoices !== true && this.state.focused) {
            if (this.isValidText(this.textInput.value) || this.textInput.value.length === 0 || !this.props.writable) {
                this.setState({ shouldShowChoices: true });
            }
        }
    }

    /**
     * Demande le masquage du composant de choix
     * @public
     */
    public hideChoices(): void {
        if (this.state.shouldShowChoices !== false) {
            this.setState({ shouldShowChoices: false });
        }
    }

    /**
     * @return {boolean} true si le composant de liste doit s'afficher
     * @protected
     */
    protected shouldShowChoices(): boolean {
        return this.state.shouldShowChoices === true;
    }

    /**
     * @return {string} le nom du champ caché contenant la valeur
     */
    getValueFieldName(): string {
        return this.state.name + "." + this.state.valueKey;
    }

    /**
     * @return {string} le nom du champ de saisie libre
     */
    getFreeTypingFieldName(): string {
        return this.state.name + "." + this.state.labelKey;
    }

    /**
     * Surcharge le rendu des erreurs de validation : le nom du champ à mettre en évidence est le champ de saisie libre
     * @override
     */
    renderErrors(): React.ReactElement<FieldErrorProps> {
        const fieldErrorProps: FieldErrorProps = {
            errors: this.state.errors,
            fieldName: this.getFreeTypingFieldName(),
            hideError: this.state.hideError,
        };

        const basicFieldErrorProps: FieldErrorProps = {
            errors: this.state.errors,
            fieldName: this.state.name,
            hideError: this.state.hideError,
        };

        const Error = this.state.errorComponent;
        return (
            <div>
                <Error {...fieldErrorProps} />
                <Error {...basicFieldErrorProps} />
            </div>
        );
    }

    /**
     * On enregistre également le champ contenant la valeur dans la classe parente DomAdapter, ce qui fait les liens
     entre le formulaire, le champ HTML et le composant React.
     * @param hiddenInput
     */
    protected registerHiddenInput(hiddenInput: HTMLInputElement): void {
        this.hiddenInput = hiddenInput;
        this.registerHtmlElement(hiddenInput);
    }

    /**
     *  Conserve la valeur du champs saisie
     * @param textInput
     */
    protected registerTextInput(textInput: HTMLInputElement): void {
        this.textInput = textInput;
    }

    /** on mets le focus sur l'input */
    public setFocus() {
        (this.state as any).focused = true;
        this.textInput.focus();
        return this;
    }

    /**
     * teste si le composant a des erreurs
     * @override
     */
    hasErrors() {
        let fieldErrors: INotificationType[] = null;
        if (this.state.errors) {
            fieldErrors = this.state.errors.filter(function (error: INotificationType): boolean {
                const name = this.state.name + "." + this.state.labelKey;
                return (error.field === name || error.field === this.state.name);
            }, this);
        }
        if (fieldErrors && (fieldErrors.length > 0)) {
            return true;
        }

        return false;
    }
}
