const config = require('../conf/token');
//DB SETTINGS
const db = require('../db/db-connection');
const pool = db.getPool();

const jwt = require('jsonwebtoken')
var promise = require('bluebird');

/* /api/v1/login */
// var login_user_query = 'INSERT INTO public.book (titulo, isbn_10, isbn_13, valoracion, autor)' +
//                        ' values(${titulo}, ${isbn_10}, ${isbn_13}, ${valoracion}, ${autor})';

/*function loginUser(req, res, next) {
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
}*/

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

/* /api/v1/users */
var single_user_query = 'SELECT id, name, password, email, role, active  FROM public.user WHERE name = $1';

function getUserByName(req, res, next) {
  try {
    const query = {
      text: single_user_query,
      rowMode: 'json',
      values: [req.params.name]
    };

    pool.on('error', (error, client) => {
      // logger.error('Error en la conexión con base de datos', error);
      process.exit(-1);
      res.json({ status: 500, 'error': error});
      return;
    });

    pool.connect((connError, client, done) => {
      done();
      if (connError) {
        // logger.error(connError.stack);
        res.json({ status: 500, 'error': err});
        return;
      }
      client.query(query, (queryError, queryResult) => {
        done();
        if (queryError) {
          // logger.error(queryError.stack);
          res.json({ status: 500, 'error': queryError.stack});
          return;
        } else {
          res.json(queryResult.rows);
        }
      });
    });
  } catch (error) {
    // logger.error('Error obteniendo rol');
    res.json({ status: 500, 'error': error});
    return;
  }
  /*
  var userName = req.params.name;
  const users = req.body;
    db.any(single_user_query, userName)
      .then(function (data) {
        res.status(200)
          .json(data);
      })
      .catch(function (err) {
        return next(err);
      });*/
}

module.exports = {
  getUserByName: getUserByName
};
