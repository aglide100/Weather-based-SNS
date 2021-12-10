import { BaseDao } from "../../../DAO/baseDao";
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


}
