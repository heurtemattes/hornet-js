import { Logger } from "src/logger";
import { TestLogger } from "hornet-js-test/src/test-logger";
Logger.prototype.buildLogger = TestLogger.getLoggerBuilder({
    "appenders": {
        "console": {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%[%d{ISO8601}|%p|%c|%m%]"
            }
        }
    },
    "categories": {
        "default": { "appenders": [ "console" ], "level": "INFO" }
    }
});

import { TestUtils } from "hornet-js-test/src/test-utils";
const chai = TestUtils.chai;
const expect: any = chai.expect;
import { CancellablePromise } from "src/cancellable-promise";

let cpt =0;

import { BaseMochaTest } from "hornet-js-test/src/base-mocha-test";
import { Decorators } from "hornet-js-test/src/decorators";
import { runTest } from "hornet-js-test/src/test-run";
import { Utils } from "src/index";
const cls = Utils.getContinuationStorage();

@Decorators.describe("Test cancellable promise")
class CancellablePromiseTest extends BaseMochaTest {

    @Decorators.beforeEach
    beforeEach() {
        cpt = 0;
    }

    @Decorators.it("Test cancel cancellable promise")
    testCancelPromise() {
        cls.run(() => {CancellablePromise.getPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            });
            setTimeout(() => {
                CancellablePromise.clearAllCancellablePromises();
                setTimeout(() => {
                    expect(cpt, "promesse non annulée").to.be.equal(0);
                    this.end();
                }, 250);
            }, 50);
        });
    }

    @Decorators.it("Test cancellable promise")
    testPromiseOk() {
        cls.run(() => {CancellablePromise.getPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            });
            setTimeout(() => {
                    expect(cpt, "promesse annulée").to.be.equal(3);
                    this.end();
            }, 350);
        });
    }

    @Decorators.it("Test cancel named cancellable promise")
    testCancelNamedPromise() {
        cls.run(() => {CancellablePromise.getNamedPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            }, "testUnit");
            setTimeout(() => {
                CancellablePromise.clearAllCancellablePromises(true);
                setTimeout(() => {
                    expect(cpt, "named promesse non annulée avec clearAllCancellablePromises").to.be.equal(0);
                    this.end();
                }, 250);
            }, 50);
        });
    }

    @Decorators.it("Test cancel not named cancellable promise")
    testCancelNotNamedPromise() {
        cls.run(() => {CancellablePromise.getNamedPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            }, "testUnit1");
            setTimeout(() => {
                CancellablePromise.clearAllCancellablePromises(false);
                setTimeout(() => {
                    expect(cpt, "named promesse annulée avec clearAllCancellablePromises à false").to.be.equal(3);
                    this.end();
                }, 250);
            }, 50);
        });
    }

    @Decorators.it("Test cancel named cancellable promise avec cancelPromiseWithName ")
    testCancelPromiseNamedWith() {
        cls.run(() => {CancellablePromise.getNamedPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            }, "testUnit2");
            setTimeout(() => {
                CancellablePromise.cancelPromiseWithName("testUnit2");
                setTimeout(() => {
                    expect(cpt, "named promesse non annulée avec cancelPromiseWithName").to.be.equal(0);
                    this.end();
                }, 250);
            }, 50);
        });
    }

    @Decorators.it("Test désenregistrer named cancellable promise")
    testUnregisterNamedPromise() {
        cls.run(() => {CancellablePromise.getNamedPromise((resolve, reject, onCancel) => {
                const id = setTimeout(() => {
                    cpt = 3;
                    resolve(1);
                }, 250);
            onCancel(() => clearTimeout(id));
            }, "testUnit3");
            setTimeout(() => {
                const promises = Utils.getCls("cancellablePromise");
                    expect(promises["testUnit3"], "promesse nommée non présente dans le cls").to.exist;
                CancellablePromise.unregisterPromiseInClsWithName("testUnit3");
                setTimeout(() => {
                    const promises = Utils.getCls("cancellablePromise");
                    expect(promises["testUnit3"], "promesse nommée présente dans le cls").to.not.exist;
                    this.end();
                }, 250);
            }, 50);
        });
    }
}

// lancement des Tests
runTest(new CancellablePromiseTest());
