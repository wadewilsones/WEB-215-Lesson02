import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';

import Template from './../template';

const app = express();


/*API*/

app.get('/', (req,res) => {
        res.status(200).send(Template())
})

/*Express Config*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;