# Usage

```
npm install pulldown-middle-man
```

Server response is _always_ an array of URLs, even if there's just one URL.

# Example Usage

```js
var middleMan = require("middleman");
middleMan.set("jquery", function(d) { console.log(d); });
//=> ["//cdn/path/to/jquery.js"]
```
