"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdController = void 0;
const baseController_1 = require("../../../controller/baseController");
class AdController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getAdHistory() {
        return (req, res) => {
            console.log("getAdHistory", req.params.com_no);
            let data = {
                com_no: parseInt(req.params.com_no),
                ad_no: 0,
                ad_cost: 10000,
                ad_impre_count: 2000,
                ad_pay_method: "신용카드"
            };
            let dataArray = new Array();
            for (var i = 0; i < 10; i++) {
                let temp = data;
                temp.ad_no = i;
                dataArray.push(temp);
            }
            res.send(JSON.stringify(dataArray));
        };
    }
}
exports.AdController = AdController;
