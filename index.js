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

function createPage(page) {
    let content = fs.readFileSync(`./content/${page}.md`, 'utf8');
    let html = converter.makeHtml(content);

    let template = fs.readFileSync('template.html', 'utf8');
    template = template.replace('{{content}}', html);
    return template;
}

function createBlogPost(post) {
    let content = fs.readFileSync(`./content/posts/${post}.md`, 'utf8');
    let html = converter.makeHtml(content);

    let template = fs.readFileSync('template.html', 'utf8');
    template = template.replace('{{content}}', html);
    return template;
}

// Generates HTML files for the main pages
fs.readdirSync('./content').forEach(file => {
    if (!file.endsWith('.md')) return;

    let page = file.split('.')[0];
    let html = createPage(page);

    // save html to the public directory
    fs.writeFileSync(`./public/${page}.html`, html);
});

// Generates HTML files for each blog post
fs.readdirSync('./content/posts').forEach(file => {
    if (!file.endsWith('.md')) return;

    let post = file.split('.')[0];
    let html = createBlogPost(post);
    fs.writeFileSync(`./public/posts/${post}.html`, html);
});

// Generates an HTML page that lists all blog posts
let numPosts = 0;
let posts = fs.readdirSync('./content/posts').map(file => {
    if (!file.endsWith('.md')) return;

    numPosts += 1;
    let post = file.split('.')[0];
    return `<h2><a href="posts/${post}.html">${post}</a></h2>`;
});

let template = fs.readFileSync('template.html', 'utf8');
if (numPosts === 0) {
    let message = "<h2>Nothing to see here... for now.</h2>";
    template = template.replace('{{content}}', message);
    fs.writeFileSync('./public/posts.html', template)
} else {
    template = template.replace('{{content}}', posts);
    fs.writeFileSync('./public/posts.html', template);
}

let gallery_template = fs.readFileSync('gallery_template.html', 'utf8');
let images = fs.readdirSync('./public/images').map(file => {
    if(!file.endsWith('.JPG') && !file.endsWith('.PNG') && !file.endsWith('.jpg')) return;

    return `<img src=${'images/' + file} onclick="showDarkbox('${'images/' + file}')" />\n`
})

gallery_template = gallery_template.replace('{{content}}', images);
gallery_template = gallery_template.replace(/[,]/, '');
fs.writeFileSync('./public/gallery.html', gallery_template);