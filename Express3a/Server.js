const express = require('express');
const session = require('express-session'); const app = express();

app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true,
cookie: { secure: false }
}));


app.get('/', (req, res) => { if (req.session.views) { req.session.views++;
res.send(`Number of visits: ${req.session.views}`);
} else { req.session.views = 1;
res.send('Welcome! Refresh the page to count your visits.');
}
});
 
app.listen(3005, () => {
console.log('Server running at http://localhost:3005');
});
