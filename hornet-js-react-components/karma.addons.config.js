const path = require("path");

module.exports = (karmaConfig, project) => {
    karmaConfig.files.push({pattern: "**/*.svg", included: false, served: true});
    karmaConfig.files.push({pattern: "**/*.ttf", included: false, served: true});
    karmaConfig.files.push({pattern: "**/appli.min.css", included: false, served: true});
    karmaConfig.proxies = {};
    karmaConfig.proxies[`/theme/img/`] = "/base/src/widget/component/img/sprite/";
    karmaConfig.proxies[`/${project.name}/static-${project.packageJson.version}/theme/img/`] = "/base/src/widget/component/img/sprite/";
    karmaConfig.proxies[`/${project.name}/static-${project.packageJson.version}/theme/fonts/`] = "/base/src/widget/component/fonts/";
    return karmaConfig;
}