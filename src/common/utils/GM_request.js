
/**
 * GM_xmlhttpRequest Promise 版
 *
 * @export
 * @param {string} url
 * @param {object} [opt={}]
 * @returns {Promise<string>}
 */
export function GM_request(url, opt = {}) {
    return new Promise((resolve, reject) => {
        opt = Object.assign(opt, {
            method: "GET",
            url,
            onload: function (response) {
                resolve(response.responseText)
            }
        });

        GM_xmlhttpRequest(opt);
    });
}