import { MongoDatabase } from '../../../../src/data/mongo/init';
import { envs } from '../../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { LogModel } from '../../../../src/data/mongo/models/log.model';
describe('log.model.test.ts',()=>{
//! Nos conectamos a la db
beforeAll(()=>{
    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    })
})
afterAll(()=>{
    //mongoose.connection.close()
    mongoose.disconnect()
})
test('Should return log model',async ()=> {
//creamos el log
const logData={
    origin: 'log.model.test.ts',
    message:'test-message',
    level:'low'
}
//cremos el registro en bd
const log = await LogModel.create(logData)
console.log(log)

expect(log).toEqual(expect.objectContaining({
    ...logData,
    id:expect.any(String),
    createdAt: expect.any(Date)
}))
await LogModel.findByIdAndDelete(log.id)
})

//!Esta prueba servira para verificar de que se mentenga el objeto definido en el schema de creacion del modelo en data/model/log.model.ts
test('should return the schema object',()=>{
    
    const schema=LogModel.schema.obj
    console.log(schema)
    expect(schema).toEqual(expect.objectContaining(
        
        {
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        //createdAt: { type: expect.any(Function), default: '2024-05-29T16:49:54.517Z' }
        createdAt: expect.any(Object)
      }))

})

})