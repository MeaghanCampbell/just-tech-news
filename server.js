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
// force: false is good to have when setting up because if true, it would drop and recreate all databases on startup
    // - this is great when we make changes to models as the databases need to understand something has been changed
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})