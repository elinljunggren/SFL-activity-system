/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/school', function(req, res, next) {
        connection.query('SELECT * FROM school;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/school:name', function(req, res, next) {
        connection.query('SELECT * FROM school WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

};