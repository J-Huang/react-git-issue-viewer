var React = require('react'),
  Comment = require('./Comment'),
  util = require('./util');

var IssueItem = React.createClass({
  render: function() {
    var issueDetailUrl = './detail.html?number=' + this.props.data.number;
    var labels = this.props.data.labels.map(function(label, idx) {
      return (
        <a className='label-link' href={util.baseUrl + 'labels/' + label.name} key={'labelLink' + idx}>
          <span className='label issue-label' style={{backgroundColor: '#' + label.color}} key={'labelSpan' + idx}>{label.name}</span>
        </a>
      );
    });
    var commentsNum = this.props.data.comments ? <a href={issueDetailUrl}><span className='comments-number fa fa-comments-o'>{this.props.data.comments}</span></a> : '';
    return (
      <li className={'issue-list ' + this.props.alternate}>
        <a href={issueDetailUrl}>
          <span className='issue-title'>{'#' + this.props.data.number + '  ' + this.props.data.title}</span>
        </a>
        {labels}
        {commentsNum}
        <Comment data={this.props.data} summaryMode={true} />
      </li>
    );
  }
});

module.exports = IssueItem;