import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import path from 'path';
import Template from './../template';

const app = express();
devBundle.compile(app);

const CURRENT_WORK_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

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
app.use('/', userRoutes);
app.use('/', authRoutes);

// Catch unauthorised errors
app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
          res.status(401).json({"error" : err.name + ": " + err.message})
        }else if (err) {
          res.status(400).json({"error" : err.name + ": " + err.message})
          console.log(err)
        }
      })

export default app;