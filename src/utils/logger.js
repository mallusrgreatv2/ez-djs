const chalk = require('chalk');
/**
 * 
 * @param {String} text 
 * @param {"error" | "success" | "info"} type 
 */
module.exports = (text, type = "info") => {
    if(type !== 'success' || type !== 'info' || type !== 'error') {
        return console.error(`[ezdjs:logger] Invalid type: ${type}`);
    }
    if(type === "info") {
        return console.log(chalk.bgGreen(text));
    };
    if(type === "error") {
        return console.log(chalk.red(text));
    };
    if(type === "success") {
        return console.log(chalk.green(text));
    }
}