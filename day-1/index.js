const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "UTF-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n\n");

// First half of the puzzle
const getTopElf = () => {
    const elves = [];
    const elfTab = [];

    data.forEach((dataLine, index) => {
        elves[index] = dataLine.split("\n");
    });

    elves.forEach((elf, index) => {
        elfTab[index] = 0;
        elf.forEach(item => {
            elfTab[index] += item * 1;
        });
    });

    elfTab.sort((a, b) => { return b - a });

    return elfTab[0];
}

console.log(getTopElf());

//Second half of the puzzle 
const getTotalCaloriesOfTopThreeElves = () => {
    const elves = [];
    const elfTab = [];
    let topThreeElves = [];
    let totalCalories = 0;

    data.forEach((dataLine, index) => {
        elves[index] = dataLine.split("\n");
    });

    elves.forEach((elf, index) => {
        elfTab[index] = 0;
        elf.forEach(item => {
            elfTab[index] += item * 1;
        });
    });

    elfTab.sort((a, b) => { return b - a });

    topThreeElves = elfTab.splice(0, 3);

    topThreeElves.forEach(elf => {
        totalCalories += elf;
    });

    return totalCalories;
}

console.log(getTotalCaloriesOfTopThreeElves());