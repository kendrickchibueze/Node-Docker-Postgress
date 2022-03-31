const express = require('express')
const userRoutes  = require('./routes/dev')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    //TO avoid cors problems
    res.setHeader('Access-Control-Allow-Origin', '*')
    //To allow headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT','DELETE')
    next()
})

//setting up routes middleware
app.use('/dev', userRoutes)


const PORT = process.env.PORT || 3000

try {
    app.listen(PORT,() =>{
        console.log(`Server running on port ${PORT}`)
    })

} catch (error) {
    console.error(error)
}

