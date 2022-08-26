const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const query = `{
    allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
    }
    
  }`;
  const { data } = await graphql(query);

  // console.log(JSON.stringify(data));

  const templatePath = path.resolve("./src/templates/template.js");

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: node.frontmatter.slug,
      component: templatePath,
      context: { slug: node.frontmatter.slug },
    });
  });
};
