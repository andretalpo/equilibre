const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.0.179/equilibre', { useNewUrlParser: true })
.then(() => 'connected to database');

//Alimentar
// Product.insertMany(products)
//   .then(() => {
//     console.log('products inserted');

//     mongoose.connection.close();
//   })
