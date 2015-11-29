var PreviewButton = React.createClass({
	render: function() {
		var network = this.props.network;
		var name = network.name;
		var text = this.props.text;
		var url = this.props.url;
		var id = this.props.id;
		var icon = this.props.icon;
		var shareText;

		// Change the button text based on size
		switch(this.props.size) {
			case "small":
				shareText = "";
				break;
			case "medium":
				shareText = "Share on " + name;
				break;
			case "large":
				shareText = "Share on " + name;
				break;
		}

		// Render preview button
		return (
			<div className="resp-sharing-button__wrapper">
				<a className="resp-sharing-button__link"
				   key={ name + "share-link" }
				   href={ network.link }
				   target="_blank">
					<div key={ name + "share-button"} className={ "resp-sharing-button resp-sharing-button--" + id.toLowerCase() + " resp-sharing-button--" + this.props.size}>
						<div className="resp-sharing-button__icon" dangerouslySetInnerHTML={ this._makeIcon(this.props.icon) }></div>
						{ shareText }
					</div>
				</a>
			</div>
		);
	},
	_makeIcon: function(string) {
		return { __html: string };
	}
});

module.exports = PreviewButton;
