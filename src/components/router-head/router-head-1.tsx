import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { partytownSnippet } from "@builder.io/partytown/integration";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {

  
  const head = useDocumentHead();
  const loc = useLocation();
  const tagID = "GTM-WCJD478"

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />


      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}


      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
			(function(c,l,a,r,i,t,y){
				c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
				t=l.createElement(r);t.async=1;t.type="text/partytown";t.src="https://www.clarity.ms/tag/"+i;
				y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
			})(window, document, "clarity", "script", "dt23pa291z");
		`}
      ></script>
      <script
        type="text/partytown"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${tagID}`}
      ></script>
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			
			gtag('config', ${tagID});
		`}
      ></script>
      <script
        dangerouslySetInnerHTML={partytownSnippet({
            resolveUrl: function (url, location, type) {
              if (type === 'script') {
                const proxyUrl = new URL('localhost:5173/');
                proxyUrl.searchParams.append('url', url.href);
                return proxyUrl;
              }
              return url;
            },
          debug: true,
          forward: ["dataLayer.push"],
        })}
      ></script>
    </>
  );
});
