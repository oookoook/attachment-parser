const pdf = require('pdf-parse');

let debug = false;

const matchRegex = function(text, regex) {
    if(debug) {
        console.debug(text);
    }
    var r = new RegExp(regex);
    var m =  text.match(r);
    if(m && m.length) {
        return m[1];
    }
    return null;
}

const presets = {
    gsuite_invoice: (text) => { return { amount: matchRegex(text, "Total in EUR\n€(\\d+\\.\\d+)") };},
    aws_invoice: (text) => { return { amount: matchRegex(text, "TOTAL AMOUNTUSD (\\d+\\.\\d+)"), number: matchRegex(text, "VAT Invoice Number:((\\d|\\w|-)+)") }}
}

const getContent = async function(body, preset, regex) {
    var content = await pdf(body);
    if(preset && presets[preset]) {
        return presets[preset](content.text);
    } else if(regex) {
        return { match: matchRegex(content.text, regex) };
    }
    return { text: content.text };
}

module.exports = {
    getContent,
    debug: (d) => { debug = d; }
}