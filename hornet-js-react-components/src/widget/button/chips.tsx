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
 * En contrepartie de l'accessibilité au code source et des droits de copie,https://portail.groupeonepoint.com/activity?week=-2
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

import kebabCase = require("lodash.kebabcase");
import { Logger } from "hornet-js-logger/src/logger";
import * as React from "react";
import { HornetComponent } from "src/widget/component/hornet-component";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import * as classNames from "classnames";
import { KeyCodes } from "hornet-js-components/src/event/key-codes";
import { SvgSprites } from "src/widget/icon/svg-sprites";

import "src/widget/button/sass/_chips.scss";
const logger: Logger = Logger.getLogger("hornet-js-components.widget.button.chips");

/**
 * Propriétés du composant Chips
 */
export interface ChipsProps extends HornetComponentProps {
    /** Identifiant unique du composant */
    id: string;
    /** libellé du composant */
    text: string;
    /** title du composant */
    title?: string;
    /** lecture seule ? */
    readOnly?: boolean;
    /** disabled ? */
    disabled?: boolean;
    /** Liste de class CSS */
    classNames?: classNames.ClassDictionary;
    /** Méthode appelée lors du click sur le bouton reset */
    handleClickReset?: Function;
    /** Méthode appelée lors du click sur le composant chips */
    handleClick?: Function;
    /** Affichage d'un icone en prefixe de la chips avec la première lettre du mot */
    withInitials?: boolean;
}

/**
 * Composant Chips
 */
export class Chips extends HornetComponent<ChipsProps, any> {

    private htmlElement: any;

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.debug("Rendu chips :", this.props.id);

        // Génération des class CSS associées
        const classes: classNames.ClassDictionary = {
            "chips-content": true,
            readonly: this.props.readOnly,
            disabled: this.props.disabled,
            ...this.props.classNames,
        };

        // Configuration du component selon les props transmises
        let props = {
            className: classNames(classes),
            id: this.props.id,
        };

        props = this.setPropIfExists(props, "title");
        props = this.setPropIfExists(props, "handleClick", "onClick");
        props["onKeyDown"] = this.handleDeleteKeyDown;
        props["onKeyUp"] = this.handleDeleteKeyUp;

        if (this.state.readOnly || this.state.disabled) {
            props["onKeyDown"] = null;
            props["onKeyUp"] = null;
            props["onClick"] = null;
        }

        props["type"] = "button";
        const classNamesText = { "chips-text": true };
        classNamesText[kebabCase("chips-text-" + this.props.text)] = true;
        props["data-real-value"] = (this.props as any).item && (this.props as any).item.value;

        return (
            <button {...props}>
                {this.props.children || null}
                {this.props.withInitials ? this.renderInitial() : null}
                <span className={classNames(classNamesText)}>{this.props.text}</span>
                {!this.props.readOnly ? this.renderResetButton() : null}
            </button>
        );
    }

    /**
     * Méthode déclenchée sur l'évenement "ENTER"
     * @param e: event
     */
    handleDeleteKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
        e.persist();
        const key: number = e.keyCode;
        if (key === KeyCodes.ENTER) {
            this.props.handleClickReset(e);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    /**
     * Méthode déclenchée sur l'évenement "SPACE" fixant le bug firefox du déclenchement double 
     * @param e: event
     */
    handleDeleteKeyUp(e: React.KeyboardEvent<HTMLElement>): void {
        e.persist();
        const key: number = e.keyCode;
        if (key === KeyCodes.SPACEBAR) {
            this.props.handleClickReset(e);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    /**
     * Méthode permettant de générer les initiales du mot à afficher
     */
    renderInitial() {
        const classNamesIcon = { "chips-icon": true };
        classNamesIcon[kebabCase("chips-icon-" + this.props.text)] = true;
        return (
            <div className={classNames(classNamesIcon)}>{this.props.text.charAt(0)}</div>
        );
    }

    /**
     * Rendu graphique du bouton reset
     * @return composant graphique
     */
    renderResetButton(): JSX.Element {

        logger.debug("Rendu bouton reset chips :", this.props.id);

        const classes: classNames.ClassDictionary = {
            "chips-reset": true,
        };
        const props = {
            className: classNames(classes)
        };

        if (!this.props.disabled) {
            props["onClick"] = this.props.handleClickReset;
        }

        return (
            <SvgSprites icon="close" classAdded={props.className} />
        );
    }

    /**
     * Setter de props
     * @param props: object de proriétés
     * @param prop: clé de props à chercher
     * @param prop: clé de props à intégrer
     */
    setPropIfExists(props, propKey, newPropKey?): any {
        if (this.props[propKey]) {
            props[newPropKey || propKey] = this.props[propKey];
        }
        return props;
    }
}
