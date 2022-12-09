const fs = require("fs");

const forest = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n");

//first half of the puzzle 
const firstHalf = () => {
    const checkIfVisible = (forestRow, rowIndex, tree, treeIndex) => {
        let isSeen = [true, true, true, true]
        //check if tree is on edge
        if (treeIndex === 0 || treeIndex === forestRow.length - 1 || rowIndex === 0 || rowIndex === forest.length - 1) { return 1; }
        //check if is visible from above
        for (let i = 1; i <= rowIndex; i++) {
            let checkedTreeAbove = parseInt(forest[rowIndex - i][treeIndex]);
            if (checkedTreeAbove >= tree) { isSeen[0] = false; break; }
        }
        //check if is visible from below
        for (let i = 1; i < forest.length - rowIndex; i++) {
            let checkedTreeBelow = parseInt(forest[rowIndex + i][treeIndex]);
            if (checkedTreeBelow >= tree) { isSeen[1] = false; break; }
        }
        //check if is visible from left
        for (let i = 1; i <= treeIndex; i++) {
            let checkedTreeBefore = parseInt(forestRow[treeIndex - i]);
            if (checkedTreeBefore >= tree) { isSeen[2] = false; break; }
        }
        //check if visible from right 
        for (let i = 1; i < forestRow.length - treeIndex; i++) {
            let checkedTreeAfter = parseInt(forestRow[treeIndex + i]);
            if (checkedTreeAfter >= tree) { isSeen[3] = false; break; }
        }

        if (isSeen.every(angle => angle === false)) return 0;
        return 1;
    }

    let totalVisibleTrees = 0;
    forest.forEach((forestRow, rowIndex) => {
        forestRow = forestRow.split("");
        forestRow.forEach((tree, treeIndex) => {
            tree = parseInt(tree);
            totalVisibleTrees += checkIfVisible(forestRow, rowIndex, tree, treeIndex);
        });
    });
    return totalVisibleTrees
}

console.log(firstHalf());

//second half of the puzzle 
const secondHalf = () => {
    let highestScenicScore = 0;
    const checkScenicScore = (forestRow, rowIndex, tree, treeIndex) => {
        let visibility = [0, 0, 0, 0];
        //check visibility aboce
        for (let i = 1; i <= rowIndex; i++) {
            let checkedTreeAbove = parseInt(forest[rowIndex - i][treeIndex]);
            visibility[0]++;
            if (checkedTreeAbove >= tree) { break; }
        }
        //check if is visible from below
        for (let i = 1; i < forest.length - rowIndex; i++) {
            let checkedTreeBelow = parseInt(forest[rowIndex + i][treeIndex]);
            visibility[1]++;
            if (checkedTreeBelow >= tree) { break; }
        }
        //check if is visible from left
        for (let i = 1; i <= treeIndex; i++) {
            let checkedTreeBefore = parseInt(forestRow[treeIndex - i]);
            visibility[2]++;
            if (checkedTreeBefore >= tree) { break; }
        }
        //check if visible from right 
        for (let i = 1; i < forestRow.length - treeIndex; i++) {
            let checkedTreeAfter = parseInt(forestRow[treeIndex + i]);
            visibility[3]++;
            if (checkedTreeAfter >= tree) { break; }
        }

        return visibility;
    }

    forest.forEach((forestRow, rowIndex) => {
        forestRow = forestRow.split("");
        forestRow.forEach((tree, treeIndex) => {
            tree = parseInt(tree);
            let scenicTab = [];
            scenicTab = checkScenicScore(forestRow, rowIndex, tree, treeIndex);

            let totalScenicScoreOfTile = scenicTab[0] * scenicTab[1] * scenicTab[2] * scenicTab[3];

            if (highestScenicScore < totalScenicScoreOfTile) highestScenicScore = totalScenicScoreOfTile;
        });
    });

    return highestScenicScore;
}

console.log(secondHalf());