import mysql from "mysql2/promise";

export default class Base {
  getConnection() {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "bodhistar1507",
      database: "kor_db",
    });
  }
}
