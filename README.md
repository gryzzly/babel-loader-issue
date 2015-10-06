This repo demonstrates the problem with a combination of React, react-router
and babel-loader.

## The problem

In order to reproduce clone this repo, navigate to the local clone in terminal
and run

```
npm install
node_modules/.bin/webpack-dev-server --config webpack.conf.js
```

Open a new browser tab, navigate to [`http://localhost:8080/#/page`](http://localhost:8080/#/page)
and open Developer Tools. In console you will see an error: `"Unhandled promise
rejection ReferenceError: A is not defined(…) es6.promise.js:112"` like this:

![](https://cloud.githubusercontent.com/assets/26131/10303924/4d7d51a6-6c30-11e5-83ec-17dac129baa2.png)

The error is not in `es6.promise.js` and there’s no useful information about the
stack and location of the error. Toggling `break on caught exceptions` lets us
find the error location but is suboptimal experience.

## With `babelify`

Next, stop the dev server in console and edit webpack.conf.js: uncomment line 15
to enable `babelify` transform via [`transform-loader`](https://github.com/webpack/transform-loader)
then comment out line 14, to disable `babel-loader`. Run the dev server again:

```
node_modules/.bin/webpack-dev-server --config webpack.conf.js
```

Refresh the page in the browser and you will see correct error and code location:
`"Uncaught (in promise) ReferenceError: A is not defined(…)" Page.js:5` Clicking
on the error location will open the pre-compiled source file and highlight correct
line.

![](https://cloud.githubusercontent.com/assets/26131/10303934/5f5d46a6-6c30-11e5-9d28-e639ea9311c0.png)

## What I tried

Initially this error appeared when using react-router 0.13. We have updated the router
to 1.0rc and could still see the issue. We've tried to approach it from different
angles and managed to boil the issue down to the usage of babel-loader.

Since `Promise` is involved, we've tried to see if the issue comes from
es6.promise core-js polyfill. It seems the problem is not there, replacing native
Promise with `bluebird`, for example, didn't resolve the issue: again, with `babel-loader`
error stack would be lost, with `transform?babelify` it worked as expected.

Removing routing completely is solving the issue, but that is not a viable option.
Enabling `break on caught exceptions lets us see the location of the error but
is also a suboptimal debugging experience.
