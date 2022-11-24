
class Converter {

    constructor() {
    }

    handleInlineElements(line) {
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');                      // Bold Text
        line = line.replace(/__(.*?)__/g, '<u>$1</u>');                                    // Underline Text 
        line = line.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');                              // Italics
        line = line.replace(/`([^`]+)`/g, '<code>$1</code>');                              // Inline Code
        line = line.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');           // Links
        line = line.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');      // Images
        line = line.replace(/~~(.*?)~~/g, '<s>$1</s>');                                    // Strikethrough
        return line;
    }

    createTable(tableLines){
        let table = '<table>';
        table += '<thead>';
        for(let i = 0; i < tableLines.length; i++){
            let cols = tableLines[i].split('|');
            console.log(cols);
            // match cols[1] with at least 3 dashes
            if(cols[1].match(/^-{3,}/)){
                table += '</thead>';
                table += '<tbody>';
                continue;
            }

            table += '<tr>';

            cols.forEach(col => {
                if(col != ''){
                    table += `<td>${col}</td>`;
                }
            });
            table += '</tr>';
        }

        table += '</table>';
        return table;
    }

    parse(content){
        return html;
    }
    

    // methods
    // makeHtml(content) {
    //     let html = '';
    //     let lines = content.split('\n');

    //     for(let i = 0; i < lines.length; i++){
    //         // first, determine the inline elements (bold, italics, etc.)
    //         let newline = this.handleInlineElements(lines[i]);

            
    //         // now determine what tag this text should go into
    //         if (lines[i].startsWith('#')) {
    //             let numHashes = lines[i].match(/^#+/)[0].length;
    //             let text = lines[i].substring(numHashes).trim();
    //             html += `<h${numHashes}>${text}</h${numHashes}>`;
    //         }
    //         // handle a multiline code block
    //         else if (lines[i].startsWith('```')) {
    //             let code = '';
    //             i++;
    //             while (lines[i] != '```') {
    //                 code += lines[i] + '\n';
    //                 i++;
    //             }
    //             html += `<pre><code>${code}</code></pre>`;
    //         } 
    //         // Unordered list
    //         else if (lines[i].startsWith('- ')) {
    //             let list = '';
    //             while(i < lines.length && lines[i].startsWith('- ')){
    //                 lines[i] = this.handleInlineElements(lines[i]);
    //                 list += `<li>${lines[i].substring(1).trim()}</li>`;
    //                 i++;
    //             }
    //             html += `<ul>${list}</ul>`;
    //         } else if (lines[i].startsWith('1. ')){
    //             // Ordered list
    //             let list = '';
    //             // while i less than lines.length and lines[i] starts with some number and a period
    //             while(i < lines.length && lines[i].match(/^\d+\./)){
    //                 lines[i] = this.handleInlineElements(lines[i]);
    //                 list += `<li>${lines[i].substring(lines[i].indexOf('.')+1).trim()}</li>`;
    //                 i++;
    //             }
    //             html += `<ol>${list}</ol>`;
    //         } else if(lines[i] == "---") {
    //             html += `<hr>`;
    //         } else if (lines[i].startsWith('|')) {
    //             let tableLines = [];
    //             while(i < lines.length && lines[i].startsWith('|')){
    //                 lines[i] = this.handleInlineElements(lines[i]);
    //                 tableLines.push(lines[i]);
    //                 i++;
    //             }
    //             let table = this.createTable(tableLines);
    //             html += table;
    //         } else {
    //             html += `<p>${newline}</p>`;
    //         }
    //     }

    //     return html;
    // }

}
export default Converter;
