# Language

`language` is a very small library for building DSLs in Javascript.

    npm install language

# Why?

Because magic scope! and because no globals!

    var language = require('language');

    var robot = language({
      position: {x: 0, y: 0},

      moveLeft: function() {
        this.position.x--;
      },

      moveRight: function() {
        this.position.x++;
      },

      moveUp: function() {
        this.position.y--;
      },

      moveDown: function() {
        this.position.y++;
      },
    });

    robot(function () {
      console.log(position);

      moveDown();
      console.log(position);

      moveRight();
      console.log(position);
    });

# How?

Read the [source](https://github.com/featurist/language/blob/master/index.js), it's small.
