define(function(require){
  var React = require('react');
  var ReactDom = require('react-dom');
  var mat = require('materialize');

  var Router = require('react-router').Router;
  var Route = require('react-router').Route;
  var Link = require('react-router').Link;
  var browserHistory = require('react-router').browserHistory;
  var CSSTransitionGroup = React.addons.CSSTransitionGroup;

  var Page = React.createClass({
    getInitialState: function(){
      return {
        title: "",
        content: ""
      }
    },
    componentWillMount: function(){
    },
    render: function(){
      return (
        <div className="pageContainer">
          <div className="container">
            <div className="row">
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{this.props.posts[this.props.route].post_title}</span>
                    <section className="slideIn"><div dangerouslySetInnerHTML={{__html: this.props.posts[this.props.route].post_content}} /></section>
                  </div>
                  <div className="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  });

  var Home = React.createClass({
    getInitialState: function(){
      return {
        formState: 'ready'
      }
    },
    componentWillMount: function(){
    },
    componentDidMount: function(){
      $('.parallax').parallax();
      FB.XFBML.parse()
    },
    componentDidUpdate: function(){
      $('.parallax').parallax();
      $('label.accord-header').click(function(){
        if(!$(this).children('.accord-header')[0].checked){
          $(this).css({'background-color' : '#fb941b'});
        } else {
          $(this).css({'background-color' : '#35bdef'});
        }
      });
      FB.XFBML.parse()
    },
    animationEnded: function(){
    },
    submitHandler: function(e){
      e.preventDefault();
      this.setState({formState: "submitting"})
      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "formsub", email: e.target.email.value, name: e.target.name.value, phone: e.target.phone.value},
        dataType: 'json',
        success: function(s){
          this.setState({formState: "done"});
        }.bind(this),
        error: function(e){
          console.log(e);
          this.setState({formState: "done"});
        }.bind(this)
      });

    },
    signupFormClass: function(){
      return "z-depth-3 signup-form " + this.state.formState;
    },
    signupFormBackClass: function(){
      return "z-depth-3 signup-form-back " + this.state.formState;
    },
    findPost: function(post) {
      return post.post_id === this.props.posts[this.props.route].ID;
    },
    render: function(){
      var _this = this;

      /*var fadeOut = function(){
        if(_this.props.visible){
          return "parallax-body fade-in"
        } else {
          return "parallax-body fade-out"
        }
      }*/
      var renderPageHeader = function(){
        if(_this.props.route !== 0){
          return <h5 className="page-title"><span className="owp-orange">O</span><span className="owp-blue">W</span><span className="owp-green">P</span> | {_this.props.posts[_this.props.route].post_title}</h5>
        }
      }
      return (
        <div onAnimationEnd={this.animationEnded()}>
          <div className="parallax-container">
            <div className="parallax"><img src={rootDir + "/images/" + this.props.images.find(this.findPost).meta_value} /></div>
            <div className="container">
              <div className="row">
                <div className="col l4 m6 s12 offset-l8 offset-m6">
                  <form className={this.signupFormClass()} onSubmit={this.submitHandler}>
                    <h3 className="z-depth-1">REGISTRATION FORM</h3>
                    <div className="input-field">
                      <input type="text" name="name" id="name" required />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                      <input type="number" id="phone" name="phone" required />
                      <label htmlFor="phone">Phone</label>
                    </div>
                    <div className="input-field">
                      <input type="email" id="email" name="email" required />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="bot-filter">
                      <input type="checkbox" id="bot-filter" name="bots" />
                      <label htmlFor="bots">Please check this box to ensure that you are not a robot.</label>
                    </div>
                    <label className="warning">By submitting this form I allow OWP to contact me to arrange a consultation for aquiring my OMMP Card at the OWP Local Portland Medical Office</label>
                    <input type="submit" className="waves-effect waves-light btn" value="Submit" />
                  </form>
                </div>
                <div className="col l4 m6 s12 offset-l8 offset-m6">
                  <div className={this.signupFormBackClass()}>
                    <h3 className="white-text">THANK YOU</h3>
                    <p>Now click the appointment button below to reserve your time desired.</p>
                    <a href="https://www.genbook.com/bookings/slot/reservation/30344723?bookingSourceId=1000" target="_blank"><img src="https://www.genbook.com/bookings/images/booknow/orange-reverse-large.png" width="150" height="50" alt="Make an Online Appointment" border="0"/></a>
                    <p>An OWP Representative will contact you shortly to confirm you appointment and further information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section white">
            <div className="row container">
              {renderPageHeader()}
              <div className="grey-text text-darken-3 lighten-3"><div className="animatedContent" dangerouslySetInnerHTML={{__html: this.props.posts[this.props.route].post_content}} /></div>
            </div>
          </div>
        </div>
      );
    }
  });

  var Body = React.createClass({
    getInitialState: function() {
      return {
        posts: [
          {
            ID: 1,
            post_title: "",
            post_content: "",
          },
          {
            post_title: "",
            post_content: ""
          },
          {
            post_title: "",
            post_content: ""
          },
          {
            post_title: "",
            post_content: ""
          }
        ],
        images: [
          {
            meta_value: "owp_home_one_NEW.jpg",
            post_id: 1
          }
        ],
        route: 0
      };
    },
    componentDidMount: function(){
      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "all"},
        dataType: 'json',
        success: function(s){
          var results = this.sortByKey(s, "menu_order");
          console.log(s);
          this.setState({
            posts: results,
            route: this.props.route
          });
        }.bind(this)
      });
      $.ajax(rootDir + "/ajax-listener.php", {
        method: 'POST',
        data: {request: "getimages"},
        dataType: 'json',
        success: function(s){
          this.setState({
            images: s
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
    componentWillUnmount: function(){
      console.log("unmounting");
    },
    render: function(){
      var _this = this;
      /*var renderHome = function(){
        var isVisible = true;
        if(_this.props.route == 0){
          isVisible = true;
        } else {
          isVisible = false;
        }
        return(<Home key="home" posts={_this.state.posts} visible={isVisible}/>);
      }
      var renderPage = function(){
        if(_this.props.route > 0){
          return(<Page key={_this.state.route} route={_this.props.route} posts={_this.state.posts} />);
        } else {
          return(<div></div>);
        }
      }*/
      return (
        <CSSTransitionGroup transitionName="example" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <div>
            <Home key="home" posts={_this.state.posts} route={_this.props.route} images={_this.state.images}/>
          </div>
        </CSSTransitionGroup>
      )
    }
  });

  return Body;
});
