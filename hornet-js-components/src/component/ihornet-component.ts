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
 * hornet-js-components - Interfaces des composants web de hornet-js
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.2.4
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import * as React from "react";

/**
 * Propriétés d'un composant graphique Hornet
 */
export interface HornetComponentProps {
    /** Référence vers le composant monté dans le DOM HTML */
    var?: (component: IHornetComponent<HornetComponentProps, any>) => {};
    children?: __React.ReactNode;
}

/**
 * Propriétés d'un composant graphique Hornet
 */
export interface HornetComponentState {
}

/**
 * Propriétés asynchrone d'un composant graphique Hornet
 */
export interface IHornetComponentAsync {
    spinner?: boolean;
    /**
     * Méthode qui permet d'afficher le spinner du composant plutot que celui de la page.
     */
    showSpinnerComponent(): void;
    /**
     * Méthode qui permet de cacher le spinner du composant plutot que celui de la page.
     */
    hideSpinnerComponent(): void;
}


export interface IHornetComponentDatasource {
    setDataSource(value: any): void;
}

export interface HornetComponentChoicesProps {
    valueKey?: string;
    labelKey?: string;
}

/**
 * Composant graphique Hornet générant un rendu HTML.
 */
export interface IHornetComponent<P extends HornetComponentProps, S extends HornetComponentProps> {

    /**
     * Méhtode appelée par le moteur de rendu lorsque le composant va être monté dans le DOM HTML pour la première fois.
     */
    componentWillMount(): void;

    /**
     * Méthode appelée par le moteur de rendu lorsque le composant vient d'être monté dans le DOM HTML pour la première fois.
     */
    componentDidMount(): void;

    /**
     * Méthode appelée par le moteur de rendu lorsque l'état interne du composant va êtr mis à jour avec les propriétés
     * et le contexte indiqués.
     * @param nextProps nouvelles propriétés
     * @param nextContext nouveau contexte
     */
    componentWillReceiveProps(nextProps: P, nextContext: any): void;

    /**
     * Méthode appelée par le moteur de rendu lorsque le rendu HTML du composant va être mis à jour suite à un changement
     * de propriétés, d'état interne ou de contexte
     * @param nextProps nouvelles propriétés
     * @param nextState nouvel état du composant
     * @param nextContext nouveau contexte
     */
    componentWillUpdate(nextProps: P, nextState: S, nextContext: any): void;

    /**
     * Méthode appelée par le moteur de rendu lorsque le rendu HTML du composant vient d'être être mis à jour suite à un changement
     * de propriétés, d'état interne ou de contexte
     * @param nextProps nouvelles propriétés
     * @param nextState nouvel état du composant
     * @param nextContext nouveau contexte
     */
    componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void;

    /**
     * Méthode appelée par le moteur de rendu lorsque le composant va être démonté du DOM HTML.
     */
    componentWillUnmount(): void;


    /**
     * Renvoie le ou les messages internationalisés correspondant à la clé indiquée, après avoir remplacé les valeurs paramétrables
     * avec celles indiquées.
     * @param keysString clé de message internationalisé
     * @param values valeurs de remplacement éventuelles
     * @returns {any} une chaîne de caractères ou un objet contenant des messages
     */
    i18n(keysString: string, values?: any): any;

}
