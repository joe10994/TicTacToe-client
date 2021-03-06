'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const logic = require('../game/logic')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  $('.loading').show()
  $('#messages').text('Signing up...')
  // sign up request
  api
    .signUp(data)
    // if sign up successful then make sign in request
    .then(response => {
      return api.signIn(data)
    })
    // if sign in successful then run signInSuccess
    .then(ui.signInSuccess)
    .then(response => {
      $('form').trigger('reset')
    })
    .catch(ui.signUpFailure)
    .then(response => {
      $('form').trigger('reset')
      $('.loading').hide()
    })
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  $('.loading').show()
  $('#messages').text('Signing in...')
  api
    .signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
    .then(response => {
      $('form').trigger('reset')
      $('.loading').hide()
    })
}
const onSignOut = function (event) {
  event.preventDefault()
  $('.loading').show()
  $('#messages').text('Signing out...')
  api
    .signOut()
    .then(ui.signOutSuccess)
    .then(logic.turnAiOff)
    .catch(ui.signOutFailure)
    .then(response => {
      $('.loading').hide()
    })
}

const onChangePassword = function (event) {
  event.preventDefault()
  $('.loading').show()
  $('#messages')
    .show()
    .text('Attempting to change password ...')
  const data = getFormFields(event.target)
  api
    .changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
    .then(response => {
      $('.loading').hide()
      $('#messages').text('')
    })
}
const autoSignIn = function (event) {
  const email = '1@1'
  const password = '1'
  const data = {
    credentials: {
      email: '1@1',
      password: '1'
    }
  }
  api
    .signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}
const addHandlers = () => {
  $('.dummy').on('click', autoSignIn)
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password-form').on('submit', onChangePassword)
  $('#change-password').on('click', ui.openPWChange)
  $('#cancel').on('click', ui.closePWChange)
}

module.exports = {
  addHandlers
}
