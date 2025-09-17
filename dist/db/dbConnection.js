'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.dbConnect = dbConnect;
const mongoose_1 = require('mongoose');
function dbConnect() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const dbConnectionInstance = yield mongoose_1.default.connect(`${process.env.DATABASE_URL}/${process.env.DB_NAME}`);
      if (dbConnectionInstance) {
        console.log('dbConnectionInstance', dbConnectionInstance);
      }
    } catch (error) {}
  });
}
