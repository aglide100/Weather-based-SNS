"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const baseController_1 = require("../../../controller/baseController");
const companyDao_1 = require("../dao/companyDao");
class CompanyController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getCompanyList() {
        return (req, res) => {
            console.log("returns Company List");
            this.setHeader(res);
            companyDao_1.CompanyDao.getInstance().selectAllCompany((response, err) => {
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
    getCompanyDetail() {
        return (req, res) => {
            console.log("returns Company Detail" + req.params.com_no);
            this.setHeader(res);
            companyDao_1.CompanyDao.getInstance().selectCompanyByNo(parseInt(req.params.com_no), (response, err) => {
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
            // res.send(JSON.stringify(data))
        };
    }
}
exports.CompanyController = CompanyController;
