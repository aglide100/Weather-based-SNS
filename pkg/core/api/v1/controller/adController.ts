import { BaseController } from "../../../controller/baseController";
import { Handler, Request, Response } from "express";
import { CompanyProps } from "../common/CompanyProps";
import { AdvertiseHistoryProps } from "../common";
import { AdDao } from "../dao/adDao";

export class AdController extends BaseController {
  constructor() {
    super();
  }

  public getAdDetail(): Handler {
    return (req: Request, res: Response) => {
      console.log("getAdDetail", req.params.ad_no);
      this.setHeader(res);

      AdDao.getInstance().getAdDetailFromAdNo(
        parseInt(req.params.ad_no),
        (response: any, err: any) => {
          if (err != null) {
            console.log("Error in Dao", err);
            this.handlingErr(req, res, err);
          }

          res.send(JSON.stringify(response));
        }
      );
    };
  }

  public getAdHistoryList(): Handler {
    return (req: Request, res: Response) => {
      console.log("getAdHistory", req.params.com_no);
      this.setHeader(res);

      AdDao.getInstance().getAdHistoryFromComNo(
        parseInt(req.params.com_no),
        (response: any, err: any) => {
          if (err != null) {
            console.log("Error in Dao", err);
            this.handlingErr(req, res, err);
          }

          res.send(JSON.stringify(response));
        }
      );
    };
  }
}
