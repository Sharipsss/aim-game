const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeCounter = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#AAF683', '#EE6055', '#FF9B85', '#5B3758', '#F9ADA0', '#25283D', '#3F7CAC']
let score = 0
let time = 0

startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	scrollDown(0)
})

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})

function startGame() {
	setInterval(decraseTime, 1000)
	setTime(time)
	scrollDown(1)
	createRandomCircle()

}

function decraseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (time < 10) {
			current = `0${current}`
		}
		setTime(current)
	}
}

function setTime(value) {
	timeCounter.innerHTML = `00:${value}`
}

function scrollDown(screen) {
	screens[screen].classList.add('up')
}

function randomCircleColor() {
	const index = Math.floor(Math.random() * colors.length)
	return colors[index]
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const { width, height } = board.getBoundingClientRect()
	const randomSize = getRandomNumber(15, 40)
	const randomPosX = getRandomNumber(0, width - randomSize)
	const randomPosY = getRandomNumber(0, height - randomSize)
	const color = randomCircleColor()

	circle.classList.add('circle')
	circle.style.top = `${randomPosY}px`
	circle.style.left = `${randomPosX}px`
	circle.style.width = `${randomSize}px`
	circle.style.height = `${randomSize}px`
	circle.style.background = `${color}`
	circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`

	board.append(circle)
}

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
	board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`
}