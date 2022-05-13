const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion ={}
let acceptingAnswers= true
let score = 0
let questionCounter = 0
let availableQuestions = []
let results=""
let questions = [
    {	question: "Do you try to cut down on your phone use without much success?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "Do you ever feel that you lose large amounts of time mindlessly checking apps or browsing the Internet on your phone?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "Do you ever feel anxious or restless when you cannot access your phone, such as when the battery has run out or you’ve forgotten it?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    {	question: "Do you feel your use of your cell or smartphone decreases your productivity at times?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "Do you feel reluctant to be without your cell or smartphone, even for a short time?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "Do you feel ill-at-ease or uncomfortable when you accidentally leave your smartphone in the car or at home, have no service or have a broken phone?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "When you eat meals, is your cell or smartphone always part of the table place setting?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    },
    { 	question: "Do you find yourself mindlessly checking your cell or smartphone many times a day, even when you know there is likely nothing new or important to see?",
	      choice1: "Never",
        choice2: "Rarely",
        choice3: "Sometimes",
        choice4: "Often",
    }
]

const SCORE_NEVER = 0
const SCORE_RARELY = 1
const SCORE_SOMETIMES= 2
const SCORE_OFTEN=3

const MAX_QUESTIONS = 8

startGame = ()=> {
    questionCounter = 0
    score=0
	availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = ()=>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        if (score>=19){
          results="You have a strong addition to your phone"
        }else if(score<18 && score>10){
          results="You have a mild addition to your phone"
        }else{
          results="Congratulations no results of phone addiction"
        }

     console.log(results)
     window.alert(results)
     return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width =`${(questionCounter/MAX_QUESTIONS)*100}%`
    console.log(progressBarFull.style.width)

   const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   currentQuestion = availableQuestions[questionsIndex]
   question.innerText = currentQuestion.question
   choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers= false
        const selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']
        switch (selectedAnswer) {
          case "1":
          incrementScore(SCORE_NEVER)
          console.log(score)
          break;
          case "2":
          incrementScore(SCORE_RARELY)
          break;
          case "3":
          incrementScore(SCORE_SOMETIMES)
          break;
          case "4":
          incrementScore(SCORE_OFTEN)
          break;
        }

	setTimeout(() =>{
    	 getNewQuestion()

	},1000)
    })


})

incrementScore = num => {
    score += num
    scoreText.innerText = score
    console.log(score)
}

startGame()
