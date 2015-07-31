var React = require('react'),
  $ = require('jquery'),
  Comment = require('./Comment'),
  util = require('./util');

var DetailViewer = React.createClass({
  loadComments: function(url) {
    //fetch comments
    $.ajax({
      url: url + util.oauth,
      dataType: 'json',
      cache: false,
      success: function(comments) {
        if (this.isMounted()) {
          this.setState({
            comments: comments
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(data.comments_url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {
      comments: [],
      summary: ''
    };
  },

  componentDidMount: function() {
    if (this.props.data.comments > 0) {
      this.loadComments(this.props.data.comments_url);
    }
  },

  render: function() {
    var comments = this.state.comments.map(function(comment, idx) {
      return <Comment data={comment} key={idx}/>;
    });
    renderer = (
      <div className='detail-viewer'>
          <Comment data={this.props.data} />
          {comments}
      </div>
    );
    return renderer;
  }
});

module.exports = DetailViewer;