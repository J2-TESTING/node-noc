import { useSelectedLayoutSegments } from 'next/navigation';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.entity.test.ts',()=>{
    const logObj = {
        level: LogSeverityLevel.high,
        message: ' Mensaje importante',
        origin:'log.entity.test.ts'
    }
    test('Should create a logEntity instance',()=>{
       console.log(logObj) 
       const logEntity = new LogEntity(logObj)
       expect(logEntity).toBeInstanceOf(LogEntity)
       expect(logEntity).toEqual(expect.objectContaining({
        level: 'high',
        message: ' Mensaje importante',
        origin: 'log.entity.test.ts'
      }))
      expect(logEntity.level).toBe(logObj.level)
      expect(logEntity.message).toBe(logObj.message)
      expect(logEntity.origin).toBe(logObj.origin)
      expect(logEntity.createdAt).toBeInstanceOf(Date)
    })
    test('',()=>{
        const json=`{"message":"Service https://google.com working","level":"low","createdAt":"2024-05-28T21:07:57.081Z","origin":"check-service.ts"}`

        const logJson=LogEntity.fromJson(json)
        console.log(logJson)
        expect(logJson.message).toBe("Service https://google.com working")
        expect(logJson.level).toBe(LogSeverityLevel.low)
        expect(logJson.createdAt).toBeInstanceOf(Date)
    })
    
    test('Should create a LogEntity from Object',()=>{
        const log = LogEntity.fromObject(logObj)
        expect(log).toBeInstanceOf(LogEntity)
        expect(log.message).toBe(logObj.message)
        expect(log.level).toBe(logObj.level)
        expect(log.origin).toBe(logObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})