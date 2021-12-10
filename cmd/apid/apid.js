"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useRouter_1 = require("../../pkg/core/router/useRouter");
const memberController_1 = require("../../pkg/core/api/v1/controller/memberController");
const companyController_1 = require("../../pkg/core/api/v1/controller/companyController");
let apiVersion = process.env.VERSION;
if (apiVersion == undefined) {
    console.log("Can't get env from project!!, start at v1 version");
    apiVersion = "v1";
}
const port = 10100;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const server = new useRouter_1.UseRouter(app, apiVersion);
const MemberCtrl = new memberController_1.MemberController();
const CompanyCtrl = new companyController_1.CompanyController();
const cors = require("cors");
app.use(cors());
if (apiVersion == "v1") {
    server.addRule(apiVersion + "/member/list", "GET", "member list", "Member list", MemberCtrl.list());
    server.addRule(apiVersion + "/member/join", "POST", "member join", "Member Join", MemberCtrl.join());
    server.addRule(apiVersion + "/member/login", "POST", "login member", "Member", MemberCtrl.login());
    server.addRule(apiVersion + "/com/list", "GET", "company list", "Com", CompanyCtrl.getCompanyList());
}
server.listen(port);
