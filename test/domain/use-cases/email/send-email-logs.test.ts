import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
describe('send-mail-logs.test.tsw',()=>{

    const mockEmailService:any={
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
      };
      const sendEmailLogs= new SendEmailLogs(mockEmailService ,mockRepository)
      beforeEach(()=>{
        jest.clearAllMocks()
      })
    test('should log in case off error',async()=>{
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)
        
        const result=await sendEmailLogs.execute('juan@collantes.ec')
        expect(result).toBe(false)
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        // {"createdAt": 2024-05-31T00:34:50.757Z, "level": "low", "message": "Log email sent", "origin": "send-email-logs.ts"}
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.objectContaining({"level": "high", "message": "Error: Email log not sent", "origin": "send-email-logs.ts"}))
        //!Tambien puede ser
        expect(mockRepository.saveLog).toHaveBeenCalledWith({"createdAt": expect.any(Date), "level": "high", "message": "Error: Email log not sent", "origin": "send-email-logs.ts"})
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
         //!Tambien puede ser
        expect(mockRepository.saveLog).toHaveBeenCalledWith({"createdAt": expect.any(Date), "level": "high", "message": "Error: Email log not sent", "origin": "send-email-logs.ts"})
    })
})