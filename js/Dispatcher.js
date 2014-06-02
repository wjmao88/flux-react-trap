var Dispatcher = function(){
  this._callbacks = {};
};

Dispatcher.prototype.on = function(event, func, context) {
  this._callbacks[event] = this._callbacks[event] || [];
  this._callbacks[event].push({
    func: func,
    context: context || null
  });
};

Dispatcher.prototype.trigger = function(event) {
  var args = Array.prototype.slice.call(arguments, 1);
  this._callbacks[event].forEach(function(callback){
    callback.func.apply(callback.context, args);
  });
};
