const fs = require("fs");

const data = fs.readFileSync("data.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .split("\n");

let currentDirectory = "/";
let directoriesSaved = [];
let totalSize = 0;
const changeDirectory = (direction) => {
    let directoryTEMP = currentDirectory.split("");

    switch (direction) {
        case "/":
            return "/";
        case "..":
            directoryTEMP.pop();
            return directoryTEMP.join("");
        default:
            return directoryTEMP.join("") + direction;
    }
}

data.forEach(line => {
    if (line.startsWith("$ cd")) currentDirectory = changeDirectory(line.split("$ cd ")[1]);
    else if (line === "$ ls") { }
    else {
        let [type, name] = line.split(" ");
        if (type !== "dir") {
            type = parseInt(type);
            if (directoriesSaved.filter(object => object.name === currentDirectory).length > 0) {
                directoriesSaved.forEach(directorySaved => {
                    if (directorySaved.name.includes(currentDirectory)) {
                        directorySaved.totalSize += type;
                    }
                });
            } else {
                directoriesSaved.push({ name: currentDirectory, totalSize: type });
            }
        } else {
            directoriesSaved.push({ name: currentDirectory + name, totalSize: 0 })
        }
    }
});

directoriesSaved.forEach(directorySaved => {
    directoriesSaved.forEach(directoryChecked => {
        if (directoryChecked.name.includes(directorySaved.name) && directoryChecked.name !== directorySaved.name)
            directorySaved.totalSize += directoryChecked.totalSize;
    });
});

directoriesSaved.forEach(directorySaved => {
    if (directorySaved.totalSize < 100000) {
        totalSize += directorySaved.totalSize;
    }
});
console.log(totalSize);