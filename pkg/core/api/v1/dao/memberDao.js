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
exports.MemberDao = void 0;
const baseDao_1 = require("../../../DAO/baseDao");
const pgp = require("pg-promise");
class MemberDao extends baseDao_1.BaseDao {
    constructor() {
        super();
    }
    static getInstance() {
        if (!MemberDao.instance) {
            console.log("Creating MemberDao Instance...");
            MemberDao.instance = new MemberDao();
        }
        return MemberDao.instance;
    }
    selectAllMember(callback) {
        const q = `SELECT * FROM "Mem"`;
        const client = this.getClient();
        let data = Array();
        client.query(q, (err, result) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log("Can't exec query!" + err);
            }
            const list = result.rows;
            client.end();
            for (var i = 0; i < list.length; i++) {
                let newMember = {
                    mem_no: list[i].mem_no,
                    mem_id: list[i].mem_id,
                    mem_pw: list[i].mem_pw,
                    mem_phone: list[i].mem_phone,
                    mem_email: list[i].mem_email,
                    mem_name: list[i].mem_name,
                    mem_nickname: list[i].mem_nickname,
                    mem_active_yn: list[i].mem_active_yn,
                    mem_last_login_date: list[i].mem_last_login_date,
                    mem_group_no: list[i].mem_group_no,
                };
                data.push(newMember);
            }
            callback(data);
        }));
    }
    selectMember(member, callback) {
        const q = `SELECT * FROM "Mem" where mem_id=$1 and mem_pw=$2`;
        const client = this.getClient();
        console.log(pgp.as.format(q, [member.mem_id, member.mem_pw]));
        client.query(q, [member.mem_id, member.mem_pw], (err, result) => {
            client.end();
            console.log();
            if (err) {
                console.log("Can't exec query!" + err);
                callback(null, err);
                return;
            }
            if (result.rowCount != 0) {
                callback(result.rows[0], null);
            }
            else {
                callback(null, null);
            }
        });
    }
    selectMemberByNo(mem_id, callback) {
        const q = `SELECT * FROM "Mem" where mem_id = $1`;
        const client = this.getClient();
        client.query(q, [mem_id], (err, result) => {
            client.end();
            if (err) {
                console.log("Can't exec query!" + err);
                callback(null, err);
                return;
            }
            if (result.rowCount != 0) {
                callback(result.rows[0], null);
            }
            else {
                callback(null, null);
            }
        });
    }
    insertMember(member, callback) {
        const q = `INSERT INTO "Mem"(
      mem_id,
      mem_pw,
      mem_phone,
      mem_email,
      mem_name,
      mem_nickname) values ($1, $2, $3, $4, %5, %6)`;
        const client = this.getClient();
        client.query(q, [
            member.mem_id,
            member.mem_pw,
            member.mem_pw,
            member.mem_phone,
            member.mem_email,
            member.mem_name,
            member.mem_nickname,
        ], (err, result) => {
            if (err) {
                console.log("Can't exec query!" + err);
                callback(null, err);
                return;
            }
            client.end();
            this.selectMember(member, callback);
        });
    }
}
exports.MemberDao = MemberDao;
