"use strict"
/**
 *  Volume 1:
 *     section 1, video 1:
 *         What are Pure Functions
 */

const people = ['Robert', 'Arya', 'Catelyn' , 'Tyrion'];
let lives = 3;

function playerLostImpure() {
  return lives--;
}

function addPersonImpure(name) {
  return people.push(name);
}

let playerLives = playerLostImpure();


