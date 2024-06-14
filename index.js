const app = require('./app');
const db = require('./configs/db')
const port = process.env.PORT || 3303;


app.get('/', (req, res) => {
    res.send("hihi");
});

app.listen(port, () => {
    console.log(`Server listening on Port http://localhost:${port}`);
});