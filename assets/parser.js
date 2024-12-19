const fs = require("fs");

const craft = JSON.parse(fs.readFileSync("craft.json", "utf8"));
fs.writeFileSync("items.txt", craft.items.join(","), "utf8");
