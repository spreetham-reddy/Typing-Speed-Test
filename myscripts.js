let spinnerContainer = document.getElementById("spinnerContainer");
let textContainer = document.getElementById("speedTypingTest");

let quoteDisplay = document.getElementById("quoteDisplay");

function getDataFromServer() {
    let options = {
        method: "GET",
    };
    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                content
            } = jsonData;
            quoteDisplay.textContent = content;
        });
}

let textAreaEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let timerEl = document.getElementById("timer");
let spanTimer = document.getElementById("timerSpan");
let uinqueId = null;
let counter = 0;

function startTimer() {
    counter = 0;
    clearInterval(uinqueId);
    spanTimer.textContent = counter;
    uinqueId = setInterval(function() {
        counter = counter + 1;
        spanTimer.textContent = counter;
    }, 1000);
}

getDataFromServer();
startTimer();

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", function() {
    textAreaEl.value = "";
    resultEl.textContent = "";
    textContainer.classList.add("d-none");
    spinnerContainer.classList.remove("d-none");
    startTimer();
    getDataFromServer();
    spinnerContainer.classList.add("d-none");
    textContainer.classList.remove("d-none");
});

let submitBtn = document.getElementById("submitBtn");


submitBtn.addEventListener("click", function() {
    if (textAreaEl.value === quoteDisplay.textContent) {
        clearInterval(uinqueId);
        resultEl.textContent = "You typed in " + counter + " seconds";
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
});