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
 * hornet-js-core - Ensemble des composants qui forment le coeur de hornet-js
 *
 * @author MEAE - Ministère de l'Europe et des Affaires étrangères
 * @version v5.4.1
 * @link git+https://github.com/diplomatiegouvfr/hornet-js.git
 * @license CECILL-2.1
 */

import { Utils } from "hornet-js-utils";
import { ObjectUtils } from "hornet-js-utils/src/object-utils";
import { Logger } from "hornet-js-logger/src/logger";

import isNumber = require("lodash.isnumber");
import merge = require("lodash.merge");
import * as superagent from "superagent";
import { Response } from "superagent";
import {
    HornetRequest, HornetSuperAgentRequest, SpinnerType, ResultDispositionType, ErrorManagementType, ResponseManagementType,
} from "src/services/hornet-superagent-request";
import { ClientSessionTimeout } from "src/session/client-session-configuration";
import { ServiceEvent } from "src/event/hornet-event";
import * as superAgentPlugins from "src/services/superagent-hornet-plugins";
import { Class } from "hornet-js-utils/src/typescript-utils";
import { MediaTypes } from "src/protocol/media-type";
import { BackendApiResult, NodeApiResult, BackendApiError, NodeApiError } from "src/services/service-api-results";
import { manageError } from "src/component/error-manager";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { HornetCache } from "src/cache/hornet-cache";
import { HornetPlugin } from "src/services/superagent-hornet-plugins";
import { HornetEvent } from "src/event/hornet-event";
import { fireHornetEvent } from "src/event/hornet-event";
import { ClientConfiguration } from "src/client-conf";
import { BaseError } from "hornet-js-utils/src/exception/base-error";
import { HttpError } from "hornet-js-utils/src/exception/http-error";

import { Promise } from "hornet-js-utils/src/promise-api";

import { Timer } from "src/timers/timer";
import { DispositionType } from "src/result/disposition-type";

const logger: Logger = Logger.getLogger("hornet-js-core.services.hornet-agent");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// wrap http & https afin de sécuriser l'utilisation de "continuation-local-storage" (perte ou mix de contexte) //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as http from "http";
import * as https from "https";

if (http[ "__old_http_request" ] === undefined) {
    http[ "__old_http_request" ] = http.request;
    https[ "__old_https_reques" ] = https.request;

    (<any>http).request = function () {
        const req = http[ "__old_http_request" ].apply(http, arguments);
        Utils.getContinuationStorage().bindEmitter(req);
        return req;
    };

    (<any>https).request = function () {
        const req = https[ "__old_https_reques" ].apply(https, arguments);
        Utils.getContinuationStorage().bindEmitter(req);
        return req;
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export enum CacheKey {
    URL = "URL",
    URL_DATA = "URL_DATA",
}

export interface SessionEvent { value: number; }
export let SESSION_WILL_EXPIRE_NOTIFICATION_EVENT = new HornetEvent<SessionEvent>("SESSION_WILL_EXPIRE");
export let SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT = new HornetEvent<SessionEvent>("SESSION_WILL_EXPIRE_START");
export let SESSION_REFRESHED_NOTIFICATION_EVENT = new HornetEvent<SessionEvent>("SESSION_REFRESHED");

/**
 * Cette classe sert à encapsuler les appels à SuperAgent pour ajouter des plugins au besoin
 * @class
 */
export class HornetSuperAgent {
    // configuration de la gestion des session des timeout côté client
    private clientSessionConfig: ClientSessionTimeout = {};

    // enable\disable le cache pour cette requête
    protected enableCache: boolean = false;

    // défini le temps de mis en cache
    protected timeToLiveInCache: number;

    // défini le mode de génération de clé pour le cache
    protected cacheKey: CacheKey = CacheKey.URL;

    // permet de désactiver l'évènement. Notamment utilisé pour l'affichage du spinner
    protected noEventFired: boolean = false;

    protected superAgentRequest: any;

    public plugins: HornetList<HornetPlugin>;

    public response: Response;

    /** pour du cache de la configuration globale  */
    public static globalClientSessionConfig: ClientSessionTimeout;

    public static contentTypesNoExport:string[] = ["application/json", "text/plain"];

    /** pour sauvegarder l'handler du timeout */
    protected static sessionExpireTimeout: NodeJS.Timer;

    constructor(timeToliveInCache?: number, cacheKey?: CacheKey) {
        const plugins = [];
        const cacheConf = this.getCacheConfig();
        const globalCacheActivated = cacheConf.enabled;


        if (globalCacheActivated) {
            this.enableCache = true;
            if (isNumber(timeToliveInCache)) {
                this.timeToLiveInCache = timeToliveInCache;
            } else {
                this.timeToLiveInCache = cacheConf.timetolive || 3600;
            }
            if (cacheKey && CacheKey[ cacheKey ]) {
                this.cacheKey = cacheKey;
            } else {
                this.cacheKey = cacheConf.cacheKey || CacheKey.URL;
                if (!CacheKey[ this.cacheKey ]) {
                    this.cacheKey = CacheKey.URL;
                }
            }
            logger.debug("Activation du cache pour", this.timeToLiveInCache, "s");
        } else {
            logger.debug("Cache de requêtes désactivé, l'appel à cette méthode n'active donc PAS le cache");
        }


        if (!Utils.isServer) {
            // Correction Bug IE Afin de pallier au problème de cache sur les services:
            plugins.push(new HornetPluginConfig("noCacheIEPlugin", superAgentPlugins.noCacheIEPlugin, null));

            plugins.push(new HornetPluginConfig("CsrfPlugin", superAgentPlugins.CsrfPlugin, null));
            plugins.push(new HornetPluginConfig("RedirectToLoginPagePlugin", superAgentPlugins.RedirectToLoginPagePlugin, null));
        }

        plugins.push(new HornetPluginConfig("AddParamFromLocalStorageTid",
                                            superAgentPlugins.AddParamFromLocalStorage, [ "tid", "hornet.tid" ]));
        plugins.push(new HornetPluginConfig("AddParamFromLocalStorageUser",
                                            superAgentPlugins.AddParam,
                                            [ "user", (Utils.getContinuationStorage().get("hornet.user") || {}).name ]));

        this.plugins = new HornetList(plugins);
    }

    protected getCacheConfig(): any {
        let globalCache = Utils.config.getIfExists("request.cache") || { enabled: false };
        if (globalCache) {
            if (!Utils.isServer) {
                if (globalCache.client) {
                    globalCache = globalCache.client;
                }
            } else {
                if (globalCache.server) {
                    globalCache = globalCache.server;
                }
            }
        }
        return globalCache;
    }

    protected getClientSessionConfig(): ClientSessionTimeout {
        if (!HornetSuperAgent.globalClientSessionConfig) {
            const clientSessionConf = (Utils.appSharedProps.get("clientSessionConfig") || {} as ClientConfiguration);
            if (clientSessionConf && clientSessionConf.isInSessionTimeout === undefined) {
                clientSessionConf.isInSessionTimeout = clientSessionConf.notifSessionTimeout !== undefined;
            }
            clientSessionConf.notifSessionTimeoutRepeat = clientSessionConf.notifSessionTimeoutRepeat || 600000;
            HornetSuperAgent.globalClientSessionConfig = clientSessionConf;
        }

        return HornetSuperAgent.globalClientSessionConfig;
    }


    protected getTimeoutConfig(): any {
        const request = Utils.config.getOrDefault("request", undefined);
        let timeout;
        if (request && request.timeout) {
            timeout = request.timeout;
        }
        return timeout;
    }

    /**
     * Initialise une instance de superagent en ajoutant les plugins et header
     * @returns {SuperAgentRequest}
     * @protected
     */
    protected initSuperAgent(request: HornetRequest): superagent.SuperAgentRequest {
        if (!Utils.isServer) {
            merge(this.clientSessionConfig, this.getClientSessionConfig());
            merge(this.clientSessionConfig, request.clientTimeout);
        }
        if (!this.superAgentRequest) {

            this.superAgentRequest = superagent((request.method && request.method.toUpperCase()) || "get", request.url);

            this.plugins.list.forEach((name: String) => {
                const config: HornetPluginConfig<any> = this.plugins.mapPlugins[ "" + name ];
                const fnt = config.clazz[ "getPlugin" ];
                const plugin = fnt.apply(null, config.args);
                this.superAgentRequest.use(plugin);
            });
            this.superAgentRequest.set("X-Requested-With", "XMLHttpRequest");

        }

        if (request.hooks && request.hooks.afterInit) {
            request.hooks.afterInit.bind(this)(this.superAgentRequest, request);
        }

        return this.superAgentRequest;
    }

    /**
     * Lancement des évents à lancer côté client lors d'une request
     * @param  boolean value indicateur de lancement ou reception d'une requete
     * @param  SpinnerType [spinner=SpinnerType.Default] type de gestion des spinner associés à la requête
     * @returns HornetAgent
     * */
    protected setClientEventForRequest(value: boolean, spinner: SpinnerType = SpinnerType.Default): void {
        /** Selection de l'évent à envoie côté client en fonction du spinner*/
        switch (spinner) {
            case SpinnerType.Component:
                ServiceEvent.setRequestComponentInProgress(value);
                break;
            case SpinnerType.Default:
                ServiceEvent.setRequestInProgress(value);
                break;
        }
    }

    /**
     * Methode executer sur l'envoi d'une requete (gestion spinner et du cache)
     * @param {HornetRequest} request requete à envoyer 
     * @returns HornetAgent
     * */
    protected preProcessRequest(request: HornetRequest): Promise<Response> {
        if (!Utils.isServer) {
            this.setClientEventForRequest(true, request.spinnerType);
        }
        if ((this.enableCache || request.timeToLiveInCache) && (request.method || "get") === "get") {
            return this.getFromCache(request);
        } else if (this.enableCache && (request.method === "post" || request.method === "put" || request.method === "patch" || request.method === "delete")) {
            return this.removeInCache(request);
        }
    }

    /**
     * Méthode exécutée sur la réception d'une requête (gestion spinner et du cache)
     * @param {HornetRequest} request requête envoyée 
     * @param {Response} response réponse reçue
     * @param {boolean} throwed permet d'indiquer qu'on est dans le processus de gestion d'erreur et de jeter l'exception reçue pour la manager
     * @returns Response
     * */
    protected postProcessRequest(request: HornetRequest, response: Response, throwed?: boolean): Response {
        if ((this.enableCache || request.timeToLiveInCache) && (request.method || "get") === "get") {
            if (response && !request.noCached) {
                this.setInCache(response, request, request.timeToLiveInCache || this.timeToLiveInCache);
            }
        } else {
            if (!Utils.isServer) {
                HornetSuperAgent.initSessionTimeout(this.clientSessionConfig);
            }
        }

        if (!Utils.isServer) {
            this.setClientEventForRequest(false, request.spinnerType);
            return this.manageClientResult(response, request, throwed);
        } else {
            return this.manageServerResult(response, request, throwed);
        }
    }

    /**
     * send a request
     * @param {HornetRequest} request objet representant une requête (methode 'get' par defaut)
     * @param {NodeJS.WritableStream} pipedStream flux bindé sur la reponse superagent
     * @returns {Promise<Response>}
     */
    public fetch(request: HornetRequest, pipedStream?: NodeJS.WritableStream): Promise<Response> {

        return Promise.resolve(true)
            .then(() => {
                Timer.startTimer(Timer.TIMER_AJAX_REQUEST);
                return this.preProcessRequest(request);
            }).then((cacheResponse) => {
                let p: Promise<Response>;
                if (cacheResponse) {
                    p = Promise.resolve(cacheResponse);
                } else {
                    p = new Promise<any>((resolve, reject) => {

                        const ha: superagent.SuperAgentRequest = this.initSuperAgent(request);
                        ha.accept((request.typeMime && request.typeMime.MIME) || "json"); // ajoute le format attendu sinon json par defaut
                        if (request.headers) {
                            for (const header in request.headers) {
                                ha.set(header, request.headers[ header ]);
                            }
                        }

                        if (!Utils.isServer) {

                            if (request.typeMime && request.typeMime.MIME !== MediaTypes.JSON.MIME) {
                                (ha as any).responseType("blob");
                            }
                        }

                        if (request.ca) (ha as any).ca(request.ca);
                        if (request.key) (ha as any).key(request.key);
                        if (request.cert) (ha as any).cert(request.cert);
                        if (request.progress) ha.on("progress", request.progress);
                        if (request.timeout) {
                            (ha as any).timeout(request.timeout);
                        } else {
                            (ha as any).timeout(this.getTimeoutConfig());
                        }
                        if(request.query) {
                            ha.query(request.query);
                        }
                        if (request.attach && request.attach.length > 0) {
                            (<any>ha).field("content", JSON.stringify(request.data));
                            request.attach.forEach((attachFile) => {
                                ha.attach(attachFile.field, <any>attachFile.file, attachFile.fileName);
                            });
                        } else {
                            // ajoute le format envoyé sinon json par defaut
                            ha.type((request.headers && request.headers.contentType) || "json");
                            ha.send(request.data); // ajout du body
                        }

                        if (request.hooks && request.hooks.beforeRequest) {
                            request.hooks.beforeRequest.bind(this)(ha, request);
                        }

                        if (pipedStream) {
                            pipedStream[ "contentType" ](request.typeMime.MIME);
                            let fileName = (request.resultDisposition && request.resultDisposition.type === ResultDispositionType.Default && request.resultDisposition.data && request.resultDisposition.data.name) || "export";
                            pipedStream[ "attachment" ](fileName + "." + request.typeMime.SHORT);

                            resolve(ha.pipe(pipedStream));

                        } else {
                            resolve(ha); // lance la requete
                            /* equivalent
                            ha.end(function(err, res){
                                if (err) reject(err); else resolve(res);
                            });*/
                        }
                    });
                }
                return p.then((response: Response) => {
                    Timer.stopTimer(Timer.TIMER_AJAX_REQUEST);

                    this.response = response;
                    if (request.hooks && request.hooks.afterRequestSuccess) {
                        return this.postProcessRequest(request, request.hooks.afterRequestSuccess.bind(this)(response, request));
                    } else {
                        return this.postProcessRequest(request, response);
                    }
                });
            }).catch((e) => {
                Timer.stopTimer(Timer.TIMER_AJAX_REQUEST);
                let except = e;
                // c'est une exception pas encore gérée (code autre que 200)
                if (e.response) {
                    try {
                        // en cas d'erreur on ferme le spinner
                        // exception pouvant être générée
                        this.postProcessRequest(request, e.response, true);

                        if (request.hooks && request.hooks.afterRequestError) {
                            except = request.hooks.afterRequestError.bind(this)(e.response, request);
                        } 
                        if(request.manageTransformResponse !== ResponseManagementType.All && request.manageTransformResponse !== ResponseManagementType.Error) {
                            except = new HttpError(e.response.status, "ERR_HORNET_HTTP", e.response.body);
                        } else {
                            except = e.response;
                        }
                    } catch (e) {
                        // on sauvegarde l'exception pour pouvoir la gérer si besoin
                        except = e;
                    }
                } else {
                    if((request.manageTransformResponse === ResponseManagementType.All || request.manageTransformResponse === ResponseManagementType.Error)
                        && request.manageError === ErrorManagementType.All) {
                        return Promise.reject(e);
                    }
                    if (request.hooks && request.hooks.afterRequestError) {
                        except = request.hooks.afterRequestError.bind(this)(e, request);
                    }
                }

                const reason = (e[ "detail" ] && e[ "detail" ].reason) || e[ "reason" ];
                if (!(reason instanceof BaseError) && reason) {
                    except = NodeApiError.parseError(new TechnicalError("ERR_TECH_UNKNOWN",
                                                                        { errorMessage: "Erreur inattendue" },
                                                                        reason || e),                null).toJsError();
                }

                // on veut gérer l'exception
                if ((except instanceof BusinessError && request.manageError === ErrorManagementType.Business) ||
                    (except instanceof TechnicalError && request.manageError === ErrorManagementType.Technical) ||
                    request.manageError === ErrorManagementType.All) {
                    return Promise.reject(except);
                } else {
                    // sinon on renvoit la page d'erreur
                    if (Utils.getCls("hornet.appConfig") && Utils.getCls("hornet.appConfig").errorComponent) {
                        manageError(except, Utils.getCls("hornet.appConfig").errorComponent);
                    }
                    throw except;
                }



            });
    }

    /**
     * Formate la réponse pour le client afin de traiter les erreurs automatiquement
     * @param {Response} response reponse de superagent
     */
    protected manageClientResult(response: Response, request: HornetRequest, throwed?: boolean): any {

        if(request.manageTransformResponse) {
            if(request.manageTransformResponse === ResponseManagementType.All
                || (request.manageTransformResponse === ResponseManagementType.Error && throwed)
                || (request.manageTransformResponse === ResponseManagementType.OK && !throwed)) {
                return response;
            }
        }

        // try catch car impossible de catcher les erreurs asynchrones sur le Client
        if (response) {
            if (response.body && this.hasHornetBody(response.body)) {
                // Result OK || Erreur gérée par node
                const result: NodeApiResult = response.body;

                if (result.errors.length === 0) {
                    return result.data;
                } else {
                    // Erreur(s)
                    const e = NodeApiError.parseError(result.errors, response.status).toJsError();
                    if (throwed) {
                        throw e;
                    } else {
                        return Promise.reject(e);
                    }
                }
            } else if (response.header[ "content-type" ]) {
                let contentTyptExp = /([a-zA-Z]+)\/([a-zA-Z0-9.-]+)/;
                if(contentTyptExp.test(response.header[ "content-type" ])) {
                    const regexp = response.header[ "content-type" ].match(contentTyptExp);
                    if (HornetSuperAgent.contentTypesNoExport.indexOf(regexp[ 0 ].toLowerCase()) === -1) {

                        const attachFile = response.header[ "content-disposition" ]
                            ? response.header[ "content-disposition" ].match(/(attachment|inline); filename="([^"]+)"/)
                            : undefined;
                        let attachFilename = undefined;
                        // extract file name from header response
                        if (attachFile) {
                            attachFilename = attachFile[ 2 ];
                        } else {
                            attachFilename = "export." + MediaTypes.fromMime(regexp[ 0 ]).SHORT;
                        }

                        const res = response[ "xhr" ].response;
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(
                                res instanceof Blob ? res : new Blob([ res ], { type: regexp[ 0 ] }), attachFilename);
                        }
                        else {
                            const objectUrl = window.URL.createObjectURL(
                                // xhr.response is a blob
                                res instanceof Blob ? res : new Blob([ res ], { type: regexp[ 0 ] }));  
                            if (!request.resultDisposition) {
                                if (!attachFile || attachFile[ 1 ] === DispositionType.ATTACHMENT) {
                                    const elemt = { a: null };
                                    elemt.a = document.createElement("a");
                                    elemt.a.href = objectUrl;
                                    elemt.a.download = attachFilename; // Set the file name.
                                    elemt.a.style.display = "none";

                                    const modalQuery = document.querySelector('[role="dialog"]');
                                    if (modalQuery) {
                                        modalQuery.appendChild(elemt.a);
                                    } else {
                                        document.body.appendChild(elemt.a);
                                    }
                                    elemt.a.click();

                                    setTimeout(function () {
                                        document.body.removeChild(elemt.a);
                                        window.URL.revokeObjectURL(elemt.a.href);
                                        delete elemt.a;
                                    },         0);
                                }
                            } else {
                                if (request.resultDisposition && request.resultDisposition.type === ResultDispositionType.Custom) {
                                    return objectUrl;
                                } else {
                                    const data = request.resultDisposition.data || {};
                                    window.open(objectUrl, data.name, data.specs, data.replace);
                                }
                            }
                        }
                    }
                }
            }
            return response;
        }
    }

    /**
     * Formate la réponse pour le serveur afin de traiter les erreurs automatiquement
     * @param {Response} response reponse de superagent
     * @param {HornetRequest} request objet de paramètrage de la requête
     * @param {boolean} throwed indicateur d'étape (false => ok, true => erreur) 
     */
    protected manageServerResult(response: Response, request: HornetRequest, throwed?: boolean): any {

        if(request.manageTransformResponse) {
            if(request.manageTransformResponse === ResponseManagementType.All
                || (request.manageTransformResponse === ResponseManagementType.Error && throwed)
                || (request.manageTransformResponse === ResponseManagementType.OK && !throwed)) {
                return response;
            }
        }

        if (response && response.body && this.hasHornetBody(response.body)) {
            // Result OK || Erreur gérée par la backend
            const result: BackendApiResult = response.body;

            if (result.errors.length === 0) {
                // Pas d'erreur >> on appelle le cb fourni par l'application
                if (response.type && response.type !== MediaTypes.JSON.MIME) {
                    return response;
                }
                return result.data;

            } else {
                throw BackendApiError.parseError(result.errors, result.status || response.status).toJsError();
            }

        } else {
            return (response && ObjectUtils.isNotEmpty(response.body) && response.body)
                    || (response && response.text) || response;
        }
    }

    /**
     * Test si c'est un format Hornet
     * @param {Response.body} body reponse de superagent
     */
    protected hasHornetBody(body): boolean {
        return [ "hasTechnicalError", "hasBusinessError", "status", "url", "data", "errors" ].every((key) => {
            return key in body;
        });
    }

    /**
     * Construction d'une erreur hornet et appel du manager d'erreurs
     */
    protected manageError(err) {
        // Erreur non gérée par le nodejs ! Réseau etc ...
        const error = new TechnicalError("ERR_TECH_UNKNOWN", {
            errorMessage: err.message,
            httpStatus: 500 /*(TODO res || {url}).status*/,
            errorCause: err,
        },                               err);

        // pas de callback custom > on appelle le ClientErrorManager
        manageError(error, Utils.getCls("hornet.appConfig").errorComponent);
    }

    /**
     * Lecture dans le cache
     * @param {string} url url de la requête
     */
    protected getFromCache(request: HornetRequest): Promise<any> {
        return HornetCache.getInstance().getItem(this.generateCacheKey(request)).then(function (response) {
            logger.debug("Bypass appel API: retour du contenu du cache");
            return response;
        }).catch((e) => {
            logger.trace(e);
            logger.debug("Pas de valeur en cache, appel de l'API");
        });
    }

    /**
     * Mise en cache de la reponse
     * @param {Response} response reponse de superagant
     * @param {HornetRequest} request requête à mettre en cache
     * @param {number} timetoliveInCache durée de vie dans le cache
     */
    protected setInCache(response: Response, request: HornetRequest, timetoliveInCache: number) {

        logger.debug("Mise en cache de la réponse à l'appel de l url:", request.url);
        const reponseCopy = this.cloneResponse(response);

        return HornetCache
            .getInstance()
            .setCacheAsynchrone(this.generateCacheKey(request), reponseCopy, timetoliveInCache)
            .finally(function () {
                logger.debug("Sauvegarde dans le cache effectuée");
                return response;
            },
        );
    }

    /**
     * Nettoyage en cache de la requete
     * @param {HornetRequest} request requête à mettre en cache
     */
    protected removeInCache(request: HornetRequest): Promise<any> {

        logger.debug("Suppression en cache de l url:", request.url);
        const keys: Array<Promise<any>> = [ HornetCache.getInstance().clearCacheAsynchrone(this.generateCacheKey(request)).catch((e) => {
            logger.trace(e);
            logger.debug("Pas de valeur en cache à supprimer");
            return null;
        }) ];

        if (request.cacheLinkKey) {
            request.cacheLinkKey.forEach((key) => {
                keys.push(HornetCache.getInstance().clearCacheAsynchrone(key).catch((e) => {
                    logger.trace(e);
                    logger.debug("Pas de valeur en cache à supprimer");
                    return null;
                }));
            });
        }

        Promise.all(keys).then(() => {
            logger.debug("Suppression dans le cache effectuée");
            return null;
        });

        return Promise.resolve(null);
    }
    /**
     * Génère la clé utilisée pour le cache
     * @param {HornetRequest} request requête pour la génération de la clé (url + param)
     */
    protected generateCacheKey(request: HornetRequest): string {
        let key = request.url;
        if (request.data && request.cacheKey === CacheKey.URL_DATA) {
            let separator = "?";
            const dataSort = Object.keys(request.data).sort();
            for (const data in dataSort) {
                key += separator + data + "=" + JSON.stringify(dataSort[ data ]);
                separator = "&";
            }
        }

        if (request.method === "put" || request.method === "patch" || request.method === "delete") {
            key = key.substring(0, key.lastIndexOf("/"));
        }

        return key;
    }

    /**
     * clone les paramètres interessants d'une réponse.
     * La raison est que sur NodeJs la propriété 'body' n'est pas énumérable, on reconstruit donc un objet spécial pour le cache
     * Note: Possible de d'override cette méthode si d'autres paramètres doivent être ajoutés
     * @param res
     * @return {{body: (any|HTMLElement|req.body|{x-csrf-token}), header: any, ok: any, status: any, type: any}}
     * @protected
     */
    protected cloneResponse(res: Response) {
        return {
            body: res.body,
            header: res.header,
            ok: res.ok,
            status: res.status,
            type: res.type,
        };
    }

    /**
     * nettoyage des data (suppression des null (Button)).
     * @param {object} data
     * @protected
     */
    protected cleanData(data: any) {
        for (const attr in data) {
            if (data[ attr ] == null) delete data[ attr ];
        }
    }

    /**
     * initialise la méthode de timeout pour la notification de fin de session.
     * @param processing indicateur d'initialisation
     */
    protected static initSessionTimeout(clientSessionConfig: ClientSessionTimeout) {
        // On réinitialise l'expiration uniquement si une requète est transmise au serveur
        if (clientSessionConfig.isInSessionTimeout && !Utils.isServer) {
            const expireIn = clientSessionConfig.sessionTimeout - clientSessionConfig.notifSessionTimeout;
            logger.debug("initSessionTimeout will notify in", clientSessionConfig.notifSessionTimeout, "ms");
            HornetSuperAgent.clear();
            HornetSuperAgent.sessionExpireTimeout = setTimeout(
                HornetSuperAgent.sessionWillExpireIn(clientSessionConfig.notifSessionTimeout), expireIn, clientSessionConfig);
        }
    }

    /**
     * Methode appelée sur le timeout de session côté client
     * @param expireIn
     */
    protected static sessionWillExpireIn(expireIn: number) {
        return (clientSessionConfig: ClientSessionTimeout) => {
            logger.debug("Session will expire in", expireIn, "ms");
            HornetSuperAgent.emitEvent(SESSION_WILL_EXPIRE_START_NOTIFICATION_EVENT)(expireIn);
            const nextUpdateDelay = expireIn - clientSessionConfig.notifSessionTimeoutRepeat;
            HornetSuperAgent.sessionExpireTimeout = setTimeout(
                HornetSuperAgent.updateSessionWillExpireIn(nextUpdateDelay), 
                clientSessionConfig.notifSessionTimeoutRepeat, clientSessionConfig);
        };
    }

    protected static updateSessionWillExpireIn(expireIn: number) {
        return (clientSessionConfig: ClientSessionTimeout) => {
            logger.debug("Session will expire in", expireIn, "ms");
            HornetSuperAgent.emitEvent(SESSION_WILL_EXPIRE_NOTIFICATION_EVENT)(expireIn);


            const nextUpdateDelay = expireIn - clientSessionConfig.notifSessionTimeoutRepeat;
            if (nextUpdateDelay >= 0) {
                HornetSuperAgent.sessionExpireTimeout = setTimeout(
                    HornetSuperAgent.updateSessionWillExpireIn(nextUpdateDelay), 
                    clientSessionConfig.notifSessionTimeoutRepeat, clientSessionConfig);
            }
        };
    }

    protected static emitEvent(event: HornetEvent<SessionEvent>) {
        return (value?: number) => {
            fireHornetEvent(event.withData({ value }));
        };
    }

    protected static clear() {
        clearTimeout(HornetSuperAgent.sessionExpireTimeout);
        HornetSuperAgent.emitEvent(SESSION_REFRESHED_NOTIFICATION_EVENT)();

    }
}

export class HornetPluginConfig<T>{
    constructor(readonly name: string, readonly clazz: Class<T>, readonly args: Array<any>) {
    }
}

/**
 * Classe d'encapsulation de liste
 * @class
 */
export class HornetList<T extends HornetPlugin> {

    public list: String[] = [];
    public mapPlugins = {};

    constructor(list?: Array<HornetPluginConfig<T>>) {
        list.forEach((pluginConfig) => {
            this.list.push(pluginConfig.name);
            this.mapPlugins[ pluginConfig[ "name" ] ] = pluginConfig;
        });
    }

    addBefore(newElt: HornetPluginConfig<T>, Elt: HornetPluginConfig<T>) {
        let idx = -1;

        this.list.forEach((name, index) => {
            idx = index;
            if (idx === -1 && name === Elt.name) {
                this.mapPlugins[ newElt[ "name" ] ] = newElt;
                idx = index;
            }
        });

        if (idx === -1) {
            throw new Error("L'élément de base n'a pas été trouvé dans le tableau " +
                ">> impossible d'insérer le nouvel élément avant.");
        } else {
            this.list.splice(idx, 0, newElt.name);
        }
        return this;
    }

    addAfter(newElt: HornetPluginConfig<T>, Elt: HornetPluginConfig<T>) {
        let idx = -1;

        this.list.forEach((name, index) => {
            idx = index;
            if (idx === -1 && name === Elt.name) {
                this.mapPlugins[ newElt[ "name" ] ] = newElt;
                idx = index;
            }
        });
        if (idx === -1) {
            throw new Error("L'élément de base n'a pas été trouvé dans le tableau " +
                ">> impossible d'insérer le nouvel élément après.");
        } else {
            this.list.splice(idx + 1, 0, newElt.name);
        }

        return this;
    }

    remove(Elt: HornetPluginConfig<T>) {
        let idx = -1;

        this.list.forEach((name, index) => {
            idx = index;
            if (idx === -1 && name === Elt.name) {
                idx = index;
            }
        });
        if (idx === -1) {
            throw new Error("L'élément de base n'a pas été trouvé dans le tableau " +
                ">> suppression impossible.");
        } else {
            delete this.mapPlugins[ Elt[ "name" ] ];
            this.list.splice(idx, 1);
        }
        return this;
    }

    push(newElt: HornetPluginConfig<T>) {
        this.mapPlugins[ newElt[ "name" ] ] = newElt;
        this.list.push(newElt.name);
        return this;
    }
}
