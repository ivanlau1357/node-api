const app = require('../app.js')

const {
  OPERATION_ID: operationId,
  OPERATION_EXEC_RUN: isExecRun,
  OPERATION_FILE: operationFile,
} = process.env

app.executeOperation({ operationId, isExecRun: isExecRun === 'true', operationFile })