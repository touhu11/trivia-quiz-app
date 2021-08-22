/**************************************************
     Capstone Project: Creating the Trivia Quiz App
                      from an API
**************************************************/
// The Jeopardy class represnts an object with 
// some properties: categoryID, categoryTitle, questions, answers, etc.
// and some methods: fetchData, selectCategory, processQuestion, displayQuestion,
// processAnswer, validateAnswer etc.
class Jeopardy {
    constructor() {
        this.categoryID = "";
        this.categoryTitle = "";
        this.questions = [];
        this.answers = [];
        this.gameQuestions = [];
        this.gameAnswers = [];
        this.game = { totalScore: 0 };
        this.screens = ["start_game", "play_game", "continue_game", "end_game", "win_title", "lose_title"];
    }
    // The fetchData method fetches the data from the API and collect the arrays 
    // of answers and questions from the API.
    fetchData() {
        let fetchRandomQuestion = fetch(`http://jservice.io/api/random`);
        fetchRandomQuestion
            .then(response => response.json())
            .then(data => {
                let categoryID = this.selectCategory(data[0])
                this.processQuestion(categoryID);
            })
    }
    // The selectCategory method randomly selects a category ID from the API 
    // and returns the category ID.
    selectCategory(data) {
        let categoryID = data.category_id;
        this.categoryID = categoryID;
        this.categoryTitle = data.category.title;
        return categoryID;
    }
    // The processQuestion method with the category ID as a parameter collects
    // the arrays of questions and answers based on the the passed category ID.
    processQuestion(categoryID) {
        let fetchClues = fetch(`https://jservice.io/api/clues?category=${categoryID}`)
        fetchClues
            .then(response => response.json())
            .then(data => {
                data.forEach((datum) => {
                    this.questions.push(datum.question);
                    this.answers.push(datum.answer);
                })
                this.gameQuestions = [...this.questions];
                this.gameAnswers = [...this.answers];
                console.log(this.questions);
                console.log(this.answers);
            })
    }
    // The displayQuestion method first randomly selects a question and displays it
    // and its category title on the page.
    displayQuestion() {
        let randomIndex = Math.floor(Math.random() * (this.gameQuestions.length))
        this.game.question = this.gameQuestions[randomIndex];
        this.game.answer = this.gameAnswers[randomIndex];
        console.log('answer: ' + this.game.answer);
        this.game.title = this.categoryTitle;
        this.gameQuestions.splice(randomIndex, 1);
        this.gameAnswers.splice(randomIndex, 1);
        document.querySelector(".category").innerText = `CATEGORY: ${this.game.title}`
        document.querySelector(".question").innerText = `QUESTION: ${this.game.question}`;
        document.querySelector(".score").innerText = `Your total score: ${this.game.totalScore} point(s)`;
    }
    // The validateAnswer method compares the user's answer with the answer of each question
    // from the API. Then, it displays the result based on the conditional of each comparison.
    validateAnswer() {
        this.game.userAnswer = document.getElementById("user_input").value;
        if (this.game.userAnswer.toLowerCase() === this.game.answer.toLowerCase()) {
            this.game.totalScore += 1;
            document.querySelector(".correct_answer").innerText = `Your total score: ${this.game.totalScore} point(s)`
            document.querySelector(".score").innerText = `Your total score: ${this.game.totalScore} point(s)`;
            if (this.gameQuestions.length >= 1) {
                this.hideAll(this.screens);
                this.show(continue_game);
            }
            else {
                this.game.totalScore = 0;
                this.gameQuestions = [];
                this.hideAll(this.screens)
                this.fetchData();
                document.querySelector(".category").innerText = `CATEGORY: ${this.game.category} point(s)`;
                document.querySelector(".question").innerText = `QUESTION: ${this.game.question} point(s)`;
                document.querySelector(".score").innerText = `Your total score: ${this.game.totalScore} point(s)`;
                this.show(end_game);
                this.show(win_title);
            }
        }
        else if (this.game.userAnswer.toLowerCase() === "") {
            console.log("Please, give your answer")
            this.game.totalScore += 0;
        }
        else {
            this.game.totalScore = 0;
            this.gameQuestions = [];
            this.hideAll(this.screens)
            this.fetchData();
            document.querySelector(".category").innerText = `CATEGORY: ${this.game.category} point(s)`;
            document.querySelector(".question").innerText = `QUESTION: ${this.game.question} point(s)`;
            document.querySelector(".score").innerText = `Your total score: ${this.game.totalScore} point(s)`;
            this.show(end_game);
            this.show(lose_title);
        }
        return this.game.totalScore;
    }
    // The show method displays the target sceen with an id as the parameter.
    show(screen) {
        document.getElementById(screen);
        screen.style.display = 'block';
    }
    // The hideAll method with the screens array as a parameter hides all the screens 
    // with the ID's in the screens array.
    hideAll(screens) {
        screens.forEach((screen) => document.getElementById(screen).style.display = "none")
    }
}

// Creating a class object and calling the class method
let jeopardy = new Jeopardy();
jeopardy.fetchData();

// Showing the first screen to start the Jeopardy game
jeopardy.hideAll(jeopardy.screens);
jeopardy.show(start_game);

// Adding an event listner to the start button to display the play_game view.
document.getElementById('start_button').addEventListener('click', () => {
    jeopardy.hideAll(jeopardy.screens);
    jeopardy.show(play_game);
    jeopardy.displayQuestion();
})

// Adding an event listner to the submit button to process the user input answer
// and validate it with the correct game answer.
document.getElementById("submit_button").addEventListener('click', () => {
    return jeopardy.validateAnswer();
})

// Adding an event listner to the continue button to continue the game 
// when his/her answer is correct and displays a new question on the page.
document.getElementById('continue_button').addEventListener('click', () => {
    jeopardy.hideAll(jeopardy.screens)
    jeopardy.show(play_game);
    jeopardy.displayQuestion();
})

// Adding an event listener to the restart button to restart the game 
// when the user's answer is incorrect or when the user is able to answer all 
// the game questions correctly.
document.getElementById('restart_button').addEventListener('click', () => {
    jeopardy.hideAll(jeopardy.screens);
    jeopardy.show(play_game);
    jeopardy.displayQuestion();
})