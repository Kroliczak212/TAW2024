
interface Movable {
    move(dx: number, dy: number): void;
    rotate?(angle: number): void;
    scale?(factor: number): void;
}

export class Point implements Movable {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    public rotate(angle: number): void {
        const angleInRadians = angle * (Math.PI / 180);
        const xNew = this.x * Math.cos(angleInRadians) - this.y * Math.sin(angleInRadians);
        const yNew = this.x * Math.sin(angleInRadians) + this.y * Math.cos(angleInRadians);

        this.x = xNew;
        this.y = yNew;
    }
}

export class Rectangle implements Movable {
    a: Point;
    b: Point;
    c: Point;
    d: Point;

    constructor(a: Point, b: Point, c: Point, d: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public move(dx: number, dy: number): void {
        this.a.move(dx, dy);
        this.b.move(dx, dy);
        this.c.move(dx, dy);
        this.d.move(dx, dy);
    }

    public rotate(angle: number): void {
        this.a.rotate(angle);
        this.b.rotate(angle);
        this.c.rotate(angle);
        this.d.rotate(angle);
    }

    public scale(factor: number): void {
        const centerX = (this.a.x + this.b.x + this.c.x + this.d.x) / 4;
        const centerY = (this.a.y + this.b.y + this.c.y + this.d.y) / 4;

        const scalePoint = (point: Point) => {
            point.x = centerX + (point.x - centerX) * factor;
            point.y = centerY + (point.y - centerY) * factor;
        };

        scalePoint(this.a);
        scalePoint(this.b);
        scalePoint(this.c);
        scalePoint(this.d);
    }

    getArea(): number {
        const width = Math.abs(this.a.x - this.b.x);
        const height = Math.abs(this.a.y - this.d.y);
        return width * height;
    }

    getPerimeter(): number {
        const width = Math.abs(this.a.x - this.b.x);
        const height = Math.abs(this.a.y - this.d.y);
        return 2 * (width + height);
    }
}

export class Square extends Rectangle {
    constructor(topLeft: Point, sideLength: number) {
        const bottomLeft = new Point(topLeft.x, topLeft.y + sideLength);
        const topRight = new Point(topLeft.x + sideLength, topLeft.y);
        const bottomRight = new Point(topLeft.x + sideLength, topLeft.y + sideLength);

        super(topLeft, topRight, bottomRight, bottomLeft);
    }

    public scale(factor: number): void {
        super.scale(factor);
    }
}

// Tworzenie prostokąta
const pointA = new Point(1, 0);
const pointB = new Point(3, 0);
const pointC = new Point(3, 2);
const pointD = new Point(1, 2);
const rectangle = new Rectangle(pointA, pointB, pointC, pointD);

console.log("Początkowe współrzędne prostokąta:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);

// Testowanie obliczeń
console.log("Obwód prostokąta:", rectangle.getPerimeter());
console.log("Pole prostokąta:", rectangle.getArea());

// Testowanie obrotu
rectangle.rotate(90);  // Obrót o 90 stopni
console.log("Po obrocie o 90 stopni:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);

// Testowanie skalowania
rectangle.scale(2);  // Skalowanie o współczynnik 2
console.log("Po skalowaniu o współczynnik 2:");
console.log("A:", rectangle.a);
console.log("B:", rectangle.b);
console.log("C:", rectangle.c);
console.log("D:", rectangle.d);

// Tworzenie kwadratu
const square = new Square(new Point(0, 0), 2);
console.log("Początkowy kwadrat:");
console.log("A:", square.a);
console.log("B:", square.b);
console.log("C:", square.c);
console.log("D:", square.d);


