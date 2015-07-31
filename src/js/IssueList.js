var React = require('react'),
  IssueItem = require('./IssueItem');

var IssueList = React.createClass({
  render: function() {
    var issues = this.props.data.map(function(item, idx) {
      var alternate = idx % 2 ? 'odd' : 'even';
      return <IssueItem data={item} key={idx} alternate={alternate}/>;
    });
    return (
      <div className='issue-list-container'>
        {issues}
      </div>
    );
  }
});

module.exports = IssueList;