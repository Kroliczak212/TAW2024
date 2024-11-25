"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Square = exports.Rectangle = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    Point.prototype.rotate = function (angle) {
        var angleInRadians = angle * (Math.PI / 180);
        var xNew = this.x * Math.cos(angleInRadians) - this.y * Math.sin(angleInRadians);
        var yNew = this.x * Math.sin(angleInRadians) + this.y * Math.cos(angleInRadians);
        this.x = xNew;
        this.y = yNew;
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    Rectangle.prototype.move = function (dx, dy) {
        this.a.move(dx, dy);
        this.b.move(dx, dy);
        this.c.move(dx, dy);
        this.d.move(dx, dy);
    };
    Rectangle.prototype.rotate = function (angle) {
        this.a.rotate(angle);
        this.b.rotate(angle);
        this.c.rotate(angle);
        this.d.rotate(angle);
    };
    Rectangle.prototype.scale = function (factor) {
        var centerX = (this.a.x + this.b.x + this.c.x + this.d.x) / 4;
        var centerY = (this.a.y + this.b.y + this.c.y + this.d.y) / 4;
        var scalePoint = function (point) {
            point.x = centerX + (point.x - centerX) * factor;
            point.y = centerY + (point.y - centerY) * factor;
        };
        scalePoint(this.a);
        scalePoint(this.b);
        scalePoint(this.c);
        scalePoint(this.d);
    };
    Rectangle.prototype.getArea = function () {
        var width = Math.abs(this.a.x - this.b.x);
        var height = Math.abs(this.a.y - this.d.y);
        return width * height;
    };
    Rectangle.prototype.getPerimeter = function () {
        var width = Math.abs(this.a.x - this.b.x);
        var height = Math.abs(this.a.y - this.d.y);
        return 2 * (width + height);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(topLeft, sideLength) {
        var bottomLeft = new Point(topLeft.x, topLeft.y + sideLength);
        var topRight = new Point(topLeft.x + sideLength, topLeft.y);
        var bottomRight = new Point(topLeft.x + sideLength, topLeft.y + sideLength);
        return _super.call(this, topLeft, topRight, bottomRight, bottomLeft) || this;
    }
    Square.prototype.scale = function (factor) {
        _super.prototype.scale.call(this, factor);
    };
    return Square;
}(Rectangle));
exports.Square = Square;
// Tworzenie prostokąta
var pointA = new Point(1, 0);
var pointB = new Point(3, 0);
var pointC = new Point(3, 2);
var pointD = new Point(1, 2);
var rectangle = new Rectangle(pointA, pointB, pointC, pointD);
console.log("Początkowe współrzędne prostokąta:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);
// Testowanie obliczeń
console.log("Obwód prostokąta:", rectangle.getPerimeter());
console.log("Pole prostokąta:", rectangle.getArea());
// Testowanie obrotu
rectangle.rotate(90); // Obrót o 90 stopni
console.log("Po obrocie o 90 stopni:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);
// Testowanie skalowania
rectangle.scale(2); // Skalowanie o współczynnik 2
console.log("Po skalowaniu o współczynnik 2:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);
// Tworzenie kwadratu
var square = new Square(new Point(0, 0), 2);
console.log("Początkowy kwadrat:");
console.log("A:", square.a);
console.log("B:", square.b);
console.log("C:", square.c);
console.log("D:", square.d);
