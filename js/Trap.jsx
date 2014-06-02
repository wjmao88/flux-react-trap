/** @jsx React.DOM */
var Trap = React.createClass({
  close: function(){
    this.props.dispatcher.trigger('close', this.props.data.index);
    return false;
  },
  pin: function(){
    this.props.dispatcher.trigger('pin', this.props.data.index);
    return false;
  },
  unpin: function(){
    this.props.dispatcher.trigger('unpin', this.props.data.index);
    return false;
  },
  render: function() {
    var data = this.props.data;
    var pin;
    if (!data.pinned){
      pin = <button className="pin" onClick={this.pin}>Pin it</button>;
    } else {
      pin = <button className="unpin" onClick={this.unpin}>Unpin it</button>;
    }
    return ( 
      <li className="trap">
        <button className="close" onClick={this.close}>X</button>
        <div className="thumbnail">
          <img src={data.thumbnail} />
        </div>
        <div className="title">
          {data.title}
        </div>
        {pin}
      </li>
    );
  }
});