const express = require('express')
const routes = require('./controllers')
const sequelize = require('./config/connection')
// make front end assets available to client server
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// set up handlebars.js as app's template engine of choice
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//express.static is a middle ware function to take all contents of a folder and serve as static assets, useful for front end assets
app.use(express.static(path.join(__dirname, 'public')))

// turn on routes
app.use(routes)

// turn on connection to db and server
// sync means sequelize takes the models and connects them to the database tables, if it doesn't find a table it creates one
// force: true - means the database connection must sync with the model definitions and associations
    // - By forcing the sync, we will make tables re-create if there are any association changes
    // - keep it false unless you've made changes
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})