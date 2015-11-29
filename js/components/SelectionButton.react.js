var SelectionButton = React.createClass({
  render: function() {
    var element = this.props.element;
    var className = "generator__radiobutton";

    if (this.props.selected === true) {
      className += " generator__radiobutton--selected";
    }

    return(
      <div className={className}
            onClick={this.props.selectOption}>
              {element.charAt(0).toUpperCase() + element.slice(1)}
      </div>
    );
  }
});

module.exports = SelectionButton;
