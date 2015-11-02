acf.add_filter('wysiwyg_tinymce_settings', function( mceInit, id ){

	// do something to mceInit
//	console.log(mceInit, id);

    var timer = 0;

    mceInit.setup = function(ed) {
        ed.on( 'init', function( e ) {
            loadrepeater( this );
        });

        ed.on( 'keydown', function( e ) {
            var self = this;
            clearTimeout(timer);
            timer = setTimeout(function(){
                repeater( self );
            }, 50);
        });

        ed.on( 'keyup', function( e ) {
            var self = this;
            clearTimeout(timer);
            timer = setTimeout(function(){
                repeater( self );
            }, 50);
        });
    }

	// return
	return mceInit;

});

var loadrepeater = function ( ed ) {
		
    if(ed.id != "content"){

        var edWrapper = jQuery(ed.editorContainer).closest('.wp-editor-wrap');
        var progressBar = edWrapper.next(".progressBar");

		ed.characterLimit = progressBar.data('characterlimit');
	    
	    if(ed.characterLimit != "") {
			var text = ed.getContent();
            cnt_cur = text.replace(/<\/?[^>]+(>|$)/g,""); // strip html tags
            cnt_cur = jQuery('<textarea />').html(cnt_cur).text(); // decode html entities
		    
//		    alert(jQuery(ed.editorDomLocation).next(".progressBar").data('characterlimit'));
		    
		    percentage = Math.floor((cnt_cur.length / ed.characterLimit)*100);
		    //alert(percentage);
	
		    jQuery( progressBar ).progressbar({
                value: percentage
		    });

            if (cnt_cur.length > ed.characterLimit) {
                progressBar.children('div').css({ 'background': 'Red' });
                edWrapper.next().next(".progressText").html( 'Vous avez dépassé le nombre de caractères autorisés: ' + cnt_cur.length + "/" + ed.characterLimit);
            }
            else {
                progressBar.children('div').css({ 'background': 'LightGreen' });
                edWrapper.next().next(".progressText").html( 'Nombre de caractères restants: '+(Math.max(0, ed.characterLimit - cnt_cur.length)) + "/" + ed.characterLimit);
            }
		    
	    }
		
		
	}

}

var repeater = function ( ed ) {

	if (ed.characterLimit != ""){


        var text = '';

		if ( tinymce.activeEditor )
			text = tinymce.activeEditor.getContent();    
	    
		console.log(text.length);
		
		cnt_cur = text.replace(/<\/?[^>]+(>|$)/g,""); // strip html tags
        cnt_cur = jQuery('<textarea />').html(cnt_cur).text(); // decode html entities
		
		console.log(cnt_cur.length);
        
		//alert(targetId);
//	    if(ed.editorId != "content"){
//
//	    	if(e.type == 'keydown'){
//			//}
//			//alert(browserIsIE);
//
//			//alert(text);
//				if(cnt_cur.length <= ed.characterLimit){
//					ed.TESTval = text;
//				}
//			}else{
//
//				if(text != ed.TESTval){
//					if(cnt_cur.length > ed.characterLimit){
//						var bookmark = ed.selection.getBookmark(2, true);
//						ed.setContent(ed.TESTval);
//						ed.selection.moveToBookmark(bookmark);
//
//
//
//					}
//				}
//			}
//		}

        var edWrapper = jQuery(ed.editorContainer).closest('.wp-editor-wrap');
        var progressBar = edWrapper.next(".progressBar");

	    percentage = Math.floor((cnt_cur.length / ed.characterLimit)*100);
        //alert(percentage);
	
        jQuery( progressBar ).progressbar({
            value: percentage
        });

        if (cnt_cur.length > ed.characterLimit) {
            progressBar.children('div').css({ 'background': 'Red' });
            edWrapper.next().next(".progressText").html( 'Vous avez dépassé le nombre de caractères autorisés: ' + cnt_cur.length + "/" + ed.characterLimit);
        }
        else {
            progressBar.children('div').css({ 'background': 'LightGreen' });
            edWrapper.next().next(".progressText").html( 'Nombre de caractères restants: '+(Math.max(0, ed.characterLimit - cnt_cur.length)) + "/" + ed.characterLimit);
        }
    
    }
}
