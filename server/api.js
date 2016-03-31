var jwt = require( 'express-jwt' );
require('dotenv').config({path: 'conf/.env'});

var authenticate = jwt({
    secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT_ID
});

var appRouter = function(app) {
    app.use('/api', authenticate);

    app.get("/api/employees", function(req, res) {
        const employees = [
            {firstName: 'Foo', lastName: 'Bar', title: 'Master of the party'},
            {firstName: 'firstName', lastName: 'lastName', title: 'title'},
            {firstName: 'Allan', lastName: 'Wick', title: 'Software Craftsman'},
            {firstName: 'Johnny', lastName: 'Five', title: 'Cute Robot'},
            {firstName: 'Kris', lastName: 'Kringle', title: 'Present master'},
            {firstName: 'Oliver ', lastName: 'Queen', title: 'Bow Master'}
        ];

        res.send(employees);
    });
};

module.exports = appRouter;