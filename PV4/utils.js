"use strict";

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
    let res = {text : texto, tags: matches};
    return res;
}

module.exports = {
    createTask
}