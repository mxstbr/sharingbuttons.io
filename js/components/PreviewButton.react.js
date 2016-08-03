var PreviewButton = React.createClass({
	render: function() {
		var network = this.props.network;
		var name = network.name;
		var text = this.props.text;
		var url = this.props.url;
		var id = this.props.id;
		var icon = [];
		var shareText;

		// Change the button text based on size
		switch(this.props.size) {
			case "small":
				shareText = "";
				icon.push(<div aria-hidden="true" key={"preview-button-" + name} className={"resp-sharing-button__icon resp-sharing-button__icon--" + this.props.iconSize} dangerouslySetInnerHTML={ this._makeIcon(this.props.icon) }></div>);
				break;
			case "large":
				icon.push(<div aria-hidden="true" key={"preview-button-" + name} className={"resp-sharing-button__icon resp-sharing-button__icon--" + this.props.iconSize} dangerouslySetInnerHTML={ this._makeIcon(this.props.icon) }></div>);
			case "medium":
				shareText = "Share on " + name;
				break;
		}

		// Render preview button
		return (
			<a className="resp-sharing-button__link"
			   key={ name + "share-link" }
			   href={ network.link }
			   target={ network.openInThisWindow ? "_self" : "_blank" }
				 aria-label={ shareText }>
				<div key={ name + "share-button"} className={ "resp-sharing-button resp-sharing-button--" + id.toLowerCase() + " resp-sharing-button--" + this.props.size}>
					{ icon }
					{ shareText }
				</div>
			</a>
		);
	},
	_makeIcon: function(string) {
		return { __html: string };
	}
});

module.exports = PreviewButton;
