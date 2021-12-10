"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const baseController_1 = require("../../../controller/baseController");
class CompanyController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getCompanyList() {
        return (req, res) => {
            console.log("returns Company List");
            let data = {
                com_no: 0,
                com_ceo: "홍길동",
                com_name: "(주) 즐거운밥상",
                com_phone: "041-558-0615",
                com_regis_no: "133-10-22851"
            };
            let comArray = new Array();
            for (var i = 0; i < 10; i++) {
                let temp = data;
                temp.com_no = i;
                comArray.push(temp);
            }
            res.send(JSON.stringify(comArray));
        };
    }
    getCompanyDetail() {
        return (req, res) => {
            console.log("returns Company Detail");
        };
    }
}
exports.CompanyController = CompanyController;
