/**
 * Created by Simon on 2016-08-10.
 */
/**
 * Created by Simon on 2016-08-10.
 */
module.exports = function(app, connection){

    app.get('/api/acategory', function(req, res, next) {
        connection.query('SELECT * FROM activitycategory;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.get('/api/acategory:name', function(req, res, next) {
        connection.query('SELECT * FROM activitycategory WHERE name="'+req.params.name+'";', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });


}