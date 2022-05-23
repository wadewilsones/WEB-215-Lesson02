import config from "./../config/config";
import app from './express';
import mongoose from 'mongoose';



/*Mongoose config*/

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

/*PORT*/

app.listen(config.port, (err) => {
    if(err) {
        console.log(err)
    }
    console.info('Server started om port %s.', config.port)
})