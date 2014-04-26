# Language

`language` is a very small library for building DSLs in Javascript.

    npm install language

# Why?

Because magic scope!

    var language = require('language');

    var position = {x: 0, y: 0};

    var robot = language({
      position: position,

      moveLeft: function() {
        position.x--;
      },

      moveRight: function() {
        position.x++;
      },

      moveUp: function() {
        position.y--;
      },

      moveDown: function() {
        position.y++;
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

Read the source, it's small.
