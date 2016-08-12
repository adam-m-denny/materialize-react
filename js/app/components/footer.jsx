define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');

  var Footer = React.createClass({
    getInitialState: function() {
      return {
        posts: []
      };
    },
    componentDidMount: function(){
      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "footer"},
        dataType: 'json',
        success: function(s){
          var results = this.sortByKey(s, "menu_order");
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
      var footerNavLinks = [];
      for(var i = 0; i < this.state.posts.length; ++i){
        footerNavLinks.push(<li key={i}><a className="grey-text text-darken-3" id={i} onClick={this.linkClick}>{this.state.posts[i].post_title}</a></li>);
        //console.log(footerNavLinks);
      }
      return (
        <footer className="page-footer white">
           <div className="container">
             <div className="row">
               <hr />
               <div className="col l6 s12">
                 <h5 className="black-text"><span className="owp-orange">O</span><span className="owp-blue">W</span><span className="owp-green">P</span> <span className="owp-orange">Oregon</span> <span className="owp-blue">Wellness</span> <span className="owp-green">Partners</span></h5>
                 <p className="grey-text text-darken-4">All Rights Reserved</p>
               </div>
               <div className="col l6 s12">
                 <ul>
                  {footerNavLinks}
                 </ul>
               </div>
             </div>
           </div>
           <div className="footer-copyright blue-copyright">
             <div className="container">
             © 2016 Copyright OWP
             </div>
           </div>
         </footer>
      );
    }
  });

  return Footer;
});
