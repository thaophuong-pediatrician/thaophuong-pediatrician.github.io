var counts = [], linkUrls = [], targets = [], ids = [];IDHasLoaded = true;var theCount = 0;
var links = document.getElementsByTagName("a");
for ( var i = 0, lnk_len = links.length; i < lnk_len; i++ ) {
	if ( links[i].className == "IDCommentsReplace" ) {
		links[i].innerHTML = counts[theCount];
		links[i].href = linkUrls[theCount];
		links[i].id = ids[theCount];
		links[i].target = targets[theCount];
		links[i].className = "comment-link";
		theCount++;
	}
}

if ( 0 == theCount ) {
	var safety = 0;
	var spans = document.getElementsByTagName("span");
	var id_lng = ids.length;
	var sp_lng = spans.length;
	while ( theCount < id_lng && safety < 2 * id_lng ) {
		for ( var i = 0; i < sp_lng; i++ ) {
			if ( "IDShowCommentLink" + spans[i].id == ids[theCount] ) {
				spans[i].parentNode.href = linkUrls[theCount];
				spans[i].parentNode.id = ids[theCount];
				spans[i].parentNode.target = targets[theCount];
				spans[i].parentNode.className = "comment-link";
				spans[i].parentNode.innerHTML = counts[theCount];
				theCount++;
			}
		}
		safety++;
	}
}