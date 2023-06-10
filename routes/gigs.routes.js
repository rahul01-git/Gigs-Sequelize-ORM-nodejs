const express = require('express')
const router = express.Router()
const db = require('../config/db')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//get gig list
router.get('/', async (req, res) => {
    try {
        const gigs = await Gig.findAll()
        res.render('gigs', { gigs })
    } catch (error) {
        console.log('Error: ' + error)
    }
})

//display add gig from
router.get('/add', (req, res) => res.render('add'))


// add a gig
router.post('/add', async (req, res) => {

    let { title, technologies, budget, description, contact_email } = req.body

    if (!budget) budget = 'Unknown'
    else budget = `$${budget}`

    // convert to lowercase and remove spacing after comma  
    technologies = technologies.toLowerCase().replace(/, /g, ',')

    //insert into table
    try {
        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        })
        res.redirect('/gigs')
    } catch (error) {
        console.log(error)
    }
})

router.get('/search', async (req, res) => {
    let { term } = req.query
    term = term.toLowerCase()

    try {
        const gigs = await Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        res.render('gigs',{gigs})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;