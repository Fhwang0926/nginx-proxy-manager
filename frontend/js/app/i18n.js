const Cache    = ('./cache');
const messages = require('../i18n/messages.json');
const _lang = 'ko'

/**
 * @param {String}  namespace
 * @param {String}  key
 * @param {Object}  [data]
 */
module.exports = function (namespace, key, data) {
    let locale = Cache.locale;
    // check that the locale exists
    if (typeof messages[locale] === 'undefined') {
        locale = _lang;
    }

    if (typeof messages[locale][namespace] !== 'undefined' && typeof messages[locale][namespace][key] !== 'undefined') {
        return messages[locale][namespace][key](data);
    } else if (locale !== _lang && typeof messages[_lang][namespace] !== 'undefined' && typeof messages[_lang][namespace][key] !== 'undefined') {
        return messages[_lang][namespace][key](data);
    }

    return '(MISSING: ' + namespace + '/' + key + ')';
};
