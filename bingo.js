
/************** execute Bingo *********/

Bingo();


/*************** Bingo Function starts Game ****/
function Bingo (){

    var player ;
    
    var agreeCard=false;
    var bingoNumbers; 
    var bingoCard;
    var continueGame=false;
    var lineCalled;
    var isLine=false;
    var isWinner=false;
    var arrayScore;
    var nextTurn;
    
    do {
        
        lineCalled=false;

        player ={ userName:"" , rounds:0, points:0};
    
        player.userName=prompt("Introduce tu nombre");
        alert (`Bienvenido ${player.userName}`);
        
        arrayScore=[];//init array of scores before loading scores in local Storage;

        //localStorage.removeItem('scores'); 

        getSavedScore (arrayScore);

        showScore ( arrayScore);
        
        do {

            bingoNumbers=[]; 
            bingoCard=[];

            // init array of numbers
            initBingo(bingoNumbers);

            // init bingo Card
            initCard(bingoCard,bingoNumbers);
                
            // reinit bingo numbers to have all numbers
            // again available

            bingoNumbers=[]; 

            initBingo(bingoNumbers);
            
            showCard(bingoCard);

            agreeCard = window.confirm("Aceptas este carton ?");

        
        } while (agreeCard===false);

        

        console.log("-------- iniciando partida ------------- ");
        
        do {
                nextTurn=window.confirm("Acepta para iniciar turno nuevo , cancela para abandonar partida ?");

                if(nextTurn) {

                    isLine=checkCard(bingoCard,bingoNumbers);
                    
                    player.rounds+=1;
                    
                    console.log(`turno : ${player.rounds}`);

                    showCard(bingoCard);

                    if ( isLine && !lineCalled) { 
                                                alert( "LINEA");
                                                lineCalled=true;  
                                                player.points+=((90-player.rounds)*10);  
                                                }
                    isWinner=checkBingo(bingoCard);
                    if ( checkBingo(bingoCard)) { 
                        alert( " BINGO !!!!");
                        nextTurn=false;
                        player.points+=((90-player.rounds)*100);
                    }
                    console.log(`Puntuacion actual = ${player.points}`);
                }
               console.log(`--------- FIN TURNO ${player.rounds} ---------------`);
            } while (nextTurn===true);
    
        isWinner? console.log(`Felicidades has ganado en ${player.rounds} turnos`): console.log (`Juego finalizado en ${player.rounds} turnos` );
        
        arrayScore.push({...player});

        sortScore(arrayScore);
        
        showScore( arrayScore);

        saveScore(arrayScore);

        continueGame = window.confirm(" ¿ Quieres jugar otra partida ? ");

    } while ( continueGame===true);


}



/***************end function bingo ***********/



// init array with numbers from 1 to 90;
function initBingo(bingoNumbers){
    
    for (var i=0; i<90; i++) {
        bingoNumbers.push(i+1);
    }
    
}



// init card with random numbers
function initCard(bingoCard,bingoNumbers){
    
    var numberToInsert = { number: 0 , matched: false };
   
    
    
        for( var i=0; i<15; i++){
            
            numberToInsert.number=randomNumber(bingoNumbers);
            bingoCard.push({...numberToInsert});
        
        }
    

    
}



// selects a random number from bingo number and deletes from array
function randomNumber(bingoNumbers){
    var selectedNumber;
    var chosenIndex;

    chosenIndex= Math.floor(Math.random() * bingoNumbers.length);
    
    selectedNumber=bingoNumbers.splice(chosenIndex,1);
    
    return selectedNumber[0];
}



// show card
function showCard ( bingoCard){

    
    console.log("Mostrando tu cartón de Bingo");
    console.log("*******************+********");

    
    for ( var i=0; i<bingoCard.length;i++){
        

        if ( (i===5) || ( i==10) ) { console.log( "** cambio del línea **")}
        
        
        if ( bingoCard[i].matched) { 

                             console.log( `casilla ${i+1} número : X  marcado `);

                        }
        else { 
                            console.log( `casilla ${i+1} número : ${bingoCard[i].number}  no marcado `);
                            
                        }

                        
    } 

    console.log("**************");
}


//Check if number is in Card
function checkCard (bingoCard,bingoNumbers){
    
   var newNumber= randomNumber(bingoNumbers);
   var line=false;
   var x,y;

   for ( var i=0; i<bingoCard.length ; i++){

        if ( bingoCard[i].number===newNumber) {
           
            bingoCard[i].matched=true;
            
            // below we check where index is and pass to the function the first and the last index of the file

            if( i<5) { x=0;
                       y=5} 
                    else if ( i<10)
                     { x =5;
                       y=10}
                         else { x=10;
                                y=15 }
            // check if this line has all items matched to get Line
            line=checkLine(bingoCard,x,y);
            break; // once we found matched numbre there's no need to continue the loop
        }

   }

   alert(`numero generado por el bombo : ${newNumber}`);
   console.log(`numero generado por el bombo : ${newNumber}`);

   return line;
}


// check if line
function checkLine ( bingoCard,i,j) {
  
    const arrayLine= bingoCard.slice(i,j).filter(element=>element.matched===true);

    return ( arrayLine.length===5?  true : false);
    
}


// check if bingo
function checkBingo( bingoCard) {
  
    const arrayBingo= bingoCard.filter(element=>element.matched===true);

    return ( arrayBingo.length===15?  true : false);
    
}



function sortScore ( arrayScore) {
     
      arrayScore.sort(compare);
}


// sets criteria to sort
function compare(a, b) {
   
    if (a.points > b.points) return -1;
    if (b.points > a.points) return 1;
  
    return 0;
  }


// saves scores in local storage
function saveScore (arrayScore) {
    
   

   localStorage.setItem('scores', JSON.stringify(arrayScore));

}


// get stored scores from localStorage

function getSavedScore (arrayScore) {

    if ( localStorage.getItem('scores')!=null){
    
        
        var savedScores = JSON.parse(localStorage.getItem('scores'));

        savedScores.forEach(element=>{ arrayScore.push(element)});

    }
    else { arrayScore=[];}

}



function showScore ( arrayScore) {
   
    if ( arrayScore.length>0){
    
        console.log("**** SCORES *****");
        arrayScore.forEach(element=>{
            console.log(` Usuario ${element.userName} con puntuación : ${ element.points}.`);
        });
        console.log("*****************");
    }
    else { console.log(" No hay puntuaciones de partidas anteriores")}

}
