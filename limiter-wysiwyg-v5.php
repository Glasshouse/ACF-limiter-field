<?php		

class acf_field_wysiwyg_limited {
	
	
	function __construct()
	{
        add_action( "acf/render_field_settings/type=wysiwyg",	array($this, 'render_field_settings'), 11, 1 );
        add_filter( "acf/render_field/type=wysiwyg", array($this, 'render_field'), 11, 1 );
        add_action( "admin_enqueue_scripts" , array( $this, 'input_admin_enqueue_scripts'));
    }

    public function render_field_settings( $field )
    {
        // default_value
		acf_render_field_setting( $field, array(
			'label'			=> __('Number of characters', 'acf'),
			'instructions'	=> __('Leave blank for unlimited characters', 'acf'),
			'type'			=> 'text',
			'name'			=> 'character_number'
		));
        add_action( "acf/render_field_settings/type=wysiwyg",	array($this, 'render_field_settings'), 11, 1 );
    }
    
	function render_field( $field )
	{
        echo "<div id='progressbar-{$field['id']}' class='progressBar' style='margin-top: 5px;' data-characterlimit='{$field['character_number']}'></div>";
		echo "<div class='progressText'></div>";
	}
	
	
	function input_admin_enqueue_scripts()
	{

        $dir = plugins_url('', __FILE__);
		
		// register acf scripts
		wp_register_script( 'acf-wysiwyg-limiter', $dir . '/js/wysiwyg_limiter_v5.js', array('acf-input') );
		
		wp_register_style( 'jquery-ui-progressbar.min', $dir . '/css/jquery-ui-progressbar.min.css', array('acf-input') );
		
		//jquery-ui-progressbar
		wp_enqueue_script( 'jquery-ui-progressbar');
		
		// scripts
		wp_enqueue_script('acf-wysiwyg-limiter');

		// styles
		wp_enqueue_style('jquery-ui-progressbar.min');

		
	}	
	
}


new acf_field_wysiwyg_limited();

?>