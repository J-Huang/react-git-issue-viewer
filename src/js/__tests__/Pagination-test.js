jest.dontMock('../Pagination.js');

describe('util', function() {
  // render find ellipsis button in correct places
  it('test Pagination component', function() {
    var $ = require('jquery');
    var React = require('react/addons');
    var Pagination = require('../Pagination');
    var TestUtils = React.addons.TestUtils;
    var pagination = TestUtils.renderIntoDocument(
      <Pagination currentPage={5} totalPage={45} />
    );
    // for this case page 3 and page 7 should be disabled
    var links = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    var thirdOneClass = links[3].getDOMNode().getAttribute('class');
    var sevenOneClass = links[7].getDOMNode().getAttribute('class');
    expect(thirdOneClass.indexOf('disabled')).toBeGreaterThan(-1);
    expect(sevenOneClass.indexOf('disabled')).toBeGreaterThan(-1);

    // current page is 1
    pagination = TestUtils.renderIntoDocument(
      <Pagination currentPage={1} totalPage={45} />
    );
    links = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    // if current page is 1, previous link should be disabled
    var previousClass = links[0].getDOMNode().getAttribute('class');
    expect(sevenOneClass.indexOf('disabled')).toBeGreaterThan(-1);

    // current page is 45
    pagination = TestUtils.renderIntoDocument(
      <Pagination currentPage={45} totalPage={45} />
    );
    links = TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'li');
    // if current page is the last, next link should be disabled
    var nextClass = links[10].getDOMNode().getAttribute('class');
    expect(nextClass.indexOf('disabled')).toBeGreaterThan(-1);

  });
});

