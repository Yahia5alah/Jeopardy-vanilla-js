const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const jeopardyCategories =[
    {
      genre:"WHO",
      quesions:[
        {
            question:" Who Is Wrote Animal Farm ? ",
            answers:["George Orwell" , "Jack London"],
            correct:"George Orwell",
            level:"easy"
        },
        {
            question:" who that established general electric ?",
            answers:["Nikola Tesla" , "Thomas Edison"],
            correct:"Thomas Edison",
            level:"medium"
        },
        {
            question:"who that builded Cairo city ?",
            answers:["Jawhar Al Siqali" , "Al-Muizz li-Din Allah"],
            correct:"Jawhar Al Siqali",
            level:"hard"
        }
        ]
    },
    {
      genre:"WHERE",
      quesions:[
        {
            question:" Where is the Nile River located ? ",
            answers:["Africa" , "Asia"],
            correct:"Africa",
            level:"easy",
        },
        {
            question:" where is costa rica located ? ",
            answers:["Central America" , "europe"],
            correct:"Central America",
            level:"medium",
        },
        {
            question:" Where is Gibraltar located?",
            answers:["Southern tip of the Iberian Peninsula" , "south of africa"],
            correct:"Southern tip of the Iberian Peninsula",
            level:"hard",
        },
        ]
    },
    {
      genre:"WHEN",
      quesions:[
        {
            question:" When was Nelson Mandela born? ",
            answers:["1918" , "1930"],
            correct:"1918",
            level:"easy",
        },
        {
            question:"When was Facebook founded? ",
            answers:["2004" , "2007"],
            correct:"2004",
            level:"medium",
        },
        {
            question:"When was J.P .Morgan Bank established?",
            answers:["1871" , "1902"],
            correct:"1871",
            level:"hard",
        },
        ]
    },
    {
      genre:"HOW MANY",
      quesions:[
        {
            question:" How many players in a football team ? ",
            answers:["12" , "11"],
            correct:"11",
            level:"easy",
        },
        {
            question:" How many secound in an hour ? ",
            answers:["36000" , "3600"],
            correct:"3600",
            level:"medium",
        },
        {
            question:"How many people in China ?",
            answers:["1.4 bil" , "1.8 bil"],
            correct:"1.4 bil",
            level:"hard",
        },
        ]
    },
    {
      genre:"WHAT",
      quesions:[
        {
            question:"What the captil of Egypt ? ",
            answers:["Cairo" , "Alexandria"],
            correct:"Cairo",
            level:"easy",
        },
        {
            question:" What is the fastest river in the world in terms of flow?",
            answers:["Amazon" , "Nile"],
            correct:"Amazon",
            level:"medium",
        },
        {
            question:"What is the oldest active volcano on Earth??",
            answers:["Spain" , "France"],
            correct:"Spain",
            level:"hard",
        },
        ]
    },
    
]

function addCategory(category){
const categoryColumn = document.createElement('div');
categoryColumn.classList.add("category-column");

const genreCategory =document.createElement('div');
genreCategory.classList.add("genre-category");
genreCategory.innerHTML=category.genre;

game.append(categoryColumn);
categoryColumn.appendChild(genreCategory);

category.quesions.forEach(element => {
const card = document.createElement('div');
card.classList.add("card");
categoryColumn.append(card);
if(element.level === 'easy')
card.innerHTML=100
else if(element.level === 'medium')
card.innerHTML=200
else
card.innerHTML=300

card.setAttribute("data-question", element.question);
card.setAttribute("answer-1", element.answers[0]);
card.setAttribute("answer-2", element.answers[1]);
card.setAttribute("value", card.getInnerHTML());
card.setAttribute("data-correct", element.correct);


card.addEventListener("click", flipCard);


})

}
let score = 0;
jeopardyCategories.forEach((category) => addCategory(category));

function flipCard(){
this.innerHTML="";
this.style.fontSize="20px";
const textQuestion =document.createElement('div');
textQuestion.classList.add("text-question");
textQuestion.innerHTML=this.getAttribute('data-question')

const firstButton=document.createElement('button');
const secondButton=document.createElement('button');
firstButton.classList.add('button');
secondButton.classList.add('button');
firstButton.innerHTML=this.getAttribute('answer-1');
secondButton.innerHTML=this.getAttribute('answer-2');

firstButton.addEventListener('click', getResult);
secondButton.addEventListener('click', getResult);

this.append(textQuestion ,firstButton, secondButton);

const allCards =Array.from(document.querySelectorAll('.card'));
allCards.forEach(card => card.removeEventListener("click" , flipCard))

}

function getResult(){
const allCards =Array.from(document.querySelectorAll('.card'));
allCards.forEach(card => card.addEventListener("click" , flipCard))

const cardOfButton = this.parentElement;    

if(cardOfButton.getAttribute('data-correct') == this.innerHTML){
score = score + parseInt(cardOfButton.getAttribute('value'));
scoreDisplay.innerHTML = score;
cardOfButton.classList.add('right-answer')
setTimeout(() => {
    while(cardOfButton.firstChild){
        cardOfButton.removeChild(cardOfButton.lastChild)
    }
    cardOfButton.innerHTML= cardOfButton.getAttribute('value');
}, 100);
}else{
    cardOfButton.classList.add('wrong-answer')
    while(cardOfButton.firstChild){
        cardOfButton.removeChild(cardOfButton.lastChild)
    }
    cardOfButton.innerHTML=0;
    console.log(cardOfButton.getAttribute('data-correct'))
}
cardOfButton.removeEventListener("click" , flipCard);

}
