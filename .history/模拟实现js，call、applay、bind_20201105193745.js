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
      // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
      return self.myapply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    // 维护原型关系
    if(this.prototype) {
        // 当执行Function.prototype.bind()时, this为Function.prototype
		// this.prototype(即Function.prototype.prototype)为undefined
        fNOP.prototype = this.prototype;
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
	// 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
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
  