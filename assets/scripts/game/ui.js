'use strict'

const store = require('../store.js')
const api = require('./api')
const showMonstersTemplate = require('../templates/monsters.handlebars')
const showMonsterDetailTemplate = require('../templates/monster-detail.handlebars')
const monsterObject = require('./monster.js')

const monster = new monsterObject.Monster()

const getMonstersSuccess = function (data) {
  store.data = data
  store.data.monsters.forEach(function (e) {
    for (const key in monster) {
      if (monster.hasOwnProperty(key)) {
        monster[key] = e[key]
      }
    }
    if (monster.eatAndPoop()) updateMonster()
  })

  const showMonsterHTML = showMonstersTemplate({ monsters: data.monsters })
  $('.content').empty()
  $('.content').append(showMonsterHTML)
  addHandlebarsEvents()
}

const getMonstersFailure = function () {

}

const createMonsterSuccess = function (data) {
  getMonsters()
  $('#create-monster-modal').modal('toggle')
}

const createMonsterFailure = function () {

}

const deleteMonsterSuccess = function () {
}

const deleteMonsterFailure = function () {
}

const addHandlebarsEvents = function () {
  $('#delete-monster').on('click', function (event) {
    const id = $(event.target).attr('data-id')
    $(event.target).parent().remove()
    $('.monster-detail').html("Take in, long your breath.<br>Keep trust and never kill the faith.<br>And end isn't the death.")
    api.deleteMonster(id)
      .then(deleteMonsterSuccess)
      .catch(deleteMonsterFailure)
  })
  $('.view_monster').on('click', function (event) {
    const id = $(event.target).parent().parent().attr('data-id')
    getMonster(id)
  })

  $('#poop-image').on('click', function (event) {
    if (monster.hunger < 5 && monster.status !== 'dead') {
      monster.clean()
      updateAndGetMonster()
    }
  })
}

const feedMonster = function (event) {
  event.preventDefault()
  console.log('feeding');
  if (monster.hunger < 5 && monster.status !== 'dead') {
    monster.feed()
    updateAndGetMonster()
  }
}

const setMonsterParams = function (data) {
  for (const key in monster) {
    if (monster.hasOwnProperty(key)) {
      monster[key] = data.monster[key]
    }
  }
}

const getMonsterSuccess = function (data) {
  setMonsterParams(data)
  if (monster.eatAndPoop()) {
    updateMonster()
  }
  $('#monsters_overview').hide()
  $('#monster_details').show()
  const showMonsterHTML = showMonsterDetailTemplate({monster})
  $('.monster-detail').empty()
  $('.monster-detail').append(showMonsterHTML)
  addHandlebarsEvents()
}

const getMonsterFailure = function (error) {
  console.log(error)
}

const updateMonsterSuccess = function () {
  getMonsters()
}

const updateMonsterFailure = function (error) {
  console.log(error)
}

const updateMonster = function () {
  const data = {'monster': {}}
  for (const key in monster) {
    if (typeof monster[key] === 'function') continue
    data.monster[key] = monster[key]
  }
  api.updateMonster(data)
    .then(updateMonsterSuccess)
    .catch(updateMonsterFailure)
}

const updateAndGetMonster = function () {
  const data = {'monster': {}}
  for (const key in monster) {
    if (typeof monster[key] === 'function') continue
    data.monster[key] = monster[key]
  }
  api.updateMonster(data)
    .then(getMonsterOnUpdateSuccess)
    .catch(updateMonsterFailure)
}

const getMonsterOnUpdateSuccess = function () {
  const id = monster.id
  api.getMonster(id)
    .then(getMonsterSuccess)
    .catch(getMonsterFailure)
}

const getMonster = function (id) {
  api.getMonster(id)
    .then(getMonsterSuccess)
    .catch(getMonsterFailure)
}

const getMonsters = function () {
  api.getMonsters()
    .then(getMonstersSuccess)
    .catch(getMonstersFailure)
}

const goBack = function () {
  $('#monsters_overview').show()
  $('#monster_details').hide()
  getMonsters()
}

module.exports = {
  getMonstersSuccess,
  getMonstersFailure,
  createMonsterSuccess,
  createMonsterFailure,
  deleteMonsterSuccess,
  deleteMonsterFailure,
  getMonsters,
  goBack,
  feedMonster
}
