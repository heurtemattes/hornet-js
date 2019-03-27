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

import * as React from "react";

import {
    AbstractField,
    HornetClickableProps,
    AbstractFieldProps,
} from "src/widget/form/abstract-field";
import * as _ from "lodash";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as classNames from "classnames";
import KeyboardEventHandler = __React.KeyboardEventHandler;

const logger: Logger = Utils.getLogger("hornet-js-react-components.widget.checkbox-field");

export interface SwitchFieldProps extends AbstractFieldProps, HornetClickableProps{
    datas? : any;
    valueKey?: string;
    labelKey?: string;
    defaultValue?: any;
    inputClassName?: string;
    labelClassName?: string;
    onKeyDown?: KeyboardEventHandler<HTMLElement>;
}

/**
 * Champ de formulaire Hornet de type Switch
 */
export class SwitchField extends AbstractField<SwitchFieldProps, any> {

    public readonly props: Readonly<SwitchFieldProps>;
    public state: any;

    static defaultProps = _.assign(_.cloneDeep(AbstractField.defaultProps), {
        labelKey: "label",
        valueKey: "value",
        readOnly: false,
        disabled: false});

    constructor(props?: SwitchFieldProps, context?: any) {
        super(props, context);

        if (props.readOnly) {
            // permet de désactiver le click lorsqu'uniquement readOnly par défaut
            this.copyInitialPropsToState({ readOnly: true, disabled: true } as any, this.state);
        }

        // par defaut le choix sélectionner sera le premier de la liste
        let selected = null;
        if (this.props.defaultValue) {
            selected = this.props.defaultValue;
        }

        this.state = {
            ...this.state,
            id: (!this.state.id) ? this.state.name : this.state.id,
            selected,
            currentValue: selected,
            items: this.props.datas,
        };

    }

    /**
     * Génère le rendu spécifique du champ
     * @returns {JSX.Element} rendu
     * @override
     */
    renderWidget(): JSX.Element {

        const className: ClassDictionary = {
            "has-error": this.hasErrors(),
            "switch-container": true,
        };

        if (this.props.className) {
            className[ this.props.className ] = true;
        }


        const toggleProps = {
            disabled: this.state.disabled,
            readOnly: this.state.readOnly,
            className: classNames(className),
            id: this.state.id,
            name: this.state.name};

        const hasItems = this.state.items && this.state.items.length && this.state.items.length > 0;

        return(
            <div {...toggleProps} >
                <fieldset className="switch-fieldset">
                    <div className="switch-toggle">
                        {hasItems ?
                         this.state.items.map((data) => {
                            return this.renderOptionInput(data);
                        }) : null}
                        { hasItems ?
                         this.state.items.map((data, index) => {
                            return this.renderOptionLabel(data, index);
                        }) : null}
                    </div>
                </fieldset>
            </div>
        );
    }

    /**
     * rendu d'une option
     * @param {any} option otpion à afficher
     * @returns {JSX.Element} input de l'option
     */
    renderOptionInput(option: any): JSX.Element {
        const inputClassName = this.props.inputClassName ?
            this.props.inputClassName + " switch-option-input" : "switch-option-input";

        return(
            <React.Fragment>
                <input
                    id={this.state.id + "-" + option[this.state.valueKey]}
                    type="radio"
                    name={this.state.name}
                    onClick={() => this.handleClick(option)}
                    onKeyDown={() => this.handleKeyDown(option)}
                    onChange={this.handleChange}
                    checked={this.shouldRadioBeChecked(option)}
                    defaultChecked = {false}
                    readOnly={this.state.readOnly}
                    disabled={this.state.disabled}
                    className={inputClassName}
                    ref={(elt) => this.registerHtmlElement(elt)}
                />
            </React.Fragment>
        );
    }

    /**
     * rendu d'une option
     * @param {any} option otpion à afficher
     * @returns {JSX.Element} label de l'option
     */
    renderOptionLabel(option: any, index: number): JSX.Element {

        const labelClassName = this.props.labelClassName ?
            this.props.labelClassName + " switch-option-label" : "switch-option-label";

        const style = this.getLabelStyle(option, index);

        return(
            <React.Fragment>
                <label htmlFor={this.state.id + "-" + option[this.state.valueKey]}
                className={labelClassName}
                title={option[this.state.labelKey]}
                style={style.style}>
                    {index === 0 && this.state.selected !== null ? <div className="switch-label-before" style={style.before}/> : null}
                        {option[this.state.labelKey]}
                    <div className="switch-label-after" style={style.after}> {option[this.state.labelKey]} </div>
                </label>
            </React.Fragment>
        );
    }

    /**
     * renvoie le style de l'option
     * sous la forme {style: any, before: any, after: any}
     * pour le style du label, le style du before label et le style du after label
     * @param option option à styliser
     * @param index index de l'option parmis les choix
     * @returns {JSX.Element} style de l'option
     */
    public getLabelStyle(option: any, index: number) : any {
        const selected = this.shouldRadioBeChecked(option);

        const width = 100 / (this.state.items.length);
        const styleWidth = width + "%";

        const left = width * this.getSelectedIndex() ;
        const styleLeft = left + "%" ;

        const beforeStyle = { width: styleWidth, left: styleLeft};

        const opacity = selected ? 1 : 0;
        const afterstyle = { width: styleWidth, left: styleLeft, opacity };

        const style = {width: styleWidth};

        return {after: afterstyle, before: beforeStyle, style};
    }

    /**
     * retourne l'index du choix sélectionné dans les items
     * @returns {JSX.Element} index du choix sélectionné, -1 si non présent dans la liste
     */
    private getSelectedIndex() : number {
        if (this.state.items && this.state.items.length && this.state.items.length > 1 && this.state.selected) {
            for ( let i = 0 ; i < this.state.items.length ; i++ ) {
                if (this.state.selected && this.state.items[i][this.props.valueKey] === this.state.selected[this.props.valueKey]) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * indique si le choix doit etre sélectionné ou non
     * @param {any} choice choix a tester
     * @returns {Boolean} choix sélectionné ou non
     */
    private shouldRadioBeChecked(choice: any) : boolean {
        if (this.state.selected !== undefined && this.state.selected != null) {
            return this.state.selected && choice[this.props.valueKey] === this.state.selected[this.props.valueKey];
        } else {
            return false;
        }
    }

    /**
     * Appelée au changement de valeur
     * @param {React.ChangeEvent<HTMLElement>} event evennement
     */
    private handleChange(event: React.ChangeEvent<HTMLElement>) : void {
        if (this.props.onChange) this.props.onChange(event);
    }

    /**
     * Appelée lors d'un click ou d'un key down sur l'item
     * @param {any} item choix sur lequel l'evennement à été éffectué
     */
    private handleClick(item: any): void {
        if (item && this.state.selected && item[this.props.valueKey] === this.state.selected[this.props.valueKey]){
            this.setState({ selected: null, currentValue: null });
        }else {
            this.setState({ selected: item, currentValue: item });
        }
        if (this.props.onClick) this.props.onClick(item);
    }

    /**
     * Appelée lors d'un key down sur l'item
     * @param {any} item choix sur lequel l'evennement à été éffectué
     */
    private handleKeyDown(item: any): void {
        if (this.props.onKeyDown) this.props.onKeyDown(item);
    }

    /**
     * modifier les choix
     * @param {any[]} items choix à modifier
     */
    setItems(items: any[]) : void {
        this.setState({ items: _.cloneDeep(items),
        selected: null,
        currentValue: null,
     });
    }

    /**
     * ajoute des choix
     * @param {any[] | any} items choix à ajouter
     */
    addItems(items : any[] | any) : void {
        let newItems = _.cloneDeep(this.state.items);
        const selected = this.state.selected;
        if (!newItems || newItems.length && newItems.length === 0) {
            newItems = [];
        }
        if (Array.isArray(items)) {
            for ( let i = 0 ; i < items.length ; i ++) {
                newItems.push(items[i]);
            }
        }else {
            newItems.push(items);
        }
        this.setState({ items: newItems, selected });
    }

    /**
     * Supprime des choix
     * @param {any[] | any} items valeurs à supprimer
     */
    deleteItems(items: any[] | any) : void {
        const newItems = _.cloneDeep(this.state.items);
        for ( let i = 0 ; i < items.length ; i ++) {
            for ( let j = 0 ; j < newItems.length ; j ++) {
                if (items[i][this.props.valueKey] === newItems[j][this.props.valueKey]){
                    newItems.splice(j, 1);
                }
            }
        }
        const selected = null;
        this.setState({items: newItems,
            selected,
            currentValue: selected,
        });
    }

    /**
     * Modifie la valeur courrante
     * @param {any} item valeur
     */
    setCurrentValue(item: any) : this {
        this.setState({ selected: item, currentValue: item});
        return this;
    }

    /**
     * retourne la valeur courrante
     * @param removeEmptyStrings indique si les chaine vide doivent etre retournée comme null
     * @returns {any} current value ou null
     */
    getCurrentValue(removeEmptyStrings: boolean = true): any {
        let currentValue = this.state.currentValue;
        if (!removeEmptyStrings && this.props.nullable && currentValue === "") {
            currentValue = null;
        }
        return currentValue;
    }

}
