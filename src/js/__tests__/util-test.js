jest.dontMock('../util.js');
jest.dontMock('jquery');

describe('util', function() {
  // getParameterByName
  // getSummary
  // processContent
  it('test util functions', function() {
    var $ = require('jquery');
    var util = require('../util');
    // getParameterByName
    expect(util.getParameterByName('page', 'http://localhost:9003/?page=4')).toBe('4');
    expect(util.getParameterByName('page', 'http://localhost:9003/?page=4&per_page=6')).toBe('4');
    // getSummary
    var comment = "Fixing now.\r\n\r\n**EDIT**: Fixed. After re-reading the test more closely, it looks like this was the originally intended functionality, and a corner was cut somewhere to simply sort everything.\r\n\r\n// @sindresorhus ";
    expect(util.getSummary(comment)).toBe('Fixing now.  **EDIT**: Fixed. After re-reading the test more closely, it looks like this was the originally intended functionality, and a...');
    // processContent
    // data from https://api.github.com/repos/npm/npm/issues/9068/comments
    var callback = function(response){
    	expect(response).toContain('https://github.com/sindresorhus');
    	//console.log('ssss');
    };
    util.processContent(comment, null, callback);

    // expect($.ajax).toBeCalledWith({
    //   type: 'GET',
    //   url: 'https://github.com/sindresorhus',
    //   success: jasmine.any(Function)
    // });

  });
});

