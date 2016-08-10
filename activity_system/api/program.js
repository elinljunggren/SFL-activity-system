/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/program', function(req, res, next) {
        connection.query('SELECT * FROM program;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/program:name', function(req, res, next) {
        connection.query('SELECT * FROM program WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });


}