const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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