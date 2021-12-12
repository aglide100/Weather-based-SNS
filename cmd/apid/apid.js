"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useRouter_1 = require("../../pkg/core/router/useRouter");
const memberController_1 = require("../../pkg/core/api/v1/controller/memberController");
const companyController_1 = require("../../pkg/core/api/v1/controller/companyController");
const adController_1 = require("../../pkg/core/api/v1/controller/adController");
const postController_1 = require("../../pkg/core/api/v1/controller/postController");
const baseDao_1 = require("../../pkg/core/DAO/baseDao");
const RateLimit = require("express-rate-limit");
//  1분에 20번 요청
const limiter = RateLimit({
    windowMs: 60 * 1000,
    max: 20,
    delayMs: 0,
    message: "진정해 너무 많이 요청했어...",
});
let apiVersion = process.env.VERSION;
if (apiVersion == undefined) {
    console.log("Can't get env from project!!, start at v1 version");
    apiVersion = "v1";
}
const port = 10100;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const cors = require("cors");
// cors 허용
app.use(cors({ origin: "*" }));
app.use(limiter);
const server = new useRouter_1.UseRouter(app, apiVersion);
const memberCtrl = new memberController_1.MemberController();
const companyCtrl = new companyController_1.CompanyController();
const adCtrl = new adController_1.AdController();
const postCtrl = new postController_1.PostController();
// api/v1/~
if (apiVersion == "v1") {
    server.addRule(apiVersion + "/member/list", "GET", "member list", "Member list", memberCtrl.list());
    server.addRule(apiVersion + "/member/join", "POST", "member join", "Member Join", memberCtrl.join());
    server.addRule(apiVersion + "/member/login", "POST", "login member", "Member", memberCtrl.login());
    server.addRule(apiVersion + "/com/list", "GET", "company list", "Com", companyCtrl.getCompanyList());
    server.addRule(apiVersion + "/com/:com_no", "GET", "company Detauk", "Com", companyCtrl.getCompanyDetail());
    server.addRule(apiVersion + "/post/list", "GET", "get Post detail", "post", postCtrl.getPostList());
    server.addRule(apiVersion + "/post/:post_no", "GET", "get Post detail", "post", postCtrl.getPostDetail());
    server.addRule(apiVersion + "/adDetail/:ad_no", "GET", "get Advertise detail", "ad", adCtrl.getAdDetail());
    server.addRule(apiVersion + "/adHistory/:com_no", "GET", "get Advertise history detail", "ad history", adCtrl.getAdHistoryList());
}
process.on("uncaughtException", function (err) {
    console.log("uncaughtException!! :", err);
    // 아마 에러는 왠만하면 DB에서...?
    baseDao_1.BaseDao.havingErr = true;
});
// process.on('unhandledRejection', error => {
//   console.log("unhandledRejection!! :", error)
//   BaseDao.client.end()
// });
server.listen(port);
