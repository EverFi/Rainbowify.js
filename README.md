Rainbowify.js
=============
http://everfi.github.com/Rainbowify.js/

jQuery Plug-in to give DOM elements a CSS3 animated rainbow background.

## Simple to use Rainbows!

```javascript
  $('.be-a-happy-rainbow').rainbowify();
```


##Highly Configurable Rainbows!

Change the colors of the rainbow. You can even make a sad gray rainbow
```javascript
  $('.sad-rainbow').rainbowify({
    colors:[
      "#333","#444", "#555", "#666", "#777", "#888", "#999", "#333"
    ]
  })
```

Turn the rainbow off after 10 seconds

```javascript
  $('.temperary-rainbow').rainbowify({duration: 10000})
```
Turn the rainbow off at will

```javascript
  var el = $('.be-a-happy-rainbow');

    // Do some special code

  el.rainbowify('stop');
```
