const fs = require('fs');
const showdown = require('showdown');

let converter = new showdown.Converter(
    {
        tables: true, 
        simpleLineBreaks: true, 
        tasklists: true, 
        ghCodeBlocks: true,
        strikethrough: true
    });

function createPage(page){
    let content = fs.readFileSync(`./content/${page}.md`, 'utf8');
    let html = converter.makeHtml(content);
    

    let template = fs.readFileSync('template.html', 'utf8');
    template = template.replace('{{content}}', html);
    return template; 
}

function createBlogPost(post){
    let content = fs.readFileSync(`./content/posts/${post}.md`, 'utf8');
    let html = converter.makeHtml(content);

    let template = fs.readFileSync('template.html', 'utf8');
    template = template.replace('{{content}}', html);
    return template; 
}

// Creates routes for every page in the pages folder
fs.readdirSync('./content').forEach(file => {
    if(!file.endsWith('.md')) return;

    let page = file.split('.')[0];
    let html = createPage(page);

    // save html to the public directory
    fs.writeFileSync(`./public/${page}.html`, html);
});


fs.readdirSync('./content/posts').forEach(file => {
    if(!file.endsWith('.md')) return;

    let post = file.split('.')[0];
    let html = createBlogPost(post);
    fs.writeFileSync(`./public/posts/${post}.html`, html);
});

// Route for each individual post
// app.get('/posts/:post_name', (req, res) => {
//     res.send(createBlogPost(req.params.post_name));
// });

// // Route to list all posts
// app.get('/posts', (req, res) => {
//     let html = '';

//     fs.readdirSync('pages/posts').forEach(post => {
//         let content = fs.readFileSync (`./pages/posts/${post}`, 'utf8');
//         let title = content.split('\n')[0].replace('# ', '');
//         html += `<h2><a href="/posts/${post.split('.')[0]}">${title}</a></h2>`;
//     });

//     let template = fs.readFileSync('public/template.html', 'utf8');

//     template = template.replace('{{content}}', html);
//     res.send(template);
// });

// // Redirect to /home
// app.get('/', (req, res) => {
//     res.redirect('/home');
// });

// // Error page
// app.get('*', (req, res) => {
//     res.status(404).send(createPage('404'));
// })

// module.exports = app;
// module.exports.handler = serverless(app);

// app.listen(process.env.PORT || port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });