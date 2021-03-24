'use strict'
import PopUp from './popup.js';
import * as sound from './sound.js';
import {GameBuilder,  Reason } from './game.js';

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
.withGameDuration(20)
.withCarrotCount(20)
.withBugCount(20)
.build()

game.setGameStopListener((reason)=>{
   console.log(reason)

   let message;
   switch(reason){
       case Reason.cancel:
           message = 'Replay?';
           sound.playAlert();
           break;
      case Reason.win:
          message = 'you Won';
          sound.playWin();
          break;
    case Reason.lose:
    message = 'you Lost';
    sound.playBug();
    break;
    default:
        throw Error('not vlaid reason');

   }
   gameFinishBanner.showWithText(message)
})

gameFinishBanner.setClickListener(()=>{
    game.start();
})

















