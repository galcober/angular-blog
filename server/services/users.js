var config = require('../conf/token');
const jwt = require('jsonwebtoken')
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'librafydb',
    user: 'librafy',
    password: 'l1br44u'
});

/* /api/v1/login */
var login_user_query = 'INSERT INTO public.book (titulo, isbn_10, isbn_13, valoracion, autor)' +
                        ' values(${titulo}, ${isbn_10}, ${isbn_13}, ${valoracion}, ${autor})';

function loginUser(req, res, next) {
  //const tokenList = {};
  const postData = req.body;
  const user = {
      "email": postData.email,
      "name": postData.name
  }
  // do the database authentication here, with user name and password combination.
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
  localStorage.setItem('currentUser', JSON.stringify({ username: user.name, email: user.email, token: token}));
  //const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
  const response = {
      "status": "Logged in",
      "token": token
      //"refreshToken": refreshToken,
  }
  //tokenList[refreshToken] = response
  res.status(200).json(response);
}

/* /api/v1/login */
//var login_user_query = 'SELECT id, name, role FROM public."User" WHERE name = \'${user}\'';// AND password = ${password} AND active = true';

/*function loginUser(req, res, next) {
  let user = req.body.username;
  // Gets password and encrypt it with SHA256 algorithm. After that, converts it in Base64 format.
  //let password = SHA256(req.body.password).toString(CryptoJS.enc.Base64);
  let password = req.body.password;
  //var bookID = parseInt(req.params.id);
  db.any(login_user_query, user)
    .then(function (data) {
      res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Logged'
      });
    })
    .catch(function (err) {
      return next(err);
    });
}*/

module.exports = {
  loginUser: loginUser
};
