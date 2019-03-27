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
import { CalendarField, CalendarFieldProps,  CalendarFieldState} from "src/widget/form/calendar-field";
import * as React from "react";
import { Utils } from "hornet-js-utils";

export class CalendarAutocomplete<P extends CalendarFieldProps,
 S extends CalendarFieldState> extends CalendarField<P, S>{

    protected separator;
    protected formatLengths = [];

    constructor(props?: P, context?: any) {
        super(props, context);

        const formats = this.props.dateFormats ?
        {dateFormats: this.props.dateFormats, dateFormat: this.props.dateFormats[0]} : {};

        const calendarLocale = Utils.getCls("hornet.internationalization") ?
            {...this.i18n("calendar"), ...formats} : {formats, ...{dateFormat:"DD/MM/YYYY"}};

        if (calendarLocale.dateFormat) {
            this.getFormatValues(calendarLocale.dateFormat);
        }
    }

    protected getFormatValues(format: string) {
        const separators = ["-", "/", "."];
        for ( const cpt in separators) {
            const sep = separators[cpt];
            const index = format.indexOf(sep);
            if (index > -1) {
                this.separator = sep;
                this.formatLengths[0] = index;
                const value = format.substr(index + 1, format.length);
                this.formatLengths[1] = value.indexOf(this.separator) + index;
                this.formatLengths[2] = format.length - 2;
            }
        }
    }

    /**
     * Méthode délenchée lors d'une intéraction avec le champ input du composant Calendar
     * @param e
     */
    protected handleInputChange(e: React.SyntheticEvent<HTMLElement>): void {
        /* L'attribut DOM onChange est éventuellement aussi renseigné sur le composant */
        if (this.state.onChange) {
            this.state.onChange(e);
        }

        const input: HTMLInputElement = e.target as HTMLInputElement;

        if (input.value && !this.state.valued) {
            this.setState({valued: true});
        } else if (!input.value && this.state.valued) {
            this.setState({valued: false});
        }

        if (this.state.currentValue !== input.value) {
            this.FormatInputChange(e);
            this.setState({currentValue: input.value}, () => {
                if (this.state.onValueChange) this.state.onValueChange(this.state.currentValue);
            });
        }
    }

    /**
     * formatte le champs en ajoutant les séparateurs si nécessaire
     * @param e
     */
    protected FormatInputChange(e) {
        const value = e.target.value;
        /** Suppression des caractères : -, espace, _, . */
        if (!(value.charAt(value.length - 1 ) === this.separator)) {
            const val = value.replace(/[\D\s\._\-]+/g, "").substr(0, this.formatLengths[2]);
            const chunk = [];
            chunk.push(val.substr(0, this.formatLengths[0]));
            // >= pour ajouter le séprateur automatiquement, > pour qu'il s'ajoute après
            if (val.length > this.formatLengths[0]) {
                chunk.push(val.substr(this.formatLengths[0], this.formatLengths[1] - this.formatLengths[0]));
            }
            // >= pour ajouter le séprateur automatiquement, > pour qu'il s'ajoute après
            if (val.length > this.formatLengths[1]) {
                chunk.push(val.substr(this.formatLengths[1]));
            }
            e.target.value = chunk.join(this.separator).toUpperCase();
        }
    }

}
