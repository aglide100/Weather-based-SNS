import { BaseController } from "../../../controller/baseController";
import { Handler, Request, Response } from "express";
import { CompanyProps } from "../common/CompanyProps";
import { AdvertiseHistoryProps } from "../common";

export class AdController extends BaseController {
  constructor() {
    super();
  }

  public getAdHistory(): Handler {
    return (req: Request, res: Response) => {
      console.log("getAdHistory", req.params.com_no);
      
      let data:AdvertiseHistoryProps= {
        com_no: parseInt(req.params.com_no),
        ad_no: 0,
        ad_cost: 10000,
        ad_impre_count: 2000,
        ad_pay_method: "신용카드"
      }
      
      let dataArray = new Array()
      for(var i=0; i< 10; i++) {
        let temp = data
        temp.ad_no = i
        dataArray.push(temp)
      }

      
      res.send(JSON.stringify(dataArray))
    };
  }

}
