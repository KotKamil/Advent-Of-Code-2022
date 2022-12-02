const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");

const strategy = data.map(item => item.split(" "));

const outcomes = {
    Win: 6,
    Draw: 3,
    Loss: 0,
}
const shape = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
}

//First half of the puzzle 
const firstHalf = () => {
    const checkForRoundResult = (oponentsMove, yourMove) => {
        switch (oponentsMove) {
            case "A":
                // Rock
                switch (yourMove) {
                    case "X":
                        return shape.Rock + outcomes.Draw;
                    case "Y":
                        return shape.Paper + outcomes.Win;
                    case "Z":
                        return shape.Scissors + outcomes.Loss
                }
                break;
            case "B":
                //Paper
                switch (yourMove) {
                    case "X":
                        return shape.Rock + outcomes.Loss;
                    case "Y":
                        return shape.Paper + outcomes.Draw;
                    case "Z":
                        return shape.Scissors + outcomes.Win;
                }
                break;
            case "C":
                //Scissors
                switch (yourMove) {
                    case "X":
                        return shape.Rock + outcomes.Win;
                    case "Y":
                        return shape.Paper + outcomes.Loss;
                    case "Z":
                        return shape.Scissors + outcomes.Draw;
                }
                break;
        }
    }
    let totalPoins = 0;

    strategy.forEach(round => {
        const [oponentsMove, yourMove] = round;
        totalPoins += checkForRoundResult(oponentsMove, yourMove);
    });

    return totalPoins;
}

console.log(firstHalf());

//Second half of the puzzle
const secondHalf = () => {
    const checkForRoundResult = (oponentsMove, roundOutcome) => {
        switch (oponentsMove) {
            //Rock
            case "A":
                switch (roundOutcome) {
                    case "X":
                        return outcomes.Loss + shape.Scissors;
                    case "Y":
                        return outcomes.Draw + shape.Rock;
                    case "Z":
                        return outcomes.Win + shape.Paper;
                }
                break;
            //Paper
            case "B":
                switch (roundOutcome) {
                    case "X":
                        return outcomes.Loss + shape.Rock;
                    case "Y":
                        return outcomes.Draw + shape.Paper;
                    case "Z":
                        return outcomes.Win + shape.Scissors;
                }
                break;
            //Scissors
            case "C":
                switch (roundOutcome) {
                    case "X":
                        return outcomes.Loss + shape.Paper;
                    case "Y":
                        return outcomes.Draw + shape.Scissors;
                    case "Z":
                        return outcomes.Win + shape.Rock;
                }
                break;
        }
    }
    let totalPoins = 0;

    strategy.forEach(round => {
        const [oponentsMove, roundOutcome] = round;
        totalPoins += checkForRoundResult(oponentsMove, roundOutcome);
    });

    return totalPoins;
}

console.log(secondHalf());