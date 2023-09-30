// input section element
let hour = document.querySelector('.hr');
let minute = document.querySelector('.min');
let second = document.querySelector('.sec');



// input validation
document.querySelectorAll('.editable').forEach((e) => {
    e.addEventListener('focusout', (event) => {
        if(Number(event.target.innerText) == ''){
            event.target.innerText = '00';
        }
        else if(Number(event.target.innerText) < 10){
            event.target.innerText = '0' + event.target.innerText;
        }
    })
})


let timerBox = document.querySelector('.timer-box')

let newTimerId = 1;

// create time up card
function createTimeUp(befreThis){
    let timeUpElement = document.createElement('div');
    timeUpElement.className = 'time-up-card y-card';
    timeUpElement.innerHTML = `
    <p class="blank"></p>
    <div class="time-up-msg card-mid">Time Is Up !</div>
    <button class="stop" onclick="deleteCard(this)">Stop</button>
    `;
    timerBox.insertBefore(timeUpElement, befreThis);
}

// delete timer
function deleteCard(target){
    target.parentNode.remove();
    let noTimer = document.querySelector('.no-timer');
    if(noTimer.nextSibling.nextSibling == null){
        noTimer.classList.remove('d-none');
    }
}

// reset input
document.querySelector('.set').addEventListener('click', (event) => {
    let h = Number(document.querySelector('.hr').innerText);
    let m = Number(document.querySelector('.min').innerText);
    let s = Number(document.querySelector('.sec').innerText);
    let totalTime = h*3600 + m*60 + s;

    let inputStr = document.querySelector('.hr').innerText + document.querySelector('.min').innerText + document.querySelector('.sec').innerText;

    if(totalTime <= 0) {
        alert("Time should be greater than zero second!!");
        return;
    }
    for(let i = 0; i < inputStr.length; i++) {
        if(inputStr.charCodeAt(i) < 48 || inputStr.charCodeAt(i) > 57) {
            alert("Enter a valid time!!");
            return;
        }
    }

    document.querySelector('.hr').innerText = '00';
    document.querySelector('.min').innerText = '00';
    document.querySelector('.sec').innerText = '00';

    createNewTimer(totalTime);
})

// create new timer
function createNewTimer(totalTime){
    let h = Math.floor(totalTime/3600);
    let m = Math.floor(totalTime%3600/60);
    let s = Math.floor(totalTime%3600%60);

    let newTimer = document.createElement('div');
    newTimer.className = 'timer-card card';
    newTimer.id = (newTimerId++) + '';
    newTimer.innerHTML = `
    <p class="time-left">Time Left :</p>
    <div class="time card-mid">
        <div class="hr">${h<10?'0'+h:h}</div>
        <div class="sep">:</div>
        <div class="min">${m<10?'0'+m:m}</div>
        <div class="sep">:</div>
        <div class="sec">${s<10?'0'+s:s}</div>
    </div>
    <button class="delete" onclick="deleteCard(this)">Delete</button>
    `;

    timerBox.append(newTimer);

    let noTimer = document.querySelector('.no-timer');
    if(getComputedStyle(noTimer).display != 'none'){
        noTimer.classList.add('d-none');
    }

    startTimer(totalTime, newTimer);
}

// Start Timer functionality
function startTimer(totalTime, thisCard){
    let hr = thisCard.querySelector('.hr');
    let min = thisCard.querySelector('.min');
    let sec = thisCard.querySelector('.sec');
    
    let intervelId = setInterval(() => {
        if(document.getElementById(thisCard.id) == null){
            clearInterval(intervelId);
            return;
        }
        if(totalTime==0){
            try {
                let audio = new Audio('timeup.mp3');
                audio.play();
                createTimeUp(thisCard);
                thisCard.remove();
            } catch (error) {
            }
            clearInterval(intervelId);
        }
        // decrementing timer
        totalTime--;

        let h = Math.floor(totalTime/3600);
        let m = Math.floor(totalTime%3600/60);
        let s = Math.floor(totalTime%3600%60);

        hr.innerText = h<10? '0'+h:h;
        min.innerText = m<10? '0'+m:m;
        sec.innerText = s<10? '0'+s:s;
    }, 1000);
}