import * as View from "./view.js";
import * as Request from "./request.js";


/***************채팅방 팝업 열기******************/
$(document).on('click','#chat-pop-up-click', function(e) {
	let receiverId = $('#chat-tripboard-userId').val();
	console.log('????????? openPopup receiverId : '+receiverId);
	let url = 'chat?receiverId='+receiverId;
	
	window.open(url,
				'target',
				'top=100, left=200, width=1000, height=800, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=no');

});