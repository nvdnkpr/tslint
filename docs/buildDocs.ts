import * as fs from "fs";
import * as glob from "glob";
import {AbstractRule} from "../lib/language/rule/abstractRule";

const rulePaths = glob.sync("../lib/rules/*Rule.js");
const rulesJson: any[] = [];
for (const rulePath of rulePaths) {
    const ruleModule = require(rulePath);
    const Rule = ruleModule.Rule as typeof AbstractRule;
    if (Rule != null && Rule.metadata != null) {
        rulesJson.push(Rule.metadata);
    }
}

const fileData = JSON.stringify(rulesJson, undefined, "  ");
fs.writeFileSync("../../tslint-gh-pages/_data/rules.json", fileData);
