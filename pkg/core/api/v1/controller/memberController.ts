import { BaseController } from "../../../controller/baseController";
import { Handler, Request, Response } from "express";
import { MemberProps } from "../common/MemberProps";
import * as uuid from "uuid";
import { MemberDao } from "../dao/memberDao";

export class MemberController extends BaseController {
  constructor() {
    super();
  }

  public list(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Member list");
      this.setHeader(res);

      MemberDao.getInstance().selectAllMember(function (result: any) {
        res.send(JSON.stringify(result));
      });
    };
  }

  public login(): Handler {
    return (req: Request, res: Response) => {
      console.log("request member " + req.body.mem_id + " login");
      this.setHeader(res);
      const newUser: MemberProps = {
        mem_id: req.body.bodymem_id,
        mem_pw: req.body.bodymem_pw,
      };

      MemberDao.getInstance().selectMember(
        newUser,
        (result: MemberProps, error: Error) => {
          if (error != null || result == null) {
            console.log("Can't Login new member" + error + result);
            res.status(400).send("user not found");
          } else {
            // 로그인용 토큰 발급
            const json = this.generateTokenJson(result);
            // 토큰을 res로 전달
            res.status(200).send(JSON.stringify(json));
          }
        }
      );
    };
  }

  public join(): Handler {
    return (req: Request, res: Response) => {
      console.log("request member " + req.body.mem_name + " join");
      this.setHeader(res);

      const id = uuid.v4();
      const newUser: MemberProps = {
        mem_id: req.body.bodymem_id,
        mem_pw: req.body.bodymem_pw,
        mem_phone: req.body.bodymem_phone,
        mem_email: req.body.bodymem_email,
        mem_name: req.body.bodymem_name,
        mem_nickname: req.body.bodymem_nickname,
      };

      MemberDao.getInstance().insertMember(
        newUser,
        (result: MemberProps, error: Error) => {
          if (error != null || result == null) {
            console.log("Can't Insert new member" + error + result);
            res.status(400).send("error :" + error.message);
          } else {
            const json = this.generateTokenJson(result);
            res.status(200).send(JSON.stringify(json));
          }
        }
      );
    };
  }
}
