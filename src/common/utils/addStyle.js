
function addStyle(css) {
    var heads = document.getElementsByTagName('head');
    if (heads.length > 0) {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.innerHTML = css;
        heads[0].appendChild(node);
    }
}

export default addStyle