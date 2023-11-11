"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseNameGen = void 0;
var DatabaseNameGen = function (req, res, next) {
    if (!(req.url === '/Admin-Registration' || req.method === 'Post')) {
        next();
        return;
    }
    var s = '!#%&()+,-0123456789;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{}~';
    var result = '';
    for (var i = 0; i < 37; i++) {
        var randomIndex = Math.floor(Math.random() * s.length);
        result += s.charAt(randomIndex);
    }
    console.log("generated name: ".concat(result));
    req.body.databaseName = result;
    console.log(result);
    next();
};
exports.DatabaseNameGen = DatabaseNameGen;
