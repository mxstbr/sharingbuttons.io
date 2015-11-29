var GeneratorPreview = React.createClass({
  render: function() {
    return(
      <div className="generator__preview">
        <div className="generator__preview-page">
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-fake-text" />
          <div className="generator__preview-button-wrapper">
            { this.props.previewButtons }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = GeneratorPreview;
