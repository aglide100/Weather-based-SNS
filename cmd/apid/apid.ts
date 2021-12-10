import express from "express";
import { UseRouter } from "../../pkg/core/router/useRouter";
import { MemberController } from "../../pkg/core/api/v1/controller/memberController";
import { CompanyController} from "../../pkg/core/api/v1/controller/companyController"

let apiVersion = process.env.VERSION;
if (apiVersion == undefined) {
  console.log("Can't get env from project!!, start at v1 version");
  apiVersion = "v1";
}

const port = 10100;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = new UseRouter(app, apiVersion);
const MemberCtrl = new MemberController();
const CompanyCtrl = new CompanyController();

const cors = require("cors");
app.use(cors());

if (apiVersion == "v1") {
  server.addRule(
    apiVersion + "/member/list",
    "GET",
    "member list",
    "Member list",
    MemberCtrl.list()
  );

  server.addRule(
    apiVersion + "/member/join",
    "POST",
    "member join",
    "Member Join",
    MemberCtrl.join()
  );

  server.addRule(
    apiVersion + "/member/login",
    "POST",
    "login member",
    "Member",
    MemberCtrl.login()
  );

  server.addRule(
    apiVersion + "/com/list",
    "GET",
    "company list",
    "Com",
    CompanyCtrl.getCompanyList()
  );
}

server.listen(port);
