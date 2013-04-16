// JavaScript Document

$(document).ready(function() {
	$("#messages").click(function() {
		$('.dashboard').slideToggle('slow', function() {
			$("#scrollbar1").mCustomScrollbar("vertical", 400, "easeOutCirc", 1, "auto", "yes", "yes", 10);
		});
	});
	
	$("ul.entourage li").click(function() {
		$(".entourage-box").hide();
		$(this).find(".entourage-box").show();
	});
});

function showTwitterFeeds(obj) {
	hideTwitterFeeds();
	$(obj).addClass("active");
	$("#twitter-box-cover").show();
	$("#new-content").html($(".dashboard-message-box.active .twitter-box").html());
	$("#scrollbar1 .scroller").hide();
	$("#scrollbar2").mCustomScrollbar("vertical", 400, "easeOutCirc", 1, "auto", "yes", "yes", 10);
}

function hideTwitterFeeds() {
	$(".dashboard-message-box.active").removeClass("active");
	$("#new-content").html("");
	$("#twitter-box-cover").hide();
	$("#scrollbar1 .scroller").show();
}