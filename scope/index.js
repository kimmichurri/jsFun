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
    // Creation phase: store labels greeting and function name in global memory
    // Execution phase: assign string to global variable and invoke greetingFunction on line 126
    // Begin creation phase for greetingFunction, store labels for functionally scoped variable and name of newPhrase function
    // Execute: store string 'Yo' for functionally scoped variable, move into if block creation and execution, greeting is block scoped as 'Howdy'
    // Log A is 'Yo' because it hasn't been reassigned and we know the value was assigned to 'Yo' in execution
    // newPhrase is invoked on line 121, creation phase stores the variable label, execution phase assigns string of 'Hey' to greeting, Log B is 'Hey'
    // since keyword wasn't used to functionally scope variable the variable one function up is also reassigned to 'Hey'
    // Log C on line 123 is 'Hey' because of the reassignment from newPhrase
    // Interpreter moves out of functional scope where greeting still has the value of 'Hello'
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
    // Creation: store greeting label and function name in global memory
    // Execution: store string value for global variable and then invoke greetingGenerator on line 173
    // greetingGenerator creation: store labels for greeting and newGreeting function
    // begin local execution context for greetingGenerator, run creation and execution on if block, greeting is assigned 'hello' in the block scope
    // Log A greeting will still be 'hi' from function scope bc the variable has not been reassigned
    // newGreeting is now executed, 'greeting' assign to 'welcome and is reassigned to 'welcome' in the functional scope because it is not preceded by 'let' or 'const'
    // Log B is 'welcome' due to functional scope and Log C is 'welcome' due to reassgined of variable one function up
    // Log D greeting is 'howdy' because that is the assignment of the greeting variable in local context and it has not been reassigned
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
    // We will log in the order that logs occur, the result will NOT be in alphabetical order
    // Creation: store labels for variable and function in global memory
    // Execution: assign value 'Brittany' to global variable, Log C 'Brittany' on line 215 and invoke sayName on line 217
    // Creation begins for sayName, name label is stored in local execution context
    // Execution for sayName assigns string of 'Pam' to variable, move into creation and execution for 'if' block
    // name variable is reassingned within sayName to 'Nathaniel' due to ommission of keyword infront of variable
    // nested 'if' statement is created and executed and 'Brittany' is the assigned to the block-scoped variable
    // moving past the nested 'if' statement Log A is 'Nathaniel' because within the parent 'if' block name is assigned to 'Nathaniel'
    // Log B is also 'Nathaniel' because the functionally scoped variable was reassinged to 'Nathaniel' (see line 235)
    // sayName is removed from the callStack and we are left with Log D which is 'Brittany' because name was assigned 'Brittany' in the global scope and never reassigned in the global scope
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
    // Creation: store variable and function names in global memory
    // Execution: assign string 'Spot' to global variable, store function text, invoke petDog on line 266
    // Creation for petDog: store variable label and function label rollOver in local execution context
    // Exectution for petDog: Log A 'Spot' was assigned globally, creation and execution of 'if' block 'Fluffy' is assigned to variable dog in the block-scope
    // Next step in execution of petDog is to call rollOver on line 261
    // Creation of rollOver: if there isn't a keyword is the label 'dog' stored in local execution context?
    // Execution of rollOver: Log B is still 'Spot' because of the globally assigned variable
    // Log C is 'Biscuit' because we have functionally assigned dog to 'Biscuit' 
    // Because the keyword let or const wasn't used in the assignment of this variable the global reassignment is also 'Biscuit' so Logs D and E are 'Biscuit'
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
    // Creation phase: store the labels for the global variable 'fruit' and function 'eatFruit' in global memory
    // Execution: assign string of 'apple' to global variable and invoke eatFruit on line 310
    // Creation for eatFruit: store text for function in local execution context
    // Execution eatFruit: creation and execution of first 'if' block, var fruit is assigned the string 'mango'
    // Move into nested 'if' block creation phase where label for new variable is stored in local execution context
    // Execution of nested 'if' block asks to log what 'fruit' is but the interpreter doesn't know what it is yet >>
    // because it only knows that the label exists, the string of 'strawberry' won't be assigned as a value until the next line
    // Log B is 'mango' based on the functional scope, it wouldn't be 'strawberry' because that is block scoped in the 'if' block
    // Log C is 'mango' because it was assigned to the function in the first 'if' block
    // Now the interpreter has removed eatFruit off of the callStack and console logs Log D which will be 'apple' because that was the string assigned to fruit in the global context
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

    // Log A: sandwich ketchup sandwich

    const addChipotle = () => {
      // Log B: toppings undefined (thought it was a reference error first, but it is undefined because the interpreter knows that it has been declared but doens't know the value yet)
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') { 
        sandwich = 'not a mediocre sandwich';
      }

      // Log C: sandwich 'not a mediocre sandwich'
    };

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: cheeseTopping gouda

      const shesTheManReference = () => {
        amandaBynes = 'National Treasure';
      };

      shesTheManReference();
    };

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    // Log E: sandwich 'ketchup sandwich'
    // Log F: amandaBynes 'National Treasure'

    const result = [ 
      { A: 'ketchup sandwich' }, 
      { D: 'gouda' }, 
      { B: undefined }, 
      { C: 'not a mediocre sandwich' }, 
      { E: 'not a mediocre sandwich' }, 
      { F: 'National Treasure' }
    ] ;
    return result;

    // Annotation:
    // Creation phase: the interpreter will store the labels for sandwhich, addChipotle, addCheesem and cheeseTopping(?) in global memory
    // Execution: string of 'ketchup sandwich' will be assigned to 'sandwich' and Log A will be 'ketchup sandwhich' 
    // string of 'kraft' is assigned to cheeseTopping, addCheese is invoked on line 449
    // Creation of addCheese: store variable and function labels in local execution context
    // Execution of addCheese: assign string of 'gouda' to cheeseTopping which is funtionally scoped, then Log D will be 'gouda' immediately after assigning the string on line above;
    // Continue with execution, invoke shesTheManReference on line 445, creation of that function stores variable label name then execution assigns it to string of 'National Treasure' >>
    // The whole function has access to 'amandaBynes' variable because it wasn't assigned with a variable keyword (leaks out to be access globally bc of ES6 syntax)
    // addCheese removed from callStack and addChipotle is invoked
    // Creation phase addChipotle: topping label is stored in local execution context global memory
    // Execution phase: Log B is a undefined because the string of 'chipotle sauce' is not assigned to 'toppings' until the next line, we haven't defined it in the function yet
    // Continue execution phase, assign string to variable 'toppings', we move through if block creation and execution, sandwich is assigned in the block to 'not a mediocre sandwich' and reassigned one function up to global sandwich variable
    // Log C is 'not a mediocre sandwich' because the sandwich variable was not block scoped so it is available to the interpreter outside of that block
    // addChipotle is done, removed from the callStack and Log E is 'not a mediocre sandwich' because 'sandwich' was reassigned globally in the addChipotle function
    // Log F is 'National Treasure' because the interpreter defaults to var and var gets hoisted to the global context
  },

  exerciseK() {
    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      // Log A: num 7
    }

    foo();

    // Log B: num 7

    const result = [
      { A: 7},
      { B: 7}
    ];
    return result;

    // Annotation:
    // Creation: the interpreter stores labels and function name
    // Execution: num variable is assigned value of 10 and then foo is invoked on line 492
    // Create and execute foo: create and execute 'if' block: num within function is assigned to 7 so Log A is 7
    // foo is now removed from callStack
    // Log B is also 7 because num is reassgined on line 487 because the variable was not declared with a keyword
  },

  exerciseL() {
    let grade = 100; //gets reassigned to 90 in losePoints

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }

        // Log A: grade 95
      }

      addPoints();

      // Log B: grade '90'
    }

    losePoints();

    // Log C: grade 90

    const result = [
      { A: 95 },
      { B: 90},
      { C: 90 }
    ];
    return result;

    // Annotation:
    // Creation: store labels of variable and function name in global memory
    // Execution: assign value to global variable '100' and invoke losePoints
    // Creation for losePoints: variable label and function label are stored in global memory of local execution context
    // Execution: grade is assigned '90' functionally and also reassigned globally and addPoints is invoked
    // Create and execute addPoints, create grabs label of variable, execute assigns 95 to grade and runs through 'if' block
    // 'if' statement evaluates to true and grade is block-scoped to be 97 because of 'let' keyword
    // Log A is 95 because grade is assigned to '95' functionally
    // addPoints is removed from callStack
    // Log B is executed and will be 90 because grade is assigned to 90 in the functional scope
    // losePoints is removed from callStack
    // Log C is 90 because it was reassigned globally in losePoints function
  },

  exerciseM() {
    var num = 5; //gets reassigned to 6 in 'first' function

    function first() {
      // Log A: num 5
      num = 6;
      // Log B: num 6
    }

    function second() {
      // Log C: num reference error
      let num = 7;
    }

    first();
    second();

    // Log D: num 6

    const result = [
      { A: 5 },
      { B: 6 },
      { C: 'reference error' },
      { D: 6 }
    ];
    return result;

    // Annotation:
    // Creation: store variable label and labels of both functions
    // Execution: add value to variable and then invoke 'first' function
    // Create 'first': the interpreter stores the label of the variable and defaults to var
    // Execute 'first': Log A is 5 because the interpreter is referring to the globally scoped variable, number variable is functionally scoped to 6 and globally reassigned to 6 so Log B is 6
    // 'first' is removed from callStack and 'second' is invoked
    // 'second' creation phase stores the variable label
    // 'second' execution Log C asks for num which will be reference error
  },

  exerciseN() {
    var instructor = 'Pam';

    function changeInstructor() {

      // Log A: instructor 'Pam'

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }

      // Log B: instructor 'Pam'

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor 'Louisa'
      }

      rename();

      // Log D: instructor 'Louisa'

    }

    // Log E: instructor 'Pam'

    changeInstructor();

    // Log F: instructor 'Pam'

    const result = [
      { E: 'Pam' },
      { A: 'Pam'},
      { B: 'Pam'},
      { C: 'Louisa'},
      { D: 'Louisa'},
      { F: 'Louisa'}
    ];
    return result;

    // Annotation:
    // Creation: store labels for global variable and function name in global memory
    // Execution: assign string of 'Pam' to global variable, Log E Pam, then invoke changeInstructor
    // Creation changeInstructor stores rename function name
    // Execution changeInstructor Log A is still 'Pam'
    // 'if' block is created and executed resulting in 'Brittany' being block scope assigned to instructor in the else block
    // Log B is still 'Pam' because the interpreter has access to instructor variable in the global scope
    // rename is invoked after Log B, Log C is Louisa due to variable assignment within rename function
    // rename is removed from callStack
    // Log D instructor is Louisa because instructor was reassigned in global scope in the rename function, and this holds true for Log F as well
  },

  exerciseO() {
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe undefined because it knows the variable label is there but doesn't know what it is yet
      var shoe = 'boot'; //since this is var it is hoisted to the top of this specific function so the interpreter know this label exists, just doesn't know what value is assigned to it yet
    }

    // Log B: shoe flipflop
    putOnShoe();
    // Log C: shoe flipflop

    const result = [
      { B: 'flipflop'},
      { A: undefined },
      { C: 'flipflop'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseP() {
    let lunch;
    function orderLunch() {
      if (lunch) {
        // Log A: lunch undefined
        let lunch = 'sandwich';
      }

      if (typeof lunch === 'undefined') {
        lunch = 'soup';
      }

      // Log B: lunch 'soup'
    }

    orderLunch();

    // Log C: lunch 'soup' gets reassigned globally after second if statement

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseQ(){
    let myKid = 'Pandora';
    let wildKids = ['Antigone'];

    let myCrazyKidAntics = kid => {
      // Log A: kid 'Pandora' because you pass in an argument
      wildKids.push(kid);
      // Log B: wildKids ['Antigone', 'Pandora']
  
      let drawOnTheWall = () => {
        let myKid = 'Mandy';
        // Log C: myKid 'Mandy'
        return `That wild kid ${myKid}, drew on the wall!`;
      };

      drawOnTheWall();

      let myAmazingKid = () => {
        let myKid = wildKids.shift();
        // Log D: myKid ['Antigone] this was shifted out
        return `That kid ${myKid}, is AMAZING!`;
      };

      myAmazingKid();
      // Log E: myKid; 
      return `All these kids are wild, especially, ${myKid}!`;
    };

    myCrazyKidAntics(myKid);

    const result = [
      { A: 'Pandora' },
      { B: ['Antigone', 'Pandora'] },
      { C: 'Mandy'},
      { D: 'Antigone'},
      { E: 'Pandora'}
    ];
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  exerciseR() {
    let myName = 'Rody';
    // Log A: myName 'Rody' get reassinged after innerFunc to 'RodyToyDaniels'

    const parentFunc = () => {
      myName += 'Toy';
      // Log B: myName 'RodyToy' then 'RodyToyDaniels' based on innerFunc

      let innerFunc = () => {
        let myName = 'Tesla'; 
        // Log C: myName 'Tesla'
      };

      innerFunc();
      myName += 'Daniels';
    };

    parentFunc();
    // Log D: myName 'RodyToyDaniels'

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = scope;