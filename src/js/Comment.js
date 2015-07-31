var React = require('react'),
  marked = require('marked'),
  util = require('./util');

var Comment = React.createClass({
  processContent: function(content) {
    util.processContent(content, {
      summaryMode: this.props.summaryMode
    }, function(response) {
      this.setState({
        body: response
      });
    }.bind(this));
  },

  getInitialState: function() {
    // since the passed props.data has not been processed yet, cannot show it right away
    return {
      body: ''
    };
  },

  componentDidMount: function() {
    this.processContent(this.props.data.body);
  },

  componentWillReceiveProps: function(nextProps) {
    this.processContent(this.props.data.body);
  },

  render: function() {
    //for summary mode, don't do markdown
    var formmattedTime = (new Date(this.props.data.created_at)).toLocaleString().replace(', ', '@');
    return (
      <div className='comments-container'>
      <a className='avatar-container' href={this.props.data.user.html_url}><img src={this.props.data.user.avatar_url + '&s=48'} className={'avatar'} /></a>
      <a href={this.props.data.user.html_url}><span className='user-name'>{this.props.data.user.login}</span></a>
      <span className='create-time'>{'said at ' + formmattedTime}</span>
      <div className='caret comment-caret'></div>
      <div className="comment-content" dangerouslySetInnerHTML={{__html: this.props.summaryMode? this.state.body: marked(this.state.body, {breaks: true})}}/>
      </div>
    );
  }
});

module.exports = Comment;