require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

const setMiddleware = require('./middleware/middleware')
const setRoute = require('./routes/routes')

const app = express()

// const config = require('./config/config')
// let configaration = app.get('env').toLowerCase() === 'development' ? config.dev.name : config.prod.name
// console.log(configaration);


const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.wa1q4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.set('view engine', 'ejs')
app.set('views', 'views')

//Using Middleware from Middleware Directory
setMiddleware(app)

//Using Routes from Router Directory
setRoute(app)

app.use((req, res, next) => {
    let error = new Error('404 Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('pages/error/404', { flashMessage: {} })
    }
    console.log(chalk.red.inverse(error.message));
    console.log(error);
    res.render('pages/error/500', { flashMessage: {} })
})

const PORT = process.env.PORT || 8080
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log(chalk.yellow('Database Connected'));
        app.listen(PORT, () => {
            console.log(chalk.yellow(`SERVER IS RUNNING ON PORT ${PORT}`));
        })
    })
    .catch(e => {
        return console.log(e);
    })