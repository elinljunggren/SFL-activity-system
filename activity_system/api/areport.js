/**
 * Created by Simon on 2016-08-10.
 */
/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/areport', function(req, res, next) {
        connection.query('SELECT * FROM activityreport;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/areport:name', function(req, res, next) {
        connection.query('SELECT * FROM activityreport WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.post('/api/areport', function(req, res) {
        connection.query('INSERT INTO activityreport SET ?', req.body, function(err, result) {
            if (err) throw err;
            res.send("Activity report added to database with id " +result.insertId);
        });
    });

};