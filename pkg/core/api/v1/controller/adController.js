"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdController = void 0;
const baseController_1 = require("../../../controller/baseController");
const adDao_1 = require("../dao/adDao");
class AdController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    getAdDetail() {
        return (req, res) => {
            console.log("getAdDetail", req.params.ad_no);
            this.setHeader(res);
            adDao_1.AdDao.getInstance().getAdDetailFromAdNo(parseInt(req.params.ad_no), (response, err) => {
                if (err != null) {
                    console.log("Error in Dao", err);
                    this.handlingErr(req, res, err);
                }
                res.send(JSON.stringify(response));
            });
        };
    }
    getAdList() {
        return (req, res) => {
            console.log("getAdDetail");
            this.setHeader(res);
            adDao_1.AdDao.getInstance().getAdList((response, err) => {
                if (err != null) {
                    console.log("Error in Dao", err);
                    this.handlingErr(req, res, err);
                }
                res.send(JSON.stringify(response));
            });
        };
    }
    getAdHistoryList() {
        return (req, res) => {
            console.log("getAdHistory", req.params.com_no);
            this.setHeader(res);
            adDao_1.AdDao.getInstance().getAdHistoryFromComNo(parseInt(req.params.com_no), (response, err) => {
                if (err != null) {
                    console.log("Error in Dao", err);
                    this.handlingErr(req, res, err);
                }
                res.send(JSON.stringify(response));
            });
        };
    }
}
exports.AdController = AdController;
