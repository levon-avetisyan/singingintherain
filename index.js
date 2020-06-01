'use strict';
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/contact', function (req, res) {
        res.render('./contact');
    });
    app.get('/about', function (req, res) {
        res.render('./about');
    });
    app.get('/raisers', function (req, res) {
        res.render('./raisers');
    });
    app.get('/teams', function (req, res) {
        res.render('./teams');
    });
    app.get('/register', function (req, res) {
        res.render('./register');
    });
    app.get('/singer-donate', function (req, res) {
        res.render('./singer-donate');
    });
    app.get('/team-info', function (req, res) {
        res.render('./team-info');
    });
};