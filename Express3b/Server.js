const express = require('express');
const session = require('express-session'); const app = express();
app.use(express.urlencoded({ extended: true })); app.use(session({
secret: 'anothersecret', resave: false, saveUninitialized: true
}));
const USER = { username: 'user', password: '1234' }; app.get('/', (req, res) => {
res.send('<a href="/login">Go to Login</a>');
 
});
app.get('/login', (req, res) => { res.send(`
<form action="/login" method="POST">
<input name="username" placeholder="Username" required /><br/>
<input name="password" type="password" placeholder="Password" required /><br/>
<button type="submit">Login</button>
</form>
`);
});
app.post('/login', (req, res) => {
const { username, password } = req.body;
if (username === USER.username && password === USER.password) { req.session.user = username;
res.send('Login successful! <a href="/profile">Go to profile</a>');
} else {
res.send('Invalid credentials. <a href="/login">Try again</a>');
}
});
app.get('/profile', (req, res) => { if (req.session.user) {
res.send(`Hello, ${req.session.user}! <a href="/logout">Logout</a>`);
} else {
res.send('You must <a href="/login">login</a> first.');
}
});
app.get('/logout', (req, res) => { req.session.destroy(() => {
res.send('Logged out. <a href="/login">Login again</a>');
});
 
});
app.listen(3006, () => {
console.log('Server running at http://localhost:3006');
});
