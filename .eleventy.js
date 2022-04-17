module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/assets');
    
    eleventyConfig.addDataExtension("csv", (contents) => {
        const parse = require('csv-parse/sync');
        const records = parse.parse(contents, {
            columns: true,
            skip_empty_lines: true,
        });
        return records;
    });
    
    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }
};