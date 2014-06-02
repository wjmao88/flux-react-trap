/** @jsx React.DOM */
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TrapListApp = React.createClass({
  componentWillMount: function(){
    this.setState({traps: []});
    this.props.trapsStore.addChangeListener(function(){
      this.setState({traps: this.props.trapsStore.getTraps()});
    }.bind(this));
  },
  render: function() {
    var dispatcher = this.props.dispatcher;
    var traps = this.state.traps.map(function (trap) {
      return (
        <ReactCSSTransitionGroup transitionName="trapTrans">
          <Trap data={trap} dispatcher={dispatcher} /> 
        </ReactCSSTransitionGroup>
      );
    });
    return (
      <div>
        <h1>Trap List</h1>
        <ul className="trap-list">
          {traps}
        </ul>
      </div>
    );
  }
});

var dispatcher = new Dispatcher();
var trapsStore = new TrapsStore(dispatcher);

React.renderComponent(
  <TrapListApp trapsStore={trapsStore} dispatcher={dispatcher}/>,
  document.getElementById('app-container')
);
