"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonToTS = require("json-to-ts");
var fs = require("fs");
var json = require("../dictionaries/en.json");
var content = "// Auto generated ".concat(new Date().toLocaleDateString(), " / ").concat(new Date().getTime(), "\n");
JsonToTS(json, { rootName: "LangDict" }).forEach(function (typeInterface) {
    var inter = typeInterface;
    content = content + "\n" + inter;
});
content = content + "\nexport default LangDict;";
fs.writeFileSync("./dictionaries/dist/locale-dict-type.d.ts", content);
