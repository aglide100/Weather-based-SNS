"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getAdHistoryFromComNo(com_no, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getAdHistoryFromComNo");
            const q = `SELECT * FROM "Ad_history" WHERE com_no = $1`;
            let pool = this.getPool();
            try {
                yield pool.connect((err, client, release) => {
                    if (err) {
                        return err;
                    }
                    client.query(q, [com_no], (err, result) => {
                        if (err) {
                            console.log("Can't exec query!", err);
                            callback(null, err);
                        }
                        const list = result.rows;
                        let dataList = new Array();
                        list.map((arg) => {
                            let newAdHistory = {
                                ad_no: arg.ad_no,
                                com_no: com_no,
                                ad_cost: arg.ad_cost,
                                ad_impre_count: arg.ad_impre_count,
                                ad_pay_method: arg.ad_pay_method,
                            };
                            dataList.push(newAdHistory);
                        });
                        client.release();
                        callback(dataList, null);
                    });
                });
            }
            catch (e) {
                console.log("Dao Error !", e);
            }
        });
    }
}
exports.AdDao = AdDao;
