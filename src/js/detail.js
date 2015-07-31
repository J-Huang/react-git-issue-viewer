var React = require('react'),
  DetailViewer = require('./DetailViewer.js'),
  $ = require('jquery'),
  util = require('./util');

var number = util.getParameterByName('number');
//good practice, only call React.render when the data is ready.
//otherwise, it will show blank content for a while. Or, have to put a spin animation
$.get(util.getIssueUrl(number), function(data) {
  var labels = data.labels.map(function(label) {
    return (
      <a className='label-link' href={util.baseUrl + 'labels/' + label.name}>
          <span className='label issue-label' style={{backgroundColor: '#' + label.color}}>{label.name}</span>
        </a>
    );
  });
  var stateClass = data.state == 'open' ? 'label-primary' : 'label-default';
  React.render(
    <div>
      <span className={'label issue-state ' + stateClass}>{data.state}</span>
    <span className='issue-title'>{data.title}</span>
        {labels}
      </div>, document.getElementsByClassName('title-container')[0]);
  React.render(<DetailViewer data={data}/>, document.getElementById('container'));
});