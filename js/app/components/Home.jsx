define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');
  var mat = require('materialize');

  var Header = require('jsx!app/components/header');

  var Footer = require('jsx!app/components/footer');

  var Home = React.createClass({
    getInitialState: function() {
      return {
        posts: [
          {
            post_title: "",
            post_content: ""
          }
        ]
      };
    },
    componentDidMount: function(){
      $('.parallax').parallax();

      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "pages"},
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
    renderHome: function(){
      return (
          <div className="parallax-body">
            <div className="parallax-container">
              <div className="parallax"><img src={rootDir + "/images/parallax1.jpg"} /></div>
            </div>
            <div className="section white">
              <div className="row container">
                <h2 className="header">{this.state.posts[0].post_title}</h2>
                <p className="grey-text text-darken-3 lighten-3"><div dangerouslySetInnerHTML={{__html: this.state.posts[0].post_content}} /></p>
              </div>
            </div>
            <div className="parallax-container">
              <div className="parallax"><img src={rootDir + "/images/parallax2.jpg"} /></div>
            </div>
          </div>
      );
    },
    renderPage: function(){
      for(var i = 0; i < this.props.posts.length; ++i){
        var title = locationEnd.replace("%20", " ");
        if(this.props.posts[i].post_title == title){
          this.setState({
            title: this.props.posts[i].post_title,
            content: this.props.posts[i].post_content,
            loaded: true
          });
        }
      }
      return (
        <div className="container" key={locationEnd}>
          <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{this.state.title}</span>
                  <p>{this.state.content}</p>
                </div>
                <div className="card-action">
                  <a href="#">This is a link</a>
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    render: function(){
      if(this.state.route == "Home"){
        return (
          {renderHome}
        );
      } else {
        return (
          {renderPage}
        )
      }
    }
  });

  return Home;
});
