const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/equilibre', { useNewUrlParser: true })
.then(() => 'connected to database');

//Alimentar
// Product.insertMany(products)
//   .then(() => {
//     console.log('products inserted');

//     mongoose.connection.close();
//   })
