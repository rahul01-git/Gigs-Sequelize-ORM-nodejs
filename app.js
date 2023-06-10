//import
const express = require("express")
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

//database
const db = require('./config/db')
// test db 
db.authenticate().then(()=>console.log("DB connected...")).catch(err => console.log('ERROR: ' + err))

// init 
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//set EJS as view engine
app.set('view engine','ejs')
app.use(expressLayouts)
app.set('layout','layout/main')

//setting static folder
app.use(express.static(path.join(__dirname,'public')))

//index route
app.get('/',(req,res) => res.render('index',{'layout': 'layout/landing'}))

//GIGS routes
app.use('/gigs',require('./routes/gigs.routes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on port ${PORT}`))