import { Utils } from "src/index";

const Promise = require("bluebird");
Promise.config({ cancellation: true });

export class CancellablePromise {

    static readonly CANCELLABLE_PROMISE = "cancellablePromise";
    static readonly CANCELLABLE_PROMISES = "cancellablePromises";

    /**
     * Retourne une promesse pouvant etre annulée
     * en même temps que les autres promesses annulables
     * elle sera enregistrée dans la variable "cancellablePromises" du cls 
     * aves les autres promesses annulables
     * @param {any} executor
     */
    static getPromise(executor: any) : Promise<any> {
        const promise = new Promise(executor);
        this.registerPromiseInCls(promise);
        return promise;
    }

    /**
     * Retourne une promesse pouvant etre annulée à n'importe quel moment
     * elle sera enregistrée dans la variable "cancellablePromise[name]" du cls
     * @param {any} executor
     * @param {string} name nom de la promesse
     */
    static getNamedPromise(executor: any, name: string) : Promise<any> {
        const promise = new Promise(executor);
        this.registerPromiseInClsWithName(promise, name);
        return promise.then(((result) => {
            this.unregisterPromiseInClsWithName(name);
            return result;
        }).bind(this, promise)).catch(((error) => {
            this.unregisterPromiseInClsWithName(name);
            return error;
        }).bind(this, promise));
    }

    /**
     * Enregistre la promesse dans le Cls
     * @param {Promise<any>} promise promesse à enregistrer
     */
    static registerPromiseInCls(promise: Promise<any>) {
        const promises = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISES) || [];
        if (promises.indexOf(promise) < 0) {
            promises.push(promise);
            Utils.setCls(CancellablePromise.CANCELLABLE_PROMISES, promises);
        }
    }

    /**
     * Enregistre la promesse dans le Cls à l'aide de son nom
     * @param {Promise<any>} promise promesse à enregistrer
     * @param {string} name nom de la promesse
     */
    static registerPromiseInClsWithName(promise: Promise<any>, name: string) {
        let promiseCls = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISE);
        if (!promiseCls) {
            promiseCls = {};
        }
        promiseCls[name] = promise;
        Utils.setCls(CancellablePromise.CANCELLABLE_PROMISE, promiseCls);
    }

    /**
     * Desenregistre la promesse dans le Cls à l'aide de son nom
     * @param {string} name nom de la promesse
     */
    static unregisterPromiseInClsWithName(name: string) {
        const promises = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISE);
        if (promises) {
            const promiseCls = promises[name];
            if ( promiseCls) {
                promises[name] = null;
                Utils.setCls(CancellablePromise.CANCELLABLE_PROMISE, promises);
            }
        }
    }

    /**
     * Cancel et désenregistre la promesse dans le Cls à l'aide de son nom
     * @param {string} name nom de la promesse
     */
    static cancelPromiseWithName(name: string) {
        const promises = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISE);
        if (promises) {
            const promiseCls = promises[name];
            if ( promiseCls) {
                promiseCls.cancel();
                this.unregisterPromiseInClsWithName(name);
            }
        }
    }

    /**
     * Cancel et désenregistre les promesses présentes dans le Cls
     * @param includeNamed inclure les promesses nommées
     */
    static clearAllCancellablePromises(includeNamed: boolean = false ) {
        CancellablePromise.clearAllUnamedCancellablePromises();
        if (includeNamed) {
           CancellablePromise.clearAllNamedPromises();
        }
    }

    /**
     * Cancel et désenregistre les promesses présentes dans le Cls
     * Ces promesses ne sont pas nommées
     */
    static clearAllUnamedCancellablePromises(): void {
        const promises = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISES);
        Utils.setCls(CancellablePromise.CANCELLABLE_PROMISES, []);
        if (promises) {
            promises.forEach((promise) => {
                if (promise.cancel) {
                    promise.cancel();
                }
            });
        }
    }

    /**
     * Cancel et désenregistre les promesses présentes dans le Cls
     * Ces promesses sont nommées
     */
    static clearAllNamedPromises(): void {
        const namedPromises = Utils.getCls(CancellablePromise.CANCELLABLE_PROMISE);
        if (namedPromises) {
            Object.keys(namedPromises).forEach(((key) => {
                this.cancelPromiseWithName(key);
            }).bind(this));
        }
    }
}
