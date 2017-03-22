# [redux-storage-engine-remoteendpoint]()

[![build](https://travis-ci.org/Bionexo/redux-storage-engine-remoteendpoint.svg?branch=master)](https://travis-ci.org/bionexo/redux-storage-engine-remoteendpoint)
[![license](https://img.shields.io/npm/l/redux-storage-engine-remoteendpoint.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-engine-remoteendpoint)
[![npm version](https://img.shields.io/npm/v/redux-storage-engine-remoteendpoint.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-engine-remoteendpoint)
[![npm downloads](https://img.shields.io/npm/dm/redux-storage-engine-remoteendpoint.svg?style=flat-square)](https://www.npmjs.com/package/redux-storage-engine-remoteendpoint)

A remote endpoint storage engine for [redux-storage](https://github.com/michaelcontento/redux-storage).

# Usage

Everytime the store changes, save it on the server.

```js
import createEngine from 'redux-storage-engine-remoteendpoint';
const engine = createEngine('http://load-url', 'http://save-url', options);
```

Where `load-url` is the url that will be used to fetch the last store via `GET` and `save-url` is the url that will be used to save the store via `PUT`

`options` is an optional object that will be passed to fetch as options to both get and save requests. Check [github fetch polyfill](https://github.com/github/fetch) to see which options you can use.

