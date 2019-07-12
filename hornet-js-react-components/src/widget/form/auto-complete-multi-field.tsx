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

import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";
import { HornetBasicFormFieldProps, HornetClickableProps, HornetWrittableProps, AbstractFieldProps } from "src/widget/form/abstract-field";

import { AutoCompleteField, AutoCompleteFieldProps } from "src/widget/form/auto-complete-field";
import { AutoCompleteSelector } from "src/widget/form/auto-complete-selector";
import { Chips } from "src/widget/button/chips";
import * as _ from "lodash";
import { HornetComponentChoicesProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponentDatasourceProps } from "src/widget/component/hornet-component";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { AutoCompleteState } from "src/widget/form/auto-complete-state";

const logger = Logger.getLogger("hornet-js-react-components.widget.form.auto-complete-multi-field");

/**
 * Propriétés du composant d'auto-complétion
 */
export interface AutoCompleteMultiFieldProps extends AbstractFieldProps, HornetWrittableProps,
    HornetClickableProps,
    HornetBasicFormFieldProps,
    HornetComponentDatasourceProps,
    HornetComponentChoicesProps {
    name: string;
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
    // force de nettoyage de la zone de saisie sur la sortie du champ
    cleanFilterOnBlur?: boolean;
    // surcharge du label lors qu'on a pas de resultat
    noResultLabel?: string;
    // Spécifie si on doit afficher des chips
    withChips?: boolean;
    // Affichage d'un icone en prefixe de la chips avec la première lettre du mot
    withChipsInitials?: boolean;
    // Composant graphique pour le rendu de chips
    chipsComponent?: JSX.Element;
}

/**
 * Composant d'auto-complétion  a choix multiple.
 */
export class AutoCompleteMultiField<P extends AutoCompleteMultiFieldProps, S> extends AutoCompleteField<AutoCompleteMultiFieldProps> {

    public readonly props: Readonly<AutoCompleteMultiFieldProps>;

    protected autocompleteContainer: HTMLDivElement;
    protected selectedChoices: any[];

    static defaultProps: any = _.assign({ withChips: true }, AutoCompleteField.defaultProps);

    constructor(props: P, context?: any) {
        super(props, context);
        this.state = {
            ...this.state,
            itemSelectedLabel: this.props.itemSelectedLabel ? this.props.itemSelectedLabel : "",
            multiple: true,
        };
        this.selectedChoices = [];
    }

    /**
     * @inheritDoc
     * @param {AutoCompleteFieldProps} nextProps
     * @param nextState
     * @param nextContext
     */
    componentWillUpdate(nextProps: AutoCompleteFieldProps, nextState: any, nextContext: any): void {
        super.componentWillUpdate(nextProps, nextState, nextContext);
        if (this.state.delay !== nextState.delay) {
            // Le délai d'appel de l'action a changé : on doit donc refaire ici l'encaspulation avec _.throttle
            this._throttledTriggerAction = _.throttle(this.triggerAction, nextState.delay);
        }
    }

    /**
     * @inheritDoc AutoCompleteField
     */
    componentDidMount() {
        super.componentDidMount();
        if (this.textInput && this.textInput.placeholder === "") {
            this.textInput.placeholder = this.i18n(this.state.itemSelectedLabel, { count: 0 })
                || this.i18n("form.autoCompleteField.selectedItem", { count: 0 });
        }
    }

    /**
     * @inheritdoc
     */
    componentDidUpdate() {
        // when the component is updated
        // make sure you remove the listener on document
        // and the component panel is not expand
        if (typeof document !== undefined && !this.state.shouldShowChoices) {
            document.removeEventListener("click", this.handleChoicesHiding, false);
        }
        // add event listener for clicks on document
        // when state is expand
        else if (typeof document !== undefined && this.state.shouldShowChoices) {
            document.addEventListener("click", this.handleChoicesHiding, false);
        }
    }

    /**
     * ferme la liste de choix de l'autocomplete lors d'un clic en dehors
     */
    handleChoicesHiding(e): void {
        e.stopPropagation();
        const focus = document.activeElement;
        const container = this.autocompleteContainer;
        if (container && focus && focus !== container && !container.contains(focus)) {
            this.hideChoices();
        }
    }

    /**
     * Génère le rendu spécifique du champ
     * @returns {any}
     */
    renderWidget(): JSX.Element {
        const id = this.state.id ? this.state.id : this.getFreeTypingFieldName();
        logger.debug("AutoCompleteMultiField renderWidget : ", id);
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
            "aria-multiselectable": true,
            id,
            type: "text",
            name: this.getFreeTypingFieldName(),
            className
        } as React.HTMLAttributes<HTMLElement>);

        let classNameContainer = "autocomplete-container";

        // if (this.getTotalSelectedItems() != 0 && this.state.listDefaultValue && this.state.listDefaultValue.length > 0) {
        if (this.getTotalSelectedItems() !== 0 && this.textInput && this.textInput.value !== "" && this.textInput.value.length > 0
            && !this.props.withChips) {
            classNameContainer += " badge-autocomplete-selected-items-before";
        }

        // Si l'autocomplete renvoi une erreur, le style required est appliqué au container
        if (this.hasErrors()) {
            classNameContainer += " required";
        }

        /* Le champ caché contient l'identifiant de l'élément sélectionné. C'est cet identifiant qui est ensuite
         utilisé par les actions. */
        return (

            <div className={classNameContainer} data-badge={this.getTotalSelectedItems()}
                ref={(elt) => this.autocompleteContainer = elt}>
                <input type="hidden" name={this.getValueFieldName()} ref={this.registerHiddenInput}
                    data-multiple={true} />
                {this.state.withChips || this.state.chipsComponent ? this.renderChips() : null}
                {/* Champ de saisie libre */}
                <input {...htmlProps}
                    ref={this.registerTextInput}
                    data-multiple={true}
                    readOnly={!this.props.writable || this.state.readOnly}
                    data-writable={this.props.writable}
                />

                <AutoCompleteSelector
                    ref="selector"
                    choices={this.state.choices}
                    onOptionSelected={this.onListWidgetSelected}
                    selectorId={this.state.ariaSelectorId}
                    maxHeight={this.props.maxHeight}
                    showComponent={shouldShow}
                    isMultiple={true}
                    choicesSelected={this.state.listDefaultValue}
                    autoCompleteState={this.autoCompleteState}
                    disabled={this.state.disabled || this.state.readOnly}
                    noResultLabel={this.state.noResultLabel}
                />
            </div>
        );
    }

    /**
     * Rendu graphique des chips
     */
    protected renderChips(): JSX.Element {
        const chips = [];

        if (this.state.currentValue && this.state.currentValue.length > 0) {
            this.state.currentValue.map((index, indice) => {
                const choices = this.props.dataSource && this.props.dataSource.results || this.props.data || [];
                const item = (choices as any).find((value) => {
                    return value.value === index;
                });

                if (item) {
                    const key: string = _.kebabCase(item.text + "-" + item.value + "-" + index);
                    const classObject = {};
                    classObject[_.kebabCase("chips-" + this.props.name + "-" + item.text)] = true;
                    if (indice === this.state.currentValue.length - 1) {
                        classObject["last-chips"] = true;
                    }

                    const chipsProps = {
                        handleClickReset: (e) => this.onListWidgetSelectedChips(e, item.value),
                        handleClick: (e) => this.onListWidgetSelectedChips(e, item.value),
                        id: key,
                        key,
                        classNames: classObject,
                        text: item.text,
                        disabled: this.state.disabled,
                        readOnly: this.state.readOnly,
                        title: item.text,
                        item,
                        withInitials: this.state.withChipsInitials,
                    };

                    if (this.state.chipsComponent) {
                        chips.push(React.createElement(this.state.chipsComponent, chipsProps));
                    } else {
                        chips.push(<Chips {...chipsProps} />);
                    }
                }
            });
        }
        return <React.Fragment>{chips}</React.Fragment>;
    }

    /**
     * navigation dans les choix
     * @param {number} delta
     */
    protected navigateInChoices(delta: number) {

        let newIndex: number = this.state.selectedIndex === null ? (delta === 1 ? 0 : delta) : this.state.selectedIndex + delta;
        const choicesLength: number = this.state.choices ? this.state.choices.length : 0;

        if (newIndex < 0) {
            // On va à la fin
            newIndex += choicesLength;
        } else if (newIndex >= choicesLength) {
            // On retourne au début
            newIndex = 0;
        }

        // on sélectionne le choix sur lequel on se trouve
        this.setState({ selectedIndex: newIndex }, () => {
            this.selectCurrentIndex();
            this.autoCompleteState.setFocusOn(this.state.selectedIndex, this.hiddenInput.value, newIndex);

        });

        // On s'assure de l'affichage de la liste déroulante
        if (this.state.shouldShowChoices) {
            this.showChoices();
        }
    }

    /**
     * Fonction appelée lors d'un appui de touche sur le champ de saisie libre
     * @param e évènement
     * @protected
     */
    protected handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
        /* L'attribut DOM onKeyDown est éventuellement aussi renseigné sur le composant auto-complete */
        if (this.state.onKeyDown) {
            this.state.onKeyDown(event);
        }

        const key: number = e.keyCode;
        const shouldShow: boolean = this.state.shouldShowChoices === true;

        if (key === KeyCodes.DOWN_ARROW) {
            if (this.isValidText(this.textInput.value)) {
                if (e.altKey) {
                    this.handleClickAndDoubleClick(e);
                } else {
                    this.navigateInChoices(1);
                }
            } else {
                if (e.altKey) {
                    this.handleClickAndDoubleClick(e);
                } else {
                    this.navigateInChoices(1);
                }
            }
            e.preventDefault();
        } else if (key === KeyCodes.UP_ARROW) {
            if (e.altKey) {
                this.hideChoices();
            } else {
                this.navigateInChoices(-1);
            }
            e.preventDefault();
        } else if (key === KeyCodes.BACKSPACE) {
            // Ajout du comportement backpace / return
            const lov = this.state.listDefaultValue;
            if (this.state.withChips) {
                if (lov && lov.length && !this.textInput.value) {
                    const lastChips = document.querySelector(".last-chips").id;
                    const chipsValue = lastChips.split("-");
                    const lastChipsText = chipsValue[0];
                    this.computeCurrentValues(lov[lov.length - 1], false, lastChipsText);
                }
            }
        } else if (key === KeyCodes.ESCAPE) {
            this.hideChoices();
            e.preventDefault();
        } else if (e.keyCode === KeyCodes.SPACEBAR && !this.state.writable) {

            if (shouldShow && !this.state.readOnly && !this.state.disabled) {
                const indexSelected: number = this.autoCompleteState.choiceFocused;
                const listDefaultValue: number[] = (this.state.listDefaultValue) ? _.cloneDeep(this.state.listDefaultValue) : [];
                let itemSelected;

                this.state.choices.map((item, index) => {
                    if (indexSelected === index) {
                        itemSelected = item;
                    }
                });

                if (itemSelected) {
                    this.computeCurrentValues(itemSelected.value, false);
                }
            }
            e.preventDefault();
        } else if (e.keyCode === KeyCodes.ENTER && this.state.writable) {
            if (shouldShow && !this.state.readOnly && !this.state.disabled) {
                const indexSelected: number = this.autoCompleteState.choiceFocused;
                const listDefaultValue: number[] = (this.state.listDefaultValue) ? _.cloneDeep(this.state.listDefaultValue) : [];
                let itemSelected;

                this.state.choices.map((item, index) => {
                    if (indexSelected === index) {
                        itemSelected = item;
                    }
                });

                if (itemSelected) {
                    this.computeCurrentValues(itemSelected.value, false);
                }
            } else if (!shouldShow) {
                this.showChoices();
            }
            e.preventDefault();
        } else if (key === KeyCodes.TAB) {
            this.selectCurrentIndex();
            this.hideChoices();
        } else if (key === KeyCodes.HOME) {
            if (shouldShow) {
                (this.state as any).selectedIndex = null;
                this.navigateInChoices(1);
            } else {
                (this.state as any).selectedIndex = 0;
                this.selectCurrentIndex();
                this.hideChoices();
            }
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
            e.preventDefault();
        }

        // Action lorsqu'on appuie la touche controle
        if (e.ctrlKey) {
            if (e.keyCode === 65) {

                logger.trace(" Autocomplete multiple ctrl+A ");

                let listDefaultValue: string[] = (this.state.listDefaultValue && this.state.listDefaultValue instanceof Array)
                    ? _.cloneDeep(this.state.listDefaultValue)
                    : [];

                if (listDefaultValue.length === (this.refs.selector as AutoCompleteSelector).props.choices.length) {
                    listDefaultValue = [];
                    this.changeSelectedChoice();
                    this.setState({ listDefaultValue: [] });
                } else {

                    if (listDefaultValue.length < (this.refs.selector as AutoCompleteSelector).props.choices.length) {
                        listDefaultValue = [];
                    }

                    (this.refs.selector as AutoCompleteSelector).props.choices.map((item) => {
                        if (typeof (listDefaultValue.push) === "function") {
                            listDefaultValue.push(item.value);
                        }
                    });

                    this.setState({ listDefaultValue });
                    this.changeSelectedChoice();
                }

                this.selectedChoices = [];
                listDefaultValue && listDefaultValue.forEach((item) => {
                    this.computeSelectedItem(item);
                });
                this.setCurrentValue(listDefaultValue);
            }
        }
    }

    /**
    * Vérifie que le parametre est défini
    * soit différent de null et de undefined
    * @param {any} value valeur à vérifier
    */
    protected isValueDefined(value: any): boolean {
        return value !== null && value !== undefined;
    }

    /**
     * Fonction déclenchée sur une modification du champ de saisie libre
     * @param event
     */
    protected handleChangeTextInput(event: React.FormEvent<HTMLElement>): void {
        logger.trace("auto-complete multiple handleChangeTextInput");
        /* L'attribut DOM onChange est éventuellement aussi renseigné sur le composant auto-complete */
        if (this.state.onChange) {
            this.state.onChange(event);
        }

        const newText: string = this.getCurrentText();

        if (this.refs.selector) {
            (this.refs.selector as AutoCompleteSelector).setCurrentTypedText(newText);
        }

        // Si le texte saisi comtient le nombre de caractères minumum pour lancer la recherche
        // ou si rien n'est saisi mais qu'il faut afficher tout les choix par défaut, alors 
        // on lance la recherche
        if (this.isValidText(newText) || (!newText && this.state.init) || !this.state.writable) {
            this._throttledTriggerAction(newText);
        } else {
            (this.state as any).choices = [];
            (this.state as any).allChoices = [];
            this.hideChoices();
        }

        if (this.state.choices[0]
            && this.state.choices.length === 1
            && _.deburr(newText).toLowerCase() === _.deburr(this.state.choices[0].text).toLowerCase()) {
            this.changeSelectedChoice();
        }
    }

    /**
     * Fonction permettant de gérer le focus entre chips et input
     * @param index: number
     * @param liste: string[]
     * @param lovId: string
     */
    setItemFocus(index: number, liste: string[], lovId?: string) {
        let focusIndex: number = -1;
        // récupération de l'élement "suivant" celui supprimé
        if (index < liste.length) {
            focusIndex = index;
        } else if (index === liste.length) {
            // récupération de l'élément "précédent"
            focusIndex = index - 1;
        }

        if (liste && liste.length) {
            let key: string;

            const focusChoix = this.props.dataSource.results && this.props.dataSource.results.filter(choix => {
                return choix.value === liste[focusIndex];
            });

            // Si pas de tableau ou si lovId est présent, focus sur l'input
            if (focusChoix.length === 0 || lovId) {
                document.getElementById(this.state.id).focus();
            } else {
                // Sinon focus sur le chips
                key = _.kebabCase(`${focusChoix[0].text}-${liste[focusIndex]}-${liste[focusIndex]}`);
                document.getElementById(key).focus();
            }
        } else {
            document.getElementById(this.state.id).focus();
        }
    }

    /**
     * Crée la liste des values
     * @param {any} - value de l'item sélectionné
     * @param {boolean} - focusIsNotOnInput : indique s'il faut mettre le focus sur l'input. si false, le focus est mis sur l'input
     * @param {string} - lastChipsId : Id du du dernier chips
     */
    protected computeCurrentValues(value: any, focusIsNotOnInput: boolean = true, lastChipsId?: string): void {
        let res;
        if (value instanceof Array) {
            res = value;
        } else {
            let listDefaultValue: string[] = (this.state.listDefaultValue && this.state.listDefaultValue instanceof Array)
                ? _.cloneDeep(this.state.listDefaultValue)
                : [];
            if (this.isValueDefined(value)) {
                const index = listDefaultValue.indexOf(value);

                if (index !== -1) {
                    listDefaultValue.splice(index, 1);
                    // Appel au focus sur le bon élement
                    // Si false est passé, on garde le focus sur l'input sans autre traitement
                    focusIsNotOnInput ?
                        this.setItemFocus(index, listDefaultValue, lastChipsId) : document.getElementById(this.state.id).focus();
                } else {
                    listDefaultValue.push(value);
                }
            } else {
                listDefaultValue = [];
            }
            res = listDefaultValue;
            this.computeSelectedItem(value);
        }
        this.setState({ listDefaultValue: res });
        this.setCurrentValue(res);
    }

    /**
     * Met à jour la liste des items sélectionnés en fonction de la value passée en paramètre
     * @param {any} - value de l'item sélectionné
     */
    protected computeSelectedItem(value) {
        if (value) {
            const choice = this.state.choices.filter(c => {
                return c && c.value === value;
            });

            const elemntsFound = this.selectedChoices.filter((selected) => {
                return selected && selected.value === value;
            });
            if (elemntsFound.length > 0) {
                this.selectedChoices = this.selectedChoices.filter((element) => {
                    return element && element.value !== value;
                }) || [];
            } else if (choice.length > 0 && choice[0]) {
                this.selectedChoices.push(choice[0]);
            }
        } else {
            this.selectedChoices = [];
        }
    }

    /**
    * Déclenche le chargement des éléments correspondant au texte saisi
    * @param newText texte saisi
    */
    protected triggerAction(newText: string) {
        logger.trace("auto-complete : prise en compte du texte saisi:", newText);
        this.setIsApiLoading(true);
        this.props.dataSource.fetch(true, newText, true);
    }

    /**
     * Retourne true si l'instance du composant est soumise à l'utilisation du placeholder
     * @param value tableau des données sélectionnées
     */
    protected isPlaceholderToUse(value: any): boolean {
        return (!value || value.length === 0) && this.state.placeholder && this.state.placeholder !== "";
    }

    /**
     * set la value
     * @param value
     */
    setCurrentValue(value: any): this {
        super.setCurrentValue(value);
        if (this.textInput) {
            this.textInput.placeholder = this.inferPlaceHolder(value);
        }
        this.changeSelectedChoice();

        if (this.isValueDefined(value) && (!Array.isArray(value) || value.length > 0)) {
            const res = value.map((item) => {
                return _.find(this.props.dataSource.results, { value: item });
            });
            if (res || (!Array.isArray(res) || res.length > 0)) {
                this.props.dataSource.select(res);
            }
        } else {
            this.props.dataSource.selectClean(true);
        }
        return this;
    }

    /**
     * Calcule le placeholder de l'autocomplete
     * @param {string} - value : la valeur sélectionnée
     */
    protected inferPlaceHolder(value: any): string {
        if (!this.isPlaceholderToUse(value)) {
            const valueLength = value ? value.length : 0;
            return this.i18n(this.state.itemSelectedLabel, { count: valueLength })
                || this.i18n("form.autoCompleteField.selectedItem", { count: valueLength });
        }
        return this.state.placeholder;
    }

    /**
     * @inheritDoc
     * Fonction appelée lorsque l'utilisateur a choisi un élément de la liste de choix pour nettoyer le currentText du selector
     * Ici on diffère du normal, car cette gestion est propre à ce dernier.
     */
    public changeSelectedChoice(choice?: any) {
        if (this.refs.selector) {
            (this.refs.selector as AutoCompleteSelector).setCurrentTypedText("");
        }
    }

    /**
     * ajout d'un listener sur les clic
     */
    public showChoices(): void {
        if (this.state.shouldShowChoices !== true && this.state.focused) {
            if (this.isValidText(this.textInput.value)
                || this.textInput.value.length === 0
                || !this.props.writable
                || this.state.readOnly
                || this.state.disabled) {
                this.setState({ shouldShowChoices: true });
            }
        }
    }

    /**
     * suppression du listener sur les clic
     */
    public hideChoices(): void {
        if (this.state.shouldShowChoices !== false) {
            this.setState({ shouldShowChoices: false });
        }
    }

    /**
     * Gestion de l'événement onFocus pour le champ de saisie libre.
     * @param event
     */
    protected handleClickAndDoubleClick(event: any): void {

        if (this.state.onSelected) {
            this.hideChoices();
        }
        this.typedValueOnFocus = this.getCurrentText();

        // Si rien n'est saisi dans l'input et que la props init est à true
        // ou si l'autocomplete n'est pas writtable, on initialise le datasource
        if ((!this.typedValueOnFocus && this.props.init) || !this.props.writable) {
            this._throttledTriggerAction(this.typedValueOnFocus);
        } else {
            this.showChoices();
        }
        if (!this.hiddenInput || this.hiddenInput.value.length === 0) {
            this.clearFilterData();
        } else {
            this.autoCompleteState.setFocusOn(this.state.selectedIndex, this.hiddenInput.value, null);
        }
    }

    /**
     * Fonction déclenchée lorsque le champ de saisie libre perd le focus
     * @param event
     */
    protected handleBlur(event: React.FocusEvent<HTMLElement>): void {
        if (this.state.onSelected) {
            (this.state as any).onSelected = false;
        } else {
            (this.state as any).focused = false;
            // L'attribut DOM onBlur est éventuellement aussi renseigné sur ce composant auto-complete
            if (this.state.onBlur) {
                this.state.onBlur(event);
            }

            this.hideChoices();
            this.isUpdated = false;
        }

        if (this.props.cleanFilterOnBlur) {
            // supprime la saisie pour voir le placeholder et reinitialisation du selecteur,
            // equivalent this.resetSelectedText(), mais ne provoque pas de nouveau rendu
            this.textInput.value = "";
            ((this.refs.selector as AutoCompleteSelector).state as any).currentTypedText = "";

            if (!this.state.init) {
                this.setResultCallback([]);
                (this.state as any).choices = [];
            }
        }
    }

    /**
     * Fonction appelée lorsque l'utilisateur clique sur un item de la liste des valeurs possibles
     * @param event
     */
    protected getTotalSelectedItems(): number {
        return this.state.currentValue ? this.state.currentValue.length : 0;
    }

    /**
     * Fonction appelée lorsque l'utilisateur clique sur un item de la liste des valeurs possibles
     * @param event
     */
    protected onListWidgetSelected(event: React.MouseEvent<HTMLElement>, choice: any): void {
        logger.trace("Selection Multiple click");
        const selectedValue = choice.value;
        if (event.target !== event.currentTarget) {
            (this.state as any).onSelected = true;
        }
        this.computeCurrentValues(selectedValue, false);

        event.nativeEvent.preventDefault();
        event.nativeEvent.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
    }

    /*
    * Fonction appelée lorsque l'utilisateur clique sur un item de la liste des valeurs possibles
    * @param event
    */
    protected onListWidgetSelectedChips(event: any, selectedValue: any): void {
        logger.trace("Click sur chips ayant pour value: ", selectedValue);
        this.computeCurrentValues(selectedValue);
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Charge la liste de choix dans le composant
     */
    protected prepareChoices() {
        const newText = this.getCurrentText();
        if (this.isValidText(newText) || (!newText && this.state.init)) {
            logger.info("prepareChoices: calcul de la liste de choix correspondant au texte", newText);
            const newChoices = this.inferNewChoices(this.state.choices, newText);

            this.handlePreviousSelectedElements();

            // mets a jour la liste des choix
            this.setChoices(newChoices, () => {
                if (newChoices.length > 0) {
                    // si il n'y a plus qu'un choix on le valide
                    this.changeSelectedChoiceWhenOneChoice(newText);
                    this.showChoices();
                }
            });
        }
    }

    /**
     * Ajoute les éléments précédemment sélectionnés dans le datasource s'ils n'y sont pas
     */
    protected handlePreviousSelectedElements() {
        // les éléments sélectionnés qui ne sont pas dans le datasource sont ajoutés.
        // PS: ne pas utiliser le dataSource.add pour éviter des rerendus
        if (this.selectedChoices.length > 0) {
            this.selectedChoices.forEach((selected) => {
                const selectedNotInDataSource = this.findElementsInDataSource(selected);
                if (selectedNotInDataSource.length === 0 && selected) {
                    this.props.dataSource.results.push(selected);
                }
            });
            this.props.dataSource.select(this.selectedChoices);
        }
    }

    /**
     * Retourne les éléments du datasource qui sont identiques à celui passé en paramètre
     * @param {any} - element : item à rechercher
     */
    protected findElementsInDataSource(element: any) {
        return this.props.dataSource && this.props.dataSource.results.filter((c) => {
            return c && element && c.value === element.value && c.text === element.text;
        });
    }
}
