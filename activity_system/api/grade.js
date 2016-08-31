/**
 * Created by Simon on 2016-08-31.
 */
module.exports = function(app, connection){

    app.get('/api/grade', function(req, res, next) {
        connection.query('SELECT * FROM grade ORDER BY listOrder;', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        });
    });

    app.post('/api/grade', function(req, res) {
        connection.query('INSERT INTO grade SET ?', req.body, function(err, result) {
            if (err) throw err;
            res.send("Grade added to database with id " +result.insertId);
        });
    });

};