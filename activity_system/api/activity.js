/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/activity', function(req, res, next) {
        connection.query('SELECT * FROM activity;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/activity:name', function(req, res, next) {
        connection.query('SELECT * FROM activity WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

};