
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

function getPACS(records) {
    PACS = [];
    records.forEach(row =>{
        if(row.entity_type=="POLITICAL ACTION COMMITTEE" || row.entity_type=="PAC")
        {
            PACS.push(row);
        }
      });
    return PACS;
}


function getInd(records) {
    IND = [];
    records.forEach(row =>{
        if(row.entity_type=="INDIVIDUAL" || row.entity_type=="IND" || row.entity_type=="CAN" || row.entity_type=="CANDIDATE")
        {
            IND.push(row);
        }
      });
    return IND;
}


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/assets');
    const records = readCSV();
    var tag_list= [];
    eleventyConfig.addDataExtension("csv", (contents) => {
        return records;
    });


    eleventyConfig.addNunjucksFilter('split', function(str, seperator) {
            return str.split(seperator);
    }        
    );
    eleventyConfig.addNunjucksFilter('replacePAC', function(str) {

        const regex_long = new RegExp('(Political Action Committee)',"i");
        const regex_short = new RegExp('(Pac)',"i");
        var mid_str = str.replace(regex_long,"PAC");
        return mid_str.replace(regex_short,"PAC");
    }        
    );

    eleventyConfig.addNunjucksFilter('moneyLocale', function(str) {
        var num = parseInt(str.replace(",",""));
        return (Math.round(num * 100) / 100).toLocaleString();
    }        
    );
    eleventyConfig.addNunjucksFilter('capitalizeName', function(str) {

        const arr = str.split(" ");

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].toLowerCase();
            arr[i] = arr[i][0].toUpperCase()+ arr[i].substr(1);
        }
        return arr.join(" ");
    }        
    );
   eleventyConfig.addCollection("pacs", function(collectionApi) {
        return getPACS(records);
    });
    eleventyConfig.addCollection("ind", function(collectionApi) {
        return getInd(records);
    });


    eleventyConfig.addFilter("arr", function(value) {
        var arr = []
        value.forEach(element =>{
            arr.push(element);
        });
        return arr;
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