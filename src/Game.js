import Pad from './Pad/Pad';
import Dashboard from './DashBoard/DashBoard';
import React, { Component } from 'react';

class Game extends Component {
  
   constructor(props) {
     super(props);
      this.state = {

      gameIsOn : false,
      currentMessage: "",
      currentSeries: [],
      currentGuesses : [],
      strictMode: false,
      isListening: false,
      tooLong: null
    }          
  }

  // componentDidMount(){
  //   console.log(this.zeroPad(32), this.zeroPad(9));
  // }
// exists because I don't know how to forward a dom element from a child component to its parent... 
  getColors = () => {
    return {
      blue: document.getElementsByClassName("blue")[0],
      red: document.getElementsByClassName("red")[0],
      yellow: document.getElementsByClassName("yellow")[0],
      green: document.getElementsByClassName("green")[0],
    }
  }
  getSounds = () => {

   return { 
     red: document.getElementsByTagName("audio")[0],
     yellow: document.getElementsByTagName("audio")[1],
     blue: document.getElementsByTagName("audio")[2],
     green: document.getElementsByTagName("audio")[3]
   }
  }

  handleSwitchOn = () => {
    const switchBtn = document.getElementById('switch-btn');

     if(!this.state.gameIsOn){
      switchBtn.classList.add("switch-on");
     }else{
      switchBtn.classList.remove("switch-on");
     }
    this.switchOn();     
  }

  switchOn = () => {
    let currentMessage = this.state.gameIsOn ? " " : "--" ;
    let gameIsOn = !this.state.gameIsOn;
 
    console.log(currentMessage, gameIsOn);
    
    this.setState({
      gameIsOn: gameIsOn,
      currentMessage: currentMessage 
  })
}
  activateStrict = () => {
    if(this.state.gameIsOn){
      const strictLed = document.getElementById("strict-led");
      strictLed.style.backgroundColor = this.state.strictMode ? "" : "#ff0000d0";  
      this.setState({strictMode: !this.state.strictMode}) 
    }
  }

  addRandomColor = () => {

    const colorPads = [
      {element : this.getColors().blue , sound: this.getSounds().blue, name: "blue"},
      {element : this.getColors().red , sound: this.getSounds().red, name: "red"},
      {element : this.getColors().green , sound: this.getSounds().green, name: "green"},
      {element : this.getColors().yellow , sound: this.getSounds().yellow, name: "yellow"}
    ]

    const  randomPick = colorPads[Math.floor(Math.random() * 4)]; 
  //  for some reason, [...this.state.currentSeries] comes up as an object
    let updatedCurrentSeries = Array.from([...this.state.currentSeries]);
    updatedCurrentSeries.push(randomPick);
    let zeroPaddedCount;
    if(updatedCurrentSeries.length >  1){
     zeroPaddedCount =  this.zeroPad(updatedCurrentSeries.length);
    }else{
      zeroPaddedCount = "--";
    }
   
    this.setState({
      currentSeries: updatedCurrentSeries,
      currentMessage: zeroPaddedCount
    })
    // will be used as a flag to enable/disable user input
    this.setState({isListening: true})
  }
  zeroPad = (number) => {
    if(number < 10)return "0" + String(number);
    else return number;
  }

  showCurrentSeries = (status) => {
    if(this.state.gameIsOn){
      this.killCountDown();
        this.setState({
          currentGuesses: [],
          isListening: false
        })
        this.displayCurrentRound();
        const currentSeries = this.state.currentSeries;
        let i;
      
        for( i = 0; i < this.state.currentSeries.length ; i++){
        // use an IIFE because to get setTimeout to behave as expected inside of loop. 
        (function(i, currentseries){
        
            window.setTimeout(() => {
            currentSeries[i].element.classList.add(`light-${currentseries[i].name}`);
            currentSeries[i].sound.play();
            
              // time the pad should be lit during demo ; 
            (function(i, currentseries){
              window.setTimeout(() => {
                currentSeries[i].element.classList.remove(`light-${currentseries[i].name}`);
              }, 800);
            })(i, currentSeries)

          }, 1400 * i);
        })(i, currentSeries)
      }
      // allow user input and start countdown after demo is done
      window.setTimeout(() => {
          this.setState({isListening: true});
          this.killCountDown();
          this.countDown(status);
          }, (1200) * this.state.currentSeries.length - 1)
        
          //start countdown     
    }
  }

  handlePadClick = (e) => {
    if(this.state.isListening){

      switch(e.target.classList[1]){
        case 'red' : e.target.classList.add('light-red');
       this.getSounds().red.play();
        break;
  
        case 'yellow' : e.target.classList.add('light-yellow');
        this.getSounds().yellow.play();
        break;
  
        case 'blue': e.target.classList.add('light-blue');
        this.getSounds().blue.play();
        break;
  
        case 'green': e.target.classList.add('light-green');
        this.getSounds().green.play();
        break;
  
        default: console.log('no action done');
        }   
    //  on récupère la classe (couleur) et on attribue une classe en fonction 
    }
    e.preventDefault();
  }

  handlePadRelease = (e) => {
  if(this.state.isListening){
    switch(e.target.classList[1]){
      case 'red' : e.target.classList.remove('light-red');
      this.getSounds().red.pause();
      this.getSounds().red.currentTime = 0;
      break;

      case 'yellow' : e.target.classList.remove('light-yellow');
      this.getSounds().yellow.pause();
      this.getSounds().yellow.currentTime = 0;
      break;

      case 'blue': e.target.classList.remove('light-blue');
      this.getSounds().blue.pause();
      this.getSounds().blue.currentTime = 0;
      break;

      case 'green': e.target.classList.remove('light-green');
      this.getSounds().green.pause();
      this.getSounds().green.currentTime = 0;
      break;

      default: console.log('byebye');
    }

    this.getGuess(e.target)
  }
  e.preventDefault();
}

  reset = () => {
  if(this.state.gameIsOn){
    this.setState({
      currentMessage: "--",
      currentSeries: [],
      currentGuesses : [],
      isListening: false
    }, this.initNewRound)
    // console.log('jai fait set state dans reset');
    
    //faire clignoter le message avant de commencer ('--')
    window.setTimeout(() => (this.setState({currentMessage: ""})), 400);
    window.setTimeout(() => (this.setState({currentMessage: "--"})), 800);
    window.setTimeout(() => (this.setState({currentMessage: ""})), 1200);
    window.setTimeout(() => (this.setState({currentMessage: "--"})), 1600);
    window.setTimeout(() => (this.setState({currentMessage: "01"})), 2000);
    // console.log('resetting!');
    //  this.initNewRound();
  }
}
  

  countDown = (status = null ) => {
      if(status  === null && this.state.gameIsOn){

        window.setTimeout(() => {
          if(this.state.tooLong !== null ) this.setState({currentMessage: ""}) ;
      }, 3400);

        window.setTimeout(() => {
          if(this.state.tooLong !== null) this.setState({currentMessage: "!!"}) ;
      },3800);

        window.setTimeout(() => {
          if(this.state.tooLong !== null ) this.setState({currentMessage: ""}) ;
        },4200 );

        window.setTimeout(() => {
          if(this.state.tooLong !== null ) this.setState({currentMessage: ""}) ;
      },4600);        
      
      this.setState({ tooLong: window.setInterval(() => {
          if(this.state.strictMode){ 
            this.reset(); console.log("strictMODE FAIL!!!!")
           }else{ this.showCurrentSeries(); console.log('NORMAL Mode fail');
          }
        }, 5200) })
      }else{
        console.log("called with newround " + status)
        this.killCountDown();
        this.countDown();
      }
    }
  

  killCountDown = () => {
    console.log('killed CountDown!!');
    window.clearInterval(this.state.tooLong);
    this.setState({tooLong: null})

  }

  
  getGuess = (pad) => {
    if(this.state.gameIsOn){
      let updatedCurrentGuesses = [...this.state.currentGuesses];
      let currentElementsSeries = this.state.currentSeries.map(item => item.element);
      // console.log(updatedCurrentGuesses, currentElementsSeries)
      if(this.state.isListening){
        //receive latest guess
        updatedCurrentGuesses.push(pad);    
        this.killCountDown();
        console.log("new guess")
        this.countDown();
    
        // this.waitingForInput();
        //compare latest guess and right answer
        if(updatedCurrentGuesses[updatedCurrentGuesses.length - 1] === currentElementsSeries[updatedCurrentGuesses.length - 1]){
          this.setState({
            currentGuesses: updatedCurrentGuesses
          })
  
     // BONNE REPONSE
          // mais jeu pas terminé
          if(updatedCurrentGuesses.length === this.state.currentSeries.length && this.state.currentSeries.length <= 20){
            console.log('tour suivant!');
            this.initNewRound("newround"); // next is passed so that countdown is suspended 
            //mais jeu terminé
            }else if(this.state.currentSeries.length > 20){
              this.setState({currentMessage: "**"});
              this.killCountDown();
              console.log("you won!")
            }
    //MAUVAISE REPONSE
        }else if(this.state.strictMode){
          console.log("you lost in strict mode!")
  
          this.reset();
        }else{
          this.isWrong();
        window.setTimeout(() => {
            this.showCurrentSeries();
          console.log("you lost in normal mode");
          this.setState({currentMessage: this.zeroPad(this.state.currentSeries.length)})
        }, 2100)
      }
    }
    }
}
  isWrong = () => {
    window.setTimeout(() => (this.setState({currentMessage: ""})), 400);
    window.setTimeout(() => (this.setState({currentMessage: "!!"})), 800);
    window.setTimeout(() => (this.setState({currentMessage: ""})), 1200);
    window.setTimeout(() => (this.setState({currentMessage: "!!"})), 1600);
    window.setTimeout(() => (this.setState({currentMessage: ""})), 2000);
    window.setTimeout(() => this.displayCurrentRound, 1600);
    console.log('WRONG!!!')

  }

  displayCurrentRound = () => {
    this.setState({currentMessage: this.zeroPad(this.state.currentSeries.length)});
  }

  initNewRound = (status = "newround") => {

  //1 - add new color to guess and display current round number after 2 seconds
    this.addRandomColor();
  //2 - demonstrate the current series to guess with visual and sound 
    window.setTimeout(()=>{
      this.showCurrentSeries(status);
   } , 2300);
  //3 taking input
  
}
   render(){ 
    return (
  <div id="game">
      <Dashboard 
      activateStrict={this.activateStrict}
      handleSwitchOn={this.handleSwitchOn}
      currentMessage={this.state.currentMessage}
      reset={this.reset}
      />

      <Pad class="green" 
        handlePadClick={this.handlePadClick}
        handlePadRelease={this.handlePadRelease}

        />
      <Pad class="red" 
        handlePadClick={this.handlePadClick}
        handlePadRelease={this.handlePadRelease}
        />
      <Pad class="yellow" 
        handlePadClick={this.handlePadClick}
        handlePadRelease={this.handlePadRelease}
        />
      <Pad class="blue" 
        handlePadClick={this.handlePadClick}
        handlePadRelease={this.handlePadRelease}
        />
 
  </div>
    )
    }
  }


export default Game;