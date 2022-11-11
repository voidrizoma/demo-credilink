# Credilink

# Stack

- Gatsby
- Markdown
- Styled-components
- GraphQL
- Flux-Notifier

# Estructura de proyecto

```text
.
├── src
|  ├── components
|  |  ├── aproved.js
|  |  ├── Card.js
|  |  ├── error.js
|  |  ├── Footer.js
|  |  ├── Header.js
|  |  ├── Layout.js
|  |  ├── Location.js
|  |  ├── QueryComponent.js
|  |  ├── rejected.js
|  |  ├── Seo.js
|  ├── images
|  ├── markdown-pages
|  |  ├── demo.md
|  |  ├── demo-logo.png
|  |  ├── demo-bg.png
|  ├── pages
|  |  ├── 404.js
|  |  ├── index.js
|  ├── styles
|  |  ├── Global.js
|  |  ├── template-styles.js
|  ├── templates
|  |  ├── template.js
|  ├── html.js
|  ├── styles.js
├── README.md
├── .gitignore
├── .env
├── .gitlab-ci.yml
├── gatsby-config.js
├── gatsby-node.js
├── README.md
├── package.json

```

# Flujo de Credilink

1.- Se llena el form  [Credilink](https://docs.google.com/forms/d/e/1FAIpQLScrFiFIdXLqeOrUIPersHVFc-RI8e46j03STTvhWgIIyNYv4w/viewform)
2.- Los datos llegan a un spreadsheets de **Google Drive**
3.- Los campos son los siguientes: 
- Ésta campaña aplica a nivel
- Nombre del participante (Grupo, cadena o sucursal)
- Nombre del remitente del mail
- Subject del mail
- Términos y Condiciones
- Imagen de fondo
- Logo

### Haciendo un credilink
 Cuando se confirma el llenado del form, la magia pasa dentro de la carpeta /markdown-pages. Se crea un nuevo archivo **.md** con el nombre del nuevo credilink. Los campos dentro del archivo son los siguientes:
- slug: 
- template: 
- date: 
- emailSender: 
- commerceName: 
- commerce:
- issuer:
- color:
- TYC:
- sender:
- subject:
- logo:
- background: 


Para tener una mejor vista de los datos que se piden en el form y los datos que se llenan en el .md, dejo la siguiente tabla:

|      Form	          |    .md                 |                      |
|----------------|-------------------------------|-----------------------------|
||slug            |url del credilink           |
|      |template         |Nombre de template de Mailchimp          |
|        |date|'esto no hace nada'|
|      |emailSender|kueskipay@fluxqr.com|
|  Ésta campaña aplica a nivel  |commerce|Id de comercio, grupo o sucursal|
|     Nombre del participante   |commerceName|Nombre de comercio, grupo o sucursal|
|        |issuer|ID de Kueski Pay|
|        |color|Hexadecimal del color de fondo|
|  Términos y Condiciones  |TYC|Términos y Condiciones|
|     Nombre del remitente del email   |sender||
|    Subject del email    |subject||
|     Logo   |logo|url de la imagen, para el template de Mailchimp|
|     Imagen de fondo   |background|Imagen de fondo para landing|

### Ojo:
- No deben de existir dos urls iguales.
- Las imágenes de fondo y logo para la landing deben de ser en .png.
- Las imágenes de logo y fondo deben estar dentro de la carpeta markdown-pages.


## Gatsby + MD.

Ya que tenemos los datos del formulario en el .md del credilink correspondiente. Gatsby se encarga de generar la landing estática. Para eso se ha creado un archivo llamado *gatsby-node.js* en la raáz del proyecto, que se encarga de crear las nuevas páginas dependiendo del nombre del slug que se encuentra en el **.md**.

```JS
exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const blogPostTemplate = require.resolve(`./src/templates/template.js`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    })
  }
```

Dentro del archivo templates/template.js, se jalan los datos del .md usando GraphQL. 

```JS
export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        issuer
        commerceName
        color
        commerce
        subject
        sender
        template
        logo
        TYC
        background {
          childImageSharp {
            fluid(maxWidth: 1000) {
              src
            }
          }
        }
      }
    }
  }
`;````

Una vez que traemos los campos del .md, pasamos a hacer una destructuración para poder usarlos en el Credilink y pasamos *data* como parametro en nuestro componente del *Template*

````JS
const Template = ({ data }) => {
 const { markdownRemark } =  data;
const { frontmatter } =  markdownRemark;
const { issuer,  commerceName,  color,  logo,  commerce,  sender,  subject,  template,  TYC } =
frontmatter;
const  background  =  frontmatter.background.childImageSharp.fluid.src;
  .....
  .....
  }
  ````


## El Form

El Form de Credilink recibe dos datos: correo electrónico y monto. Pero el endpoint */loans* tiene que recibir la siguiente informacion:

 ````
 {
 amount,   // Viene del form
 commerce,  // Viene del ID del comercio del .md
 issuer,  // Viene del ID del issuer del .md
email // Viene del form
 }
  ````

Una vez que se haga una solicitud, la API va a redirigir a Kueski Pay para que se realice el proceso de aprobación.

###  Aprobación de crédito

En caso de que el crédito sea aprobado saticfactoriamente, Kueski va a redirigir a los usuarios a **credilink.fluxqr.com/loans/${loan}**

El archivo *pages/index.js*, es el encargado de mostrar el resultado del crédito, imprimir el QR en pantalla y enviar el correo al usuario, usando Flux-Notifier

````JS
 const  Response  =  ({ search })  =>  {
const { loan } =  search;
...
...
}
````

El componente Response recibe un query-param para identificar el ID que regresa Kueski. Dentro del response, hay dos datos que nos importan: *status y qr*. El QR se mandará al correo del usuario. Los demas datos, se almacenan en *localstorage* desde el llenado del form.

En caso que el status sea aprobado, la pagina *index*, va a pintar los datos del crédito solicitado y tendrá que mandarse el correo por medio de *Flux-Notifier* con la siguiente estructura.

````JS
const MailContent = JSON.stringify({
        template: dataEmail.template, // viene del localStorage con los datos del .md
        subject: dataEmail.subject, // viene del localStorage con los datos del .md
        senderName: dataEmail.sender, // viene del localStorage con los datos del .md
        sender: "kueskipay@fluxqr.com",
        to: [
          {
            email: dataEmail.email, // viene del localStorage con los datos del form
          },
          {
            email: process.env.GATSBY_BBC_EMAIL
          }
        ],
        globalMergeVars: [
          {
            name: "amount",
            content: data.amount / 100, // viene de la respuesta de loans/${loan}
          },
          {
            name: "cupon",
            content: data.qr, // viene de la respuesta de loans/${loan}
          },
          {
            name: "logoCommerce",
            content: dataEmail.logo, // viene del localStorage con los datos del .md
          },
          {
            name: "expiration",
            content: expirationDate, 
          },
        ],
      });
````