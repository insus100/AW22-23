"use strict";
/**
 * Santiago Marcitllach Arias
 * Íñigo Velasco Sánchez
 */

let listaTareas = [
    {text:"Preparar prácticas AW", tags:["universidad","awt"]}, 
    {text: "Mirar fechas congreso", done: true, tags:[]}, 
    {text: "Ir al supermercado", tags: ["personal", "básico"]}, 
    {text: "Jugar al fútbol", done: false, tags:["personal", "deportes"]}, 
    {text: "Hablar con profesor", done: false, tags:["universidad", "tp2"]}
    ];

function getToDoTasks(tasks){
    const f = tasks.filter(t => t.done !== true);
    return f.map(f => f.text)
}

function findByTag(tasks, tag){
    return tasks.filter(t => t.tags.includes(tag));
}

/**
 * 
 * @param {array} tasks 
 * @param {array} tags 
 * @returns 
 */

function findByTags(tasks, tags){
    return tasks.filter(t => tags.some(t2 => t.tags.includes(t2)));
}

/**
 * 
 * @param {array} tasks 
 * @returns 
 */
function countDone(tasks){
    const f = tasks.filter(t => t.done === true);
    return f.map(f => f.text).length;
}

/**
 * 
 * @param {string} texto 
 * @returns 
 */
function createTask(texto){
    const expr = new RegExp(/(?<=\@).\w*/g);
    const matches = texto.match(expr);
    texto = texto.replace(/\s\@\w*/g, "");
    let res = [{text : texto, tags : matches}];
    return res;
}
console.log(JSON.stringify(getToDoTasks(listaTareas)));
console.log(JSON.stringify(findByTag(listaTareas, "personal")));
console.log(JSON.stringify(findByTags(listaTareas, ["personal", "practica"])));
console.log(JSON.stringify(countDone(listaTareas)));
console.log(JSON.stringify(createTask("Ir al medico @personal @salud")));