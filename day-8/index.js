const fs = require("fs");

const forest = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n");

const checkIfVisible = (forestRow, rowIndex, tree, treeIndex) => {
    //check if is visible from above
    for (let i = 1; i <= rowIndex; i++) {
        let checkedTreeAbove = parseInt(forest[rowIndex - i][treeIndex]);
        if (checkedTreeAbove >= tree) break;
        else return 1;
    }
    //check if is visible from below
    for (let i = 1; i < forest.length - rowIndex; i++) {
        let checkedTreeBelow = parseInt(forest[rowIndex + i][treeIndex]);
        if (checkedTreeBelow >= tree) break;
        else return 1;
    }
    //check if is visible from left
    for (let i = 1; i <= treeIndex; i++) {
        let checkedTreeBefore = parseInt(forestRow[treeIndex - i]);
        if (checkedTreeBefore >= tree) break;
        else return 1;
    }
    //check if visible from right 
    for (let i = 1; i < forestRow.length - treeIndex; i++) {
        let checkedTreeAfter = parseInt(forestRow[treeIndex + i]);
        if (checkedTreeAfter >= tree) break;
        else return 1;
    }

    return 0;
}

let totalVisibleTrees = 0;
forest.forEach((forestRow, rowIndex) => {
    forestRow = forestRow.split("");
    forestRow.forEach((tree, treeIndex) => {
        tree = parseInt(tree);
        totalVisibleTrees += checkIfVisible(forestRow, rowIndex, tree, treeIndex);
    });
});

console.log(totalVisibleTrees);