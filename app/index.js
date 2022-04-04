const express = require('express')
const app = express()

const devRoutes  = require('./routes/dev');
const userRoutes = require('./routes/users');

const  sequelize = require("./utils/database");
const User =  require('./models/users');


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
app.use('/dev', devRoutes);
app.use('/users', userRoutes);


//module pattern
(async () =>{
 const PORT = process.env.PORT || 3002
  try {
      //sequelize creating the table users inside the db without touching any endpoint
      //this is done before we bootstrap the application
      await sequelize.sync({
          force:false
      })

    app.listen(PORT,() =>{
        console.log(`Server running on port ${PORT}`)
    })

} catch (error) {
    console.error(error)
}
})()





