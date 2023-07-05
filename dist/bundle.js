(()=>{var e={738:(e,r,t)=>{const n=t(147),s=t(17),o=t(37),i=t(113),a=t(968).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function l(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function d(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function u(e,r){let t;try{t=new URL(r)}catch(e){if("ERR_INVALID_URL"===e.code)throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");throw e}const n=t.password;if(!n)throw new Error("INVALID_DOTENV_KEY: Missing key part");const s=t.searchParams.get("environment");if(!s)throw new Error("INVALID_DOTENV_KEY: Missing environment part");const o=`DOTENV_VAULT_${s.toUpperCase()}`,i=e.parsed[o];if(!i)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${o} in your .env.vault file.`);return{ciphertext:i,key:n}}function p(e){let r=s.resolve(process.cwd(),".env");return e&&e.path&&e.path.length>0&&(r=e.path),r.endsWith(".vault")?r:`${r}.vault`}const f={configDotenv:function(e){let r=s.resolve(process.cwd(),".env"),t="utf8";const i=Boolean(e&&e.debug);var a;e&&(null!=e.path&&(r="~"===(a=e.path)[0]?s.join(o.homedir(),a.slice(1)):a),null!=e.encoding&&(t=e.encoding));try{const s=f.parse(n.readFileSync(r,{encoding:t}));let o=process.env;return e&&null!=e.processEnv&&(o=e.processEnv),f.populate(o,s,e),{parsed:s}}catch(e){return i&&l(`Failed to load ${r} ${e.message}`),{error:e}}},_configVault:function(e){console.log(`[dotenv@${a}][INFO] Loading env from encrypted .env.vault`);const r=f._parseVault(e);let t=process.env;return e&&null!=e.processEnv&&(t=e.processEnv),f.populate(t,r,e),{parsed:r}},_parseVault:function(e){const r=p(e),t=f.configDotenv({path:r});if(!t.parsed)throw new Error(`MISSING_DATA: Cannot parse ${r} for an unknown reason`);const n=d(e).split(","),s=n.length;let o;for(let e=0;e<s;e++)try{const r=u(t,n[e].trim());o=f.decrypt(r.ciphertext,r.key);break}catch(r){if(e+1>=s)throw r}return f.parse(o)},config:function(e){const r=p(e);return 0===d(e).length?f.configDotenv(e):n.existsSync(r)?f._configVault(e):(t=`You set DOTENV_KEY but you are missing a .env.vault file at ${r}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${t}`),f.configDotenv(e));var t},decrypt:function(e,r){const t=Buffer.from(r.slice(-64),"hex");let n=Buffer.from(e,"base64");const s=n.slice(0,12),o=n.slice(-16);n=n.slice(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",t,s);return e.setAuthTag(o),`${e.update(n)}${e.final()}`}catch(e){const r=e instanceof RangeError,t="Invalid key length"===e.message,n="Unsupported state or unable to authenticate data"===e.message;if(r||t)throw new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");if(n)throw new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw console.error("Error: ",e.code),console.error("Error: ",e.message),e}},parse:function(e){const r={};let t,n=e.toString();for(n=n.replace(/\r\n?/gm,"\n");null!=(t=c.exec(n));){const e=t[1];let n=t[2]||"";n=n.trim();const s=n[0];n=n.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===s&&(n=n.replace(/\\n/g,"\n"),n=n.replace(/\\r/g,"\r")),r[e]=n}return r},populate:function(e,r,t={}){const n=Boolean(t&&t.debug),s=Boolean(t&&t.override);if("object"!=typeof r)throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(const t of Object.keys(r))Object.prototype.hasOwnProperty.call(e,t)?(!0===s&&(e[t]=r[t]),n&&l(!0===s?`"${t}" is already defined and WAS overwritten`:`"${t}" is already defined and was NOT overwritten`)):e[t]=r[t]}};e.exports.configDotenv=f.configDotenv,e.exports._configVault=f._configVault,e.exports._parseVault=f._parseVault,e.exports.config=f.config,e.exports.decrypt=f.decrypt,e.exports.parse=f.parse,e.exports.populate=f.populate,e.exports=f},339:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.users=void 0,r.users=[]},690:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.handleErrors=void 0,r.handleErrors=function(e,r,t=500,n="Internal Server Error"){console.error("Error:",e),r.writeHead(t,{"Content-Type":"application/json"}),console.error("Error:",e),r.end(n)}},625:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.handleRequests=void 0;const n=t(67),s=t(788),o=t(690);r.handleRequests=function(e,r){const t=new n.processData,{method:i,url:a}=e;if(a){const n=a.split("/")[3];if((0,s.isValidUrl)(a)){if("GET"===i&&"/api/users"===a)try{const e=t.getAllUsers();r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(e))}catch(e){(0,o.handleErrors)(e,r)}else if("GET"===i)if((0,s.isValidUUID)(n))try{const e=t.getUserById(n);if(e)r.writeHead(200,{"Content-Type":"application/json"}),r.end(JSON.stringify(e));else{const e=new Error(`User with id ${n} doesn't exist`);(0,o.handleErrors)(e,r,404,`User with id ${n} doesn't exist`)}}catch(e){(0,o.handleErrors)(e,r)}else{const e=new Error(`UserId ${n} is invalid (not uuid)`);(0,o.handleErrors)(e,r,400,e.message)}else if("POST"===i)try{let n="";e.on("data",(e=>{n+=e})),e.on("end",(()=>{const e=JSON.parse(n);if(e.username&&e.age&&e.hobbies){const n=t.createNewUser(e);r.writeHead(201,{"Content-Type":"application/json"}),r.end(JSON.stringify(n))}else{const e=new Error("The request does not contain required fields");(0,o.handleErrors)(e,r,400,e.message)}}))}catch(e){(0,o.handleErrors)(e,r)}else if("PUT"===i)if((0,s.isValidUUID)(n))try{if(t.getUserById(n)){let s="";e.on("data",(e=>{s+=e})),e.on("end",(()=>{t.updateUser(n,JSON.parse(s))})),r.writeHead(200,{"Content-Type":"application/json"}),r.end("User was successfuly updated")}else{const e=new Error(`User with id ${n} doesn't exist`);(0,o.handleErrors)(e,r,404,e.message)}}catch(e){(0,o.handleErrors)(e,r)}else{const e=new Error(`UserId ${n} is invalid (not uuid)`);(0,o.handleErrors)(e,r,400,e.message)}else if("DELETE"===i)if((0,s.isValidUUID)(n))try{if(t.getUserById(n))t.deleteUser(n),r.writeHead(200,{"Content-Type":"application/json"}),r.end("User was successfuly deleted");else{const e=new Error(`User with id ${n} doesn't exist`);(0,o.handleErrors)(e,r,404,e.message)}}catch(e){(0,o.handleErrors)(e,r)}else{const e=new Error(`UserId ${n} is invalid (not uuid)`);(0,o.handleErrors)(e,r,400,e.message)}}else{const e=new Error("Wrong url (endpoint)");(0,o.handleErrors)(e,r,404,e.message)}}}},607:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t);var s=Object.getOwnPropertyDescriptor(r,t);s&&!("get"in s?!r.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return r[t]}}),Object.defineProperty(e,n,s)}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),s=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return s(r,e),r};Object.defineProperty(r,"__esModule",{value:!0});const i=o(t(685));t(738).config();const a=t(690),c=t(625),l=i.createServer(((e,r)=>{try{(0,c.handleRequests)(e,r)}catch(e){(0,a.handleErrors)(e,r)}})),d=process.env.PORT;l.listen(d,(()=>{console.log(`Server running at port:${d}/`)}))},67:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.processData=void 0;const{v4:n}=t(600),s=t(339);r.processData=class{getAllUsers(){return s.users}getUserById(e){return s.users.find((r=>r.id===e))}createNewUser(e){const r=n(),t=Object.assign(Object.assign({},e),{id:r});return s.users.push(t),t}updateUser(e,r){s.users.forEach((t=>{t.id===e&&(r.username&&(t.username=r.username),r.age&&(t.age=r.age),r.hobbies&&(t.hobbies=r.hobbies))}))}deleteUser(e){s.users.forEach(((r,t)=>{r.id===e&&s.users.splice(t,1)}))}}},788:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isValidUrl=r.isValidUUID=void 0,r.isValidUUID=function(e){return"string"==typeof e&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e)},r.isValidUrl=function(e){return"/"+e.split("/")[1]+"/"+e.split("/")[2]=="/api/users"}},600:(e,r,t)=>{"use strict";t.r(r),t.d(r,{NIL:()=>D,parse:()=>E,stringify:()=>p,v1:()=>y,v3:()=>b,v4:()=>U,v5:()=>_,validate:()=>l,version:()=>O});var n=t(113),s=t.n(n);const o=new Uint8Array(256);let i=o.length;function a(){return i>o.length-16&&(s().randomFillSync(o),i=0),o.slice(i,i+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,l=function(e){return"string"==typeof e&&c.test(e)},d=[];for(let e=0;e<256;++e)d.push((e+256).toString(16).slice(1));function u(e,r=0){return(d[e[r+0]]+d[e[r+1]]+d[e[r+2]]+d[e[r+3]]+"-"+d[e[r+4]]+d[e[r+5]]+"-"+d[e[r+6]]+d[e[r+7]]+"-"+d[e[r+8]]+d[e[r+9]]+"-"+d[e[r+10]]+d[e[r+11]]+d[e[r+12]]+d[e[r+13]]+d[e[r+14]]+d[e[r+15]]).toLowerCase()}const p=function(e,r=0){const t=u(e,r);if(!l(t))throw TypeError("Stringified UUID is invalid");return t};let f,v,g=0,h=0;const y=function(e,r,t){let n=r&&t||0;const s=r||new Array(16);let o=(e=e||{}).node||f,i=void 0!==e.clockseq?e.clockseq:v;if(null==o||null==i){const r=e.random||(e.rng||a)();null==o&&(o=f=[1|r[0],r[1],r[2],r[3],r[4],r[5]]),null==i&&(i=v=16383&(r[6]<<8|r[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),l=void 0!==e.nsecs?e.nsecs:h+1;const d=c-g+(l-h)/1e4;if(d<0&&void 0===e.clockseq&&(i=i+1&16383),(d<0||c>g)&&void 0===e.nsecs&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=c,h=l,v=i,c+=122192928e5;const p=(1e4*(268435455&c)+l)%4294967296;s[n++]=p>>>24&255,s[n++]=p>>>16&255,s[n++]=p>>>8&255,s[n++]=255&p;const y=c/4294967296*1e4&268435455;s[n++]=y>>>8&255,s[n++]=255&y,s[n++]=y>>>24&15|16,s[n++]=y>>>16&255,s[n++]=i>>>8|128,s[n++]=255&i;for(let e=0;e<6;++e)s[n+e]=o[e];return r||u(s)},E=function(e){if(!l(e))throw TypeError("Invalid UUID");let r;const t=new Uint8Array(16);return t[0]=(r=parseInt(e.slice(0,8),16))>>>24,t[1]=r>>>16&255,t[2]=r>>>8&255,t[3]=255&r,t[4]=(r=parseInt(e.slice(9,13),16))>>>8,t[5]=255&r,t[6]=(r=parseInt(e.slice(14,18),16))>>>8,t[7]=255&r,t[8]=(r=parseInt(e.slice(19,23),16))>>>8,t[9]=255&r,t[10]=(r=parseInt(e.slice(24,36),16))/1099511627776&255,t[11]=r/4294967296&255,t[12]=r>>>24&255,t[13]=r>>>16&255,t[14]=r>>>8&255,t[15]=255&r,t};function m(e,r,t){function n(e,n,s,o){var i;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const r=[];for(let t=0;t<e.length;++t)r.push(e.charCodeAt(t));return r}(e)),"string"==typeof n&&(n=E(n)),16!==(null===(i=n)||void 0===i?void 0:i.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let a=new Uint8Array(16+e.length);if(a.set(n),a.set(e,n.length),a=t(a),a[6]=15&a[6]|r,a[8]=63&a[8]|128,s){o=o||0;for(let e=0;e<16;++e)s[o+e]=a[e];return s}return u(a)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}const b=m("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),s().createHash("md5").update(e).digest()})),w={randomUUID:s().randomUUID},U=function(e,r,t){if(w.randomUUID&&!r&&!e)return w.randomUUID();const n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,r){t=t||0;for(let e=0;e<16;++e)r[t+e]=n[e];return r}return u(n)},_=m("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),s().createHash("sha1").update(e).digest()})),D="00000000-0000-0000-0000-000000000000",O=function(e){if(!l(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},113:e=>{"use strict";e.exports=require("crypto")},147:e=>{"use strict";e.exports=require("fs")},685:e=>{"use strict";e.exports=require("http")},37:e=>{"use strict";e.exports=require("os")},17:e=>{"use strict";e.exports=require("path")},968:e=>{"use strict";e.exports=JSON.parse('{"name":"dotenv","version":"16.3.1","description":"Loads environment variables from .env file","main":"lib/main.js","types":"lib/main.d.ts","exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","pretest":"npm run lint && npm run dts-check","test":"tap tests/*.js --100 -Rspec","prerelease":"npm test","release":"standard-version"},"repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","keywords":["dotenv","env",".env","environment","variables","config","settings"],"readmeFilename":"README.md","license":"BSD-2-Clause","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"browser":{"fs":false}}')}},r={};function t(n){var s=r[n];if(void 0!==s)return s.exports;var o=r[n]={exports:{}};return e[n].call(o.exports,o,o.exports,t),o.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(607)})();