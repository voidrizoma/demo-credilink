import { component$, useStyles$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";

import globalStyles from "./global.css?inline";
import { RouterHead } from "./components/router-head/router-head";
// import TagManager from 'react-gtm-module'

// const tagManagerArgs = {
//     gtmId: 'GTM-W2DL3ZJ'
// }

// TagManager.initialize(tagManagerArgs)

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head class="m-0 p-0">
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body
        lang="en"
        style={{
          background: "#969696",
          userSelect: "none",
          backgroundImage: "linear-gradient(135deg, #b1b1b1, #222)",
        }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCJD478"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
