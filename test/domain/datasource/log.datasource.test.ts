import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogDatasource } from '../../../src/domain/datasources/log.datasource';
import exp from 'constants';
describe('log.datasource.test.ts',()=>{
    const newLog = new LogEntity({
        level:LogSeverityLevel.low,
        message:'test-message',
        origin:'log.datasource.test.ts'
    })

    class MockLogDataSource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }
    test('should test the abstract class',async ()=>{
      //! para evaluar una clase abstracta  (no se puede crear una instancia de una clase abstracta) creamos una Mock Class que imlemente la clase abstracta y asi la classe mock se puede instanciar.
      const mocklogDataSource=new MockLogDataSource()
      //! Verificamos que sea una instancia de MockLogDataSource
      expect(mocklogDataSource).toBeInstanceOf(MockLogDataSource)
      //! Verificamos que logDatasource tenga las propiedades/metodos saveLog/getLogs
      expect(mocklogDataSource).toHaveProperty('saveLog')
      expect(mocklogDataSource).toHaveProperty('getLogs')
      //! O tambien puede ser
      expect(typeof mocklogDataSource.saveLog).toBe('function')
      expect(typeof mocklogDataSource.getLogs).toBe('function')

      await mocklogDataSource.saveLog(newLog)
      const logs=await mocklogDataSource.getLogs(LogSeverityLevel.medium)
      console.log(logs)
      expect(logs[0]).toBeInstanceOf(LogEntity)
      expect(logs).toHaveLength(1)
    })
    
})