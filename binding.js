var call = 0;

//
// Function contex binding test
//


// Default binding
function f() {
  console.log('call ' + call++, this.val);
}

var val = 1;
f(); // call 0 : 1

//
// Implicit binding
//
var obj = {
  val: 2,
  f: f
}

obj.f(); // call 1 : 2

// Implcit binding lost
var fCaller = function(fn) {
  // fn prende il contesto globale.
  // se ci fosse un this = 3, prenderebbe questo
  fn(); 
}


fCaller(f); // call 2 : 1

obj.fCaller = fCaller;
// qui ho perso il contesto implicito di obj
obj.fCaller(f); // call 3: 1 # vorrei 2 perchè obj ha val = 2


//
// Explicit binding
// 
f.call(obj); // call 4 : 2
f.apply(obj); // call 5 : 2


//
// new keyword binding
// 

/*
1 - a brand new object is created (aka, constructed) out of thin air
2 - the newly constructed object is [[Prototype]]-linked
3 - the newly constructed object is set as the this binding for that function call
4 - unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.
*/

var G = function() {
  this.val = 3;
  this.f = f;
}

var gObj = new G(); 
gObj.f() // call 6 : 3
f.call(gObj);



