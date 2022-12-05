const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n\n");

const [stacks, instructions] = data;

//made stacks into 2D array (array of an arrays)
let stackTab = [[]];
stacks.split("\n").forEach((stackLine, index) => {
    stackTab[index] = stackLine.split(/.\s./);
});
stackTab.pop();

//get only numbers from instructions and place them in 2D array (array of arrays)
const instructionTab = [[]];
instructions.split("\n").forEach((instruction, index) => {
    instructionTab[index] = instruction.split(" ").filter((item, index) => index % 2 ? item : null);
});
console.log(stackTab);
//move crate from one stack to another
const moveCrate = ([quantity, origin, destination], stackTab) => {
    let originTemp = "";
    // for (let i = 0; i < quantity; i++) {\
    stackTab = stackTab.map((level, indexY) => {
        level.forEach((container, indexX) => {
            // console.log(origin, container, indexX);
            // if (indexX === origin) console.log("działa");
        });
    });
    // }
}

//execute all instructions
instructionTab.forEach(instruction => {
    moveCrate(instruction, stackTab);
});