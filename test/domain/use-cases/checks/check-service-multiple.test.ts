import { LogEntity } from "../../../../src/domain/entities/log.entity";
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";
describe("check-service-multiple.test.ts", () => {
  const mockRepository =[ {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  },{
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  },{
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }];
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  //!enviamos las dependencias como argumento
  const checkServiceMultiple = new CheckServiceMultiple(
    mockRepository,
    successCallback,
    errorCallback
  );
  //!Para limpiar todos los mocks despues de cada test
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  test("Success Callback", async () => {
    const isSuccess = await checkServiceMultiple.execute(`https://www.google.com`);
    expect(isSuccess).toBe(true);
    //!Evaluamos las dependencias
    expect(successCallback).toHaveBeenCalled()
    //! En este escenario no se debe de ejecutar el errorCallback
    expect(errorCallback).not.toHaveBeenCalled()

    mockRepository.forEach(element =>{
      expect(element.saveLog).toHaveBeenCalledWith( expect.objectContaining({"level": "low", "message": "Service https://www.google.com working", "origin": "check-service.ts"}))
    //!Tambien se puede verificar de esta manera
    expect(element.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(element.saveLog).toBeCalledWith(expect.any(LogEntity))
    })


    
  });

  test("Error Callback", async () => {
    const isSuccess = await checkServiceMultiple.execute(`https://fsdfsfafasfasfdasfagafd.com`);
    expect(isSuccess).toBe(false);
    //!Evaluamos las dependencias
    expect(successCallback).not.toHaveBeenCalled()
    //! En este escenario no se debe de ejecutar el errorCallback
    expect(errorCallback).toHaveBeenCalled()
    mockRepository.forEach(element=>{
      expect(element.saveLog).toHaveBeenCalledWith(expect.objectContaining({"level": "high", "message": "https://fsdfsfafasfasfdasfagafd.com is not ok. TypeError: fetch failed", "origin": "check-service.ts"}))
    //!Tambien se puede verificar de esta manera
    expect(element.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(element.saveLog).toBeCalledWith(expect.any(LogEntity))
    })

    
  });
});
