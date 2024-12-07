const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("jsonify", function (value) {
    return JSON.stringify(value);
  });
  
  eleventyConfig.addCollection("searchIndex", function(collectionApi) {
    const searchIndex = collectionApi.getAll().map(item => ({
      title: item.data.title || "Spider-wiki",  
      url: item.url, 
      content: item.data.content || ""  
    }));
    
    return searchIndex;
  });

  eleventyConfig.addPassthroughCopy("code/css");
  eleventyConfig.addPassthroughCopy("code/js");
  eleventyConfig.addPassthroughCopy("code/img");

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  
  return {
    dir: {
      input: "code",
      output: "docs"  
    }
  };
};
