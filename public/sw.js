if(!self.define){let e,s={};const t=(t,a)=>(t=new URL(t+".js",a).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>t(e,i),u={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/186-15a4cf65501cbd79.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/194-6210dd62d2d69ed2.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/31-38af216b7bf09ee4.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/3d47b92a-e8ee1c9129057340.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/461-ece130bf9f432769.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/468-3ba011ca6e1c9413.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/53c13509-b248b3b8144345b1.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/66ec4792-91297ab34fc0b2d7.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/703-50290de7480efe86.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/781-3bceb7f0532d9657.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/792-56948618e202b4b0.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/8e1d74a4-9a6a51d6fe327d07.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/919-50cfbb668b1a5771.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/(auth)/login/page-cc8101d0b21f8a55.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/(auth)/register/page-8d279d5402da265a.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/_not-found-a9a44eeb511777b9.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/create/layout-5af9c7382ca38b74.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/create/page-ffb01a3f0c528e49.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/explore/layout-dda34c31c60d0cb4.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/explore/page-c141bdbef495aea9.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/layout-1a90c9b44d51af61.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/page-d965b0e65aa6d089.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/post/%5Bid%5D/page-2bdebe888eaf5b1f.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/@modal/(...)post/%5Bid%5D/page-72d632dbb7eadf9e.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/@modal/default-3c6b690f6f176489.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/edit/page-0616ae301d01f343.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/edit/post/%5Bid%5D/page-a4295fc3081f5ae5.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/layout-2cb410f77572d293.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/profile/page-12a41744c4a77df8.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/search/page-c3357daccd802aef.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/user/%5BuserId%5D/@modal/(...)post/%5Bid%5D/page-98091dee5fc9d8e2.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/user/%5BuserId%5D/@modal/default-ed36f69471375ff0.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/user/%5BuserId%5D/layout-3e45b7bd7546a169.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/app/user/%5BuserId%5D/page-8efdf46ee492dc79.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/c916193b-f3a22a255fd47d06.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/f7333993-e2df0a9aed676e06.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/fd9d1056-3077f17924f4891f.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/main-5895c5615ac40949.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/main-app-6e817c151fca6404.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d6292198705f4430.js",revision:"tvdebj80D_u7mSmpQSv10"},{url:"/_next/static/css/18ed16da0826a2c5.css",revision:"18ed16da0826a2c5"},{url:"/_next/static/css/2959200a453540a5.css",revision:"2959200a453540a5"},{url:"/_next/static/css/45912b8264805cf5.css",revision:"45912b8264805cf5"},{url:"/_next/static/css/49ddd05ae5fdacbe.css",revision:"49ddd05ae5fdacbe"},{url:"/_next/static/css/c7c3edfded8ad8f0.css",revision:"c7c3edfded8ad8f0"},{url:"/_next/static/css/ec5499b9080e05f6.css",revision:"ec5499b9080e05f6"},{url:"/_next/static/tvdebj80D_u7mSmpQSv10/_buildManifest.js",revision:"2fab8ebaa034aa70bf76a8ab2ea31568"},{url:"/_next/static/tvdebj80D_u7mSmpQSv10/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/defaultStory.jpg",revision:"6da2c1a9730fddd0f46745f30c3d05f1"},{url:"/img-192.png",revision:"db1d76e0728e9425c2df80e357d304f2"},{url:"/img-384.png",revision:"b8a60021009455636cd105d888ff3bf5"},{url:"/img-512.png",revision:"f8d81395b348ccc8748824fe8a552d18"},{url:"/manifest.json",revision:"5187c47e30d35abd063f1988931f9359"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/noavatar.png",revision:"7a002dc6a7d1141f419ee440fc8549bc"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
