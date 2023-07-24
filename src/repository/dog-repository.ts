
import { ObjectId } from "mongodb";
import { Dog } from "../entities";
import { connection } from "./connection"

const collection = connection.db('dog-express').collection<Dog>('dog');

export const dogRepository = {
    findAll() {
        return collection.find().toArray();
    },
    async persist(dog:Dog) {
        const result = await collection.insertOne(dog);
        dog._id = result.insertedId;
        return dog;
    },
    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },
    // remove(_id:string) {
    //     return collection.deleteOne({_id:new ObjectId(_id)});
    // },
    // update(_id:string, person:Dog) {
    //     return collection.updateOne({_id:new ObjectId(_id)}, {$set:dog});
    // }
}