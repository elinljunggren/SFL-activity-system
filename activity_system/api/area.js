/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/area', function(req, res, next) {
        connection.query('SELECT * FROM area;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/area:name', function(req, res, next) {
        connection.query('SELECT * FROM area WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

};