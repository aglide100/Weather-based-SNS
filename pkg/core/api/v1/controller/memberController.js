"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const baseController_1 = require("../../../controller/baseController");
const uuid = __importStar(require("uuid"));
const memberDao_1 = require("../dao/memberDao");
class MemberController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    list() {
        return (req, res) => {
            console.log("returns Member list");
            memberDao_1.MemberDao.getInstance().selectAllMember(function (result) {
                res.send(JSON.stringify(result));
            });
        };
    }
    login() {
        return (req, res) => {
            console.log("request member " + req.body.mem_id + " login");
            const newUser = {
                mem_id: req.body.bodymem_id,
                mem_pw: req.body.bodymem_pw,
            };
            memberDao_1.MemberDao.getInstance().selectMember(newUser, (result, error) => {
                if (error != null || result == null) {
                    console.log("Can't Login new member" + error + result);
                    res.status(400).send("user not found");
                }
                else {
                    // 로그인용 토큰 발급
                    const json = this.generateTokenJson(result);
                    // 토큰을 res로 전달
                    res.status(200).send(JSON.stringify(json));
                }
            });
        };
    }
    join() {
        return (req, res) => {
            console.log("request member " + req.body.mem_name + " join");
            const id = uuid.v4();
            const newUser = {
                mem_id: req.body.bodymem_id,
                mem_pw: req.body.bodymem_pw,
                mem_phone: req.body.bodymem_phone,
                mem_email: req.body.bodymem_email,
                mem_name: req.body.bodymem_name,
                mem_nickname: req.body.bodymem_nickname,
            };
            memberDao_1.MemberDao.getInstance().insertMember(newUser, (result, error) => {
                if (error != null || result == null) {
                    console.log("Can't Insert new member" + error + result);
                    res.status(400).send("error :" + error.message);
                }
                else {
                    const json = this.generateTokenJson(result);
                    res.status(200).send(JSON.stringify(json));
                }
            });
        };
    }
}
exports.MemberController = MemberController;
