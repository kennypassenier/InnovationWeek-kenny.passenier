"use strict";

class YahtzeeCounter{
    constructor(arr){
        this.ones = 0;
        this.twos = 0;
        this.threes = 0;
        this.fours = 0;
        this.fives = 0;
        this.sixes = 0;
        this.threeOfAKind = false;
        this.fourOfAKind = false;
        this.fullHouse = false;
        this.smallStraight = false;
        this.largeStraight = false;
        this.yahtzee = false;

        for(let number of arr){
            //console.log(number);
            switch(number){
                case 1:
                    this.ones++;
                    break;
                case 2:
                    this.twos++;
                    break;
                case 3:
                    this.threes++;
                    break;
                case 4:
                    this.fours++;
                    break;
                case 5:
                    this.fives++;
                    break;
                case 6:
                    this.sixes++;
                    break;
                default:
                    console.error("No path should lead to this option");
                    return;
            }
        }
        this.array = [];
        if(this.ones > 0){
            this.array.push(this.ones);
        }
        if(this.twos > 0){
            this.array.push(this.twos);
        }
        if(this.threes > 0){
            this.array.push(this.threes);
        }
        if(this.fours > 0){
            this.array.push(this.fours);
        }
        if(this.fives > 0){
            this.array.push(this.fives);
        }
        if(this.sixes > 0){
            this.array.push(this.sixes);
        }
        // Check for 3 of a kind
        if(this.array.includes(3)){
            this.threeOfAKind = true;
            // Check for full house now that the first condition is already met
            if(this.array.includes(2)){
                this.fullHouse = true;
            }
        }
        // Check for 4 of a jkind
        if(this.array.includes(4)){
            this.threeOfAKind = true;
            this.fourOfAKind = true;
        }
        // Check for small straight
        // 1234 2345 3456
        if((this.ones > 0 && this.twos > 0 && this.threes > 0 && this.fours > 0) || (this.twos > 0 && this.threes > 0 && this.fours > 0 && this.fives > 0) || (this.threes > 0 && this.fours > 0 && this.fives > 0 && this.sixes > 0)){
            this.smallStraight = true;
        }
        // Check for large straight
        // 12345 or 23456
        if((this.ones > 0 && this.twos > 0 && this.threes > 0 && this.fours > 0 && this.fives > 0) || (this.twos > 0 && this.threes > 0 && this.fours > 0 && this.fives > 0 && this.sixes > 0)){
            this.largeStraight = true;
        }

        // Check for yathzee
        if(this.array.includes(5)){
            this.threeOfAKind = true;
            this.fourOfAKind = true;
            this.yahtzee = true;
        }

    }
}