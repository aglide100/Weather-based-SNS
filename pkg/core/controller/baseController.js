"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const jwt = require("jsonwebtoken");
class BaseController {
    constructor() {
        this.secretKey = "secretKey";
    }
    generateAccessToken(id) {
        return jwt.sign({ id }, this.secretKey, {
            expiresIn: "15m",
        });
    }
    generateRefreshToken(id) {
        return jwt.sign({ id }, this.secretKey, {
            expiresIn: "1h",
        });
    }
    generateTokenJson(member) {
        const access = this.generateAccessToken(member.mem_id);
        const refresh = this.generateRefreshToken(member.mem_id);
        return {
            accessToken: access,
            refreshToken: refresh,
            user: member.mem_name,
        };
    }
    handlingErr(req, res, err) {
        res.status(400);
        res.send("Error! " + err.toString());
        // wip
    }
    setHeader(res) {
        // wip
    }
    authenticateAccessToken(token) {
        if (token == undefined) {
            return null;
        }
        return jwt.verify(token, this.secretKey, (error, result) => {
            if (error != null) {
                return null;
            }
            const id = result.id;
            return id;
        });
    }
    describeError(res, err) {
        // TODO 직렬화 할것
        return res.send("Having error : " + err);
    }
    // handling common error in here!!!
    exceptionHandler() { }
    createResBody(type, title, res, detail, instance) {
        return "";
    }
}
exports.BaseController = BaseController;
