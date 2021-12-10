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
exports.CompanyDao = void 0;
const baseDao_1 = require("../../../DAO/baseDao");
const pgp = require("pg-promise");
class CompanyDao extends baseDao_1.BaseDao {
    constructor() {
        super();
    }
    static getInstance() {
        if (!CompanyDao.instance) {
            console.log("Creating CompanyDao Instance...");
            CompanyDao.instance = new CompanyDao();
        }
        return CompanyDao.instance;
    }
    selectCompanyByNo(com_no, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM "Com" WHERE com_no = $1`;
            const pool = this.getPool();
            try {
                yield pool.connect((err, client, release) => {
                    if (err) {
                        return err;
                    }
                    client.query(q, [com_no], (err, result) => {
                        console.log();
                        if (err) {
                            console.log("Can't exec query!" + err);
                            callback(null, err);
                        }
                        const comData = {
                            com_no: result.rows[0].com_no,
                            com_name: result.rows[0].com_name,
                            com_phone: result.rows[0].com_phone,
                            com_ceo: result.rows[0].com_ceo,
                            com_regis_no: result.rows[0].com_regis_no,
                        };
                        client.release();
                        callback(comData, null);
                    });
                });
            }
            catch (e) {
                console.log("Dao Error !", e);
            }
        });
    }
    selectAllCompany(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM "Com"`;
            const pool = this.getPool();
            try {
                yield pool.connect((err, client, release) => {
                    if (err) {
                        return err;
                    }
                    client.query(q, [], (err, result) => {
                        console.log();
                        if (err) {
                            console.log("Can't exec query!" + err);
                            callback(null, err);
                        }
                        const list = result.rows;
                        let dataList = new Array();
                        list.map((arg) => {
                            let newCompany = {
                                com_no: arg.com_no,
                                com_name: arg.com_name,
                                com_phone: arg.com_phone,
                                com_ceo: arg.com_ceo,
                                com_regis_no: arg.com_regis_no,
                            };
                            dataList.push(newCompany);
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
exports.CompanyDao = CompanyDao;
