class YahtzeePlayer{
    constructor(name, number){
        this.name = name;
        this.number = number;
        this.finished = false;
        this.turns = 3;
        this.currentTurn = 0;
        this.amountOfEntriesFilled = 0 // We use this number to determine if the player is finished at the end of the turn

        this.ones;
        this.twos;
        this.threes;
        this.fours;
        this.fives;
        this.sixes;
        this.threeOfAKind;
        this.fourOfAKind;
        this.fullHouse;
        this.smallStraight;
        this.largeStraight;
        this.yahtzee;
        this.chance;

    }
    updateActiveScore(){
        // Updates the active player table
        // Calculate the totals
        let oneToSixTotal = this.calculateUpperTotal();
        //  Add bonus if needed
        let bonus = oneToSixTotal >= 63 ? 35 : 0;
        let upperTotal = oneToSixTotal + bonus;
        let lowerTotal = this.calculateLowerTotal();
        let grandTotal = upperTotal + lowerTotal;

        // Add the name to the active table
        this.updateTableItem("activePlayerNameUpper", this.name);
        this.updateTableItem("activePlayerNameLower", this.name);

        // Add the numbers to the table
        this.updateTable(`activePlayer`, oneToSixTotal, bonus, upperTotal, lowerTotal, grandTotal);

    }
    updatePersonalScore(){
        // Updates the table with the corresponding player number
        // Calculate the totals
        let oneToSixTotal = this.calculateUpperTotal();
        //  Add bonus if needed
        let bonus = oneToSixTotal >= 63 ? 35 : 0;
        let upperTotal = oneToSixTotal + bonus;
        let lowerTotal = this.calculateLowerTotal();
        let grandTotal = upperTotal + lowerTotal;

        // Add the numbers to the table
        this.updateTable(`p${this.number}`, oneToSixTotal, bonus, upperTotal, lowerTotal, grandTotal);


    }
    createPersonalScore(){
        // Creates the column for this player with the corresponding number

        let upperName = this.createTableItem("NameUpper", "th");
        upperName.text(this.name);
        $("#personalNameUpper").append(upperName);

        let one = this.createTableItem("Ones", "td");
        $("#personalOnes").append(one);
        let two = this.createTableItem("Twos", "td");
        $("#personalTwos").append(two);
        let three = this.createTableItem("Threes", "td");
        $("#personalThrees").append(three);
        let four = this.createTableItem("Fours", "td");
        $("#personalFours").append(four);
        let five = this.createTableItem("Fives", "td");
        $("#personalFives").append(five);
        let six = this.createTableItem("Sixes", "td");
        $("#personalSixes").append(six);
        let oneToSixTotal = this.createTableItem("OneToSixTotal", "td");
        $("#personalOneToSixTotal").append(oneToSixTotal);
        let bonus = this.createTableItem("Bonus", "td");
        $("#personalBonus").append(bonus);
        let upperTotal = this.createTableItem("UpperTotal", "td");
        $("#personalUpperTotal").append(upperTotal);

        let lowerName = this.createTableItem("NameLower", "th");
        lowerName.text(this.name);
        $("#personalNameLower").append(lowerName);

        let threeOfAKind = this.createTableItem("ThreeOfAKind", "td");
        $("#personalThreeOfAKind").append(threeOfAKind);
        let fourOfAKind = this.createTableItem("FourOfAKind", "td");
        $("#personalFourOfAKind").append(fourOfAKind);
        let fullHouse = this.createTableItem("FullHouse", "td");
        $("#personalFullHouse").append(fullHouse);
        let smallStraight = this.createTableItem("SmallStraight", "td");
        $("#personalSmallStraight").append(smallStraight);
        let largeStraight = this.createTableItem("LargeStraight", "td");
        $("#personalLargeStraight").append(largeStraight);
        let yahtzee = this.createTableItem("Yahtzee", "td");
        $("#personalYahtzee").append(yahtzee);
        let chance = this.createTableItem("Chance", "td");
        $("#personalChance").append(chance);

        let lowerSectionTotal = this.createTableItem("LowerSectionTotal", "td");
        $("#personalLowerSectionTotal").append(lowerSectionTotal);
        let upperSectionTotal = this.createTableItem("UpperSectionTotal", "td");
        $("#personalUpperSectionTotal").append(upperSectionTotal);
        let grandTotal = this.createTableItem("GrandTotal", "td");
        $("#personalGrandTotal").append(grandTotal);



    }
    createTableItem(itemName, type){
        let tableDataItem = $(`<${type}></${type}>`);
        tableDataItem.attr("id", `p${this.number}${itemName}`);
        return tableDataItem;
    }
    updateTable(tableName, oneToSixTotal, bonus, upperTotal, lowerTotal, grandTotal){
        // Todo account for disabled options
        this.updateTableItem(`${tableName}Ones`, this.ones !== undefined ? this.ones : "");
        this.updateTableItem(`${tableName}Twos`, this.twos !== undefined ? this.twos : "");
        this.updateTableItem(`${tableName}Threes`, this.threes !== undefined ? this.threes : "");
        this.updateTableItem(`${tableName}Fours`, this.fours !== undefined ? this.fours : "");
        this.updateTableItem(`${tableName}Fives`, this.fives !== undefined ? this.fives : "");
        this.updateTableItem(`${tableName}Sixes`, this.sixes !== undefined ? this.sixes : "");

        this.updateTableItem(`${tableName}OneToSixTotal`, oneToSixTotal ? oneToSixTotal : "");
        this.updateTableItem(`${tableName}Bonus`, bonus ? bonus: "");
        this.updateTableItem(`${tableName}UpperTotal`, upperTotal ? upperTotal : "");

        this.updateTableItem(`${tableName}ThreeOfAKind`, this.threeOfAKind !== undefined ? this.threeOfAKind : "");
        this.updateTableItem(`${tableName}FourOfAKind`, this.fourOfAKind !== undefined ? this.fourOfAKind : "");
        this.updateTableItem(`${tableName}FullHouse`, this.fullHouse !== undefined ? this.fullHouse : "");
        this.updateTableItem(`${tableName}SmallStraight`, this.smallStraight !== undefined ? this.smallStraight : "");
        this.updateTableItem(`${tableName}LargeStraight`, this.largeStraight !== undefined ? this.largeStraight : "");
        this.updateTableItem(`${tableName}Yahtzee`, this.yahtzee !== undefined ? this.yahtzee : "");
        this.updateTableItem(`${tableName}Chance`, this.chance !== undefined ? this.chance : "");

        this.updateTableItem(`${tableName}LowerSectionTotal`, lowerTotal ? lowerTotal : "");
        this.updateTableItem(`${tableName}UpperSectionTotal`, upperTotal ? upperTotal : "");
        this.updateTableItem(`${tableName}GrandTotal`, grandTotal ? grandTotal : "");
    }
    updateTableItem(id, value){
        $(`#${id}`).html(value);
    }
    calculateUpperTotal(){
        let total = 0;
        total += this.ones ? this.ones : 0;
        total += this.twos ? this.twos : 0;
        total += this.threes ? this.threes : 0;
        total += this.fours ? this.fours : 0;
        total += this.fives ? this.fives : 0;
        total += this.sixes ? this.sixes : 0;
        return total;
    }
    calculateLowerTotal(){
        let total = 0;
        total += this.threeOfAKind ? this.threeOfAKind : 0;
        total += this.fourOfAKind ? this.fourOfAKind : 0;
        total += this.fullHouse ? this.fullHouse : 0;
        total += this.smallStraight ? this.smallStraight : 0;
        total += this.largeStraight ? this.largeStraight : 0;
        total += this.yahtzee ? this.yahtzee : 0;
        total += this.chance ? this.chance : 0;
        return total;
    }
}