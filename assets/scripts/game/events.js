'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onGetMonsters = function () {
  event.preventDefault()
  api.getMonsters()
  .then(ui.getMonstersSuccess)
  .catch(ui.getMonstersFailure)
}

const onCreateMonster = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createMonster(data)
    .then(ui.createMonsterSuccess)
    .catch(ui.createMonsterFailure)
}

const onGoBackToOverview = function () {
  console.log('go back')
  ui.goBack()
}

const addHandlers = () => {
  $('#get-monsters').on('click', onGetMonsters)
  $('#create-monster').on('submit', onCreateMonster)
  $('#back-to-overview').on('click', onGoBackToOverview)
}

module.exports = {
  addHandlers
}