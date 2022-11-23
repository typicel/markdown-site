const express = require('express');
const showdown = require('showdown');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/public'));

let converter = new showdown.Converter();

function createPage(page){
    let content = fs.readFileSync(`./pages/${page}.md`, 'utf8');
    let html = converter.makeHtml(content);

    let template = fs.readFileSync('public/template.html', 'utf8');
    template = template.replace('{{content}}', html);
    return template; 
}

// for every md file in the pages folder, create a route
fs.readdirSync('./pages').forEach(file => {
    let page = file.split('.')[0];
    app.get(`/${page}`, (req, res) => {
        res.send(createPage(page));
    });
});

// redirect root to /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});