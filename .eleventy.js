
const parse = require("csv-parse/sync");
const fs = require("fs");

function readCSV(file_string) {
  const input = fs.readFileSync(file_string);
  const records = parse.parse(input, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}

function getPACS(records) {
    PACS = [];
    records.forEach(row =>{
        if(row.entity_type_desc=="POLITICAL ACTION COMMITTEE" || row.entity_type_desc=="PAC")
        {
            PACS.push(row);
        }
      });
    return PACS;
}

function getFull(records) {
    IND = [];
    records.forEach(row =>{
            IND.push(row);
      });
    return IND;
}

function getInd(records) {
    IND = [];
    records.forEach(row =>{
        if(row.entity_type_desc=="INDIVIDUAL" || row.entity_type_desc=="IND" || row.entity_type_desc=="CAN" || row.entity_type_desc=="CANDIDATE")
        {
            IND.push(row);
        }
      });
    return IND;
}


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('./src/assets');
    const records = readCSV("./src/_data/donors.csv");
    const curated_records = readCSV("./src/_data/curated-donors.csv");
    eleventyConfig.addDataExtension("csv", (contents) => {
        return records;
    });
    eleventyConfig.addDataExtension("csv", (contents) => {
        return curated_records;
    });

    eleventyConfig.addNunjucksFilter('split', function(str, seperator) {
            return str.split(seperator);
    }        
    );

    eleventyConfig.addNunjucksFilter('fixType', function(str) {
        if(str !=undefined && str!="")
        {
            const regex_long = new RegExp('(POLITICAL ACTION COMMITTEE)',"i");
            const regex_short = new RegExp('INDIVIDUAL',"i");
            const regex_can = new RegExp('CANDIDATE',"i");
            var mid_str = str.replace(regex_long,"PAC: ");
            mid_str = mid_str.replace(regex_can,"Individual: ");

            return mid_str.replace(regex_short,"Individual: ");
        }
    }        
    );

    eleventyConfig.addNunjucksFilter('fixNaming', function(str) {
        split = str.split(",");
        return split[1]+" "+split[0];
    }        
    );

    eleventyConfig.addNunjucksFilter('replacePAC', function(str) {
        if(str !=undefined && str!="")
        {
            const regex_long = new RegExp('(POLITICAL ACTION COMMITTEE)',"i");
            const regex_short = new RegExp('(Pac)',"i");
            const regex_dc = new RegExp('Dc',"i");
            const regex_pia = new RegExp('Pro-israel',"i");
            var mid_str = str.replace(regex_long,"PAC");
            mid_str = mid_str.replace(regex_dc,"DC");
            mid_str = mid_str.replace(regex_pia,"Pro-Israel");

            return mid_str.replace(regex_short,"PAC");
        }
    }        
    );

    eleventyConfig.addNunjucksFilter('moneyLocale', function(str) {
        if(str !="")
        {
            var num = parseInt(str.replace(",",""));
            return (Math.round(num * 100) / 100).toLocaleString();
        }
    }        
    );
    eleventyConfig.addNunjucksFilter('capitalizeName', function(str) {

        if(str !=undefined && str!="")
        {

            var arr = str.split(" ");

            if(arr.length > 0)
            {
                
                for (let i = 0; i < arr.length; i++) {
                    arr = arr.filter(x => x !== "Undefined");
                    arr = arr.filter(x => x !== "undefined");
                    arr = arr.filter(x => x !== "");
                    arr[i] = arr[i].toLowerCase();
                    arr[i] = arr[i][0].toUpperCase()+ arr[i].substr(1);
                }
                return arr.join(" ");
            }
            else{
                return "";
            }
        }
    }        
    );
   eleventyConfig.addCollection("pacs", function(collectionApi) {
        return getFull(curated_records);
    });
    eleventyConfig.addCollection("ind", function(collectionApi) {
        return getInd(curated_records);
    });
    eleventyConfig.addCollection("full", function(collectionApi) {
        return getFull(records);
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