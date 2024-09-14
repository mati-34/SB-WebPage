import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ?? 4321
const app = express();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

const connectMongoDB = async () => {
    try {
        await client.connect();
        console.log('Base de datos conectada correctamente');
    
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1); 
    }
}

app.post('/manegar-productos', async (req, res) => {
    try{
        const db = client.db('SB_Diseños');
        console.log('base de datos creada correctamente/ya existente')
        const collection = db.collection('productos');
        console.log('colección creada correctamente/ya existente')
        const product = req.body;
        const result = await collection.insertOne(product);
        res.status(201).send(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al crear el producto' });
    }
})




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectMongoDB();
});