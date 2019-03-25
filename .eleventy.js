module.exports = function(eleventyConfig) {

    eleventyConfig.setLiquidOptions( {
        dynamicPartials: true,
        strict_filters: true
    } );

    // Aliases are in relation to the _includes folder
    eleventyConfig.addLayoutAlias('amp', 'layouts/amp.html');
    eleventyConfig.addLayoutAlias('page', 'layouts/page.html');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
    eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

    return {
        dir: {
            input: "./",      // Equivalent to Jekyll's source property
            output: "./_site" // Equivalent to Jekyll's destination property
        }
    };
};
