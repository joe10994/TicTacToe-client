let currentTurn = 'x'
const occupiedSpots = new Array(9)

const onAttemptTurn = function (event) {
  if (!($(`#${this.id}`).hasClass('clicked'))) { // if the spot on the board does not have the class clicked ,  add the move to the board and add the class to the spot
    $(`#${this.id}`).text(currentTurn).addClass('clicked')
    occupiedSpots[this.id.slice(3)] = currentTurn // add the move to the occupiedSpots array
    if (checkWin()) {
      console.log('winnah')
    }
    currentTurn === 'x' ? currentTurn = 'o' : currentTurn = 'x'
  }
}

const checkWin = function () {
  let won = false
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [3, 4, 2]]// diagonal
  for (const condition of winConditions) {
    if (occupiedSpots[condition[0]] === currentTurn && occupiedSpots[condition[1]] === currentTurn && occupiedSpots[condition[2]] === currentTurn) {
      won = true
    }
  }
  return won
}
module.exports = {
  onAttemptTurn
}
