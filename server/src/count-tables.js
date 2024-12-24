const fs = require("fs")

const input = fs.readFileSync("entities.ts", "utf8")

const types = input.split("\r\n").filter((row) => row.includes("export type") && row.includes("Type = {")).length

console.log(types)
