import express from "express";
import { UseRouter } from "../../pkg/core/router/useRouter";
import { MemberController } from "../../pkg/core/api/v1/controller/memberController";
import { CompanyController } from "../../pkg/core/api/v1/controller/companyController";
import { AdController } from "../../pkg/core/api/v1/controller/adController";
import { PostController } from "../../pkg/core/api/v1/controller/postController";
import { BaseDao } from "../../pkg/core/DAO/baseDao";
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
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
// cors 허용
app.use(cors({ origin: "*" }));
app.use(limiter);

const server = new UseRouter(app, apiVersion);
const memberCtrl = new MemberController();
const companyCtrl = new CompanyController();
const adCtrl = new AdController();
const postCtrl = new PostController();

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
    apiVersion + "/com/:com_no",
    "GET",
    "company Detauk",
    "Com",
    companyCtrl.getCompanyDetail()
  );

  server.addRule(
    apiVersion + "/post/list",
    "GET",
    "get Post detail",
    "post",
    postCtrl.getPostList()
  );

  server.addRule(
    apiVersion + "/post/:post_no",
    "GET",
    "get Post detail",
    "post",
    postCtrl.getPostDetail()
  );

  server.addRule(
    apiVersion + "/adDetail/:ad_no",
    "GET",
    "get Advertise detail",
    "ad",
    adCtrl.getAdDetail()
  );

  server.addRule(
    apiVersion + "/adHistory/:com_no",
    "GET",
    "get Advertise history detail",
    "ad history",
    adCtrl.getAdHistoryList()
  );
}
process.on("uncaughtException", function (err) {
  console.log("uncaughtException!! :", err);

  // 아마 에러는 왠만하면 DB에서...?
  BaseDao.havingErr = true;
});

// process.on('unhandledRejection', error => {
//   console.log("unhandledRejection!! :", error)
//   BaseDao.client.end()
// });

server.listen(port);
