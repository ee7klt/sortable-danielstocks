
const React = require('react');


const Sortable = {
  getDefaultProps: function() {
    console.log(this.props)
    return {
      "data-id" : this.props.key,
      draggable : true,
      onDragEnd: this.sortEnd.bind(this),
      onDragOver: this.dragOver.bind(this),
      onDragStart: this.sortStart.bind(this),
    }
  },
  update: function(to, from) {
    let data = this.props.data.items;
    data.splice(to, 0, data.splice(from,1)[0]);
    this.props.sort(data, to);
  },
  sortEnd: function() {
    this.props.sort(this.props.data.items, undefined);
  },
  sortStart: function(e) {
    this.dragged = e.currentTarget.dataset ?
      e.currentTarget.dataset.id :
      e.currentTarget.getAttribute('data-id');
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/html', null);
    } catch (ex) {
      e.dataTransfer.setData('text', '');
    }
  },
  move: function(over,append) {
    let to = Number(over.dataset.id);
    let from = this.props.data.dragging !== undefined ? this.props.data.dragging : Number(this.dragged);
    if(append) to++;
    if(from < to) to--;
    this.update(to,from);
  },
  dragOver: function(e) {
    e.preventDefault();
    let over = e.currentTarget
    let relX = e.clientX - over.getBoundingClientRect().left;
    let relY = e.clientY - over.getBoundingClientRect().top;
    let height = over.offsetHeight / 2;
    let placement = this.placement ? this.placement(relX, relY, over) : relY > height
    this.move(over, placement);
  },
  isDragging: function() {
    return this.props.data.dragging === this.props.key
  },
}

module.exports = Sortable;
