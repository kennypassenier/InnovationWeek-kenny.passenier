"use strict";

class OddsCounter{
    constructor(amountOfCombinations){
        this.amountOfCombinations = amountOfCombinations;
        this.ones = 0;
        this.twos = 0;
        this.threes = 0;
        this.fours = 0;
        this.fives = 0;
        this.sixes = 0;
        this.threeOfAKind = 0;
        this.fourOfAKind = 0;
        this.fullHouse = 0;
        this.smallStraight = 0;
        this.largeStraight = 0;
        this.yahtzee = 0;
    }
    toPercent(success, total){
        let answer = 100 / total * success;
        return answer.toFixed(2);
    }

    onesPercent(){
        return this.toPercent(this.ones, this.amountOfCombinations);
    }
    twosPercent(){
        return this.toPercent(this.twos, this.amountOfCombinations);
    }
    threesPercent(){
        return this.toPercent(this.threes, this.amountOfCombinations);
    }
    foursPercent(){
        return this.toPercent(this.fours, this.amountOfCombinations);
    }
    fivesPercent(){
        return this.toPercent(this.fives, this.amountOfCombinations);
    }
    sixesPercent(){
        return this.toPercent(this.sixes, this.amountOfCombinations);
    }
    threeOfAKindPercent(){
        return this.toPercent(this.threeOfAKind, this.amountOfCombinations);
    }
    fourOfAKindPercent(){
        return this.toPercent(this.fourOfAKind, this.amountOfCombinations);
    }
    fullHousePercent(){
        return this.toPercent(this.fullHouse, this.amountOfCombinations);
    }
    smallStraightPercent(){
        return this.toPercent(this.smallStraight, this.amountOfCombinations);
    }
    largeStraightPercent(){
        return this.toPercent(this.largeStraight, this.amountOfCombinations);
    }
    yahtzeePercent(){
        return this.toPercent(this.yahtzee, this.amountOfCombinations);
    }

}