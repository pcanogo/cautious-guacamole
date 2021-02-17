let colors = [];
let boxes = [];
let answer = "";
let score = 0;
let highscore = 0;

sadMgs = ["try again!", "wrong!", "maybe next time!", "try another one!", "you are a failure!"];
happyMsgs = ["not bad!", "pro gamer!", "big chungus energy", "stonks!", "pickle riiiick!"];

const msgElement = document.getElementById("game-msg");

boxes[0] = document.getElementById("box-1")
boxes[1] = document.getElementById("box-2")
boxes[2] = document.getElementById("box-3")
boxes[3] = document.getElementById("box-4")
boxes[4] = document.getElementById("box-5")
boxes[5] = document.getElementById("box-6")

const getRandomInt = (x) => {
    return Math.floor(Math.random() * Math.floor(x));
};

const getRandomColor = () => {
    const n1 = getRandomInt(256);
    const n2 = getRandomInt(256);
    const n3 = getRandomInt(256);
    return `rgb(${n1}, ${n2}, ${n3})`;
};

const getRandomAnswer = () => {
    const index = getRandomInt(6);
    return colors[index];
};

const getSad = () =>{
    const index = getRandomInt(sadMgs.length);
    document.getElementById("game-msg").classList.add("failure-msg");
    document.getElementById("game-msg").classList.remove("success-msg");
    return sadMgs[index];
};
const getHappy = () =>{
    const index = getRandomInt(happyMsgs.length);
    document.getElementById("game-msg").classList.add("success-msg");
    document.getElementById("game-msg").classList.remove("failure-msg");
    return happyMsgs[index];
};

const increaseScore = () => {
    score++;
    document.getElementById("score").innerHTML= score;
    document.getElementById("score").classList.remove("failure-msg");
};

const resetScore = () => {
    score=0
    document.getElementById("score").innerHTML= score;
    document.getElementById("score").classList.add("failure-msg");
};

const setHighScore = () => {
    highscore = score > highscore ? score : highscore;
    document.getElementById("highscore").innerHTML= highscore;
}

const isCorrect = (el) => {
    return answer === el.style.backgroundColor;
};

const checkAnswer = (el) => {
    if(isCorrect(el)){
        increaseScore();
        setHighScore();
        changeBoard();
        msgElement.innerHTML = getHappy();
    } else {
        resetScore();
        el.style.opacity = 0;
        msgElement.innerHTML = getSad();
    }
};

const changeBoard = () => {
    initBoard();
    boxes.forEach(x => x.style.opacity = 1);
};

const initGame = () => {
    boxes.forEach((box,i) => {
        box.addEventListener("click", function(){checkAnswer(boxes[i]);});
    })
};

const tearDownGame = () => {
    boxes.forEach((box,i) => {
        box.removeEventListener("click", function(){checkAnswer(boxes[i]);});
    })
};

const initBoard = () => {
    colors = new Array(6).fill().map(()=>getRandomColor());
    boxes.forEach((box,i) => {
        box.style.backgroundColor = colors[i];
        box.style.opacity = 1;
    })
    answer = getRandomAnswer();
    document.getElementById("color").innerHTML = answer;
};

initGame();
initBoard();
