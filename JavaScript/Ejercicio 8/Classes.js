
class Figura {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {string} color 
     */
    constructor(x, y, color = "#000000") {
        this.x = x;
        this.y = y;
        this._color = color;
    }

    get color() {
        return this._color;
    }
    /**
     * @param {string} c 
     */
    set color(c) {
        //regex ver si c es color
        const regex = new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/);
        if(c.match(regex)) this._color = c;
        else this._color = "#000000";
    }

    esBlanca() {
        return this._color === "#FFFFFF" ? true : false;
    }

    pintar() {
        console.log(`Nos movemos a la posicion ([${this.x}], [${this.y}])\nCogemos la pintura de color [${this._color}]`);
    }
}

class Elipse extends Figura {
    constructor(x, y, rh, rv) {
        super(x, y);
        this.rh = rh;
        this.rv = rv;
    }

    pintar() {
        super.pintar();
        console.log(`Pintamos elipse de radios [${this.rh}] y [${this.rv}]`);
    }
}

class Circulo extends Elipse {
    constructor(x, y, r) {
        super(x, y, r, r);
    }

    pintar() {
        super.pintar();
    }
}


const circulo = new Circulo(0, 0, 23);
const figura = new Figura(0, 0);
circulo.pintar();
figura.pintar();