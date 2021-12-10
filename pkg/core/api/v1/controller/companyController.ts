import { BaseController } from "../../../controller/baseController";
import { Handler, Request, response, Response } from "express";
import { CompanyProps } from "../common/CompanyProps";
import { CompanyDao } from "../dao/companyDao";

export class CompanyController extends BaseController {
  constructor() {
    super();
  }

  public getCompanyList(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Company List");
      this.setHeader(res);

      CompanyDao.getInstance().selectAllCompany((response: any, err: any) => {
        if (err != null) {
          console.log("Error in Dao", err);
          this.handlingErr(req, res, err);
        }

        res.send(JSON.stringify(response));
      });
      // let data:CompanyProps ={
      //   com_no: 0,
      //   com_ceo: "홍길동",
      //   com_name: "(주) 즐거운밥상",
      //   com_phone: "041-558-0615",
      //   com_regis_no: "133-10-22851"
      // }
      // let comArray = new Array()

      // for (var i=0; i< 10; i++) {
      //   let temp = data
      //   temp.com_no = i;
      //   comArray.push(temp)
      // }

      // res.send(JSON.stringify(comArray))
    };
  }

  public getCompanyDetail(): Handler {
    return (req: Request, res: Response) => {
      console.log("returns Company Detail" + req.params.com_no);
      this.setHeader(res);

      CompanyDao.getInstance().selectCompanyByNo(
        parseInt(req.params.com_no),
        (response: any, err: any) => {
          if (err != null) {
            console.log("Error in Dao", err);
            this.handlingErr(req, res, err);
          }

          res.send(JSON.stringify(response));
        }
      );

      // let data:CompanyProps ={
      //   com_no: 0,
      //   com_ceo: "홍길동",
      //   com_name: "(주) 즐거운밥상",
      //   com_phone: "041-558-0615",
      //   com_regis_no: "133-10-22851"
      // }

      // res.send(JSON.stringify(data))
    };
  }
}
