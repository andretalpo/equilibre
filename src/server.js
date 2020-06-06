const server = require('./app');

server.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
