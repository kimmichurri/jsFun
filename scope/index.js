const scope = {
  exerciseA() {
    let personA = 'Paul';
    let personB = 'Ben';
    let personC = 'Tom';

    function changePerson() {
      if (personA === 'Paul') {
        person = 'CardiB';
        beautifyPerson();
      }

      function beautifyPerson() {
        // Log A: personB
        
        if (personB.includes('B')) {
          personB = person;
          personC = personB;
          // Log B: personC
        }
      }

      personC = personA;

      // Log C: personB
    }

    changePerson();

    // Log D: personC

    const result = [
      { A: 'Ben'},
      { B: 'CardiB'},
      { C: 'CardiB'},
      { D: 'Paul'}
    ];
    return result;

    // Annotation:
    // In the creation phase our interpreter grabs labels for the global vars and for 'changePerson' function, ignores function call
    // In the execution phase our interpreter grabs values for global vars and the text for 'changePerson'
    // The creation begins for 'changePerson', label is grabbed for 'beautifyPerson'
    // Creation phase for 'if' block, nothing to see there execept label for 'person' I think
    // Execute 'if' block, 'person' is assigned to 'CardiB'
    // 'beautifyPerson' is called and creation phase of that function begins, nothing to see there
    // Execute 'beautifyPerson', Log A is 'Ben' based on global variables
    // Creation phase 'if' block
    // Execute 'if' block 'personB' is assigned to 'CardiB' based on looking one function up, and 'personC' is assigned to 'CardiB' based on logic reassignment in following line
    // Based on about, Log B must be CardiB
    // Finish executing 'changePerson' on line 23 and 'personC' 'Tom' is reassigned to Paul
    // Log C is also CardiB due to reassginment
    // Now we are out of the function execution of 'changePerson' and we console log D which is 'person C' which was reassigned to 'Paul' on line 23

  },

  exerciseB() {
    let number = 30;

    function numberFunction() {
      let number = 75;

      if (number === 75) {
        let number = 28;
      }

      // Log A: number 75

      function newNumber() {
        number = 64;

        // Log B: number 64
      }

      newNumber();

      // Log C: number 64
    }

    numberFunction();

    // Log D: number 30

    const result = [
      { A: 75 },
      { B: 64 },
      { C: 64 },
      { D: 30 }
    ];
    return result;

    // Annotation:
    // Creation phase: grab names for global vars and 'numberFunction', ignore function invocation
    // Execution phase: grab value '75' of global var and call 'numberFunction' on line 75
    // Creation phase for numberFunction: store label for functionally scoped variable and name of newNumber function
    // Execution phase for numberFunction: store value '75' for let, create and execute 'if' block, number assigned to '28' only within the block b/c of use of 'let'
    // Log A is 75 based on function scope of variable
    // Call newNumber on 75, create and execute newNumber, number variable is assigned value of 64 (and reassigned in functional scope because let wasn't placed in front) so Log B is 64
    // Move on to LogC since newNumber has already been called and removed from CallStack, number is now 64
    // Log D is 30 because the 'global' variable was never reassigned
  },

  exerciseC() {
    let greeting = 'Hello';

    function greetingFunction() {
      var greeting = 'Yo';

      if (greeting === 'Yo') {
        let greeting = 'Howdy';
      }

      // Log A: greeting 'YO'

      function newPhrase() {
        greeting = 'Hey';

        // Log B: greeting 'Hey'
      }

      newPhrase();

      // Log C: greeting 'Hey'
    }

    greetingFunction();

    // Log D: greeting 'Hello'

    const result = [
      { A: 'Yo'},
      { B: 'Hey'},
      { C: 'Hey'},
      { D: 'Hello'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseD() {
    let greeting = 'howdy';

    const greetingGenerator = () => {
      let greeting = 'hi';

      if (greeting === 'hi') {
        let greeting = 'hello';
      }

      // Log A: greeting 'hi'

      const newGreeting = ()  => {
        greeting = 'welcome';

        // Log B: greeting 'welcome'
      };

      newGreeting();

      // Log C: greeting 'welcome'
    };

    greetingGenerator();

    // Log D: greeting 'howdy'

    const result = [
      { A: 'hi'},
      { B: 'welcome'},
      { C: 'welcome'},
      { D: 'howdy'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseE() {
    let name = 'Brittany';

    function sayName() {
      let name = 'Pam';

      if (name === 'Pam') {
        name = 'Nathaniel';

        if (name.length > 0) {
          let name = 'Brittany';
        }

        // Log A: 'Nathaniel'
      }

      // Log B: 'Nathaniel'
    }

    // Log C: 'Brittany'

    sayName();

    // Log D: 'Brittany'

    const result = [
      { C: 'Brittany'}, 
      { A: 'Nathaniel'}, 
      { B: 'Nathaniel'}, 
      { D: 'Brittany'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseF() {
    var dog = 'Spot';

    function petDog() {
      // Log A: 'Spot'

      if (dog === 'Spot') {
        let dog = 'Fluffy';
      }

      function rollOver() {
        // Log B: 'Spot'

        dog = 'Biscuit';

        // Log C: 'Biscuit'

      }

      rollOver();

      // Log D: 'Biscuit'
    }

    petDog();

    // Log E: 'Biscuit'

    const result = [
      { A: 'Spot'},
      { B: 'Spot'},
      { C: 'Biscuit'},
      { D: 'Biscuit'},
      { E: 'Biscuit'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseG() {
    var fruit = 'apple';

    function eatFruit() {

      if (fruit !== 'kiwi') {
        var fruit = 'mango';

        if (fruit) {
          // Log A: ref error because const cannot be hoisted but interpreter knows there will be a new variable declared
          const fruit = 'strawberry'; //knows this exists but doesn't know what to assign it
        }

        // Log B: 'mango'
      }

      // Log C: 'mango'
    }

    eatFruit();

    // Log D: 'apple'

    const result = [
      { A: 'reference error'}, //related to the temporal dead zone because const on line 249
      { B: 'mango'},
      { C: 'mango'},
      { D: 'apple'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseH() {
    let num = 6;

    const fn1 = function() {
      let num = 4;

      // Log A: num 4

      if (num < 5) {
        const num = 9;

        fn2(num); //9, bc it is block scoped

        const newNum = num;

        // Log B: newNum 9
      }

      newNum = num;

      // Log C: newNum 4
    };

    const fn2 = function(num){
      // Log D: num 9

      num = num + 1;

      // Log E: num 10
    };

    fn1();

    const result = [
      { A: 4 },
      { D: 9},
      { E: 10},
      { B: 9},
      { C: 4}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseI() {
    var hunger = 100;

    function eatSnack() {
      hunger -= 25;
      // Log A: hunger 75 --> 55
      gorgeYourself();

      function gorgeYourself() {
        const hunger = 0;
        // Log B: hunger 0, still 0
      }

      // Log C: hunger 75 --> 55
    }

    eatSnack();

    hunger += 5;
    // Log D: hunger 80

    eatSnack();
    // Log E: hunger 55

    const result = [
      { A: 75},
      { B: 0},
      { C: 75},
      { D: 80},
      { A: 55},
      { B: 0},
      { C: 55},
      { E: 55}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseJ() {
    let sandwich = 'ketchup sandwich';

    // Log A: sandwich

    const addChipotle = () => {
      // Log B: toppings
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') { 
        sandwich = 'not a mediocre sandwich';
      }

      // Log C: sandwich
    };

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: cheeseTopping

      const shesTheManReference = () => {
        amandaBynes = 'National Treasure';
      };

      shesTheManReference();
    };

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    // Log E: sandwich
    // Log F: amandaBynes

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseK() {
    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      // Log A: num
    }

    foo();

    // Log B: num

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseL() {
    let grade = 100;

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }

        // Log A: grade
      }

      addPoints();

      // Log B: grade
    }

    losePoints();

    // Log C: grade

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseM() {
    var num = 5;

    function first() {
      // Log A: num
      num = 6;
      // Log B: num
    }

    function second() {
      // Log C: num
      let num = 7;
    }

    first();
    second();

    // Log D: num

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseN() {
    var instructor = 'Pam';

    function changeInstructor() {

      // Log A: instructor

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }

      // Log B: instructor

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor
      }

      rename();

      // Log D: instructor

    }

    // Log E: instructor

    changeInstructor();

    // Log F: instructor

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseO() {
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe
      var shoe = 'boot';
    }

    // Log B: shoe
    putOnShoe();
    // Log C: shoe

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseP() {
    let lunch;
    function orderLunch() {
      if (lunch) {
        // Log A: lunch
        let lunch = 'sandwich';
      }

      if (typeof lunch === 'undefined') {
        lunch = 'soup';
      }

      // Log B: lunch
    }

    orderLunch();

    // Log C: lunch

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseQ(){
    let myKid = 'Pandora';
    let wildKids = ['Antigone'];

    let myCrazyKidAntics = kid => {
      // Log A: kid
      wildKids.push(kid);
      // Log B: wildKids
  
      let drawOnTheWall = () => {
        let myKid = 'Mandy';
        // Log C: myKid
        return `That wild kid ${myKid}, drew on the wall!`;
      };

      drawOnTheWall();

      let myAmazingKid = () => {
        let myKid = wildKids.shift();
        // Log D: myKid
        return `That kid ${myKid}, is AMAZING!`;
      };

      myAmazingKid();
      // Log E: myKid;
      return `All these kids are wild, especially, ${myKid}!`;
    };

    myCrazyKidAntics(myKid);

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseR() {
    let myName = 'Rody';
    // Log A: myName

    const parentFunc = () => {
      myName += 'Toy';
      // Log B: myName

      let innerFunc = () => {
        let myName = 'Tesla'; 
        // Log C: myName
      };

      innerFunc();
      myName += 'Daniels';
    };

    parentFunc();
    // Log D: myName

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = scope;