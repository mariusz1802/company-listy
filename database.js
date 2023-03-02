const mongoose = requre('mongoose')



mongoose.connect('mongodb://localhost/mydatabase', {
    useNewUrlParser : true,
    useUnifiedTopology: true
});


const db = mongoose.connection;


db.on('error', console.error.bind(console, 'conneciton error: '));

db.onece('open', function() {
    console.log('Database connected');
})