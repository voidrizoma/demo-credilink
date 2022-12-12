require("dotenv").config({
path: `.env.${process.env.NODE_ENV}`,
});

// this comment is only to remember that this lines are required in develop 
// require("dotenv").config({
// path: `.env`,
// });

module.exports = {
  siteMetadata: {
    title: `Credilink`,
    description: `Flux QR`,
    author: `@fluxqr`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_GA_MEASSUREMENT_ID
        ],
        pluginConfig: {
          head: true,
          },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown-pages`,
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`
  ],
};
