import mongoose from "mongoose";
import { MongoDatabase } from "../../../src/data/mongo/init";

describe("init mongo db", () => {
    //!Para cerrar todas las conexiones despues de las pruebvas
    afterAll(()=>{
        mongoose.connection.close()
    })
  test("Should connect to MongoDb", async () => {
    console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);
    const resp = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
    expect(resp).toBe(true);
  });

  //! Cuando se evalua una excepcion disparada por el sujeto de prueba esta se debe de testear con un try/catch
  test('when could not connected',async()=>{

   try {
    await MongoDatabase.connect({
      mongoUrl: "dfkjdfsjgsd",
      dbName: "dfgkdjfg",
    });
   } catch (error) {
      //console.log(error)
   }
    
    
  })
});
