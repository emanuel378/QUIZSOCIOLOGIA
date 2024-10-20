// Seleciona o botão com a classe "start-quizz" e armazena a referência na variável $startGameButton
const $startGameButton = document.querySelector(".start-quizz");

// Seleciona o contêiner de perguntas com a classe "questions-container" e armazena a referência na variável $questionsContainer

const $questionsContainer = document.querySelector(".questions-container");

// Adiciona um ouvinte de evento ao botão para escutar o clique e chamar a função startGame quando o botão for clicado

$startGameButton.addEventListener("click", startGame);
// Define a função startGame que será chamada quando o botão for clicado

const $answersContainer = document.querySelector(".anwers-container")

const $questionText = document.querySelector(".question")

const $nextQuestionButton = document.querySelector(".next-question")

$nextQuestionButton.addEventListener("click",displayNextQuestion)

//variavel auxiliar
let currentQuestionIndex = 0
let totalCorrect = 0

function startGame() {
    console.log("Start game button clicked");
    
    $startGameButton.classList.add("hide");
    
    $questionsContainer.classList.remove("hide");
    displayNextQuestion()
}

//firstChild = verefica se a div tem filho
function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex){
        return finishGame()
    }
    // Remove todas as respostas anteriores do contêiner
    

    // Atualiza o texto da pergunta
    $questionText.textContent = questions[currentQuestionIndex].question;

    // Adiciona as novas respostas
    questions[currentQuestionIndex].answers.forEach((answer) => {
        const nextAnswer = document.createElement("button");
        nextAnswer.classList.add("button", "answer");
        nextAnswer.textContent = answer.text;

        // Adiciona um atributo data se for a resposta correta
        if (answer.correct) {
            nextAnswer.dataset.correct = true;
        }

        // Adiciona o botão ao contêiner de respostas
        $answersContainer.appendChild(nextAnswer);
        nextAnswer.addEventListener("click",selectAnswer)
    });
}

function resetState(){
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild);
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}


//analisar se o botão selecionado e verdadeiro ou falso,se for falso vai fica vermelho
function selectAnswer(event){
    const answerClicked = event.target

    if(answerClicked.dataset.correct) {
  
        document.body.classList.add("correct")
        totalCorrect++
    } else{
        document.body.classList.add("incorrect")
    }
//selecionando todos os botton que tem classe answer
    document.querySelectorAll(".answer").forEach(button  => {
        if(button.dataset.correct){
            button.classList.add("correct")
        } else{
            button.classList.add("incorrect")
        }
//selecionar so um botão 
        button.disabled = true

    })
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++

}
function finishGame() {
    const totalQuestion = questions.length;
    const performance = Math.floor((totalCorrect / totalQuestion) * 100);
    let message = "";

    switch (true) {
        case (performance >= 90):
            message = "O cara sabe mesmo :)";
            break;
        case (performance >= 70):
            message = "Muito bom :)";
            break;
        case (performance >= 50):
            message = "Bom";
            break;
        default:
            message = "Pode melhorar :(";
    }

    $questionsContainer.innerHTML = `
       <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!
            <span>Resultado: ${message}</span>
        </p>
        <button id="restartButton" onclick="window.location.reload()" class="button">Refazer teste</button>
    `;

    // Adiciona um ouvinte de evento para o botão "Refazer teste"
    document.getElementById("restartButton").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    // Reseta as variáveis do quiz
    currentQuestionIndex = 0;
    totalCorrect = 0;

    // Oculta o contêiner de perguntas e exibe o botão de início do quiz
    $questionsContainer.classList.add("hide");
    $startGameButton.classList.remove("hide");

    // Limpa o conteúdo do contêiner de perguntas
    $questionsContainer.innerHTML = "";

    // Limpa o estado dos botões de resposta e do texto da pergunta
    resetState();
}

 



    




// Array de perguntas com alternativas e resposta correta
const questions = [
    {
        question: "Qual é o conceito sociológico que descreve a divisão de trabalho e a especialização nas funções dentro de uma sociedade?",
        answers: [
            { text: "Divisão do Trabalho", correct: true },
            { text: "Mobilidade Social", correct: false },
            { text: "Estratificação Social", correct: false },
            { text: "Trabalho Informal", correct: false }
        ]
    },
    {
        question: "Qual sociólogo é conhecido por sua teoria sobre a 'ética protestante e o espírito do capitalismo', onde ele analisa como valores religiosos influenciam o desenvolvimento econômico?",
        answers: [
            { text: "Emile Durkheim", correct: false },
            { text: "Karl Marx", correct: false },
            { text: "Max Weber", correct: true },
            { text: "Auguste Comte", correct: false }
        ]
    },
    {
        question: "qual é a principal função do trabalho na sociedade?",
        answers: [
            { text: "promover a integração", correct: true },
            { text: "Aumentar a desigualdade social", correct: false },
            { text: "Criar conflitos ", correct: false },
            { text: "Reduzir a mobilidade social", correct: false }
        ]
    },
    {
        question: "Qual conceito sociológico descreve a experiência de um trabalhador que se sente desconectado e alienado do produto de seu trabalho?",
        answers: [
            { text: "Mobilidade Vertical", correct: false },
            { text: "Alienação", correct: true },
            { text: "Estratificação Social", correct: false },
            { text: "Diferenciação Social", correct: false }
        ]
    },
    {
        question: "É o fenômeno pelo qual uma empresa contrata, por meio de outra, os trabalhadores necessários para realizar determinadas atividades",
        answers: [
            { text: "Contratação efetiva", correct: false },
            { text: "Terceirização", correct: true },
            { text: "Carteira assinada", correct: false },
            { text: "Contrato temporário", correct: false }
        ]
    }
    
        

        
        
    

]; 