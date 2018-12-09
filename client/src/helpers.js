export function changeBackground(color) {
    document.body.style.backgroundColor = color;
}


export function capitalize(string) {
    let split = string.split(' ');
    let list = [];
    split.forEach((word) => list.push(word.charAt(0).toUpperCase() + word.slice(1)));
    return list.join(' ');
}

// Used to get labels and dates
export function getPastWeek() {
    return '0123456'.split('').map(function (n) {
        let d = new Date();
        d.setDate(d.getDate() - n);

        return (function (day, month) {
            return [day < 10 ? '0' + day : day, month < 10 ? '0' + month : month].join('/');
        })(d.getDate(), d.getMonth());
    }).join(',');
}