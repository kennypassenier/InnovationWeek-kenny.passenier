"use strict"
let numberOfPlayers = 0;
let players = [];
let finishedPlayers = 0;
let raspberryURL;
let turnsInThisRound = 3; // Start with the full amount of turns
let activePlayer;
let activePlayerNumber; // will be used to determine the current active player

// Hide divs at start
$("#successAlert").hide();
$("#errorAlert").hide();
$("#game").hide();
$("#amountOfPlayers").hide();
$("#playerNames").hide();

function resetDice(){
    $("#dieOne").attr("src", `./images/startTurn.png`);
    $("#dieTwo").attr("src", `./images/startTurn.png`);
    $("#dieThree").attr("src", `./images/startTurn.png`);
    $("#dieFour").attr("src", `./images/startTurn.png`);
    $("#dieFive").attr("src", `./images/startTurn.png`);
    setAmountOfTurns(3);
}
function setAmountOfTurns(amount){
    $("#turns").html(`${amount} turns left`);
    turnsInThisRound = amount;
}
function playNextTurn(){
    resetAllActivePlayerRollButtons();
    resetDiceImages();

    // Check if game is finished
    let allFinished = true;
    for(let player of players){
        if(!player.finished){
            allFinished = false;
            break;
        }
    }
    if(allFinished){
        console.error("THE GAME IS DONE");

    }
    else{
        selectNextPlayer();
        activePlayer.updateActiveScore();
        resetDice();
    }
}
function finishTurn(){
    activePlayer.amountOfEntriesFilled++;
    if(activePlayer.amountOfEntriesFilled === 13){
        activePlayer.finished = true;
    }
    activePlayer.updateActiveScore(); // If the game finishes after, we need to make sure that all entries are filled
    activePlayer.updatePersonalScore();
    playNextTurn();
}

function resetDiceImages(){
    $("#dieOne").attr("src", `./images/startTurn.png`);
    $("#dieTwo").attr("src", `./images/startTurn.png`);
    $("#dieThree").attr("src", `./images/startTurn.png`);
    $("#dieFour").attr("src", `./images/startTurn.png`);
    $("#dieFive").attr("src", `./images/startTurn.png`);
}

function selectNextPlayer(){
    // Determine who the next player will be
    if(activePlayerNumber === undefined){
        activePlayer = players[0];
        activePlayerNumber = 0;
    }
    else{
        // Make sure that we can never select a player with an out of bound index
        let index = (activePlayerNumber + 1) % numberOfPlayers;
        activePlayer = players[index];
        activePlayerNumber++;
    }
    if(activePlayer.finished){
        selectNextPlayer();
    }
}

function resetAllActivePlayerRollButtons(){
    toggleRollButtons(false);
    $("#activePlayerOnesCurrentRollButton").text("x");
    $("#activePlayerTwosCurrentRollButton").text("x");
    $("#activePlayerThreesCurrentRollButton").text("x");
    $("#activePlayerFoursCurrentRollButton").text("x");
    $("#activePlayerFivesCurrentRollButton").text("x");
    $("#activePlayerSixesCurrentRollButton").text("x");
    $("#activePlayerThreeOfAKindCurrentRollButton").text("x");
    $("#activePlayerFourOfAKindCurrentRollButton").text("x");
    $("#activePlayerFullHouseCurrentRollButton").text("x");
    $("#activePlayerSmallStraightCurrentRollButton").text("x");
    $("#activePlayerLargeStraightCurrentRollButton").text("x");
    $("#activePlayerYahtzeeCurrentRollButton").text("x");
    $("#activePlayerChanceCurrentRollButton").text("x");
}



// Event listeners
$("#raspberryUrlButton").click(function(){
    updateRaspberryURL($("#raspberryUrl").val());
});

$(".dieImage").click(function(){
    // Whenever we click on one of the dice, and it's not at the start of a turn or a faulty throw,
    // We need to toggle the background to reflect which die are selected

    let source = $(this).prop("src");
    if(source.includes("startTurn.png") || source.includes(".images/error.png")){
        return;
    }
    $(this).toggleClass("selectedDice");
    // For all the dies that are selected, we calculate the odds for the next potential throw
    calculateOddsForSelectedDice();
});

$("#amountOfPlayersButton").click(function(){
    let amount = parseInt($("#amountOfPlayersInput").val());
    if(amount > 0){
        numberOfPlayers = amount;
        // Create inputs for the player names
        for(let i = 1; i <= amount; i++){
            let newH6 = $("<h6></h6>");
            newH6.text(`Enter the name for player ${i}`);
            let newName = $("<input type='text' class='playerName form-control input-lg text-center'>");
            newName.attr("id", `p${i}Name`);
            $("#startGamebutton").before(newH6);
            $("#startGamebutton").before(newName);
            $("#startGamebutton").before($("<br>"));
            $("#amountOfPlayers").hide();
            $("#playerNames").show();
        }
    }
});
$("#startGamebutton").click(function(){;
    let playerCount = 1;
    $(".playerName").each(function(){
        let newPlayer = new YahtzeePlayer($(this).val(), playerCount);
        // Add the player to the players array
        players.push(newPlayer);
        playerCount++;
        // Add the player to the personal score board table
        newPlayer.createPersonalScore();
    });
    $("#playerNames").hide();
    // Show the game divs
    $("#game").show();
    // Start the game
    playNextTurn();
});

$("#rollDiceButton").click(async function(){
    toggleRollButtons(false);
    await getDiceRoll();
    toggleRollButtons(true);
});
// Score buttons
$("#activePlayerOnesCurrentRollButton").click(function(){
    if(activePlayer.ones === undefined){
        activePlayer.ones = parseInt($("#activePlayerOnesCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerTwosCurrentRollButton").click(function(){
    if(activePlayer.twos === undefined){
        activePlayer.twos = parseInt($("#activePlayerTwosCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerThreesCurrentRollButton").click(function(){
    if(activePlayer.threes === undefined){
        activePlayer.threes = parseInt($("#activePlayerThreesCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerFoursCurrentRollButton").click(function(){
    if(activePlayer.fours === undefined){
        activePlayer.fours = parseInt($("#activePlayerFoursCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerFivesCurrentRollButton").click(function(){
    if(activePlayer.fives === undefined){
        activePlayer.fives = parseInt($("#activePlayerFivesCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerSixesCurrentRollButton").click(function(){
    if(activePlayer.sixes === undefined){
        activePlayer.sixes = parseInt($("#activePlayerSixesCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerThreeOfAKindCurrentRollButton").click(function(){
    if(activePlayer.threeOfAKind === undefined){
        activePlayer.threeOfAKind = parseInt($("#activePlayerThreeOfAKindCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerFourOfAKindCurrentRollButton").click(function(){
    if(activePlayer.fourOfAKind === undefined){
        activePlayer.fourOfAKind = parseInt($("#activePlayerFourOfAKindCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerFullHouseCurrentRollButton").click(function(){
    if(activePlayer.fullHouse === undefined){
        activePlayer.fullHouse = parseInt($("#activePlayerFullHouseCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerSmallStraightCurrentRollButton").click(function(){
    if(activePlayer.smallStraight === undefined){
        activePlayer.smallStraight = parseInt($("#activePlayerSmallStraightCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerLargeStraightCurrentRollButton").click(function(){
    if(activePlayer.largeStraight === undefined){
        activePlayer.largeStraight = parseInt($("#activePlayerLargeStraightCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerYahtzeeCurrentRollButton").click(function(){
    if(activePlayer.yahtzee === undefined){
        activePlayer.yahtzee = parseInt($("#activePlayerYahtzeeCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});
$("#activePlayerChanceCurrentRollButton").click(function(){
    if(activePlayer.chance === undefined){
        activePlayer.chance = parseInt($("#activePlayerChanceCurrentRollButton").text());
        finishTurn();
    }
    else{
        console.log("player already has this score");
    }
});


// Helper functions




function calculateOddsForSelectedDice(){

    let values = [];

    $(".selectedDice").each(function(){
        let source = $(this).prop("src");
        if(source.includes("one.png")){
            values.push(1);
        }
        if(source.includes("two.png")){
            values.push(2);
        }
        if(source.includes("three.png")){
            values.push(3);
        }
        if(source.includes("four.png")){
            values.push(4);
        }
        if(source.includes("five.png")){
            values.push(5);
        }
        if(source.includes("six.png")){
            values.push(6);
        }
    });
    let odds = getOdds(values);
    fillInOdds(activePlayer, odds);
}

function fillInOdds(player, odds){
    player.ones !== undefined ? $("#activePlayerOnesOdds").html("x") : $("#activePlayerOnesOdds").html(`${odds.onesPercent()}%`);
    player.twos !== undefined ? $("#activePlayerTwosOdds").html("x") : $("#activePlayerTwosOdds").html(`${odds.twosPercent()}%`);
    player.threes !== undefined ? $("#activePlayerThreesOdds").html("x") : $("#activePlayerThreesOdds").html(`${odds.threesPercent()}%`);
    player.fours !== undefined ? $("#activePlayerFoursOdds").html("x") : $("#activePlayerFoursOdds").html(`${odds.foursPercent()}%`);
    player.fives !== undefined ? $("#activePlayerFivesOdds").html("x") : $("#activePlayerFivesOdds").html(`${odds.fivesPercent()}%`);
    player.sixes !== undefined ? $("#activePlayerSixesOdds").html("x") : $("#activePlayerSixesOdds").html(`${odds.sixesPercent()}%`);
    player.threeOfAKind !== undefined ? $("#activePlayerThreeOfAKindOdds").html("x") : $("#activePlayerThreeOfAKindOdds").html(`${odds.threeOfAKindPercent()}%`);
    player.fourOfAKind !== undefined ? $("#activePlayerFourOfAKindOdds").html("x") : $("#activePlayerFourOfAKindOdds").html(`${odds.fourOfAKindPercent()}%`);
    player.fullHouse !== undefined ? $("#activePlayerFullHouseOdds").html("x") : $("#activePlayerFullHouseOdds").html(`${odds.fullHousePercent()}%`);
    player.smallStraight !== undefined ? $("#activePlayerSmallStraightOdds").html("x") : $("#activePlayerSmallStraightOdds").html(`${odds.smallStraightPercent()}%`);
    player.largeStraight !== undefined ? $("#activePlayerLargeStraightOdds").html("x") : $("#activePlayerLargeStraightOdds").html(`${odds.largeStraightPercent()}%`);
    player.yahtzee !== undefined ? $("#activePlayerYahtzeeOdds").html("x") : $("#activePlayerYahtzeeOdds").html(`${odds.yahtzeePercent()}%`);
    player.chance !== undefined ? $("#activePlayerChanceOdds").html("x") : $("#activePlayerChanceOdds").html(`100%`);

}

function getOdds(diceOnHoldArray){
    // Dice On Hold Array contains all the dice that we are keeping for the next throw

    // Max length = 5
    if(diceOnHoldArray.length >= 5){
        console.error("Nothing to simulate!");
        return;
    }
    let diceToSimulate = 5 - diceOnHoldArray.length;
    let otherOutcomes = getAllPossibleCombinations(diceToSimulate);
    let oddsCounter = new OddsCounter(otherOutcomes.length);
    for(let outcome of otherOutcomes){
        let yahtzeeCounter = new YahtzeeCounter(diceOnHoldArray.concat(outcome));
        if(yahtzeeCounter.ones > 0){
            oddsCounter.ones++;
        }
        if(yahtzeeCounter.twos > 0){
            oddsCounter.twos++;
        }
        if(yahtzeeCounter.threes > 0){
            oddsCounter.threes++;
        }
        if(yahtzeeCounter.fours > 0){
            oddsCounter.fours++;
        }
        if(yahtzeeCounter.fives > 0){
            oddsCounter.fives++;
        }
        if(yahtzeeCounter.sixes > 0){
            oddsCounter.sixes++;
        }
        if(yahtzeeCounter.threeOfAKind){
            oddsCounter.threeOfAKind++;
        }
        if(yahtzeeCounter.fourOfAKind){
            oddsCounter.fourOfAKind++;
        }
        if(yahtzeeCounter.fullHouse){
            oddsCounter.fullHouse++
        }
        if(yahtzeeCounter.smallStraight){
            oddsCounter.smallStraight++;
        }
        if(yahtzeeCounter.largeStraight){
            oddsCounter.largeStraight++;
        }
        if(yahtzeeCounter.yahtzee){
            oddsCounter.yahtzee++;
        }
    }
    return oddsCounter;
}

function getAllPossibleCombinations(amountOfDice){
    //console.warn(amountOfDice);
    if(amountOfDice == 1){
        return [[1], [2], [3], [4], [5], [6]];
    }
    else{
        return possibleCombinationsHelper(amountOfDice);
    }
}

function possibleCombinationsHelper(num){
    let answer = [];
    let tempArray = getAllPossibleCombinations(num - 1);
    for(let subArray of tempArray){
        for (let i = 1; i < 7; i++) {
            answer.push(subArray.concat(i));
        }
    }
    return answer;
}

function showAlert(type){
    $(`#${type}Alert`).show();
    setTimeout(function(){
        $(`#${type}Alert`).hide();
    }, 5000);
}

function raspberryPiRequest(hostname, pathname){

    return $.ajax({
        url: `${hostname}/${pathname}`,
        type: "GET",
    });
}
function numberToText(number){
    switch(number){
        case 1:
            return "one";
            break;
        case 2:
            return "two";
            break;
        case 3:
            return "three";
            break;
        case 4:
            return "four";
            break;
        case 5:
            return "five";
            break;
        case 6:
            return "six";
            break;
        default:
            console.error("Numbers should be one to six, something has gone wrong");
    }
}

async function getDiceRoll(){
    try{
        const response = await raspberryPiRequest(raspberryURL, "diceroll");

        let diceResult = JSON.parse(response);
        console.log("What the raspberry pi returns as diceroll: ");
        console.log(diceResult);

        // Check if the roll is valid - 5 dice
        let diceSum = 0;
        for(let result of diceResult){
            diceSum += parseInt(result);
        }
        if(diceSum != 5){
            console.log("Raspberry Pi didn't return the correct amount of dice");
            $("#dieOne").attr("src", `./images/error.png`);
            $("#dieTwo").attr("src", `./images/error.png`);
            $("#dieThree").attr("src", `./images/error.png`);
            $("#dieFour").attr("src", `./images/error.png`);
            $("#dieFive").attr("src", `./images/error.png`);
        }
        else{
            // It's a valid result
            let rolledNumbers = [];
            let counter = 1;
            for(let result of diceResult){
                if(result != 0){
                    for(let i = 1; i <= result; i++){
                        rolledNumbers.push(counter);
                    }
                }
                counter++;
            }
            // Now we have 5 results in rolledNumbers
            diceResult.first = rolledNumbers[0];
            diceResult.second = rolledNumbers[1];
            diceResult.third = rolledNumbers[2];
            diceResult.fourth = rolledNumbers[3];
            diceResult.fifth = rolledNumbers[4];
            setAmountOfTurns(--turnsInThisRound);
            if(turnsInThisRound === 0){
                $("#rollDiceButton").attr("disabled", true);
            }
            $("#dieOne").attr("src", `./images/${numberToText(diceResult.first)}.png`);
            $("#dieTwo").attr("src", `./images/${numberToText(diceResult.second)}.png`);
            $("#dieThree").attr("src", `./images/${numberToText(diceResult.third)}.png`);
            $("#dieFour").attr("src", `./images/${numberToText(diceResult.fourth)}.png`);
            $("#dieFive").attr("src", `./images/${numberToText(diceResult.fifth)}.png`);

            fillCurrentRollButtons(diceResult);
        }
    }
    catch(error){
        console.warn(error);
    }
}

function toggleRollButtons(enabled){
    $("#activePlayerOnesCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerTwosCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerThreesCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerFoursCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerFivesCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerSixesCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerThreeOfAKindCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerFourOfAKindCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerFullHouseCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerSmallStraightCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerLargeStraightCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerYahtzeeCurrentRollButton").attr("disabled", !enabled);
    $("#activePlayerChanceCurrentRollButton").attr("disabled", !enabled);
}

function fillCurrentRollButtons(result){
    let arr = [];
    arr.push(result.first);
    arr.push(result.second);
    arr.push(result.third);
    arr.push(result.fourth);
    arr.push(result.fifth);
    console.table(arr);
    let count = new YahtzeeCounter(arr);

    let diceTotal = calculateTotal(arr);


    // Enable the buttons
    toggleRollButtons(true);


    $("#activePlayerOnesCurrentRollButton").text(count.ones * 1);
    $("#activePlayerTwosCurrentRollButton").text(count.twos * 2);
    $("#activePlayerThreesCurrentRollButton").text(count.threes * 3);
    $("#activePlayerFoursCurrentRollButton").text(count.fours * 4);
    $("#activePlayerFivesCurrentRollButton").text(count.fives * 5);
    $("#activePlayerSixesCurrentRollButton").text(count.sixes * 6);
    count.threeOfAKind ? $("#activePlayerThreeOfAKindCurrentRollButton").text(diceTotal) : $("#activePlayerThreeOfAKindCurrentRollButton").text(0);
    count.fourOfAKind ? $("#activePlayerFourOfAKindCurrentRollButton").text(diceTotal) : $("#activePlayerFourOfAKindCurrentRollButton").text(0);
    count.fullHouse ? $("#activePlayerFullHouseCurrentRollButton").text(25) : $("#activePlayerFullHouseCurrentRollButton").text(0);
    count.smallStraight ? $("#activePlayerSmallStraightCurrentRollButton").text(30) : $("#activePlayerSmallStraightCurrentRollButton").text(0);
    count.largeStraight ? $("#activePlayerLargeStraightCurrentRollButton").text(40) : $("#activePlayerLargeStraightCurrentRollButton").text(0);
    count.yahtzee ? $("#activePlayerYahtzeeCurrentRollButton").text(50) : $("#activePlayerYahtzeeCurrentRollButton").text(0);
    $("#activePlayerChanceCurrentRollButton").text(diceTotal);
}

function calculateTotal(arr){
    let total = 0;
    for(let number of arr){
        total += number;
    }
    return total;
}

async function updateRaspberryURL(url){
    try{
        const response = await raspberryPiRequest(url, "connect");
        console.log(response);
        raspberryURL = url;
        showAlert("success");
        // Hide raspberryConnection
        $("#raspberryConnection").hide();
        // Show the amountOfPlayers div
        $("#amountOfPlayers").show();
    }
    catch(error){
        console.warn(error);
        showAlert("error");
        $("#raspberryUrl").val(" ");
    }
}




