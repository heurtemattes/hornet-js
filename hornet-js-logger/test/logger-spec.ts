/* license_header */

import { Logger } from "src/logger";
const logger = new Logger("hornet-js-logger.test.logger-spec");
import * as Log4jsNode from "log4js";

describe("Logger", () => {

    before(() => {
        Logger.prototype.buildLogger = getLoggerBuilder({
            "disableClustering": true,
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
    });


    
    it("should log strings", (done) => {
        logger.trace("Trace !");
        logger.debug("Debug !");
        logger.info("Info !");
        logger.warn("Warn !");
        logger.error("Error !");
        logger.fatal("Fatal !");
        logger.log("inexistantLevel', 'Default: Error");
        done();
    });

    it("should log complexe pattern", (done) => {
        logger.trace("Trace !", new Error("My Error Message"));
        logger.debug("Debug !", "second message");
        logger.info("Info !", { debug: "it works" });
        logger.warn("Warn !", { debug: "it works" });
        logger.error("Error !", "Test error");
        logger.fatal("Fatal !", { debug: "it works" });
        logger.log("inexistantLevel", "Default: Error", "Test default");
        done();
    });

    it("should log complexe pattern with log fn", (done) => {
        logger.log("debug", { debug: "it works" }, new Error("has expected"));
        done();
    });
});

function getLoggerBuilder(logConfig) {
    Object.keys(logConfig.appenders).forEach((keyAppender) => {
        let appender = logConfig.appenders[ keyAppender ];
        if (appender.layout) {
            appender.layout.tokens = { }
        }
    }
    );

    Log4jsNode.configure(logConfig);

    var consoleLogger = Log4jsNode.getLogger("hornet-js.console");


    return function (category) {
        this.log4jsLogger = Log4jsNode.getLogger(category);
    };
}

