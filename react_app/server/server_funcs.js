
exports.shuffle = function (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

exports.getKeyByValue = function (object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
