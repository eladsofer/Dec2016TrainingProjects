var Point = (function () {
    function Point() {
    }
    Point.prototype.dump = function () {
        console.log("dump");
    };
    return Point;
}());
var pt = new Point();
pt.dump();
pt.blabla();
