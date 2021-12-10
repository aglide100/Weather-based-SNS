import { BaseDao } from "../../../DAO/baseDao";
import { AdvertiseHistoryProps } from "../common";
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
