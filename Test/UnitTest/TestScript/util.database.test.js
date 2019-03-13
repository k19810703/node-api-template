/* eslint-env jest */
const ibmdb = require('ibm_db');

const Database = require('../../../util/database');
const testutil = require('../testutil/testutil');
const databasetestdata = require('../Data/util.database.data');

jest.mock('ibm_db');
jest.mock('../../../util/log');

describe('util.database模块测试', () => {
  describe.each(databasetestdata.selectByConditionTestData)(
    'selectByCondition test',
    (testdata) => {
      beforeEach(() => {
        Database.prototype.beginTransaction = jest.fn();
        Database.prototype.commitTransaction = jest.fn();
        Database.prototype.executeSql = jest.fn().mockImplementationOnce(testdata.executeSql);
      });
      test(`${testdata.describe}`, async () => {
        const db = new Database();
        let result;
        try {
          result = await db.selectByCondition(...testdata.inputdata);
          expect(false).toBe(testdata.expectresult.isError);

        } catch (error) {
          // console.log(error);
        } finally {
          expect(result).toEqual(expect.arrayContaining(testutil.executeSqlDummyResponse));
          expect(Database.prototype.executeSql.mock.calls[0][0]).toBe(
            testdata.expectresult.executeSqlParams[0],
          );
          expect(Database.prototype.executeSql.mock.calls[0][1]).toEqual(
            expect.arrayContaining(testdata.expectresult.executeSqlParams[1]),
          );
        }
      });
    },
  );
});
