
/************** execute Bingo *********/

Bingo();


/*************** Bingo Function starts Game ****/
function Bingo (){

    var player ;
    
    var agreeCard=false;
    var bingoNumbers; 
    var bingoCard;
    var continueGame=false;
    var lineCalled=false;
    var isLine=false;
    var isWinner=false;
    var arrayScore;
    var nextTurn;
    
    do {
        

        player ={ userName:"" , rounds:0, points:0};
    
        player.userName=prompt("Introduce tu nombre");
        alert (`Bienvenido ${player.userName}`);
        
        arrayScore=[];//init array of scores before loading scores in local Storage;

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

        

        console.log(" iniciando partida");
        
        do {
                nextTurn=window.confirm("Avanzar al siguiente turno ?");

                if(nextTurn) {

                    isLine=checkCard(bingoCard,bingoNumbers);
                    
                    player.rounds+=1;
                    

                    console.log(`turno : ${player.rounds}`);

                    showCard(bingoCard);
                    
                    if ( isLine && !lineCalled) { 
                                                alert( "LINEA");
                                                lineCalled=true;  
                                                player.points+=((45-player.rounds)*100);  
                                                }
                    isWinner=checkBingo(bingoCard);
                    if ( checkBingo(bingoCard)) { 
                        alert( " BINGO !!!!");
                        nextTurn=false;
                        player.points+=((45-player.rounds)*100);
                    }
                    console.log(`Puntuacion actual = ${player.points}`);
                }
               
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




function initBingo(bingoNumbers){
    
    for (var i=0; i<49; i++) {
        bingoNumbers.push(i+1);
    }
    
}




function initCard(bingoCard,bingoNumbers){
    
    var numberToInsert = { number: 0 , matched: false };
   
    
    
        for( var i=0; i<15; i++){
            
            numberToInsert.number=randomNumber(bingoNumbers);
            bingoCard.push({...numberToInsert});
        
        }
    

    
}




function randomNumber(bingoNumbers){
    var selectedNumber;
    var chosenIndex;

    chosenIndex= Math.floor(Math.random() * bingoNumbers.length);
    
    selectedNumber=bingoNumbers.splice(chosenIndex,1);
    
    
    return selectedNumber[0];
}




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


function checkLine ( bingoCard,i,j) {
  
    const arrayLine= bingoCard.slice(i,j).filter(element=>element.matched===true);

    return ( arrayLine.length===5?  true : false);
    
}

function checkBingo( bingoCard) {
  
    const arrayBingo= bingoCard.filter(element=>element.matched===true);

    return ( arrayBingo.length===15?  true : false);
    
}

function sortScore ( arrayScore) {
     
      arrayScore.sort(compare);
}

function compare(a, b) {
   
    if (a.points > b.points) return -1;
    if (b.points > a.points) return 1;
  
    return 0;
  }


function saveScore (arrayScore) {
    /*
    if ( localStorage.getItem('scores')!=null){ 

        var savedScores = JSON.parse(localStorage.getItem('scores'));

        var combinedArrays=[...savedScores,...arrayScore];

        sortScore ( combinedArrays);
        

    localStorage.setItem('scores', JSON.stringify(combinedArrays));
    }
    else { 
        sortScore ( arrayScore);
        localStorage.setItem('scores', JSON.stringify(arrayScore));}

    */

   

   //console.log('local storage before saving arrayScore',JSON.parse(localStorage.getItem('scores')));    

   //localStorage.removeItem('scores');

   //console.log('local storege after reset',JSON.parse(localStorage.getItem('scores')));  

   localStorage.setItem('scores', JSON.stringify(arrayScore));

   //console.log('local store after saving arrayScore',JSON.parse(localStorage.getItem('scores')));

}


function getSavedScore (arrayScore) {

    console.log('data in local storage',JSON.parse(localStorage.getItem('scores')));

    if ( localStorage.getItem('scores')!=null){
    
        
        var savedScores = JSON.parse(localStorage.getItem('scores'));

        console.log(' savedScores', savedScores);
        console.log('array score before setting to localstoragedata', arrayScore);

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
    else { console.log(" No hay puntuaciones de partidas guardads;")}

}


/*
function generateNumber (){

    return Math.floor(Math.random() * 99) + 1 ;

}*/