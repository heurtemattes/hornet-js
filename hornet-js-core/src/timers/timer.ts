import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-logger/src/logger";

interface ITimer {
    [K: string]: number[];
}

const CLS_KEY = "hornet.timers";

export class Timer {

    static TIMER_REQUEST = "REQUEST";
    static TIMER_ACTION = "ACTION";
    static TIMER_SERVICE = "SERVICE";
    static TIMER_AJAX_REQUEST = "REQUEST_AJAX";
    static TIMER_SERVER_HTTP = "HTTP_ROUTER";

    static TIMERS_ORDER = [Timer.TIMER_REQUEST, Timer.TIMER_SERVER_HTTP, Timer.TIMER_ACTION, Timer.TIMER_SERVICE, Timer.TIMER_AJAX_REQUEST];

    static NS_PER_SEC = 1e9;
    static NS_TO_MS_PER_SEC = 1e6;

    protected static logger: Logger = Logger.getLogger("hornet-js-core.timers.Timer");

    /**
     * Démarre un timer et en arrête un autre s'il est renseigné.
     * @param {string} timerName id du timer à démarrer
     * @param {string}  stopTimerName id du timer à arrêter
     */
    static startTimer(timerName: string, stopTimerName?: string) {
        let timers = Timer.getTimers();
        
        if (!timers) {
            timers = {};
        } 

        if (!timers[timerName]) {
            timers[timerName] = [];
        } 

        if (timers[timerName].length % 2 !== 0) {
            Timer.logger.debug(`startTimer : Problème de Timers (${timerName}) non stoppé.`);
        } else {
            timers[timerName].push(new Date().getTime());
            Timer.setTimers(timers);
        }
        

        if (stopTimerName) {
            Timer.stopTimer(stopTimerName);
        }
    }

    /**
     * Arrête un timer
     * @param {string} timerName id du timer à démarrer
     */
    static stopTimer(timerName: string) {
        const timers = Timer.getTimers();
        
        if (!timers || !timers[timerName] || timers[timerName].length % 2 === 0) {
            Timer.logger.debug(`startTimer : Problème de Timers (${timerName}) non démarré.`);
        } else {
            timers[timerName].push(new Date().getTime());
            Timer.setTimers(timers);
        }
        
    }

    /**
     * Arrête tous les timers
     */
    static stopAllTimers() {

        const timers = Timer.getTimers();

        if (timers) {
            Object.keys(timers).forEach((timerName) => {
                if (timers[timerName].length % 2 !== 0) {
                    timers[timerName].push(new Date().getTime());
                }                
            });
            Timer.setTimers(timers);
        }
        
    }

    /**
     * Fonction pour logger les timers se basant sur Timer.TIMERS_ORDER et le cls (hornet.timers)
     * @param {string} url - url à logger
     * @param {integer} statusCode - status http à logger
     */
    static logFinally(url?, statusCode?) {
        const timers = Timer.getTimers();
        const valueTimers = {};

        if (timers) {
            let log = `Metrologie : ${url || "url unknow"} - ${statusCode || "status unknow"}`;

            Timer.TIMERS_ORDER.forEach((timer) => {
                if (timers[timer]) {
                    if (timers[timer].length % 2 !== 0) {
                        Timer.logger.debug(`Problème de Timers (${timer}) non stoppé. Ajout automatique du stop.`);
                        timers[timer].push(new Date().getTime());
                    }
                    for (let tCount = 0; tCount < timers[timer].length; tCount += 2) {
                        const tValue = timers[timer][tCount + 1] - timers[timer][tCount];
                        valueTimers[timer] = valueTimers[timer] ? valueTimers[timer] + tValue : tValue;
                    }
                    log += ` - ${timer} ${valueTimers[timer]} ms`;
                }
            });
            Object.keys(timers).filter(function (timerKey){ return this.indexOf(timerKey) -1}, Timer.TIMERS_ORDER).sort().forEach((timer) => {
                if (timers[timer]) {
                    if (timers[timer].length % 2 !== 0) {
                        Timer.logger.debug(`Problème de Timers (${timer}) non stoppé. Ajout automatique du stop.`);
                        timers[timer].push(new Date().getTime());
                    }
                    for (let tCount = 0; tCount < timers[timer].length; tCount += 2) {
                        const tValue = timers[timer][tCount + 1] - timers[timer][tCount];
                        valueTimers[timer] = valueTimers[timer] ? valueTimers[timer] + tValue : tValue;
                    }
                    log += ` - ${timer} ${valueTimers[timer]} ms`;
                }
            });
            Timer.logger.info(log);
        } else {
            Timer.logger.warn("No timers available.");
        }

    }

    static getTimers(clsKey: string = CLS_KEY): ITimer {
        let timers;
        try {
            timers = Utils.getCls(clsKey);
        } catch (e) {
            Timer.logger.warn("No timers available, Cls error.");
            Timer.logger.debug("error : ", e);
        }
        return timers;
    }

    static setTimers(timers:any, clsKey: string = CLS_KEY):any {
        try {
            timers = Utils.setCls(clsKey, timers);
        } catch (e) {
            Timer.logger.warn("No timers available, Cls error.");
            Timer.logger.debug("error : ", e);
        }
        return timers;
    }    
}
