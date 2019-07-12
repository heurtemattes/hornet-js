const path = require("path");

const externals = [
    new RegExp(path.join("src", "services", "data") + "/.*"),
    new RegExp(path.join("src", "dao") + "/.*"),
    /src\/middleware\/.*/,
    new RegExp(path.join("src", "services", "data") + "/.*-data-\.*"),
    "hornet-js-database",
    "config",
    "continuation-local-storage",
    "sequelize",
    "pdfmake",
    "carbone",
    "csv-parser",
    "nodemailer",
    "tls",
    "child_process",
    "net",
    "fs",
    "dns"
];

module.exports = (karmaConfig, project, conf, helper, webpackConfigPart) => {
    karmaConfig.webpack.externals = (context, request, callback) => {
        if( /log4js\/lib\/appenders/.test(context) && (!/console/.test(request) && (!/adapters/.test(request))) && (/^\.\//.test(request))) {
            return callback(null, "{}");
        } 
        for (let i = 0; i < externals.length; i++) {
            let extern = externals[i];
            if (extern.test) { // c'est une regexp'
                if (extern.test(request)) {
                    return callback(null, "{}");
                }
            } else if (request == extern) {
                return callback(null, "{}");
            }
        }

        return callback();
    };
    return karmaConfig;
}