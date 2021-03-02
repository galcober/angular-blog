var promise = require('bluebird');
//DB SETTINGS
const db = require('../db/db-connection');
const pool = db.getPool();

/* /api/v1/posts */
var all_posts_query = 'SELECT id, title, summary, body, authorId, imageId  FROM public.post';

function getAllPosts(req, res, next) {
  try {
    pool.connect(function(err,client,done) {
      const queryDb = {
        text: all_posts_query,
        rowMode: 'json'
      };
      client.query(queryDb, function (err, result) {
        done()
        if (err) {
          // logger.error('LISTADO DE POSTS - Error obteniendo el listado: ', err);
          res.json({ 'status': '500', 'error': 'OBTENER POST - Error obteniendo el listado' });
        }
        res.json(result.rows)
      })

    }).catch(connError => {            
      // logger.error('Error en la conexión con base de datos', connError);
      res.json({ 'status': '500', 'error': 'LISTADO DE POSTS - Error en la conexión con base de datos' });
      return;
    })
  } catch (error) {
    // logger.error('LISTADO DE POSTS - Error obteniendo el listado: ', error);
  }
}

  /* /api/v1/posts/search/:id */
  var single_post_query = 'SELECT id, title, summary, body, authorId, imageId  FROM public.post WHERE id = $1';

  function getPostById(req, res, next) {
    try {
      const query = {
        text: single_post_query,
        rowMode: 'json',
        values: [req.params.id]
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
  }

  /* /api/v1/posts */
  var create_post_query = 'INSERT INTO public.post (title, summary, body, authorid, imageid)' +
  ' values(${title}, ${summary}, ${body}, ${authorId}, ${imageId})';

  function createPost(req, res, next) {
    const post = req.body;
    // req.body.valoracion = parseInt(req.body.valoracion);
    db.none(create_post_query, req.body)
      .then(function () {
      res.status(200)
      .json(post);
    })
    .catch(function (err) {
      return next(err);
    });
  }

module.exports = {
    getAllPosts: getAllPosts,
    getPostById: getPostById,
    createPost: createPost
};