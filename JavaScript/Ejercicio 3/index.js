let personas = [
    {nombre: "Ricardo", edad: 63},
    {nombre: "Paco", edad: 55},
    {nombre: "Enrique", edad: 32},
    {nombre: "Adrián", edad: 34},
    {apellido: "García", edad: 28}
    ];

/**
 * 
 * @param {array} array 
 * @param {Object} modelo 
 */
function where(array, modelo) {
    let arr = [];
    const claves = Object.keys(modelo);
    if(claves.length === 0) return arr;
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < claves.length; j++) {
            if(modelo[claves[j]] !== undefined && array[i][claves[j]] !== undefined && array[i][claves[j]] === modelo[claves[j]])
                arr.push(array[i]);
        }
    }
    return arr;
}

console.log(JSON.stringify(where(personas, { edad: 34 })))