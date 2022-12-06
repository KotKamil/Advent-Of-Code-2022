const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "");

const signal = data.split("");

//First half of the puzzle
const firstHalf = () => {
    for (let index in signal) {
        index = parseInt(index)
        if (
            signal[index] !== signal[index + 1] &&
            signal[index] !== signal[index + 2] &&
            signal[index] !== signal[index + 3] &&
            signal[index + 1] !== signal[index + 2] &&
            signal[index + 1] !== signal[index + 3] &&
            signal[index + 2] !== signal[index + 3]
        ) {
            return index + 4;
        }
    }
}

console.log(firstHalf());

const secondHalf = () => {
    for (let index in signal) {
        index = parseInt(index);
        const isDifferentTab = [];

        for (let i = 0; i < 13; i++) {
            for (let j = i + 1; j < 14; j++) {
                if (signal[index + i] !== signal[index + j]) {
                    isDifferentTab.push(true);
                } else {
                    isDifferentTab.push(false);
                }
            }
        }

        if (isDifferentTab.every(item => item)) return index + 14;
    }


}

console.log(secondHalf());