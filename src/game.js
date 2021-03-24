import{ Field,  ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win:'win',
    lose:'lose',
    cancel:'cancel'
})

//Builder Pattern
export class GameBuilder{
    withGameDuration(duration){
       this.gameDuration = duration;
       return this;
    }
    withCarrotCount(num){
        this.carrotCount =num;
        return this
    }
    withBugCount(num){
        this.bugCount =num;
        return this
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game{

    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

this.gameBtn = document.querySelector('.game__button');
this.gameTimer = document.querySelector('.game__timer');
this.gameScore = document.querySelector('.game__score');

this.gameBtn.addEventListener('click',()=>{
    if(this.started){
        this.stop(Reason.cancel);
    }else{
        this.start();
    }
   
 
 })


this.gameField = new Field(carrotCount,bugCount);
this.gameField.setClickListener(this.onItemClick);

this.started = false;
this.score =0;
this.timer = undefined;
    }
onItemClick = (item)=>{
    if(!this.started) return;
    
    if(item ===ItemType.carrot){
        this.score++;
    
    
        this.updateScoreBoard();
        if(this.score === this.carrotCount){
            this.stop(Reason.win);
        }
    }else if(item ===ItemType.bug){
    
        this.stop(Reason.lose);
    }
    
    }
setGameStopListener(onGameStop){
    this.onGameStop = onGameStop;
}



start(){
    this.started =true;
    this.initGame();
    this.showStopButton();
    this.showTimeAndScore();
    this.startGameTimer();
    sound.playBackground();
}
stop(reason){
    this.started = false; //
      this.stopGameTimer();  //게임타임을 멈춤
      this.hideGameButton();  //게임버튼 숨김
      sound.stopBackground()  //백그라운드 그만

      
      this.onGameStop && this.onGameStop(reason);
    }


stopGameTimer(){
    clearInterval(this.timer)
}
showStopButton(){
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play')
    this.gameBtn.style.visibility ='visible'
}
hideGameButton(){
    this.gameBtn.style.visibility='hidden';
}

showTimeAndScore(){
    this.gameTimer.style.visibility ='visible';
    this.gameScore.style.visibility ='visible';
}
startGameTimer(){
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(()=>{

        if(remainingTimeSec<=0){
            clearInterval(this.timer);
            this.stop(this.carrotCount== this.score?Reason.win:Reason.lose);
            return;
        }
        this.updateTimerText(--remainingTimeSec) ;
    },1000)
}

updateTimerText(time){
    const minites = Math.floor(time/60);
    const second = time % 60;
    this.gameTimer.innerText=`${minites}:${second}`
}


initGame(){
    this.score =0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
 
}

updateScoreBoard(){
    this.gameScore.innerText =this.carrotCount - this.score;
}
}
