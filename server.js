const express = require('express');
const app = express();
const {getPosts, addPost, delPost, getEditPostPage, editPost} = require('./controllers/api-post-controller');
/* const apiController = require('./controllers/api-post-controller'); */
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
/* const Post = require('./models/postSchema'); */
const apiRouter = express.Router();
require('dotenv').config();
/* const Post = require('./models/postSchema'); */



const PORT = process.env.PORT || 8001;

/* const bodyParser = require('body-parser'); */

/* mongoose.set('strictQuery', false); */
mongoose
    .connect(process.env.MONGO_URL, {})
    .then((res) => console.log('connected to db'))
    .catch((error) => console.log('error db'));

/* app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-Width, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}); */


app.use(cors({
    origin: 'https://blog-zhenkaaf.vercel.app/, https://blog-eta-nine-17.vercel.app/',
    methods: 'GET, POST, DELETE, PUT, OPTIONS',
    accessControlAllowHeaders: 'Content-Type, Authorization',
    credentials: true
  }));
  app.options('/newpost', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blog-zhenkaaf.vercel.app/, https://blog-eta-nine-17.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
  });
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blog-zhenkaaf.vercel.app/, https://blog-eta-nine-17.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
   /*  res.setHeader('Permissions-Policy', 'interest-cohort=()'); */
    next();
  });
app.use(express.json());
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); */
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/api', apiRouter); // добавляем префикс '/api' для всех маршрутов



app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/newpost', function (req, res) {
    res.send('GET newpost page opened');
});


//Get All Posts
app.get('/posts', getPosts);
/* apiRouter.get('/posts', getPosts); */

//Add New Post
app.post('/newpost', addPost);
/* apiRouter.post('/newpost', addPost); */

//Delete one post
app.delete('/posts/:id', delPost);

//Edit post
app.get('/edit/:id', getEditPostPage);
app.put('/editpost/:id', editPost);



/* app.use((req, res) => {
    res.send('error');
}); */

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });



app.listen(PORT, (error) => {
    error ? console.log('listen***', error) : console.log(`listening port ${PORT}`);
});






/* Preflight request - это определенный тип запроса, который отправляется браузером перед основным запросом для проверки политики CORS на сервере. Preflight request использует метод OPTIONS и содержит определенные заголовки, которые определяют, какие методы и заголовки могут быть использованы при основном запросе.

Ошибка "Response to preflight request doesn't pass access control check" означает, что сервер не прошел проверку на предварительный запрос и не отправил правильный ответ на него. Для разрешения этой проблемы, вам необходимо обработать запрос с методом OPTIONS на вашем сервере и возвращать правильные заголовки Access-Control-Allow-* в ответе.

В частности, если вы хотите разрешить метод POST, вы должны добавить Access-Control-Allow-Methods: POST в ответ на запрос OPTIONS. Если вы хотите разрешить использование куки и аутентификационных заголовков в запросах, вы должны добавить Access-Control-Allow-Credentials: true в ответ на запрос OPTIONS. */
/* Этот код обрабатывает все запросы с методом OPTIONS на любой URL и возвращает правильные заголовки Access-Control-Allow-*.

Обратите внимание, что вы должны заменить http://localhost:3000 на URL вашего фронтенда, и добавить другие заголовки, если они необходимы для вашего приложения.

Также убедитесь, что этот код находится в вашем файле сервера, который запускается на порту 8001, чтобы сервер мог обрабатывать запросы и отправлять правильные заголовки в ответ. */