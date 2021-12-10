"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdDao = void 0;
const baseDao_1 = require("../../../DAO/baseDao");
const pgp = require("pg-promise");
class AdDao extends baseDao_1.BaseDao {
    constructor() {
        super();
    }
    static getInstance() {
        if (!AdDao.instance) {
            console.log("Creating AdDao Instance...");
            AdDao.instance = new AdDao();
        }
        return AdDao.instance;
    }
}
exports.AdDao = AdDao;
