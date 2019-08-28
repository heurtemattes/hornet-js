import { HornetComponent } from "src/widget/component/hornet-component";
import * as React from "react";
import * as classNames from "classnames";

import "src/widget/sass/base/_global.scss";

/**
 * Composant proposant une div cachée contenant un message d'alerte
 */
export class AlertDiv extends HornetComponent<any, any>{

    protected container;

    render(): JSX.Element {
        const classes: classNames.ClassDictionary = {};
        if (this.state.className) {
            classes[ this.state.className ] = true;
        }
        classes["hidden-alert-div"] = true;

        const divProps: any = {
            className: classNames(classes),
            id: this.props.id,
            ref: (div) => {this.container = div; }};

        return (
            <div {...divProps}>
            </div>
        );
    }

    /**
     * Change le message d'alerte
     * @param message message a afficher
     */
    setMessage(message: string) {
        if ( this.container) {
            this.container.innerHTML = "";
            if (message) {
                this.container.innerHTML = "<div role=\"alert\">" + message + "</div>";
            }
        }
    }
}
