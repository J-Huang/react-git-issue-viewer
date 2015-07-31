var React = require('react'),
  IssueList = require('./IssueList.js');

var IssueViewer = React.createClass({
  render: function() {
    return (
      <div className='issue-viewer'>
        <IssueList data={this.props.data} />
      </div>
    );
  }
});

module.exports = IssueViewer;