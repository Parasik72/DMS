const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');
const config = require("config");
const fileUpload = require('express-fileupload');

const app = express();

const PORT = config.get('PORT') || 5000;

app.use(express.json());
app.use(fileUpload());
app.use('/api/auth', routes.auth);
app.use('/api/docs', routes.docs);
app.use('/api/users', routes.users);

const start = async () => {
    try {
        await mongoose.connect(config.get("DBUri"))
            .then(() => console.log(`Authentication done!`))
            .catch(() => {throw new Error(`Authentication failed.`)});
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();