import { BaseDao } from "../../../DAO/baseDao";
import { AdvertiseHistoryProps, AdvertiseProps } from "../common";
import { CompanyProps } from "../common/CompanyProps";

const pgp = require("pg-promise");

export class AdDao extends BaseDao {
  private static instance: AdDao;

  constructor() {
    super();
  }

  public static getInstance(): AdDao {
    if (!AdDao.instance) {
      console.log("Creating AdDao Instance...");
      AdDao.instance = new AdDao();
    }

    return AdDao.instance;
  }
  public async getAdList(callback: Function) {
    console.log("getAdList");
    const q = `SELECT A.ad_no, C.com_name, A.ad_start_date, A.ad_end_date, ad_cost, ad_pay_method, ad_impre_count FROM "Ad_history" JOIN "Ad" A on A.ad_no = "Ad_history".ad_no JOIN "Com" C on C.com_no = "Ad_history".com_no`;

    let pool = this.getPool();
    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [], (err, result) => {
          if (err) {
            console.log("Can't exec query!", err);
            callback(null, err);
          }

          const list = result.rows;
          const dataArray = new Array();
          list.map((arg) => {
            console.log("arg", arg);
            let newAd = {
              ad_no: arg.ad_no,
              com_name: arg.com_name,
              ad_start_date: arg.ad_start_date,
              ad_end_date: arg.ad_end_date,
              ad_cost: arg.ad_cost,
              ad_pay_method: arg.ad_pay_method,
              ad_impre_count: arg.ad_impre_count,
            };

            dataArray.push(newAd);
          });

          client.release();
          callback(dataArray, null);
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async getAdDetailFromAdNo(ad_no: number, callback: Function) {
    console.log("getAdDetailFromAdNo");
    const q = `SELECT * FROM "Ad" WHERE ad_no = $1`;

    let pool = this.getPool();
    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [ad_no], (err, result) => {
          if (err) {
            console.log("Can't exec query!", err);
            callback(null, err);
          }

          const list = result.rows;
          let newAd: AdvertiseProps = {
            ad_no: list[0].ad_no,
            ad_location: list[0].ad_location,
            ad_content: list[0].ad_content,
            ad_start_date: list[0].ad_start_date,
            ad_end_date: list[0].ad_end_date,
          };

          client.release();
          callback(newAd, null);
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async getAdHistoryFromComNo(com_no: number, callback: Function) {
    console.log("getAdHistoryFromComNo");
    const q = `SELECT * FROM "Ad_history" WHERE com_no = $1`;

    let pool = this.getPool();
    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [com_no], (err, result) => {
          if (err) {
            console.log("Can't exec query!", err);
            callback(null, err);
          }

          const list = result.rows;
          let dataList = new Array();

          list.map((arg) => {
            let newAdHistory: AdvertiseHistoryProps = {
              ad_no: arg.ad_no,
              com_no: com_no,
              ad_cost: arg.ad_cost,
              ad_impre_count: arg.ad_impre_count,
              ad_pay_method: arg.ad_pay_method,
            };

            dataList.push(newAdHistory);
          });

          client.release();
          callback(dataList, null);
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }
}
