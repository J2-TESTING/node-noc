import { envs } from "../../../src/config/plugins/envs.plugin";
describe("test en envs", () => {
  test("envs must be iqual", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "fernando@google.com",
      MAILER_SECRET_KEY: "123123123",
      PROD: false,
      MONGO_URL: "mongodb://jota:123456@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "jota",
      MONGO_PASS: "123456",
    });
  });

  test('should return error if not found env',async ()=>{
    jest.resetModules()
    //!asignamos un valor a la variable de ambiente PORT que env-var lo va a detectar en envs.plugin.ts
    process.env.PORT='ABC'
    try {
        await import('../../../src/config/plugins/envs.plugin')
        //!esta linea no se va a ejecutar nunca porque al momento de hacer el import del archivo va a saltar la validacion en envs.plugin.ts y lanzara una excepcion que se ira por el catch
        expect(true).toBe(false);
    } catch (error) {
        expect(`${error}`).toContain(`"PORT" should be a valid integer`)
    }

  })
});
