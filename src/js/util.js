var $ = require('jquery');

var util = {
  //github api only allow 60 requests per hour. Have to use oauth
  oauth: '?client_id=9150269703ea090baf7a&client_secret=18cc4eb0a4c649c66ae79191e57e93b2c698a057',
  baseUrl: 'https://github.com/npm/npm/',
  listUrl: 'https://api.github.com/repos/npm/npm/issues',
  fetchedNames: {},

  //according to github, 
  //Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen
  //regex /\B@(?!.*(-){2,}.*)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\b/ig
  //However, the matched word doesn't necessarily mean such a user exist. It could be a name which is valid, but no one registered yet.
  //call user search API to verify
  //#1234 can be processed the same way to link to the referenced issue
  processContent: function(content, params, callback) {
    if (params && params.summaryMode) {
      //only show first 140 characters
      content = this.getSummary(content);
    }
    //process name links
    var userNameRegex = /\B@(?!.*(-){2,}.*)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?\b/ig,
      matches = content.match(userNameRegex),
      deferreds = [];
    if (matches && matches.length > 0) {
      $.each(matches, function(idx, match) {
        var name = match.split('@')[1].trim();
        //memoizate the fetched user name to save unnecessary ajax calls
        if (!this.fetchedNames[name] && name != 'username') {
          deferreds.push($.get('https://api.github.com/users/' + name + this.oauth, function(response) {
            if (!response.message || !response.message === 'Not Found') {
              this.fetchedNames[name] = '<a href="' + response.html_url + '">' + match + '</a>';
            }
          }.bind(this)));
        }
      }.bind(this));
    }
    //after all names having been verified, call the callback
    $.when.apply($, deferreds).then(function() {
      var result = content.replace(userNameRegex, function(match) {
        var name = match.split('@')[1].trim();
        return this.fetchedNames[name];
      }.bind(this));
      callback(result);
    }.bind(this));
  },

  // truncate 140 characters.
  getSummary: function(content, length) {
    length = length || 140;
    if (content.length <= 140) {
      return content;
    }
    content = $.trim(content).substring(0, 140).replace(/\r\n/g, ' ').split(" ").slice(0, -1).join(" ");

    //recursively remove non-alph-numeric character if it's at the end
    var removeNonAlNu = function(s) {
      var lastC = s[s.length - 1];
      if (/\W/.test(lastC) || lastC == '_') {
        s = s.substring(0, s.length - 2);
        s = removeNonAlNu(s);
      }
      return s;
    };
    content = removeNonAlNu(content);
    return content + "...";
  },

  getListUrl: function(page) {
    return this.listUrl + this.oauth + '&per_page=25&page=' + page;
  },

  getIssueUrl: function(number) {
    return this.listUrl + '/' + number + this.oauth;
  },

  //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  getParameterByName: function(name, queryStr) {
    queryStr = queryStr || window.location.search;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(queryStr);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
};

module.exports = util;