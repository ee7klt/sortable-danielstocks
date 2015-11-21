/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const Sortable = require('./Sortable.jsx');

const SortableListItem = React.createClass({
  mixins: [Sortable],
  render: function() {
    return this.transferPropsTo(
      <li className={this.isDragging() ? "dragging" : ""}>{this.props.item}</li>
    );
  },
})

const Main = React.createClass({

  getInitialState: function() {
    return {data: this.props.data};
  },

  sort: function(items, dragging) {
    let data = this.state.data;
    data.items = items;
    data.dragging = dragging;
    this.setState({data: data});
  },

  render: function() {

    
    const listItems = this.state.data.items.map(function(item, i) {
      return (
        <SortableListItem
          sort={this.sort}
          data={this.state.data}
          key={i}
          item={item} />
      );
    }, this);

    return <ul>{listItems}</ul>
  },
});

module.exports = Main;
