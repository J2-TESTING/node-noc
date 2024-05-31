import { MongoDatabase } from "../../../src/data/mongo/init";
import { envs } from "../../../src/config/plugins/envs.plugin";
import mongoose from "mongoose";
import { MongoLogDatasource } from "../../../src/infrastructure/datasources/mongo-log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogModel } from "../../../src/data/mongo";

describe("mongo-log.datasource.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });
  afterEach(async ()=>{
    await LogModel.deleteMany()
  })
  afterAll(async() => {
      
    mongoose.connection.close();
  });
  const mongoLog = new MongoLogDatasource();
  const logEntity = new LogEntity({
    message: "Test message",
    level: LogSeverityLevel.medium,
    origin: "mongo-log.datasource.test.ts",
    createdAt: new Date(),    
  });
  test("Should create a log", async () => {
    //! COmo mongoLog.saveLog devuelve void no tenemos manera de como evaluar su valor de retorno. Como mongoLog.save() emite un consol.log podemos evualuar esto con un spy
    const logSpy = jest.spyOn(console, "log");
    
     
    await mongoLog.saveLog(logEntity);
    expect(mongoLog).toBeInstanceOf(MongoLogDatasource);
    expect(logEntity).toBeInstanceOf(LogEntity);
    expect(logSpy).toHaveBeenCalled();
    //! "Mongo Log created:", "665951b07f8fa5b8cb6b17e2", el ID es volatil
    expect(logSpy).toHaveBeenCalledWith("Mongo Log created:",expect.any(String));
  

    logSpy.mockReset();
    logSpy.mockRestore();
  });
  test('test get logs',async()=>{
    //Primero grabamos
    mongoLog.saveLog(logEntity)
    mongoLog.saveLog(logEntity)
        
    const logs=await mongoLog.getLogs(LogSeverityLevel.medium)
    expect(logs.length).toBe(2)
    expect(logs[0].level).toBe(LogSeverityLevel.medium)
  })
});
