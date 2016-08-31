/**
 * Created by Simon on 2016-08-31.
 */
module.exports = function(app, connection){

    app.get('/api/title', function(req, res, next) {
        connection.query('SELECT * FROM title;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/title:name', function(req, res, next) {
        connection.query('SELECT * FROM title WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

};