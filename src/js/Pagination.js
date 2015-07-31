var React = require('react');

var Pagination = React.createClass({
  generatePaging: function(page, key) {
    var pageLink;
    if (!page) {
      // if page is not provided, If assigning key here, it will cause conflicts.
      pageLink = <li className={'page-link disabled'}><a href='#'>{'...'}</a></li>;
    } else {
      pageLink = <li className={'page-link'} key={page}><a href='#' onClick={this.onPage} value={page}>{page}</a></li>;
    }
    //highlight current page link
    if (this.props.currentPage == page) {
      pageLink.props.className += ' active';
    }
    return pageLink;
  },

  generatePagings: function() {
    var i, pageLis = new Array(9),
      current = this.props.currentPage,
      last = this.props.totalPage,
      secondLast = this.props.totalPage - 1;
    for (i = 0; i <= 1; i++) {
      pageLis[i] = this.generatePaging(i + 1);
    }
    for (i = 2; i <= 6; i++) {
      //assign ellipsis initially
      pageLis[i] = this.generatePaging(null, i + 1);
    }
    pageLis[7] = this.generatePaging(secondLast);
    pageLis[8] = this.generatePaging(last);

    if (current < 5) {
      //two ellipsis <li> tags before the last two
      for (i = 2; i <= 4; i++) {
        pageLis[i] = this.generatePaging(i + 1);
      }
    } else if (this.props.currentPage < this.props.totalPage - 3) {
      //one ellpisis at the start, one at the near end
      for (i = 3; i <= 5; i++) {
        pageLis[i] = this.generatePaging(current - 4 + i);
      }
    } else {
      //two ellipsis at the near start
      for (i = 4; i <= 6; i++) {
        pageLis[i] = this.generatePaging(last - 8 + i);
      }
    }

    return pageLis;
  },

  goPage: function(page) {
    window.location.href = [location.protocol, '//', location.host, location.pathname].join('') + '?page=' + page;
  },

  onNext: function(e) {
    e.preventDefault();
    this.goPage(this.props.currentPage + 1);
  },

  onPrevious: function(e) {
    e.preventDefault();
    this.goPage(this.props.currentPage - 1);
  },

  onPage: function(e) {
    e.preventDefault();
    this.goPage(e.target.getAttribute('value'));
  },

  getInitialState: function() {
    return {
      previousClass: 'enabled'
    };
  },

  componentWillMount: function() {
    this.previousClass = this.props.currentPage == 1 ? 'disabled' : 'enabled';
    this.lastClass = this.props.currentPage == this.props.totalPage ? 'disabled' : 'enabled';
  },

  render: function() {
    var pageLis = this.generatePagings();
    //highlight the current page
    //this.refs[current].className += ' highlight';
    return (
      <div className='pagination-container'>
            <ul className="pagination pagination-lg pager issue-pagination">
              <li className={'page-link ' + this.previousClass}><a href='#' onClick={this.previousClass == 'disabled' ? '' : this.onPrevious}>Previous</a></li>
              {pageLis}
              <li className={'page-link ' + this.lastClass}><a href='#' onClick={this.lastClass == 'disabled' ? '' : this.onNext}>Next</a></li>
            </ul>
            </div>
    );
  }
});

module.exports = Pagination;