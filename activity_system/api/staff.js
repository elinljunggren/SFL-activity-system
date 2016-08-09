module.exports = function(app, connection){

    app.get('/api/staff', function(req, res, next) {
      connection.query('SELECT * FROM staff;', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
    });

    app.get('/api/staff:name', function(req, res, next) {
      connection.query('SELECT * FROM staff WHERE name="'+req.params.name+'";', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
      });
    });


}