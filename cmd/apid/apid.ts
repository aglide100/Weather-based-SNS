import express from "express";
import { UseRouter } from "../../pkg/core/router/useRouter";
import { MemberController } from "../../pkg/core/api/v1/controller/memberController";
import { CompanyController} from "../../pkg/core/api/v1/controller/companyController"
import { AdController } from "../../pkg/core/api/v1/controller/adController"
import { PostController } from "../../pkg/core/api/v1/controller/postController";

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
const memberCtrl = new MemberController();
const companyCtrl = new CompanyController();
const adCtrl = new AdController()
const postCtrl = new PostController()

const cors = require("cors");
// cors 허용 
app.use(cors({ origin: "http://localhost:3000/"}));

// api/v1/~
if (apiVersion == "v1") {
  server.addRule(
    apiVersion + "/member/list",
    "GET",
    "member list",
    "Member list",
    memberCtrl.list()
  );

  server.addRule(
    apiVersion + "/member/join",
    "POST",
    "member join",
    "Member Join",
    memberCtrl.join()
  );

  server.addRule(
    apiVersion + "/member/login",
    "POST",
    "login member",
    "Member",
    memberCtrl.login()
  );

  server.addRule(
    apiVersion + "/com/list",
    "GET",
    "company list",
    "Com",
    companyCtrl.getCompanyList()
  );

  server.addRule(
    apiVersion + "/post/:post_no",
    "GET",
    "get Post detail",
    "post",
    postCtrl.getPostDetail()
  );

  server.addRule(
    apiVersion + "/adhistory/:com_no",
    "GET",
    "get Advertise history detail",
    "ad history",
    adCtrl.getAdHistory()
  );

}

server.listen(port);
