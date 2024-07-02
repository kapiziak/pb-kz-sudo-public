const JsonToTS = require("json-to-ts");
const fs = require("fs");
const json = require("../dictionaries/en.json");

let content = `// Auto generated ${new Date().toLocaleDateString()} / ${new Date().getTime()}\n`;
JsonToTS(json, { rootName: "LangDict" }).forEach((typeInterface: any) => {
    const inter = typeInterface;
    content = content + "\n" + inter;
});

content = content + "\nexport default LangDict;";

fs.writeFileSync("./dictionaries/dist/locale-dict-type.d.ts", content);

export {};
