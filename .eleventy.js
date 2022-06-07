
const parse = require("csv-parse/sync");
const fs = require("fs");

function readCSV() {
  const input = fs.readFileSync("./src/_data/donors.csv");
  const records = parse.parse(input, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

function getCandidates(records) {
    candidates = [];
    records.forEach(row =>{
        if(row.entity_type=="CAN")
        {
            candidates.push(row);
        }
      });
    return candidates;
}


function getCollection(records,tag_name)
{
    collection = [];
    records.forEach(row =>{
        tags = row.Tags.split(",");
        if(tags.includes(tag_name))
        {
            collection.push(row);
        }
      });

    return collection;

}


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/pureScriptSelect');
    eleventyConfig.addPassthroughCopy('./src/leaflet');
    const records = readCSV();
    var tag_list= [];
    eleventyConfig.addDataExtension("csv", (contents) => {
        return records;
    });

   eleventyConfig.addCollection("candidates", function(collectionApi) {
        return getCandidates(records);
    });
    records.forEach(row =>
    {
        var tags = row.Tags.split(",");
        tags.forEach( tag =>{
        if (tag_list.indexOf(tag) === -1) tag_list.push(tag);
        });
    });

    eleventyConfig.addFilter("arr", function(value) {
        var arr = []
        value.forEach(element =>{
            arr.push(element);
        });
        return arr;
      });
    eleventyConfig.addCollection("Tags",function(collectionApi){
        return tag_list;
    });

    tag_list.forEach( tag => {
        eleventyConfig.addCollection(tag, function(collectionApi){
            var new_collection = getCollection(records,tag);
            return new_collection;
        });
    });
    
    return {
        templateFormats: ["md", "njk", "html", "liquid"],
        
        dir: {
            includes: "_includes",
            data: "_data",
            input: "src",
            output: "dist"
        }
    }
};