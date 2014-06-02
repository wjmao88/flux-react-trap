var TrapsStore = function(dispatcher){
  dispatcher.on('pin', this.pin, this);
  dispatcher.on('unpin', this.unpin, this);
  dispatcher.on('close', this.close, this);

  this._changeListeners = [];

  this._url = 'http://curate.trap.it/api/v4/tc/traps/2c76c05e75814865b4a8c67052b5d0f3/atom/';
  this._traps = [];
  this._firstUnpin = 0;
  
  $.ajax({
    url: this._url,
    dataType: 'xml',
    success: function(xml) {
      var entries = Array.prototype.slice.call(xml.children[0].children, 4);
      this._traps = entries.map(function(entry, index){
        return {
          index: index,
          title: entry.children[0].innerHTML,
          thumbnail: entry.children[8].attributes[1].value
        }
      });
      this.change();
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(status, err.toString());
    }
  });
}

TrapsStore.prototype.getTraps = function(){
  return this._traps;
};

TrapsStore.prototype.pin = function(index){
  this._traps[index].pinned = true;
  this.reorder(index, 0);
  this._firstUnpin += 1;
};

TrapsStore.prototype.unpin = function(index){
  this._traps[index].pinned = false;
  this._firstUnpin -= 1;
  this.reorder(index, this._firstUnpin);
};

TrapsStore.prototype.reorder = function(fromIndex, toIndex){
  var target = this._traps.splice(fromIndex, 1)[0];
  this._traps.splice(toIndex, 0, target);

  var start = Math.min(fromIndex, toIndex);
  var end = Math.max(fromIndex, toIndex);
  for (var i=start; i<=end; i++){
    this._traps[i].index = i;
  }

  this.change();
}

TrapsStore.prototype.close = function(index){
  if (this._traps.splice(index, 1).pinned){
    this._firstUnpin -= 1;
  }

  for (var i=index; i<this._traps.length; i++){
    this._traps[i].index = i;
  }

  this.change();
};

TrapsStore.prototype.change = function(){
  this._changeListeners.forEach(function(listener){
    listener.func.call(listener.context);
  })
}

TrapsStore.prototype.addChangeListener = function(func, context){
  this._changeListeners.push({
    func: func,
    context: context || null
  });
};

TrapsStore.prototype.removeChangeListener = function(func, context){
  var found = false;
  var listeners = this._changeListeners;
  listener.forEach(function(listener, index){
    if (!found && listener.func === func && listener.context === context){
      listener.splice(index, 1);
    }
  })
};