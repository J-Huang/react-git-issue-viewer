var React = require('react'),
  $ = require('jquery'),
  IssueViewer = require('./IssueViewer.js'),
  Pagination = require('./Pagination'),
  util = require('./util');

var page = parseInt(util.getParameterByName('page')) || 1;
$.get(util.getListUrl(page)).then(function(response, status, xhr) {
  //find the total page number
  var links = xhr.getResponseHeader('Link').split(',');
  var lastLink, lastLinkUri, totalPage;
  if (links && links.length > 0) {
    lastLink = $.grep(links, function(link) {
      return link.indexOf('rel="last"') > -1;
    })[0];
    if (!lastLink) {
      //meaning rel last doesn't exist, imply this is the last page
      totalPage = page;
    } else {
      lastLinkUri = lastLink.split(';')[0];
      totalPage = parseInt(util.getParameterByName('page', lastLinkUri.split('?')[1]));
    }
  }
  React.render(<IssueViewer data={response} />, document.getElementById('container'));
  React.render(<Pagination currentPage={page} totalPage={totalPage} />, document.getElementsByClassName('footer-container')[0]);
});