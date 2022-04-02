// 模拟实现call
// ES6实现
Function.prototype.mycall = function (context) {
    context = context ? Object(context) : window;
    var fn = Symbol();
    context[fn] = this;
  
    let args = [...arguments].slice(1);
    let result = context[fn](...args);
  
    delete context[fn]
    return result;
  }
  
  // 模拟实现bind
  Function.prototype.mybind = function (context) {
    if (typeof this !== "function") {
      throw new Error("请使用函数对象调用我，谢谢！");
    }
  
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
  
    var fNOP = function () { };
  
    var fBound = function () {
      var bindArgs = Array.prototype.slice.call(arguments);
      return self.myapply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
  
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  }
  
  // 模拟实现apply
  // ES6实现
  Function.prototype.myapply = function (context, arr) {
      context = context ? Object(context) : window;
      var fn = Symbol();
      context[fn] = this;
      let result;
      if (!arr) {
          result = context[fn]();
      } else {
          result = context[fn](...arr);
      }
  
      delete context[fn]
      return result;
  }
  
  var toStr1 = Function.prototype.mycall.mybind(Object.prototype.toString);
  
  console.log(toStr1({}));      // "[object Object]"
  console.log(toStr1([]));      // "[object Array]"
  console.log(toStr1(123));     // "[object Number]"
  console.log(toStr1("abc"));   // "[object String]"
  console.log(toStr1(new Date));// "[object Date]"
  