import config from "./../config/config";
import app from './express';

app.listen(config.port, (err) => {
    if(err) {
        console.log(err)
    }
    console.info('Server started om port %s.', config.port)
})