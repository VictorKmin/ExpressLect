// EXPRESS - дуже мінімалістичний фреймворк для роботи з додатками Node
// Поставити експресс. Зайти на сайт NPM, Express. Показати приклади коду, якусь документацію.
// Показати файл package.json
// 3) Показати як малювати файли
// 4) Показати що таке MiddleWare і як він працює
// 5) Показати що таке next

//
// const express = require('express');
// const app = express();
//
//
// // 4)
// app.use(function (req, res, next) {
//     console.log(22);
//     next()
// });
//
// app.get('/', (req, res, next) => {
//     // 3
//     // res.sendFile()
//
//     //5)
//     res.write('Privet \n');
//     next();
// });
//
// app.get('/', (req, res) => {
//     res.end('Hello')
// });
//
// app.get('/info', (req, res) => {
//     res.end('World')
// });
//
// app.listen(3000, err => {
//     if (!err) console.log('Listen 3000...')
// });


// 6 Шаблонізатори (темплейтинг)
// Шаблонізатори це HTML сторінки з більшими можливосятми. Вони вже вміють віддавати
// нам якісь данні більше динамічно ніж це робив голий хтмл
// Ввести в гуглі Node templates і показати перший сайт
// 6.1) Розказати про path
// 6.2) Розказати, що таке SET
// 6.3) Відобразити на сторінці масив юзерів
// 6.4) Створити сторінку, куда буде приходити IDшка
// 6.5) Створити сторінку реєстрації (Доробити домашню)

// const express = require('express');
// const app = express();
// const path = require('path');
// const expBars = require("express-handlebars");
//
//
// app.use(express.static(path.join(__dirname, 'public', 'views')));
// app.use(express.static(path.join(__dirname, 'public', 'scripts')));
//
//
// // 6.5
// //Якщо буде JSON, то ми зможемо його прочитати
// app.use(express.json());
// // Вміє читати данні з форм
// app.use(express.urlencoded());
//
// app.engine('.hbs', expBars({
//     extname: '.hbs'
// }));
//
// // 6.2)
// //set визначає якісь налаштування.
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'public', 'views'));
//
// app.get('/', (req, res) => {
//     // 6.1
//     let join = path.join(__dirname, 'dir', 'test', 'script.js');
//     console.log(join);
//
//     let badPath = 'D:\\Projects\///\\\\ExpressLect\\dir\\test\\\\/\\\\script.js\n'
//     console.log(path.normalize(badPath));
//     res.render('main')
// });
//
// app.get('/info', (req, res) => {
//     res.render('info', {param: '<i>SOME TEXT</i>>'})
// });
//
// //6.3
// app.get('/users', (req, res) => {
//     let DataBase = [
//         {name: "Dima", age: 22},
//         {name: "Katya", age: 18}
//     ];
//     res.render('users', {people: DataBase, showed: true})
// });
//
// //6.4
//
// app.get('/user/:id', (req, res) => {
//     const params = req.params.id;
//     res.render('user', {age: params})
// });
//
// // ПОРОЗБИВАТИ ТО ВСЕ НА КОНТРОЛЛЕРИ
//
//
// //6.5
// app.post('/register', (req,res)=> {
//     console.log(req.body);
//
//     res.render('register')
// });



// Cookies and session
const express = require('express');


const app = express();
// Експрес сесія зберігає все на клієнті  і на серваку
// const session = require('express-session');
// app.use(session({
//     // Ключ шифрування
//     secret: 'super secret word',
//     // Якщо сесія не мінялась, то вона не перезберігається
//     resave: false,
//     // Якщо не ініціалізована і не змінювалась. То нема чого пересейвлювати
//     // Якщо створена але не мінялась
//     saveUninitialized: false
// }));


// Кукі сесія зберігає на клієнті
// Тут створеться 2 параметра в сесії.
// Перший - це те, де зберігаються всі дані про нашу сесію
// sig - це унікальна сигнатура сесії. Унікальний ідентифікатор
// Кука - це шифровані за допомогою секретного слова данні.
// Сигнатура - це наша шифрована кука, яка шифрується ключем
const session = require('cookie-session');
app.use(session({
    secret: 'superSecret',
    name: 'testCook',
    keys: ['key']
}));


// Після того. як я заюзав сесію, я маю нові властивості в нашому реквесті

app.get('/get', (req, res) => {
    console.log(req.session);
    res.end('OK')
});
app.get('/set', (req, res) => {
    req.session.password = '12345';
    req.session.login = 'vaska';

    res.end('Set')
});

app.listen(3000, err => {
    if (!err) console.log('Listen 3000...')
});
