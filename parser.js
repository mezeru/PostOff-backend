const excelToJson = require('convert-excel-to-json');
const result = excelToJson({
    sourceFile: 'BeetleNut_Data.xlsx',
    header:{
        rows: 1,
    },
    columnToKey: {
        A: 'insitutionName',
        B: 'branchName',
        C: 'address',
        D: 'city',
        E: 'contact',
        F: 'branchIncharge',
        G: 'pincode'
    }
});

module.exports = result.Sheet1;