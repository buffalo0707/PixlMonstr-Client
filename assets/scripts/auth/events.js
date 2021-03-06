'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onPageLoad = function () {
  ui.changeElementDisplay('show-signed-in', 'hide')
  ui.changeElementDisplay('alert', 'hide')
  ui.changeElementDisplay('game-inner-view', 'hide')
}

const onSignUp = function (event) {
  // this refers to event.target
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out-nav').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-in-sign-up').on('click', function () {
    $('#sign-in-alert').hide()
  })
  $('#sign-in-modal, #sign-up-modal, #change-password-modal, #create-monster-modal').on('hidden.bs.modal', function (e) {
    $(this)
        .find('input,textarea,select')
        .val('')
        .end()
        .find('input[type=checkbox], input[type=radio]')
        .prop('checked', '')
        .end()
  })
}

module.exports = {
  addHandlers,
  onPageLoad
}
