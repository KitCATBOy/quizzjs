class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Un de vos collègues vole votre travail et se l’approprie que faites vous ?", ["Au début c'était stressant et vous aviez du mal à vous adapter.", "Vous avez mis un peu de temps à vous adapter dû à la gestion de votre stress.", "Vous avez apprécié, cela vous a permis d'apprendre à gérer votre stress."], "Réponse 4"),
    new Question("Un de vos collègues vole votre travail et se l’approprie que faites vous ?", ["Réponse 1", "Réponse 2", "Réponse 3"], "Réponse 4"),
    new Question("Un de vos collègues vole votre travail et se l’approprie que faites vous ?", ["Réponse 1", "Réponse 2", "Réponse 3"], "Réponse 4")
  ];

  class Explication {
      constructor(explication){
          this.explication = explication;
      }
      isExplication(explication){
          return this.explication === explication;
      }

  }
  let explications = [
    new Explication("Explication Question 0"),
    new Explication("Explication Question 0"),
    new Explication("Explication Question 0")
];


  
  class Quiz {
    constructor(questions, explications) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.explications = explications;
      this.currentExplicationIndex = 0;

    }
  
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
      
    }
    getCurrentExplication(){
        return this.explications[this.currentExplicationIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            
            this.score++;
            
        }
        this.currentExplicationIndex++;
        this.currentQuestionIndex++;


    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
  }

  
  const display = {
    elementShown: function(id, text, explication) {
      let element = document.getElementById(id);
      element.innerHTML = text;
      element.innerHTML = explication;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
      
    },
    explication: function() {
        this.elementShown("explication", explication.getCurrentExplication().explications);
      },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  let explication = new Explication(explications)
  quizApp();