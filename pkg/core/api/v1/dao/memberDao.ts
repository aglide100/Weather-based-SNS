import { BaseDao } from "../../../DAO/baseDao";
import { MemberProps } from "../common/MemberProps";

const pgp = require("pg-promise");

export class MemberDao extends BaseDao {
  private static instance: MemberDao;

  constructor() {
    super();
  }

  public static getInstance(): MemberDao {
    if (!MemberDao.instance) {
      console.log("Creating MemberDao Instance...");
      MemberDao.instance = new MemberDao();
    }

    return MemberDao.instance;
  }

  public selectAllMember(callback: Function) {
    const q = `SELECT * FROM "Mem"`;
    const client = this.getClient();

    let data = Array();

    client.query(q, async (err, result) => {
      if (err) {
        console.log("Can't exec query!" + err);
      }
      const list = result.rows;

      client.end();

      for (var i = 0; i < list.length; i++) {
        let newMember: MemberProps = {
          mem_no: list[i].mem_no,
          mem_id: list[i].mem_id,
          mem_pw: list[i].mem_pw,
          mem_phone: list[i].mem_phone,
          mem_email: list[i].mem_email,
          mem_name: list[i].mem_name,
          mem_nickname: list[i].mem_nickname,
          mem_active_yn: list[i].mem_active_yn,
          mem_last_login_date: list[i].mem_last_login_date,
          mem_group_no: list[i].mem_group_no,
        };
        data.push(newMember);
      }

      callback(data);
    });
  }

  public selectMember(member: MemberProps, callback: Function) {
    const q = `SELECT * FROM "Mem" where mem_id=$1 and mem_pw=$2`;
    const client = this.getClient();

    console.log(pgp.as.format(q, [member.mem_id, member.mem_pw]));
    client.query(q, [member.mem_id, member.mem_pw], (err, result) => {
      client.end();
      console.log();

      if (err) {
        console.log("Can't exec query!" + err);
        callback(null, err);
        return;
      }

      if (result.rowCount != 0) {
        callback(result.rows[0], null);
      } else {
        callback(null, null);
      }
    });
  }

  public selectMemberByNo(mem_id: String, callback: Function) {
    const q = `SELECT * FROM "Mem" where mem_id = $1`;
    const client = this.getClient();

    client.query(q, [mem_id], (err, result) => {
      client.end();

      if (err) {
        console.log("Can't exec query!" + err);
        callback(null, err);
        return;
      }

      if (result.rowCount != 0) {
        callback(result.rows[0], null);
      } else {
        callback(null, null);
      }
    });
  }

  public insertMember(member: MemberProps, callback: Function) {
    const q = `INSERT INTO "Mem"(
      mem_id,
      mem_pw,
      mem_phone,
      mem_email,
      mem_name,
      mem_nickname) values ($1, $2, $3, $4, %5, %6)`;
    const client = this.getClient();

    client.query(
      q,
      [
        member.mem_id,
        member.mem_pw,
        member.mem_pw,
        member.mem_phone,
        member.mem_email,
        member.mem_name,
        member.mem_nickname,
      ],
      (err, result) => {
        if (err) {
          console.log("Can't exec query!" + err);
          callback(null, err);
          return;
        }

        client.end();
        this.selectMember(member, callback);
      }
    );
  }
}
