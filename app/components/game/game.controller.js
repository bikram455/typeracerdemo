(
  function(){

    'use strict';

    angular.module('typeRacer')
    .controller('GameController' , GameController);

    GameController.$inject = ['$state','$interval','$window'];

    function GameController($state , $interval,$window){
      this.carLeft = 0;
      this.moveGap = 0;
      this.carLeftStyle = '0px';
      this.styleElement={};
      this.paragraph = 'a quick brown fox jumps over the lazy dog.';
      this.length = 0;
      this.currentIndex = 0;
      this.keyWord = '';
      this.inputWord = '';
      this.words = [];
      this.labelStyles = [];
      
      this.startTime = Date.now();
      this.endTime;
      this.currentLabelStyle = {
        "color":'red',
        'font-weight': 'bold',
        'font-size':'30px'
      }
      this.labelStyle = {
        "color":'black'
      }
      var that = this;
      
      this.countWords = function(){
        var paragraphLength = this.paragraph.length;
        var word = '';
        for(var i=0;i<paragraphLength;i++)  {
          if(that.paragraph[i] == ' '){
            ++that.length;
            that.words.push(word);
            word = '';            
            that.labelStyles.push(that.labelStyle);
          }
          else{
            word = word + that.paragraph[i];
          }       
          
        }
        if(this.paragraph){
          that.length = that.length + 1;
          that.words.push(word);
          that.labelStyles.push(that.labelStyle);
        }        
        
      };
      this.countWords();
      
      this.setMoveGap = function(){
        that.moveGap = 824/that.length;  
      };
      that.setMoveGap();

      this.setKeyWord = function(){
        that.keyWord = that.words[that.currentIndex];
        that.labelStyles[that.currentIndex-1] = that.labelStyle;
        that.labelStyles[that.currentIndex++] = that.currentLabelStyle;
      };
      this.setKeyWord();

      //Event Fired when a key is pressed
      this.keyPressEvent = function(event){
        //Event fired when spacebar is pressed.
        if(event.key == ' '){
          that.checkWord();
        }
      };

      //Check for the match between input word and the current word.
      this.checkWord = function(){
        if(that.keyWord == that.inputWord){
          that.moveCar();
          that.setKeyWord();
          that.clearInput();
          that.checkEnd();
        }        
      };
      
      //Check End of the paragraph.
      this.checkEnd = function(){
        if(that.currentIndex > that.length){
          that.endTime = Date.now();          
          var totalTime = that.endTime - that.startTime;
          totalTime = totalTime / (60*1000);
          var speed = Math.floor(that.length / totalTime);
          var phrase = 'Your typing speed is '+speed+' words/min';
          alert(phrase);
          $window.location.reload();
        }
      }

      //Clear the input field.
      this.clearInput = function(){
        that.inputWord = '';
      };

      //Move the Car
      this.moveCar = function(){
        that.carLeft = that.carLeft + that.moveGap;
        that.carLeftStyle = that.carLeft + 'px';
        that.styleElement = {
          'left':that.carLeftStyle
        };
      };

    }

  }
)();