<?php
add_action( 'after_setup_theme', 'materializeReact_setup' );
function materializeReact_setup()
{
load_theme_textdomain( 'materializeReact', get_template_directory() . '/languages' );
add_theme_support( 'title-tag' );
add_theme_support( 'automatic-feed-links' );
add_theme_support( 'post-thumbnails' );
global $content_width;
if ( ! isset( $content_width ) ) $content_width = 640;
register_nav_menus(
array( 'main-menu' => __( 'Main Menu', 'materializeReact' ) )
);
}
add_action( 'wp_enqueue_scripts', 'materializeReact_load_scripts' );
function materializeReact_load_scripts()
{
wp_enqueue_script( 'jquery' );
}
add_action( 'comment_form_before', 'materializeReact_enqueue_comment_reply_script' );
function materializeReact_enqueue_comment_reply_script()
{
if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}
add_filter( 'the_title', 'materializeReact_title' );
function materializeReact_title( $title ) {
if ( $title == '' ) {
return '&rarr;';
} else {
return $title;
}
}
add_filter( 'wp_title', 'materializeReact_filter_wp_title' );
function materializeReact_filter_wp_title( $title )
{
return $title . esc_attr( get_bloginfo( 'name' ) );
}
add_action( 'widgets_init', 'materializeReact_widgets_init' );
function materializeReact_widgets_init()
{
register_sidebar( array (
'name' => __( 'Sidebar Widget Area', 'materializeReact' ),
'id' => 'primary-widget-area',
'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
'after_widget' => "</li>",
'before_title' => '<h3 class="widget-title">',
'after_title' => '</h3>',
) );
}
function materializeReact_custom_pings( $comment )
{
$GLOBALS['comment'] = $comment;
?>
<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
<?php
}
add_filter( 'get_comments_number', 'materializeReact_comments_number' );
function materializeReact_comments_number( $count )
{
if ( !is_admin() ) {
global $id;
$comments_by_type = &separate_comments( get_comments( 'status=approve&post_id=' . $id ) );
return count( $comments_by_type['comment'] );
} else {
return $count;
}
}

function enqueue_scripts_styles_init() {
	wp_enqueue_script( 'ajax-script', get_stylesheet_directory_uri().'/js/script.js', array('jquery'), 1.0 ); // jQuery will be included automatically
	// get_template_directory_uri() . '/js/script.js'; // Inside a parent theme
	// get_stylesheet_directory_uri() . '/js/script.js'; // Inside a child theme
	// plugins_url( '/js/script.js', __FILE__ ); // Inside a plugin
	wp_localize_script( 'ajax-script', 'ajax_object', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) ); // setting ajaxurl
}
add_action('init', 'enqueue_scripts_styles_init');

function ajax_action_stuff() {
	$post_id = $_POST['post_id']; // getting variables from ajax post
	// doing ajax stuff
	update_post_meta($post_id, 'post_key', 'meta_value');
	echo 'ajax submitted';
	die(); // stop executing script
}
add_action( 'wp_ajax_ajax_action', 'ajax_action_stuff' ); // ajax for logged in users
add_action( 'wp_ajax_nopriv_ajax_action', 'ajax_action_stuff' ); // ajax for not logged in users
?>
