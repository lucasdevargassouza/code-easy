import { Injectable } from '@angular/core';

let __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };

@Injectable({
  providedIn: 'root'
})
export class TerminalAccessService {
  private child_process_1 = __importDefault(require("child_process"));
  private pickPackagesWithKeywords_1 = require("./pickPackagesWithKeywords");

  constructor() { }







}

};
Object.defineProperty(exports, "__esModule", { value: true });
// istanbul ignore next
function searchByKeywords(keywords) {
    return new Promise(function (a, r) {
        child_process_1.default.exec("npm search --json " + keywords.join(' '), function (err, stdout) {
            if (err) {
                r(err);
            }
            else {
                var json = JSON.parse(stdout);
                a(pickPackagesWithKeywords_1.pickPackagesWithKeywords(json, keywords));
            }
        });
    });
}
exports.searchByKeywords = searchByKeywords;
//# sourceMappingURL=searchByKeywords.js.map