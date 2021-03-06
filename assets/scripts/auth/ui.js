'use strict'
const store = require('../store')
const gameApi = require('../game/api')
const gameUi = require('../game/ui')
const ui_toggles = require('../ui_toggles/ui')
const ai = require('../game/ai')

const signUpSuccess = function (response) {
  $('#messages').text('Successfully Signed Up! Please Sign In')
  $('.warnings').text('')
}
const signUpFailure = function () {
  $('.warnings').text('Failed to Sign Up!')
  $('#messages').text('')
}

const signInSuccess = function (response) {
  $('#messages').text('Successfully Signed In! Click on New Game to play!')
  $('.warnings').text('')
  store.user = response.user
  loggedIn = true
  gameApi.getGames()
    .then(gameUi.getGamesSuccess)
    .catch(gameUi.getGamesFail)
  changeView()
}
const signInFailure = function () {
  $('.warnings').text('Failed to Sign In!')
  $('#messages').text('')
  setTimeout(function () {
    $('.warnings').text('')
  }, 2000)
}

const signOutSuccess = function () {
  $('#messages').text('Signed out successfully')
  $('#stats').text('')
  $('.warnings').text('')
  store.user = null
  ai.resetSession()
  store.temp = null
  loggedIn = false
  changeView()
  ui_toggles.endCrazyMode()
}
const signOutFailure = function () {
  $('.warnings').text('Error on sign out')
}

const changePasswordSuccess = function (response) {
  $('form').trigger('reset')
  $('#messages').text('Successfully Changed Password')
  $('#pw-form').hide()
  $('.gameBoard').show()
  $('.warnings').text(warnings)
  $('#messages').show()
  $('#create-game').show()
  $('.light-toggle').hide()
}
const changePasswordFailure = function (response) {
  $('form').trigger('reset')
  $('.warnings').text('Failed to Change Password')
}
let warnings
let messages
const openPWChange = function () {
  warnings = $('.warnings').text()
  messages = $('#messages').text()
  $('#pw-form').show()
  $('.gameBoard').hide()
  $('#messages').text('')
  $('.warnings').text('')
  $('.light-toggle').show()
  $('#stats').hide()
}
const closePWChange = function () {
  $('#pw-form').hide()
  $('.gameBoard').show()
  $('#messages').text(messages)
  $('.warnings').text(warnings)
  $('.light-toggle').hide()
  $('#stats').show()
}

let loggedIn = false
const changeView = function () {
  if (!loggedIn) {
    $('.signedOut').show()
    $('.gameBoard').hide()
    $('#create-game').hide()
    $('.light-toggle').show()
  } else {
    $('.signedOut').hide()
    $('#create-game').show()
    $('.gameBoard').show()
    $('#play').hide()
    $('.light-toggle').hide()
  }
} // toggle several elements based on logged in state

module.exports = {
  signUpFailure,
  signUpSuccess,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  openPWChange,
  closePWChange,
  changePasswordFailure,
  changePasswordSuccess

}
