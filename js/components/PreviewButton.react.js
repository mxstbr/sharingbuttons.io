var PreviewButton = React.createClass({
	render: function() {
		var network = this.props.network;
		var name = network.name;
		var text = this.props.text;
		var url = this.props.url;
		var id = this.props.id;
		var icon = <div aria-hidden="true" key={"preview-button-" + name} className={"resp-sharing-button__icon resp-sharing-button__icon--" + this.props.iconSize} dangerouslySetInnerHTML={ this._makeIcon(this.props.icon) }></div>;
		var shareText = "";
		var qrcode = undefined;

		// Change the button text based on size
		if (this.props.size === "medium") {
			shareText = name;
		} else if (this.props.size === "large") {
			shareText = "Share " + (this.props.network.name.toLowerCase() === "e-mail" ? "by " : "on ") + name;
		}

		if (network.qrcode) {
			qrcode = <img src={ network.link } className={ "resp-sharing-button__qrcode" }/>;
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
					{ qrcode }
				</div>
			</a>
		);
	},
	_makeIcon: function(string) {
		return { __html: string };
	}
});

module.exports = PreviewButton;
