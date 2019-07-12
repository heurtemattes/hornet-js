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
import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";
import { Notification } from "src/widget/notification/notification";
import { AbstractField } from "src/widget/form/abstract-field";
import { AbstractForm, AbstractFormProps } from "src/widget/form/abstract-form";
import { UploadFileField } from "src/widget/form/upload-file-field";
import { FormUtils } from "src/widget/form/form-utils";
import { DomAdapter } from "src/widget/form/dom-adapter";
import { AutoCompleteField, AutoCompleteFieldProps } from "src/widget/form/auto-complete-field";
import {
    INotificationType,
    Notifications,
    NotificationManager,
} from "hornet-js-core/src/notification/notification-manager";
import { CheckBoxField } from "src/widget/form/checkbox-field";
import { IValidationResult, ICustomValidation, DataValidator } from "hornet-js-core/src/validation/data-validator";
import classNames from "classnames";
import * as _ from "lodash";
import * as ajv from "ajv";
import ErrorObject = ajv.ErrorObject;
import { SelectField } from "src/widget/form/select-field";
import { ButtonsArea } from "src/widget/form/buttons-area";
import { HornetEvent } from "hornet-js-core/src/event/hornet-event";
import { VALUE_CHANGED_EVENT } from "src/widget/form/event";
import { HTML_ATTRIBUTES } from "src/widget/form/html-attributes";

import "src/widget/form/sass/_form-entities.scss";

const logger: Logger = Logger.getLogger("hornet-js-react-components.widget.form.form");

/**
 * Propriétés du formulaire hornet.
 */
export interface FormProps extends AbstractFormProps {
    /** Identifiant du formulaire */
    id: string;
    /** Nom du formulaire */
    name?: string;
    /** Fonction déclenchée lors de la soumission du formulaire, avant la validation */
    onBeforeSubmit?: (data: any) => void;
    /** Fonction déclenchée lors de la soumission du formulaire, lorsque celui-ci est valide */
    onSubmit?: (data: any) => void;
    /** Fonction déclenchée lors de la modification d'un champ du formulaire */
    onFormChange?: React.FormEventHandler<HTMLElement>;
    /** Lorsque mis à true, le message d'information concernant les champs obligatoires est masqué.
     * Ignoré lorsque markRequired est à false car le message n'a pas lieu d'être affiché. */
    isMandatoryFieldsHidden?: boolean;
    /** Sous-titre éventuel */
    subTitle?: string;
    /** Texte descriptif éventuel */
    text?: string;
    /** langue du texte descriptif */
    textLang?: string;
    /** Nom de la classe CSS à affecter au formulaire. */
    className?: string;
    /** Lorsqu'égal à false, les libellés des champs obligatoires ne sont pas marqués avec un astérisque */
    markRequired?: boolean;
    /** Path permettant de surcharger les pictogrammes/images **/
    imgFilePath?: string;
    /** Schema JSON de validation */
    schema?: any;
    /** Options de validation ajv (cf. http://epoberezkin.github.io/ajv/#options) */
    validationOptions?: ajv.Options;
    /** Messages spécifiques à ce formulaire : utilisés pour la génération des messages d'erreur de validation */
    formMessages?: any;
    /**
     * Valideurs customisés : permettent d'implémenter et de chaîner des règles de validation difficiles à mettre
     * en oeuvre simplement avec un schéma json-schema. Ils sont appliqués après la validation basée sur le schéma
     * de validation, donc les données du formulaire ont déjà éventuellement bénéficié de la coercition de types. */
    customValidators?: ICustomValidation[];
    /** Données initiales du formulaire */
    defaultValues?: any;
    /** Identifiant du groupe de notifications auquel seront rattachées les notifications d'erreurs de validation
     * de ce formulaire */
    notifId?: string;
    /** Lorsqu'égal à true, les boutons de validation ne sont pas affichés */
    hideButtons?: boolean;
    // Ignorer ou non les informations non valorisées du formulaire
    omitNull?: boolean;
    /* Ajoute ou non la classe sticky au formulaire */
    isSticky?: boolean;
    /* d de la zone de bouton sticky au formulaire */
    buttonAreaIdSticky?: string;
    /* id du footer pour gérer la visibilité de la zone de bouton sticky au formulaire */
    footerId?: string;
}

/**
 * Composant permettant de rendre un formulaire Hornet de manière standardisée
 */
export class Form extends AbstractForm<FormProps, any> {

    static idx = 0;

    protected debouncedValidateAndSubmit: any;

    /** Valeur de propriétés par défaut */
    static defaultProps: FormProps = _.assign(_.cloneDeep(AbstractForm.defaultProps), {
        markRequired: true,
        isMandatoryFieldsHidden: false,
        subTitle: null,
        className: "formRecherche",
        customValidators: [],
        validationOptions: DataValidator.DEFAULT_VALIDATION_OPTIONS,
        omitNull: true,
        isSticky: false,
        buttonAreaIdSticky: "button-container",
        footerId: "footer-container",
    });

    constructor(props?: FormProps, context?: any) {
        super(props, context);

        let calendarLocale = this.i18n("calendar");
        if (calendarLocale == null) {
            calendarLocale = {};
        }

        /* Messages génériques */
        /* Configuration locale des calendriers et dates */
        this.state = {
            ...this.state,
            calendarLocale,
            customNotif: props.notifId != null,
            notifId: props.notifId != null ? props.notifId : "Form-" + (Form.idx++),
        };

        this.listen(VALUE_CHANGED_EVENT, (ev: HornetEvent<any>) => {
            const isEventContainsForm : boolean = ev && ev.detail && ev.detail.form;
            if (isEventContainsForm && ev.detail.form.id === this.state.id && this.state.onFormChange) {
                this.state.onFormChange();
            }
        });
    }

    // Setters (pas de setter sur defaultValues, car cette propriété sert uniquement lors du montage initial du composant

    setName(value: string, callback?: () => any): this {
        this.setState({ name: value }, callback);
        return this;
    }

    setOnSubmit(handler: (data: any) => void, callback?: () => any): this {
        this.setState({ onSubmit: handler }, callback);
        return this;
    }

    setOnFormChange(handler: React.FormEventHandler<HTMLElement>, callback?: () => any): this {
        this.setState({ onFormChange: handler }, callback);
        return this;
    }

    setIsMandatoryFieldsHidden(value: boolean, callback?: () => any): this {
        this.setState({ isMandatoryFieldsHidden: value }, callback);
        return this;
    }

    setSubTitle(value: string, callback?: () => any): this {
        this.setState({ subTitle: value }, callback);
        return this;
    }

    setText(value: string, callback?: () => any): this {
        this.setState({ text: value }, callback);
        return this;
    }

    setClassName(value: string, callback?: () => any): this {
        this.setState({ className: value }, callback);
        return this;
    }

    setMarkRequired(value: boolean, callback?: () => any): this {
        this.setState({ markRequired: value }, callback);
        /* Propagation de la propriété aux champs Hornet appartenant à ce formulaire */
        this.updateMarkRequiredFields(value);
        return this;
    }

    setImgFilePath(value: string, callback?: () => any): this {
        this.setState({ imgFilePath: value }, callback);
        /* Propagation de la propriété aux champs Hornet appartenant à ce formulaire */
        this.updateImagFilePathFields(value);
        return this;
    }

    setSchema(value: any, callback?: () => any): this {
        this.setState({ schema: value }, callback);
        return this;
    }

    setValidationOptions(value: ajv.Options, callback?: () => any): this {
        this.setState({ validationOptions: value }, callback);
        return this;
    }

    setFormMessages(value: any, callback?: () => any): this {
        this.setState({ formMessages: value }, callback);
        return this;
    }

    setCustomValidators(value: ICustomValidation[], callback?: () => any): this {
        this.setState({ customValidators: value }, callback);
        return this;
    }

    setNotifId(value: string, callback?: () => any): this {
        if (value != null) {
            this.setState({ notifId: value, customNotif: true }, callback);
        } else {
            this.setState({ notifId: "Form-" + (Form.idx++), customNotif: false }, callback);
        }
        return this;
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        window.removeEventListener("scroll", this.handleScroll);
        NotificationManager.clean(this.state.notifId, this.state.id);
        if (this.formElement) {
            this.formElement["__component"] = null;
        }
    }

    componentDidMount(): void {
        super.componentDidMount();
        window.addEventListener("scroll", this.handleScroll);
        /* On évite la soumission intempestive du formulaire en cas de clics répétés ou de touche entrée maintenue
         sur le bouton de soumission*/
        this.debouncedValidateAndSubmit = _.debounce(this.validateAndSubmit, 500);
        if (this.state.defaultValues) {
            this.updateFields(this.state.defaultValues);
        }
        if (!this.isOneRequired(this.state.children)) {
            this.setMarkRequired(false);
        }
    }

    /**
     * Met à jour la propriété markRequired sur chacun des champs héritant de AbstractField contenus dans le formulaire
     * @param isMarkRequired valeur à assigner à la propriété 'markRequired'
     * @return ce formulaire
     */
    protected updateMarkRequiredFields(isMarkRequired: boolean): this {
        const fields: { [key: string]: DomAdapter<any, any> } = this.extractFields();
        /* Met à jour l'affichage de chaque champ en cas de readOnly*/
        Object.keys(fields).every(function (key: string): boolean {
            const field: DomAdapter<any, any> = fields[key];
            if (field instanceof AbstractField) {
                (field as AbstractField<any, any>).setMarkRequired(isMarkRequired);
            }
            return true;
        });
        return this;
    }

    /**
     * Met à jour la propriété imgFilePath sur chacun des champs héritant de AbstractField contenus dans le formulaire
     * @param imgFilePath valeur à assigner à la propriété 'imgFilePath'
     * @return ce formulaire
     */
    protected updateImagFilePathFields(imgFilePath: string): this {
        const fields: { [key: string]: DomAdapter<any, any> } = this.extractFields();
        Object.keys(fields).forEach(function (key: string): void {
            const field: DomAdapter<any, any> = fields[key];
            if (field instanceof AbstractField && this.state.imgFilePath) {
                field.setImgFilePath(imgFilePath);
            }
        });
        return this;
    }

    /**
     * Met à jour les valeurs courantes des champs du formulaire
     * @param {any} data données du formulaire (clé : nom du champ -> valeur du champ)
     * @param {boolean} partial si true alors on n'écrase pas les champs qui ne sont présents dans data. False par défaut
     */
    updateFields(data: any, partial: boolean = false): void {
        const fields = this.extractFields();
        this.propagateParentState();
        Object.keys(fields).forEach((fiedName) => {
            const fieldNewValue = _.get(data, fiedName);
            const field = fields[fiedName];
            if (fieldNewValue != null && fiedName && field) {
                field.setCurrentValue(fieldNewValue);
                if (field instanceof CheckBoxField) {
                    field.setCurrentChecked(fieldNewValue as boolean);
                } else if (field instanceof SelectField || field instanceof AutoCompleteField) {
                    field.setCurrentValue(this.inferAutoCompleteAndSelectFieldValue(field, fieldNewValue));
                } else if (field.state.choices && (this.state.readOnly || field.state.readOnly)) {
                    // Traitement des champs radio et select en mode readOnly
                    field.setCurrentValue(this.inferRadioFieldAndSelectReadOnlyValue(field, fieldNewValue));
                }
            } else if (fieldNewValue == null && !partial) {
                field.setCurrentValue(null);
                if (field instanceof CheckBoxField) {
                    field.setCurrentChecked(false);
                }
            }
        });
    }

    /**
     * Calcule la value du field passé en paramètre. Le field est soit un RadioField soit un SelectField readOnly
     * @param {any} field
     * @param {any} fieldValue
     * @returns {any} la valeur du field
     */
    protected inferRadioFieldAndSelectReadOnlyValue(field: any, fieldValue: any): any {
        let value;
        field && field.state && field.state.dataSource && field.state.dataSource.forEach((item) => {
            if (fieldValue && item && fieldValue.toString() === item[field.state.valueKey]) {
                value = item[field.state.valueKey];
            }
        });
        return value;
    }

    /**
     * Calcule la value du field passé en paramètre. Ce field est soit un Autocomplete ou un Select
     * @param {any} field
     * @param {any} fieldValue
     * @returns {any} la value de l'autocomplete
     */
    protected inferAutoCompleteAndSelectFieldValue(field: any, fieldValue: any): any {
        if (!field || !field.state) {
            return null;
        }
        if (!(fieldValue instanceof Array)) {
            return fieldValue;
        }

        const values = [];
        const source = field.state.multiple ? field.state.allChoices : field.state.dataSource;

        source && source.forEach((item) => {
            fieldValue && fieldValue.forEach((c) => {
                if (field.state.multiple && item && item["value"] && c && c.toString() === item["value"].toString()) {
                    values.push(item["value"]);
                } else if (!field.state.multiple && item && c && c.toString() === item[field.state.valueKey]) {
                    values.push(item[field.state.valueKey]);
                }
            });
        });
        return values;
    }

    /**
     * Traitement spécifique des notifications concernant les champs d'autocomplétion
     * @param fields champs du formulaire
     * @param notifs notifications d'erreurs de validation
     */
    protected processAutocompleteErrors(fields: { [key: string]: DomAdapter<any, any> }, notifs: Notifications): void {
        const processedNotifs: Array<INotificationType> = notifs.getNotifications().map(
            function (notif: INotificationType): INotificationType {
                /* Parcours de tous les champs */
                Object.keys(fields).every(function (key: string): boolean {
                    const field: DomAdapter<any, any> = fields[key];
                    if (field instanceof AutoCompleteField) {
                        const autoField: AutoCompleteField<AutoCompleteFieldProps> = field as AutoCompleteField<AutoCompleteFieldProps>;
                        /* La notification référence le nom global du champ d'auto-complétion
                         ou bien le champ caché contenant la valeur :
                         on modifie cette référence pour pointer vers le champ de saisie libre */
                        if (notif.field === autoField.state.name ||
                            notif.field === (autoField.getValueFieldName())) {
                            notif.field = autoField.getFreeTypingFieldName();

                            /* Fin de la boucle de parcours des auto-complete */
                            return false;
                        }
                    }
                    return true;
                }, this);
                return notif;
            }, this);
        notifs.setNotifications(processedNotifs);
    }

    /**
     * Déclenche les notifications correspondant aux éventuelles erreurs de validation
     * @param errors erreurs de validation de formulaire, éventuellement vides
     */
    protected notifyErrors(errors: Array<ErrorObject>): void {
        if (errors) {
            const fieldsMessages = this.state.formMessages && this.state.formMessages.fields;
            const genericValidationMessages = this.i18n("form.validation");
            const fields: { [key: string]: DomAdapter<any, any> } = this.extractFields();

            const notificationsError: Notifications = FormUtils.getErrors(errors, fields, fieldsMessages, genericValidationMessages);

            /* Post-traitement des notifications concernant les champs d'autocomplétion */
            this.processAutocompleteErrors(fields, notificationsError);

            /* Met à jour les erreurs affichées par chaque composant champ */
            Object.keys(fields).every(function (key: string): boolean {
                const field: DomAdapter<any, any> = fields[key];
                if (field instanceof AbstractField) {
                    field.setErrors(notificationsError.getNotifications());
                }
                return true;
            });

            /* Emission des notifications */
            NotificationManager.notify(this.state.notifId, this.state.id, notificationsError);
        }
    }

    /**
     * Transforme les valeurs des champs déclarés avec le format "date-time" dans le schéma de validation :
     * effectue la conversion depuis la locale courante, vers le format ISO 8601. Ceci permet une validation isomorphique
     * côté client comme serveur en utilisant le même schéma, et la conversion automatique en objet Date côté backend REST
     * reste possible.
     * @param schema schéma de validation JSON-Schema
     * @param data données de formualaire
     */
    protected transformDatesToISO(schema: any, data: any): void {
        if (schema && schema.properties && data) {
            const propNames: string[] = Object.keys(schema.properties);
            let property: any, propName: string;
            for (let i: number = 0; i < propNames.length; i++) {
                propName = propNames[i];
                property = schema.properties[propName];
                if (property.type === "object") {
                    /* Appel récursif sur les éventuelles propriétés incluses dans le sous-schéma */
                    this.transformDatesToISO(property, data[propName]);
                } else if (property.format === "date-time") {
                    if (data[propName]) {
                        const date: Date = Utils.dateUtils.parseInTZ(
                            data[propName], this.state.calendarLocale.dateFormat, this.state.calendarLocale.timeZone);
                        if (date) {
                            /* La chaîne de caractères est une date valide pour la locale : on convertit en représentation ISO 8601.*/
                            data[propName] = date.toISOString();
                        }
                        /* Sinon la valeur incorrecte est conservée*/
                    }
                }
            }
        }
    }

    /**
     * Déclenche la validation du formulaire, notifie les erreurs éventuelles et exécute la fonction
     * onSubmit présente dans les propriétés s'il n'y a pas d'erreurs
     *
     */
    public validateAndSubmit() {
        if (this.formElement) {
            logger.trace("Validation et envoi du formulaire");

            const data = this.extractData(this.state.omitNull);
            const schema = DataValidator.transformRequiredStrings(this.state.schema);

            const validationRes: IValidationResult = this.getValidationResult(schema, data);

            if (!validationRes.valid) {
                this.notifyErrors(validationRes.errors);
            } else {
                this.cleanFormErrors();
                if (this.state.onSubmit) {
                    this.transformDatesToISO(schema, data);
                    this.state.onSubmit(data);
                }
            }
        }
    }

    /**
     * Retourne le résultat de la validation et ses éventuelles erreurs
     * @param schema : schéma de validation, par défaut celui du formulaire
     * @param data: data extraites du formulaire à valider
     */
    public getValidationResult(schema = DataValidator.transformRequiredStrings(this.state.schema), dataTovalidate?: any)
        : IValidationResult {
        const data = dataTovalidate || this.extractData(this.state.omitNull);
        if (this.state.onBeforeSubmit) {
            this.state.onBeforeSubmit(data);
        }
        const options: ajv.Options = this.state.validationOptions;
        this.transformDatesToISO(schema, data);
        return new DataValidator(schema, this.state.customValidators, options).validate(data);
    }

    /**
     * Déclenche une validation du formulaire basée sur un schéma précis ou celui défini pour le formulaire
     * @param schema : schéma de validation, par défaut celui du formulaire
     */
    public validate(notifyErrors: boolean, schema = DataValidator.transformRequiredStrings(this.state.schema), cleanErrors?: boolean): boolean {
        if (cleanErrors) {
            this.cleanFormErrors();
        }
        const validation: IValidationResult = this.getValidationResult(schema);
        if (notifyErrors && !validation.valid) {
            this.notifyErrors(validation.errors);
        }
        return validation.valid;
    }

    /**
     * Supprime les nofifications d'erreurs et les erreurs associées à chaque champ de ce formulaire
     */
    cleanFormErrors(): void {
        const fields: { [key: string]: DomAdapter<any, any> } = this.extractFields();
        for (const fieldName in fields) {
            const field: DomAdapter<any, any> = fields[fieldName];
            if (field instanceof AbstractField) {
                (field as AbstractField<any, any>).setErrors(null);
            }
        }
        NotificationManager.clean(this.state.notifId, this.state.id);
    }

    /**
     * Met à jour les valeurs courantes des champs du formulaire et
     * supprime les nofifications d'erreurs et les erreurs associées à chaque champ de ce formulaire
     * @param data données du formulaire (clé : nom du champ -> valeur du champ)
     * @param {boolean} partialUpdate si true alors on n'écrase pas les champs qui ne sont présentes
     * dans data au moment du update. False par défaut
     */
    updateFieldsAndClean(data: any, partialUpdate: boolean = false) {
        this.updateFields(data, partialUpdate);
        this.cleanFormErrors();
    }

    /**
     * Méthode permettant d'alimenter le bloc Notifications d'erreurs puis de déléguer l'évent au composant parent
     * @param e
     *
     */
    protected _submitHornetForm(e: React.SyntheticEvent<HTMLElement>): void {
        /* e.preventDefault ne doit pas être 'débouncée', sinon la soumission par défaut du formulaire serait effectuée */
        e.preventDefault();

        this.debouncedValidateAndSubmit();
    }

    /** @override */
    protected propagateParentState(): void {
        /* Le composant parent se charge de propager les propriétés readOnly et disabled */
        super.propagateParentState();
        const fields: { [key: string]: DomAdapter<any, any> } = this.extractFields();
        Object.keys(fields).forEach(function (key: string): void {
            const field: DomAdapter<any, any> = fields[key];
            if (field instanceof AbstractField) {
                (field as AbstractField<any, any>).setMarkRequired(this.state.markRequired);
                if (this.state.imgFilePath) {
                    (field as AbstractField<any, any>).setImgFilePath(this.state.imgFilePath);
                }
            }
        }, this);
    }

    /** @override */
    protected extractFields(): { [key: string]: DomAdapter<any, any> } {
        const fields: { [key: string]: DomAdapter<any, any> } = {};
        if (this.formElement) {
            for (let index = 0; index < this.formElement.elements.length; index++) {

                const item: Element = this.formElement.elements[index];
                if (item["name"]) {
                    if (item["__component"]) {
                        fields[item["name"]] = item["__component"];
                    } else {
                        if (fields[item["name"]]) {
                            fields[item["name"]].addHtmlElement(item);
                        } else {
                            fields[item["name"]] = new DomAdapter<any, any>();
                            fields[item["name"]].registerHtmlElement(item);
                        }
                    }
                }
            }
        }
        return fields;
    }

    /**
     * Méthode permettant de déterminer si le formulaire dispose d'un champ de type UploadFileField
     * Dans ce cas, on ajoute la propriété ["encType"] = "multipart/form-data" au formulaire
     * @param items
     * @returns {boolean}
     */
    protected isMultiPartForm(items: Array<React.ReactChild>): boolean {

        let isMultiPart: boolean = false;

        React.Children.map(items, (child: React.ReactChild) => {
            if (!isMultiPart) {
                if (child != null) {
                    if (child["props"] && child["props"].children) {
                        isMultiPart = this.isMultiPartForm(child["props"].children);
                    }
                    if (!isMultiPart && (child as React.ReactElement<any>).type === UploadFileField) {
                        isMultiPart = true;
                    }
                }
            }
        });

        return isMultiPart;
    }

    /**
     * Méthode permettant de déterminer s'il y a au moins un champ requis.
     * @param items
     * @returns {boolean}
     */
    protected isOneRequired(items: Array<React.ReactChild>): boolean {
        return true;
    }

    getHtmlProps(): any {
        /* On n'inclut pas les propriétés spécifiques qui ne concernent pas un champ HTML standard */
        const htmlProps: any = { name: "" };
        for (const key in this.state) {
            if (key in HTML_ATTRIBUTES) {
                htmlProps[key] = this.state[key];
            }
        }

        this.processHtmlProps(htmlProps);
        return htmlProps;
    }

    processHtmlProps(state: any): void {
        if (state) {

            /* Si l'id n'est pas explicitement spécifié, on lui affecte la même valeur que le nom, car il sera utilisé
             * comme ancre pour les messages d'erreur de validation */
            if (state.name && !state.id) {
                state.id = state.name;
            }
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        const classes = {
            form: true,
            clear: true,
            /* Application du style CSS readonly à tout le bloc lorsque tous les champs sont en lecture seule */
            readonly: this.state.readOnly,
        };

        logger.debug("Form render : ", this.state.id);

        let customNotif = null;
        if (!this.state.customNotif) {
            customNotif = (<Notification id={this.state.notifId} />);
        }

        /* La validation de formulaire HTML 5 est désactivée (noValidate="true") :
         on s'appuie uniquement sur la validation à la soumission et on a ainsi un rendu cohérent entre navigateurs. */

        const formProps = {
            id: this.state.id,
            name: this.state.name,
            className: this.state.className,
            method: "post",
            onSubmit: this._submitHornetForm,
            noValidate: true,
            onChange: this.state.onFormChange ? this.state.onFormChange : undefined,
            ref: this.registerForm,
        };

        let formClass = 'form-content';

        if (this.isMultiPartForm(this.state.children)) {
            formProps["encType"] = "multipart/form-data";
        }

        if(this.state.isSticky) {
            formClass += ' form-content-sticky'
        }

        const textHtmlProps = {
            lang: this.props.textLang ? this.props.textLang : null,
        };

        const htmlProps = _.cloneDeep(this.getHtmlProps);
        return (
            <section id="form-content" className={formClass}>
                {customNotif}
                <div className={classNames(classes)}>
                    <form  {...htmlProps}{...formProps}>
                        {(this.state.subTitle || this.state.text
                            || (this.state.markRequired && !this.state.isMandatoryFieldsHidden)) ?
                            <div className="form-titles">
                                {this.state.subTitle ? <h3 className="form-soustitre">{this.state.subTitle}</h3> : null}
                                {this.state.text ?
                                    <p className="form-texte" {...textHtmlProps}>{this.state.text}</p> : null}
                                {this.state.markRequired && !this.state.isMandatoryFieldsHidden ?
                                    <p className="discret">{this.i18n("form.fillField")}</p> : null}
                            </div>
                            : null}
                        {(this.state.children) ?
                            <div className="form-content">
                                <div>
                                    {this.state.children}
                                </div>
                            </div>
                            : null}
                    </form>
                </div>
            </section>
        );
    }

    /**
     * retourne un tableau de bouton pour la validation du formulaire
     * @param children
     * @returns {Array<any>}
     */
    protected getButtonsArea(children): Array<any> {
        const tableauButtonsArea: Array<any> = [];
        React.Children.map(children, function (child: any) {
            if (child.type === ButtonsArea) {
                tableauButtonsArea.push(child);
            }
        });
        return tableauButtonsArea;
    }

    /**
     * Métohde de gestion du scroll à l'écran
     */
    protected handleScroll() {

        if(this.state.isSticky) {
            let footer = document.getElementById(this.props.footerId);

            let rect = footer.getBoundingClientRect();
            let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            
            //gestions des boutons & du formulaire
            let form = document.getElementById("form-content");
            let buttonsArea = document.getElementById(this.props.buttonAreaIdSticky);
            
            if(buttonsArea) {
                let buttonsRect = buttonsArea.getBoundingClientRect();
                let buttonHeight = buttonsRect.height;
        
                //sauvegarde la taille visible du footer
                let height = -(rect.top - viewHeight);
                this.setState({ size: height });
        
                /*si le footer est visible, le composant s'affichera au dessus de celui-ci*/
                let visible: boolean = false;
                if (footer) {
                    visible = this.checkvisible(footer);
        
                    // Si un formulaire sticky est présent
                    if(form && form.classList.contains('form-content-sticky')) {
                        // gestion des boutons si footer visible
                        if(visible) {
                            // change la classe de la div contenant les boutons
                            buttonsArea.classList.replace('button-area-isFixed', 'button-area-isSticky');
                        } else {
                            buttonsArea.classList.replace('button-area-isSticky', 'button-area-isFixed');
                        }
            
                        // ajoute le positionnement bottom sur les boutons sticky
                        buttonsArea.classList.contains('button-area-isSticky') 
                            ? buttonsArea.style.bottom = `-${buttonHeight}px`
                            : buttonsArea.style.bottom = `0`;
                    }
                }        
            }
        }
    }

        /**
     * Calcule si un élément est présent ou non a l'écran
     * @param {Element} elm - l'élément a rechercher
     * @return {boolean} true si l'élément est présent
     */
    protected checkvisible(elm) {
        let rect = elm.getBoundingClientRect();
        let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

        //sauvegarde la la taille visible de l'élément
        let height = -(rect.top - viewHeight) + 40;
        this.setState({ size: height });

        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

}
