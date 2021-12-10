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

  public selectAllCompany(callback:Function) {
    const q = `SELECT * FROM "Com"`
    const client = this.getClient();

    console.log(pgp.as.format(q, []));
    client.query(q, [], (err, result) => {
      client.end();
      console.log();

      if (err) {
        console.log("Can't exec query!" + err);
        callback(null, err);
        return;
      }

      const list = result.rows;

      client.end();

    //   let newMember: MemberProps = {
    //     mem_no: list[i].mem_no,
    //     mem_id: list[i].mem_id,
    //     mem_pw: list[i].mem_pw,
    //     mem_phone: list[i].mem_phone,
    //     mem_email: list[i].mem_email,
    //     mem_name: list[i].mem_name,
    //     mem_nickname: list[i].mem_nickname,
    //     mem_active_yn: list[i].mem_active_yn,
    //     mem_last_login_date: list[i].mem_last_login_date,
    //     mem_group_no: list[i].mem_group_no,
    //   };
    //   data.push(newMember);

    });

  }


}
