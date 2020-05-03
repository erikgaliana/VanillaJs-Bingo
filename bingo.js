
/************** execute Bingo *********/

Bingo();


/*************** Bingo Function starts Game ****/
function Bingo (){

    var player ={ userName:"" , rounds:0, points:0};

    player.userName=prompt("Introduce tu nombre");
    alert (`Bienvenido ${player.userName}`);

    var agreeCard=false;
    var bingoNumbers; 
    var bingoCard;
    var continueGame=false;
    var lineCalled=false;
    var isLine=false;
    var isWinner=false;
   
    
    do {
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

        var nextTurn;

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
                                                }
                    isWinner=checkBingo(bingoCard);
                    if ( checkBingo(bingoCard)) { 
                        alert( " BINGO !!!!");
                        nextTurn=false;
                    }
                }
                //console.log(bingoCard);
                //console.log(bingoNumbers);
            } while (nextTurn===true);
    
        isWinner? console.log(`Felicidades has ganado en ${player.rounds} turnos`): console.log (`Juego finalizado en ${player.rounds} turnos` );
        
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
            // check if this line has all items matched to get Line
            if( i<5) { x=0;
                       y=5} 
                    else if ( i<10)
                     { x =5;
                       y=10}
                         else { x=10;
                                y=15 }
            // we pass to the function the first and the last index of the file
            line=checkLine(bingoCard,x,y);
            break;
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

/*
function generateNumber (){

    return Math.floor(Math.random() * 99) + 1 ;

}*/