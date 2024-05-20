const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/health", (req, res) => res.status(200).json({ 'we': 'are ok' }));

app.get("/", (req, res) => res.type('html').send(html()));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = () => `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      *{
        box-sizing: 'border-box';
        padding: 0;
        margin: 0;
      }
      
      .container{
        width: 60%;
        margin: 0 auto;
        background: wheat;
        display:flex;
        flex-direction:column;
        align-items:center;
        height: 100vh;
        justify-content: center;
      }
      
      .container span{
        font-size: 24px;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <section>
      <div class="container">
        <span>Hello from Render!</span>
        <img src="https://picsum.photos/250" alt="Your daily pic">
      </div>
    </section>
  </body>
</html>
`
