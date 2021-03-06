import { Response, Request } from "express";
import { MemberProps } from "../api/v1/common/MemberProps";

const jwt = require("jsonwebtoken");

export class BaseController {
  constructor() {}

  private secretKey: String = "secretKey";

  protected generateAccessToken(id: String) {
    return jwt.sign({ id }, this.secretKey, {
      expiresIn: "15m",
    });
  }

  protected generateRefreshToken(id: String) {
    return jwt.sign({ id }, this.secretKey, {
      expiresIn: "1h",
    });
  }

  protected generateTokenJson(member: MemberProps) {
    const access = this.generateAccessToken(member.mem_id);
    const refresh = this.generateRefreshToken(member.mem_id);

    return {
      accessToken: access,
      refreshToken: refresh,
      user: member.mem_name,
    };
  }

  protected handlingErr(req: Request, res: Response, err:any ){
    res.status(400)
    res.send("Error! " + err.toString())
    // wip
  }
  
  protected setHeader(res: Response) {
    // wip
  }

  protected authenticateAccessToken(token: "" | undefined | string) {
    if (token == undefined) {
      return null;
    }

    return jwt.verify(token, this.secretKey, (error: Error, result: any) => {
      if (error != null) {
        return null;
      }
      const id: String = result.id;
      return id;
    });
  }

  public describeError(res: Response, err: String) {
    // TODO 직렬화 할것
    return res.send("Having error : " + err);
  }
  // handling common error in here!!!

  public exceptionHandler() {}

  public createResBody(
    type: string,
    title: string,
    res: Response,
    detail: string,
    instance: string
  ): string {
    return "";
  }
}
