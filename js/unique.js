function unique(x) {
    return x.reverse().filter(function (e, i, x) {return x.indexOf(e, i+1) === -1;}).reverse();
}