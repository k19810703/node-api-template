const testutil = require('../testutil/testutil');

module.exports.selectByConditionTestData = [
  // {
  //   describe: '测试用例1 描述',
  //   executeSql: executeSql的mock实现
  //      正常：async () => Promise.resolve(testutil.executeSqlDummyResponse),
  //      异常: () => Promise.reject(new Error('dummy error')),
  //   inputdata: 函数输入参数 数组形式,
  //   expectresult: 期待结果
  //   {
  //     isError: 函数是否报错,
  //     errMessage: 报错信息
  //     executeSqlParams: 调用executeSql时的期待参数 数组形式
  //   },
  // },
  {
    describe: '测试用例1 4个参数全有',
    executeSql: async () => Promise.resolve(testutil.executeSqlDummyResponse),
    inputdata: [
      'testtable',
      {
        a: 1,
        b: 'abc',
      },
      ['a', 'b'],
      true,
    ],

    expectresult: {
      isError: false,
      executeSqlParams: [
        'select * FROM testtable undefined  order by a,b   FOR UPDATE WITH CS ',
        [],
      ],

    },
  },
  {
    describe: '测试用例2 参数4(是否锁表)缺失',
    executeSql: async () => Promise.resolve(testutil.executeSqlDummyResponse),
    inputdata: [
      'testtable',
      {
        a: 1,
        b: 'abc',
      },
      ['a', 'b'],
    ],
    expectresult: {
      isError: false,
      executeSqlParams: [
        'select * FROM testtable undefined  order by a,b  ',
        [],
      ],

    },
  },
];
