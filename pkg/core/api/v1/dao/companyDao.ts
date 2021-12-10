import { release } from "os";
import { BaseDao } from "../../../DAO/baseDao";
import { CompanyProps } from "../common/CompanyProps";

const pgp = require("pg-promise");

export class CompanyDao extends BaseDao {
  private static instance: CompanyDao;

  constructor() {
    super();
  }

  public static getInstance(): CompanyDao {
    if (!CompanyDao.instance) {
      console.log("Creating CompanyDao Instance...");
      CompanyDao.instance = new CompanyDao();
    }

    return CompanyDao.instance;
  }

  public async selectCompanyByNo(com_no: number, callback: Function) {
    const q = `SELECT * FROM "Com" WHERE com_no = $1`;
    const pool = this.getPool();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [com_no], (err, result) => {
          console.log();

          if (err) {
            console.log("Can't exec query!" + err);
            callback(null, err);
          }

          const comData: CompanyProps = {
            com_no: result.rows[0].com_no,
            com_name: result.rows[0].com_name,
            com_phone: result.rows[0].com_phone,
            com_ceo: result.rows[0].com_ceo,
            com_regis_no: result.rows[0].com_regis_no,
          };

          client.release();
          callback(comData, null);
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async selectAllCompany(callback: Function) {
    const q = `SELECT * FROM "Com"`;
    const pool = this.getPool();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [], (err, result) => {
          console.log();

          if (err) {
            console.log("Can't exec query!" + err);
            callback(null, err);
          }

          const list = result.rows;
          let dataList = new Array();

          list.map((arg) => {
            let newCompany: CompanyProps = {
              com_no: arg.com_no,
              com_name: arg.com_name,
              com_phone: arg.com_phone,
              com_ceo: arg.com_ceo,
              com_regis_no: arg.com_regis_no,
            };
            dataList.push(newCompany);
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
