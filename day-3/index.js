const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");

//First half of the puzzle
const firstHalf = () => {
    const rucksackTab = [];
    const errorTab = [];
    let totalPriority = 0;
    data.forEach((rucksack, index) => {
        const rucksackRow = [];
        rucksackRow[0] = rucksack.substring(0, rucksack.length / 2);
        rucksackRow[1] = rucksack.substring(rucksack.length / 2, rucksack.length);
        rucksackTab[index] = rucksackRow;
    })

    const lookForError = (compartmentX, compartmentY) => {
        compartmentX = [...compartmentX];
        compartmentY = [...compartmentY];
        let duplicatedItem = "";

        compartmentX.forEach(itemTypeX => {
            compartmentY.forEach(itemTypeY => {
                if (itemTypeX === itemTypeY) duplicatedItem += itemTypeY;
            });
        });

        return duplicatedItem[0];
    }

    rucksackTab.forEach((rucksackRow, index) => {
        errorTab[index] = lookForError(rucksackRow[0], rucksackRow[1]);
    });

    const getPriority = (isLowerCase, itemType) => {
        if (isLowerCase) return itemType.charCodeAt(0) - 96;
        else return itemType.charCodeAt(0) - 38;
    }

    errorTab.forEach(itemType => {
        totalPriority += getPriority(itemType === itemType.toLowerCase(), itemType);
    });

    return totalPriority;
}

// console.log(firstHalf());

//Second half of the puzzle
const secondHalf = () => {
    let rucksackIndex = 0;
    let groupIndex = 0;
    let singleGroup = [];
    let totalPriority = 0;
    const rucksackTab = [];
    const errorTab = [];

    data.forEach(rucksack => {
        if (rucksackIndex <= 2) {
            singleGroup[rucksackIndex] = rucksack;
            rucksackIndex++;
        } else {
            rucksackTab[groupIndex] = singleGroup;
            singleGroup = [];
            groupIndex++;
            singleGroup[0];
            rucksackIndex = 0;
        }
    });

    const lookForError = (rucksackX, rucksackY, rucksackZ) => {
        rucksackX = [...rucksackX];
        rucksackY = [...rucksackY];
        rucksackZ = [...rucksackZ];
        let duplicatedItem = "";

        rucksackX.forEach(itemTypeX => {
            rucksackY.forEach(itemTypeY => {
                rucksackZ.forEach(itemTypeZ => {
                    if (itemTypeX === itemTypeY) duplicatedItem += itemTypeX;
                });
            });
        });


        return duplicatedItem[0];
    }

    rucksackTab.forEach((singleGroup, index) => {
        errorTab[index] = lookForError(singleGroup[0], singleGroup[1], singleGroup[2]);
    });

    const getPriority = (isLowerCase, itemType) => {
        if (isLowerCase) return itemType.charCodeAt(0) - 96;
        else return itemType.charCodeAt(0) - 38;
    }

    errorTab.forEach(itemType => {
        totalPriority += getPriority(itemType === itemType.toLowerCase(), itemType);
    });

    return totalPriority;
}

console.log(secondHalf());