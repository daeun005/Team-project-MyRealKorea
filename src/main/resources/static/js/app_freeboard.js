import * as View from "./view.js";
import * as Request from "./request.js";

$(document).on('click','#freeboard-search-btn',function(e){
	// ajax로 리스트 부분만 검색된 리스트로 변경
	let keyword = $('#freeboard-search-keyword').val();
	let url = `freeBoard-search?pageNo=${keyword}&keyword=${keyword}`;
	let method = 'GET';
	let contentType = 'application/json;charset=UTF-8';

	let sendData;
	let async = true;
	
	// 키워드 결과, 현재 페이지 숫자 표시
	let curPage = $('#cur-page');
	let totRecordCount = $('#tot-record-count');
	
	// JSON.stringify() => 객체를 string 으로, JSON.parse() => string 을 객체로 만듬
	Request.ajaxRequest(url, method, contentType, 
						JSON.stringify(sendData),
						function(resultJson){
							//페이지 정보 변경
							curPage.text(resultJson.data.pageMaker.curPage);
							totRecordCount.text(resultJson.data.totRecordCount);
							//code 1 일때 render, 아닐 때 msg 띄움
							if(resultJson.code == 1){
								View.render("#freeboard-search-list-template", resultJson, '#freeboard-list');
							} else {
								alert(resultJson.msg);
							};
						}, async);
	
	e.preventDefault();
});
/******** 공지사항 정렬 : 최신순, 오래된순, 조회수 높은 순 **********/ 
$(document).on('change','#sort-by',function(e){
	// ajax로 리스트 부분만 검색된 리스트로 변경
	let selectedValue = $(this).val();
	console.log(selectedValue);
	if(selectedValue === "freeboard-list-fBoNo-desc"){
		// 최신순
		let url = 'freeboard-list-fBoNo-desc';
		let method = 'GET';
		let contentType = 'application/json;charset=UTF-8';
		let sendData = {};
		let async = true;
	
		Request.ajaxRequest(url, method, contentType, 
							sendData,
							function(resultJson){
								//code 1 일때 render, 아닐 때 msg 띄움
								if(resultJson.code == 1){
									View.render("#freeboard-search-list-template", resultJson, '#freeboard-list');
								} else {
									alert(resultJson.msg);
								};
							}, async);
		e.preventDefault();
		}
		
	if(selectedValue === "freeboard-list-fBoNo-asc"){
		// 오래된순
		let url = 'freeboard-list-fBoNo-asc';
		let method = 'GET';
		let contentType = 'application/json;charset=UTF-8';
		let sendData = {};
		let async = true;
	
		Request.ajaxRequest(url, method, contentType, 
							sendData,
							function(resultJson){
								//code 1 일때 render, 아닐 때 msg 띄움
								if(resultJson.code == 1){
									View.render("#freeboard-search-list-template", resultJson, '#freeboard-list');
								} else {
									alert(resultJson.msg);
								};
							}, async);
		e.preventDefault();
		}
		
	if(selectedValue === "reeboard-list-readCount-desc"){
		// 조회수 높은순
		let url = 'reeboard-list-readCount-desc';
		let method = 'GET';
		let contentType = 'application/json;charset=UTF-8';
		let sendData = {};
		let async = true;
	
		Request.ajaxRequest(url, method, contentType, 
							sendData,
							function(resultJson){
								//code 1 일때 render, 아닐 때 msg 띄움
								if(resultJson.code == 1){
									View.render("#freeboard-search-list-template", resultJson, '#freeboard-list');
								} else {
									alert(resultJson.msg);
								};
							}, async);
		e.preventDefault();
		}
	
});