const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
//const choices = Array.from(document.querySelector('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion ={}
let acceptingAnswers= true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {	question: "Do you try to cut down on your phone use without much success?",
	    choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
	    answer: 4,
    },
    { 	question: "Do you ever feel that you lose large amounts of time mindlessly checking apps or browsing the Internet on your phone?",
	    choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
	    answer: 1,
    },
    { 	question: "Do you ever feel anxious or restless when you cannot access your phone, such as when the battery has run out or you’ve forgotten it?",
	    choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
	    answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = ()=> {
    questionCounter = 0
    score=0
availableQuestions = [...questions]
//   availableQuestions = questions
   console.log("hello")
   console.log(availableQuestions)
    getNewQuestion()
}

getNewQuestion = ()=>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    
    console.log("number 1")
    console.log(availableQuestions)

    console.log("after displaying available questions")

    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width =`${(questionCounter/MAX_QUESTIONS)*100}%`

   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   console.log('=====')
   console.log(questionsIndex)

    currentQuestion = availableQuestions[questionsIndex]
    console.log("****")
    console.log(currentQuestion)

    question.innerText = currentQuestion.question

    console.log("about to enter")
    console.log(choices)
    choices.forEach(choice =>{
        console.log("inside for each")
        const number = choice.dataset['number']
        console.log(number)
        choice.innerText = currentQuestion['choice' + number]
        //choice.innerText = currentQuestion[1]
        //choice.innerText = "choice1 222"

        console.log(choice)

    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        console.log('___')
        acceptingAnswers= false
        const selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer = currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)

        }

	selectedChoice.parentElement.classList.add(classToApply)


	setTimeout(() =>{
    	selectedChoice.parentElement.classList.remove(classToApply)
   	 getNewQuestion()

	},1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
