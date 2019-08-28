import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { Decorators } from "hornet-js-test/src/decorators";

import { Utils } from "hornet-js-utils";
Utils.setConfigObj({});

import { Icon } from "src/widget/icon/icon";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import * as React from "react";
import { ButtonInfoAccessibilite } from "src/widget/button/button-info-accessibilite";

let iconElement: JSX.Element;
let element;

@Decorators.describe("Test Karma Icon")
class IconTest extends BaseTest {
    @Decorators.beforeEach
    beforeEach() {
        iconElement = (
            <div>
                <Icon
                    title={"Icon1"}
                    action={this.monAction}
                    alt={"Icon1"}
                    url={"#"}
                    src={ButtonInfoAccessibilite.genUrlTheme() + "/img/button/icon_info.svg"}
                />
                <Icon
                    title={"Icon2"}
                    alt={"Icon2"}
                    src={ButtonInfoAccessibilite.genUrlTheme() + "/img/button/icon_info.svg"}
                />
                 <Icon
                    title={"Icon3"}
                    alt={"Icon3"}
                    url={"monTest"}
                    src={ButtonInfoAccessibilite.genUrlTheme() + "/img/button/icon_info.svg"}
                />
            </div>
        );
    }

    @Decorators.it("Contrôle du DOM")
    testOk() {
        element = this.renderIntoDocument(iconElement, this.generateMainId());
        const buttonElements = document.getElementsByTagName("button");
        HornetTestAssert.assertEquals(buttonElements.length, 2, "Le DOM doit présenter deux boutons");
        const aElements = document.getElementsByTagName("a");
        HornetTestAssert.assertEquals(aElements.length, 1, "Le DOM doit présenter un lien");
        setTimeout(() => {
            this.triggerMouseEvent(buttonElements[0], "click");
            this.end();
        }, 250);
    }

    protected monAction() {
        console.log("Action click détectée, le test peut être terminé");
    }
}

//lancement des Tests
runTest(new IconTest());
