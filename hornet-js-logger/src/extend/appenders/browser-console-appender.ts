import { SimpleLayout } from "src/extend/layout/simple-layout";
import * as Log4js from "log4js";

declare global {
    var netscape: any;
    var opera: any;
    var log4jsLogger: any;
    var Components: any;

    interface Window {
        opera?: any;
    }
}
   
/**
 * Internal object extension (OO) methods.
 *
 * @private
 */
let extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};



        /**
     * Abstract base class for other appenders.
     * It is doing nothing.
     *
     * @constructor
     * @param {Log4js.Logger} logger log4js instance this appender is attached to
     * @author Stephan Strittmatter
     */
    class Appender {
        logger;
        layout;

        /**
         * Reference to calling logger
         * @type Log4js.Logger
         * @private
         */
        constructor() {
            this.logger = null;
        }

        /**
         * appends the given loggingEvent appender specific
         * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
         */
        doAppend(loggingEvent) {
            return;
        }
        /**
         * clears the Appender
         */
        doClear() {
            return;
        }

        /**
         * Set the Layout for this appender.
         * @param {Log4js.Layout} layout Layout for formatting loggingEvent
         */
        setLayout(layout) {
            this.layout = layout;
        }

        /**
         * Set reference to the logger.
         * @param {Log4js.Logger} the invoking logger
         */
        setLogger(logger) {
            // add listener to the logger methods
            logger.onlog.addListener(( Log4js as any).bind(this.doAppend, this));
            logger.onclear.addListener(( Log4js as any).bind(this.doClear, this));

            this.logger = logger;
        }
    };

   /**
     * Appender writes the logs to the JavaScript console of Mozilla browser
     * More infos: http://kb.mozillazine.org/index.php?title=JavaScript_Console&redirect=no
     * PLEASE NOTE - Only works in Mozilla browser
     * @constructor
     * @extends Log4js.Appender
     * @param logger log4js instance this appender is attached to
     * @author Stephan Strittmatter
     */
    let MozillaJSConsoleAppender = function() {
        this.layout = new SimpleLayout();
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            this.jsConsole = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
            this.scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
        } catch (e) {
            log4jsLogger.error(e);
        }
    };

    MozillaJSConsoleAppender.prototype = extend(new Appender(), {
        /**
         * @see Log4js.Appender#doAppend
         */
        doAppend: function (loggingEvent) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                this.scriptError.init(this.layout.format(loggingEvent), null, null, null, null, this.getFlag(loggingEvent), loggingEvent.categoryName);
                this.jsConsole.logMessage(this.scriptError);
            } catch (e) {
                log4jsLogger.error(e);
            }
        },

        /**
         * toString
         */
        toString: function () {
            return "Log4js.MozillaJSConsoleAppender";
        },

        /**
         * Map Log4js.Level to jsConsole Flags:
         * <ul>
         * <li>nsIScriptError.errorFlag (0) = Level.Error</li>
         * <li>nsIScriptError.warningFlag (1)= Log4js.Level.WARN</li>
         * <li>nsIScriptError.exceptionFlag (2) = Log4js.Level.FATAL</li>
         * <li>nsIScriptError.strictFlag (4) = unused</li>
         * </ul>
         * @private
         */
        getFlag: function (loggingEvent) {
            var retval;
            switch (loggingEvent.level) {
                case Log4js.levels.FATAL:
                    retval = 2;//nsIScriptError.exceptionFlag = 2
                    break;
                case Log4js.levels.ERROR:
                    retval = 0;//nsIScriptError.errorFlag
                    break;
                case Log4js.levels.WARN:
                    retval = 1;//nsIScriptError.warningFlag = 1
                    break;
                default:
                    retval = 1;//nsIScriptError.warningFlag = 1
                    break;
            }

            return retval;
        }
    });

    /**
     * Appender writes the logs to the JavaScript console of Opera browser
     * PLEASE NOTE - Only works in Opera browser
     * @constructor
     * @extends Log4js.Appender
     * @param logger log4js instance this appender is attached to
     * @author Stephan Strittmatter
     */
    let OperaJSConsoleAppender = function() {
        this.layout = new SimpleLayout();
    };

    OperaJSConsoleAppender.prototype = extend(new Appender(), {
        /**
         * @see Log4js.Appender#doAppend
         */
        doAppend: function (loggingEvent) {


            opera.postError(this.layout.format(loggingEvent));
        },

        /**
         * toString
         */
        toString: function () {
            return "Log4js.OperaJSConsoleAppender";
        }
    });

    /**
     * Appender writes the logs to the JavaScript console of Safari browser
     * PLEASE NOTE - Only works in Safari browser
     * @constructor
     * @extends Log4js.Appender
     * @param logger log4js instance this appender is attached to
     * @author Stephan Strittmatter
     */
    let SafariJSConsoleAppender = function() {
        this.layout = new SimpleLayout();
    };

    SafariJSConsoleAppender.prototype = extend(new Appender(), {
        /**
         * @see Log4js.Appender#doAppend
         */
        doAppend: function (loggingEvent) {
        	 var style;
             var func = null;

             if (loggingEvent.level.toString().search(/ERROR/) != -1) {
                 style = "color:red";
                 func = "error";
             } else if (loggingEvent.level.toString().search(/FATAL/) != -1) {
                 style = "color:magenta";
                 func = "error";
             } else if (loggingEvent.level.toString().search(/WARN/) != -1) {
                 style = "color:orange";
                 func = "warn";
             } else if (loggingEvent.level.toString().search(/DEBUG/) != -1) {
                 style = "color:DeepSkyBlue";
                 func = "debug";
             } else if (loggingEvent.level.toString().search(/INFO/) != -1) {
                 style = "color:green";
                 func = "info";
             } else if (loggingEvent.level.toString().search(/TRACE/) != -1) {
                 style = "color:blue";
                 func = "debug";
             } else {
                 style = "color:grey";
                 func = "log";
             }

            // Seules les stacks pour les logs de type FATAL ou ERROR ( si activé via la cmd isStackErrorLogEnabled("true")) doivent être affichées
            if(func === "error" || func === "fatal" || loggingEvent.logger.isStackLogEnabled() === "true") {
                var stack = loggingEvent.logger.getStack();
                if(!stack) {
                   stack = new Error().stack;
                }

                //le test sur firefox est nécessaire car par défaut groupCollapsed est considéré comme group
                //ce qui rend la lecture des logs illisibles
                if (stack && console.groupCollapsed && navigator.userAgent.indexOf("Firefox/") == -1) {
                    var callLine = "";

                    var stackStr = stack.split("\n");
                    var callCountTotal = 20;
                    var callCount = 0;
                    for (var i in stackStr) {
                        var call = stackStr[i];
                        if (call.indexOf("Error") != 0 && call.indexOf("Log4js") == -1 && call.indexOf("Logger") == -1) {
                            callLine += call + "\n";
                            callCount++;
                            if (callCount == callCountTotal)
                                break;
                        }
                    }
                    console.groupCollapsed("%c " + this.layout.format(loggingEvent), style);
                    console.log(callLine);
                    console.groupEnd();
                } else {
                    console[func].apply(console, ["%c " + this.layout.format(loggingEvent), style]);
                }
            } else {
                console[func].apply(console, ["%c " + this.layout.format(loggingEvent), style]);
            }
        },

        /**
         * toString
         */
        toString: function () {
            return "Log4js.SafariJSConsoleAppender";
        }
    });

    /**
     * JavaScript Console Appender which is browser independent.
     * It checks internally for the current browser and adds delegate to
     * specific JavaScript Console Appender of the browser.
     *
     * @constructor
     * @extends Log4js.Appender
     * @author Stephan Strittmatter
     * @since 1.0
     */
    let BrowserConsoleAppender = function() {
        /**
         * Delegate for browser specific implementation
         * @type Log4js.Appender
         * @private
         */
        this.consoleDelegate = null;

        if (window.console) {
            this.consoleDelegate = new SafariJSConsoleAppender();
        }
        else if (window.opera) {
            this.consoleDelegate = new OperaJSConsoleAppender();
        }
        else if (netscape) {
            this.consoleDelegate = new MozillaJSConsoleAppender();
        }
        else {
            //@todo
            log4jsLogger.error("Unsupported Browser");
        }
    };

    BrowserConsoleAppender.prototype = extend(new Appender(), {
        /**
         * @see Log4js.Appender#doAppend
         */
        doAppend: function (loggingEvent) {
            this.consoleDelegate.doAppend(loggingEvent);
        },
        /**
         * @see Log4js.Appender#doClear
         */
        doClear: function () {
            this.consoleDelegate.doClear();
        },
        /**
         * @see Log4js.Appender#setLayout
         */
        setLayout: function (layout) {
            this.consoleDelegate.setLayout(layout);
        },

        /**
         * toString
         */
        toString: function () {
            return "Log4js.BrowserConsoleAppender: " + this.consoleDelegate.toString();
        }
    });


