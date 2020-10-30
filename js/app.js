let dataQuestions=[]
let pointsUsers = 0;

function getQuestions(){
    fetch('data/questions.json')
    .then(result => result.json())
    .then(data => {
        printQuestions(data);

    })
}
function printQuestions(data){
    let container = document.querySelector('#container-questions');
    container.innerHTML ="";
    data.forEach(element => {
       dataQuestions = data;

        let answersHTML ="";
        let answerlist = element.respuestas;
        answerlist.forEach(answer =>{
            answersHTML += ` 
            <p>
                  <input type="radio" name="ans-quest-${element.id}" data-id-answer="${answer.id}">
                  <label>${answer.text}</label>
            </p>`
        })
        
        container.innerHTML += `
        <div>
            <h3>Pregunta numero ${element.id}:</h3>
            <h4>¿${element.pregunta}?</h4>
            <img width="200px" src=${element.img}></img>
            <div class="container-answers">  
                ${answersHTML}
            </div>
        `
    });
}
function init(){
    getQuestions();
    let button = document.querySelector("#btn-send");
    button.addEventListener('click',function(e){
    let aAnswers = document.querySelectorAll('input[type=radio]:checked');
    aAnswers.forEach(item =>{
        let idQuestion = (item.name.split("-"))[2];
        let question = dataQuestions.find(q =>q.id==idQuestion);
        let idAnswer = item.getAttribute("data-id-answer");
        let qAnswer = question.respuestas.find(a => a.id == idAnswer);
    })
    })
}
init();