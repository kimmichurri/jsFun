const context = {
  exerciseA() {
    const fly = () => {
      console.log(this);
    };

    class SpaceProbe {
      constructor(title, classification) {
        this.title = title;
        this.classification = classification;
        this.fly = fly;
      } 
    }

    const ship = new SpaceProbe('voyager', 'classy');


    // What is the value of `this` when we call ship.fly()?
    const result = 'global window object';
    //`this` would refer to the window object or exerciseA
    return result;

    // Annotation:
    //`this` will reference the window object because we are declaring fly with arrow function
    //syntax and the window defines the `this` context of that function upon creation
  },

  exerciseB() {
    function fn() {
      const value = 2;
      return this.value;
    }
    
    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation:
    //Because this is not a method on an object or invoked with the new operator `this` defaults to the 
    //global window object
  },

  exerciseC() {
    const car = {
      make: 'Tesla',
      getInfo: function(){
        console.log(this);
      }
    };

    const el = document.getElementById('btn');
    el.addEventListener('click', car.getInfo);

    // What is the value of `this` when a user clicks on our element and car.getInfo() is triggered?
    const result = 'el';
    return result;

    // Annotation: 
    //The event listener the method being executed on `el` which in this moment is acting as an object
    //because object wrappers allow for variables to act as objects
  },

  exerciseD() {
    const dog = {
      breed: 'Chihuahua',
      getBreed: function(){
        const innerFunction = function() {
          console.log(this.breed);
        };
    
        return innerFunction();
      }
    };

    // What is the value of `this` when we call dog.getBreed()?
    const result = 'global window object';
    return result;

    // Annotation: 
    //getBreed is assigned the return value of a function. Within that function there is another nested function.
    //`this` is wrapped inside of the nested function within getBreed so `this` is unable to 
    //see getBreed and defaults to pointing to the global window object because it can't point to the method or objec that it is within
  },

  exerciseE() {

    const fn = () => {
      value = 21;
      return this.value;
    };

    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation: 
    //I'm not sure about this one
  },

  exerciseF() {
    class Hero {
      constructor(name, power, canFly = false) {
        this.name = name;
        this.power = power;
        this.canFly = canFly;
      }

      identifyHero() {
        return this;
      }
    }

    const storm = new Hero('Ororo', 'weather control', true);

    // What is the value of `this` when we call storm.identifyHero()?
    const result = 'instance of Hero';
    return result;

    // Annotation: 
    //storm is an instance on the class Hero so when we call the method on that instance
    //`this` will refer to the specific instance which has access to all of the same methods as the class
  },

  exerciseG() {
    class Game {
      constructor(title) {
        this.title = title;
      }

      resetGame() {
        console.log('Clearing the board and starting over');
      }

      restart() {
        setTimeout(function() {
          console.log(`Restarting ${this.title}...`);
        }, 1000);
      }
    }

    const monopoly = new Game('Monopoly');


    // What is the value of `this` when we call monopoly.restart()?
    const result = 'global window object';
    return result;

    // Annotation: 
    //`this` is nested in a function within a method on the Game class
    //because `this` is nested in the method the new instance of Monopoly cannot see into the nested function
  },

  exerciseH() {
    const obj = {
      arrowFunction: null,
      method: function() {
        this.arrowFunction = () => { 
          return this;
        };
      }
    };

    obj.method();

    // What is the value of `this` when we call obj.arrowFunction()?
    const result = 'obj';
    return result;

    // Annotation: 
    //in obj we see two key value pairs. the second pair is assigning the return of a function
    //as its value which is just `this` which will point to the object it is within.
  },

  exerciseI() {  
    const poets = [{
      name: 'Sappho'
    }, {
      name: 'Maya'
    }, {
      name: 'Emily'
    }, {
      name: 'Audre'
    }];

    poets.map(function(poet) {
      return this;
    }, poets);

    // What is the value of `this` that gets returned on each iteration of poets.map()?
    const result = 'poets';
    return result;

    // Annotation: 
    //the `this` value the gets returned on each iteration of poets.map() is poets. 
    //poets is an argument in this function. By including poets as an argument we are 
    //specifying that `poets` will be the value of `this` when we execute the callback
    //function which we do by using the map array prototype method.
    // Write your annotation here as a comment. Annotation should include explanation regarding the second argument of `poets` that is being passed
  },

  exerciseJ() {
    const el = $('#btn');
    el.on('click', function() {
      console.log($(this));
    });

    // What is the value of `this` when a user clicks on our #btn element and the callback is triggered?
    const result = 'el';
    return result;

    // Annotation: 
    //We are calling a method/function on the `el` element using ES5 syntax. This syntax ensures
    //that the context does not point to the window but rather the `object` that is calling the method.
    //in this situation `el` is a variable acting as an object which it can do with object wrappers so that methods can be called on them
  },

  exerciseK() {
    const el = $('#btn');
    el.on('click', () => {
      console.log(this);
    });

    // What is the value of `this` when a user clicks on our #btn element and the callback is triggered?
    const result = 'global window object';
    return result;

    // Annotation: 
    //this event listener is a function using arrow syntax. Whenever arrow syntax is used on 
    //event listeners the default `this` context will be the global window object.
  }

};

module.exports = context;