jest.dontMock('../IssueItem.js');

describe('util', function() {
  // issue item, pass props, test if it renders number/title/label
  // summary/avatar/name is from Comment component. should test there.
  it('test IssueItem component', function() {
    // test data https://api.github.com/repos/npm/npm/issues/9067
    var data = {
  "url": "https://api.github.com/repos/npm/npm/issues/9067",
  "labels_url": "https://api.github.com/repos/npm/npm/issues/9067/labels{/name}",
  "comments_url": "https://api.github.com/repos/npm/npm/issues/9067/comments",
  "events_url": "https://api.github.com/repos/npm/npm/issues/9067/events",
  "html_url": "https://github.com/npm/npm/issues/9067",
  "id": 97302283,
  "number": 9067,
  "title": "Can't install anything",
  "user": {
    "login": "gabri3l3onardo",
    "id": 5522825,
    "avatar_url": "https://avatars.githubusercontent.com/u/5522825?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/gabri3l3onardo",
    "html_url": "https://github.com/gabri3l3onardo",
    "followers_url": "https://api.github.com/users/gabri3l3onardo/followers",
    "following_url": "https://api.github.com/users/gabri3l3onardo/following{/other_user}",
    "gists_url": "https://api.github.com/users/gabri3l3onardo/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/gabri3l3onardo/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/gabri3l3onardo/subscriptions",
    "organizations_url": "https://api.github.com/users/gabri3l3onardo/orgs",
    "repos_url": "https://api.github.com/users/gabri3l3onardo/repos",
    "events_url": "https://api.github.com/users/gabri3l3onardo/events{/privacy}",
    "received_events_url": "https://api.github.com/users/gabri3l3onardo/received_events",
    "type": "User",
    "site_admin": false
  },
  "labels": [
    {
      "url": "https://api.github.com/repos/npm/npm/labels/support",
      "name": "support",
      "color": "FF91AF"
    },
    {
      "url": "https://api.github.com/repos/npm/npm/labels/windows",
      "name": "windows",
      "color": "0b02e1"
    }
  ],
  "state": "open",
  "locked": false,
  "assignee": null,
  "milestone": null,
  "comments": 1,
  "created_at": "2015-07-26T09:28:11Z",
  "updated_at": "2015-07-27T05:04:31Z",
  "closed_at": null,
  "body": "```\r\nC:\\....>npm install -g ember-cli\r\nnpm ERR! Windows_NT 6.1.7601\r\nnpm ERR! argv \"node\" \"C:\\\\......\\\\npm\\\\node_modules\\\\npm\\\\bin\\\\npm-cli.js\" \"install\" \"-g\" \"ember-cli\"\r\nnpm ERR! node v0.12.7\r\nnpm ERR! npm  v2.13.3\r\nnpm ERR! code EADDRINUSE\r\nnpm ERR! errno EADDRINUSE\r\nnpm ERR! syscall connect\r\n\r\nnpm ERR! connect EADDRINUSE\r\n```",
  "closed_by": null
};
    var $ = require('jquery');
    var React = require('react/addons');
    var IssueItem = require('../IssueItem');
    var TestUtils = React.addons.TestUtils;
    var issueItem = TestUtils.renderIntoDocument(
      <IssueItem data={data} key={1} alternate={'even'}/>
    );
    // number and title
    var numberTitle = TestUtils.findRenderedDOMComponentWithClass(issueItem, 'issue-title');
    expect(numberTitle.getDOMNode().textContent).toEqual("#9067  Can't install anything");
    // labels, it has 2 labels for this case, one is support, another one is windows
    var labels = TestUtils.scryRenderedDOMComponentsWithClass(issueItem, 'issue-label');
    expect(labels[0].getDOMNode().textContent).toEqual("support");
    expect(labels[1].getDOMNode().textContent).toEqual("windows");
  });
});

