var SelectionButton = React.createClass({
  render: function() {
    var element = this.props.element;
    var className = "generator__option"
    if (this.props.classNameSuffix !== undefined) {
      className += " generator__option-" + this.props.classNameSuffix;
    }

    if (this.props.selected === true) {
      className += " generator__option--selected";
    }

    if (this.props.type === "checkbox") {
      className += " generator__option--checkbox";
    } else {
      className += " generator__option--radio";
    }

    if (this.props.nameInState !== undefined && this.props.iconSize !== undefined) {
      className += " generator__option-icon--" + this.props.iconSize;
    }

    return(
      <div  className={className}
            onClick={this._selectOption}
            dangerouslySetInnerHTML={this._createMarkup(element.charAt(0).toUpperCase() + element.slice(1))}>
      </div>
    );
  },
  _createMarkup: function(string) {
    return { __html: string };
  },
  _selectOption: function() {
    if (this.props.nameInState !== undefined) {
      name = this.props.nameInState;
    } else {
      name = this.props.element;
    }
    this.props.selectOption(name);
  }
});

module.exports = SelectionButton;
