const ibmdb = require('ibm_db');
const { log } = require('./log');
const { DB2Error } = require('../UserDefineError/db2Error');
const { DataError } = require('../UserDefineError/DataError');

const {
  DB2DATABASE,
  DB2HOSTNAME,
  DB2UID,
  DB2PWD,
  DB2PORT,
} = process.env;

const DB2CONNECTSTRING = `DATABASE=${DB2DATABASE};HOSTNAME=${DB2HOSTNAME};UID=${DB2UID};PWD=${DB2PWD};PORT=${DB2PORT};PROTOCOL=TCPIP`;

class Database {
  constructor() {
    log.info(DB2CONNECTSTRING);
    this.db2conn = ibmdb.openSync(DB2CONNECTSTRING);
    this.transaction = false;
  }

  beginTransaction() {
    return new Promise((resolve, reject) => {
      log.info('transaction開始');
      this.db2conn.beginTransaction((err) => {
        if (err) {
          return reject(new DB2Error('beginTransaction', err, this));
        }
        this.transaction = true;
        return resolve();
      });
    });
  }

  async insertByData(table, data) {
    let insertresult;
    if (data.length === 0) {
      throw new DataError(`insertByData for Table(${table}) with no data`);
    }
    if (data instanceof Array) {
      const fieldnames = Object.keys(data[0]);
      const sqlfields = fieldnames.join(',');
      const sqlvalues = data.map((singlerec) => {
        const singlevalues = fieldnames.map(fieldname => `'${singlerec[fieldname]}'`);
        return `(${singlevalues.join(',')})`;
      });
      const sqlvaluesstring = sqlvalues.join(',');
      const sql = `select * from FINAL TABLE(insert into ${table} (${sqlfields}) values ${sqlvaluesstring})`;
      insertresult = await this.executeSql(sql);
    } else {
      const fieldnames = Object.keys(data);
      const sqlfields = fieldnames.join(',');
      const sqlvalues = '? ,'.repeat(fieldnames.length).slice(0, -1);
      const sql = `select * from FINAL TABLE(insert into ${table} (${sqlfields}) values (${sqlvalues}))`;
      const sqlparam = fieldnames.map(field => data[field]);
      insertresult = await this.executeSql(sql, sqlparam);
    }
    return data instanceof Array ? insertresult : insertresult[0];
  }

  async selectByKey(table, key) {
    const result = await this.selectByCondition(table, key);
    if (result.length !== 1) {
      throw new DataError(`selectByKey for Table(${table}) with condition ${JSON.stringify(key)} got ${result.length} record, responsdata can be found in errordata field`, result );
    }
    return result;
  }

  async deleteByKey(table, key) {
    this.executeSql('a', 'b');
    return '';
  }

  async updateByKey(table, key) {
    this.executeSql('a', 'b');
    return '';
  }

  async selectByCondition(table, condition) {
    const keyfields = Object.keys(condition);
    const wherecondition = keyfields.map(keyfield => `${keyfield} = ?`).join(' and ');
    const sqlparam = keyfields.map(keyfield => condition[keyfield]);
    const sql = `select * FROM ${table} WHERE ${wherecondition}`;
    const insertresult = await this.executeSql(sql, sqlparam);
    return insertresult;
  }

  async updateByCondition(table, setkey, condition) {
    this.executeSql('a', 'b');
    return '';
  }

  async deleteByCondition(table, setkey, condition) {
    this.executeSql('a', 'b');
    return '';
  }

  executeSql(sql, data) {
    return new Promise((resolve, reject) => {
      const params = data || [];
      log.info('sql : ', sql, params);
      this.db2conn.query(sql, params, (error, rows) => {
        if (error) {
          return reject(new DB2Error('executeSql', error, this, sql, data));
        }
        return resolve(rows);
      });
    });
  }

  rollBack() {
    return new Promise((resolve, reject) => {
      log.info('rollback開始');
      this.db2conn.rollbackTransaction((error) => {
        if (error) {
          return reject(new DB2Error('rollBack', error, this));
        }
        return resolve('');
      });
    });
  }

  commitTransaction() {
    return new Promise((resolve, reject) => {
      if (!this.transaction) {
        log.info('no transcation found, just close the connection');
        this.db2conn.close((closeerr) => {
          if (closeerr) {
            return reject(new DB2Error('commitTransaction', closeerr));
          }
          return resolve('');
        });
      }
      log.info('commit開始');
      this.db2conn.commitTransaction((err) => {
        if (err) {
          return reject(new DB2Error('commitTransaction', err));
        }
        log.error(err);
        log.info('close db2 connection');
        this.db2conn.close((closeerr) => {
          if (closeerr) {
            return reject(new DB2Error('commitTransaction', closeerr));
          }
          return resolve('');
        });
        return resolve('');
      });
    });
  }
}
module.exports = Database;
