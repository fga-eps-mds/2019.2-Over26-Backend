var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(express.static('./views'));
if (process.env.NODE_ENV != 'test') app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(function (_, res) {
    res.status(404).send({ error: 'Not found' });
});

app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({ error: err });
});

module.exports = app;
