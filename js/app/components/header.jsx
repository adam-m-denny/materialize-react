define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');
  var mat = require('materialize');
  var Hammer = require('hammerjs');

  var Header = React.createClass({
    getInitialState: function() {
      return {
        posts: []
      };
    },
    componentDidMount: function(){
      $(".button-collapse").sideNav();
      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "titles"},
        dataType: 'json',
        success: function(s){
          var results = this.sortByKey(s, "menu_order");;
          this.setState({
            posts: results
          });
        }.bind(this)
      });
    },
    sortByKey: function(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    },
    scrollToTop: function(){
      var currentY = window.scrollY;
      var _this = this;
      window.scrollTo(0, window.scrollY * 0.75);
      if(currentY > 1){
        window.requestAnimationFrame(_this.scrollToTop);
      }
    },
    linkClick: function(e){
      e.preventDefault();
      $('.button-collapse').sideNav('hide');
      $('body').trigger('click');
      this.props.routeHandler(e.target.id);
      this.scrollToTop();
    },
    render: function(){
      var navLinks = [];
      for(var i = 0; i < this.state.posts.length; ++i){
        navLinks.push(<li key={i}><a id={i} onClick={this.linkClick}>{this.state.posts[i].post_title}</a></li>);
      }

      return (
        <nav className="white">
          <div className="nav-wrapper white black-text container">
            <a href="#!" style={{width: 0}} className="brand-logo black-text"><img src="./wp-content/themes/materialize-react/images/OWPLogo.svg" /></a>
            <a href="#" data-activates="mobile-demo" className="button-collapse black-text"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              {navLinks}
              <li className="social"><a href="https://www.facebook.com/owppdx/"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li className="social"><a href="https://www.instagram.com/owpnow/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              {navLinks}
            </ul>
          </div>

        </nav>
      );
    }
  });

  return Header;
});
