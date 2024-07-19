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


// Generates HTML files for the main pages
fs.readdirSync('./content').forEach(file => {
    if (!file.endsWith('.md')) return;

    let page = file.split('.')[0];
    let html = createPage(page);

    // save html to the public directory
    fs.writeFileSync(`./public/${page}.html`, html);
});

let template = fs.readFileSync('template.html', 'utf8');
let gallery_template = fs.readFileSync('gallery_template.html', 'utf8');

let data_file = fs.readFileSync('./public/images/images.json', 'utf8');
let data = JSON.parse(data_file);

let images = data.images.map(image => {
    return `<div class="grid-item" style="padding-bottom: 20px;"><img src="${image.src}"><p style="color: #93969a;"><i>${image.info}</i></p></div>\n`
})
let image_string = images.join('\n');

gallery_template = gallery_template.replace('{{content}}', image_string);
fs.writeFileSync('./public/gallery.html', gallery_template);