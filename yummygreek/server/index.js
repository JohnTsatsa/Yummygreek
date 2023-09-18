const express = require('express')
const app = express()

const cors = require('cors');   // for taking request from react


//? needs for taking requests from react
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions))
//?   ==============================    //?



const dishes = require('./dishes'); // Import the dishes array from dishes.js



app.get('/dishes', (req, res) => {
    res.json(dishes);
});


app.get('/dishes/:id', (req, res) => {
    const dishId = req.params.id;
    const dish = dishes.find(d => d.id == dishId); // Assuming each dish has a unique 'id' property
    if (dish) {
        res.json(dish);
    } else {
        res.status(404).json({ message: 'Dish not found' });
    }
});





app.listen(3001, () => {  // different port from the react that is running in 3000
    console.log('Listening on port 3001')
})