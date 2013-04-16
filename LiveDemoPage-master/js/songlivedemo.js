jwplayer("myElement").setup({
			flashplayer: "jwplayer/jwplayer.flash.swf",
			height: 25,
			width: 300,
			controlbar: 'bottom',
			file: "http://a1408.phobos.apple.com/us/r1000/072/Music/v4/9c/21/ac/9c21acdc-d27f-b2a9-608c-ba23ba69656c/mzaf_8319555658010985424.aac.m4a"
		});


var first_search = true;
var adds_remaining = 3;
	$(document).ready(function() {
			
		$('#live_demo_part_2_start').show();
		
		
		$('#live_demo_start_button').click(function(event){
			$("#hotspot-59").hotspot({ "show_on" : "always" });
			$('.hs-rect').hide();
			$('.hs-rect:eq(7)').show();
			$('#demo_overlay').hide();
			$('#live_demo_part_2_start').hide();
			
		});
		var votes_remaining = 7;
		
		$('#playlist_link').click(function(event){
			$('#demo_overlay').show();
			$('#meet_playlist').show();
			$('.hs-rect:eq(7)').hide();
			$('#perks_list').hide();
			$('#drinks_list').hide();
			$('#songs_list').show();
		});
		
		$('#meet_playlist_button').click(function(event){
			$('#demo_overlay').hide();
			$('#meet_playlist').hide();
			votes_remaining = 7;
			$('#song_votes_remaining').html(votes_remaining);
			$("#hotspot-song-search").hotspot({ "show_on" : "always" });
			event.preventDefault();
			$('.comments').show();
			$('.hs-rect:eq(8)').show();
			$('#playlist_link').off();
			$('.vote, .veto').click(function(event){
			$('#song_votes_remaining').html(votes_remaining);
				if(votes_remaining == 0){
					$('#step_3').hide();
					$('#search_song_message').show();
				}
				
			});
		});
			
		$("#find_song_box").on("keydown", function(event) {
			// track enter key
			var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
			if (keycode == 13) { // keycode for enter key
				$(this).siblings('img:first').click();
			} 
		}); // end of function		
		
		$('#overlay_find_song_button').click(function(event){
			$("#find_song_box_wrapper").show();
			$("#hotspot-song-search").hotspot({ "show_on" : "always" });
			$('#demo_overlay').hide();
			$('#search_song_message').hide();
		});
		
		$('#load_song_contributions_button').click(function(event){
			$('#friends_add_to_playlist').hide();
			$('#review_guests_suggestions').show();
			$('#playlist').show();
			$('#playlist .party-box .footer .vote').each(function(index){
				$(this).html(Math.floor(Math.random()*51)+1);
				$(this).siblings('.veto').html(Math.floor(Math.random()*11)+1);
			});
			$('#songs_added_list .party-box .footer .vote').each(function(index){
				$(this).removeClass('voted');
				$(this).html(Math.floor(Math.random()*51)+1);
				$(this).siblings('.veto').show().html(Math.floor(Math.random()*11)+1);
			});
			$('.vote, .veto').off();
			$('.vote, .veto').click(function(event){
				event.preventDefault();
				$(this).siblings('.vote, .veto').removeClass('voted');
				$(this).addClass("voted");
			});
			$("#download_songs_container").show();
		});
		
		$('#load_song_contributions_button2').click(function(event){
			$('.hs-rect').hide();
			$('#demo_overlay').hide();
			$('#review_guests_suggestions').hide();
			$("#download_songs_message").hotspot({ "show_on" : "always" });
			
		});
		$('#download_songs_link').click(function(event){
			event.preventDefault();
			$('#demo_overlay').show();
			$('#live_demo_complete').show();
		});
	});
	
	function search_song(){
		$('#no_songs').show();
		var tinro = $("#find_song_box").val();
		$('#no_songs h2').html('Searching for "'+tinro+'"...');
		tinro = tinro.toLowerCase();
		if(tinro.length < 1) return false;
		$.ajax({
			url: "http://itunes.apple.com/search?limit=11&entity=song&media=music&term="+encodeURIComponent(tinro),                     
			global: false,
			type: "GET",
			async: false,
			dataType: "jsonp",
			success: function (response)
			{       
				if(first_search){
					$('.hs-rect').hide();
					$("#hotspot-songs").hotspot({ "show_on" : "always" });
					first_search = false;
				}
				$('#no_songs').hide();
				$('#search_results').empty();
				$.each(response, function(key, val) { 
					$.each(val, function(key_results, val_results) {
						var trackId =  val_results.trackId;                                  
						var artistName =  val_results.artistName;
						var trackName =  val_results.trackName.substring(0,21);
						var previewUrl =  val_results.previewUrl;
						var artworkUrl30 =  val_results.artworkUrl30;

						//var my_list = '<div class="box_div" title="'+trackName+'">'+hidden_artwork60+hidden_artwork100+hidden_song_title+hidden_artish_name+' <div class="box_div_img"><div class="box_div_img_holder"><a href="#" title=""><img class="song_photo" src="'+artworkUrl100+'" alt="" /></a></div></div><div class="box_div_cont"> <a class="box_div_t" href="#" title="">'+trackName+'</a> <span>by '+artistName+'</span><ul><li><a class="vote" href="'+voteUrl+'" title="">Add</a></li><li><a class="vetoed" href="#" title="" style="visibility:hidden;">Vetoed</a></li><li><a class="play_song" href="javascript:void(0)" onclick= "jwplayer().load({file: \''+previewUrl+'\'}); jwplayer().play();" title="">Play</a> </li></ul></div> <div class="box_div_btm"><div class="js_rating_out"><div class="js_rating_in1" style="width:10%;"></div></div></div></div>';

						
						var my_list = '<div class="party-box"><div class="header clearfix"><div class="img"><a href="#"><img src="'+artworkUrl30+'" alt="" /></a></div><div class="cont"><h4>'+trackName+'</h4><h5>Song</h5></div></div><p>By: '+artistName+'</p><div class="footer"><a href="#" class="vote">Add to Playlist</a><a href="#" class="veto" style="display:none">Add to Playlist</a><a class="play" href="javascript:void(0)" onclick= "jwplayer().load({file: \''+previewUrl+'\'}); jwplayer().play();" title="">Play</a></div></div>';
						
						
						$('#search_results').append(my_list);  
					});
				});

				$('#search_results').off();
				$('#search_results').on("click", ".vote", function(event){
					event.preventDefault();
					$(this).addClass("voted");
					$(this).html('Added to playlist')
					$(this).off();
					$('#search_results').empty();
					$(this).parents('.party-box:first').prependTo('#songs_added_list');
					adds_remaining-=1;
					$('#songs_added').html(adds_remaining);
					if(adds_remaining == 2){
						$('.hs-rect').hide();
						$("#hotspot-song-search2").hotspot({ "show_on" : "always" });
					}
					else if(adds_remaining == 0){
						$('.hs-rect').hide();
						$('#demo_overlay').show();
						$('#friends_add_to_playlist').show();
					}
				});	
			}
		});
	}
	