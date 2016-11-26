var QrcodePopup = React.createClass({
	render: function() {
		var id = this.props.idPopup;
		var content = this.props.content;

		return (
			<div className={ "qrcode-popup" }>
				<input type="checkbox" className={ "qrcode-popup__checkbox" } id={ this.props.id }/>
				<div className={ "qrcode-popup__qrcode" } >
					<div className={ "qrcode-popup__qrcode-wrapper" } >
						<img src={ 'https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=' + this.props.content } />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = QrcodePopup;
