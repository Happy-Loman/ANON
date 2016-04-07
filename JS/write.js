var messagesRef = new Firebase('https://brilliant-fire-8407.firebaseio.com/');
var title;
var text;

textarea.oninput = function() {
    textarea.style.height = "";
    textarea.style.height = (Math.min(textarea.scrollHeight, 100000)) + "px";
};

function search_text(text, item){
	for(var i = 0; i < text.length; i++){
		if(text[i] == item){
			return true;
		}
	}
	return false;
}

function push_post(title, post, time){
   	messagesRef.push({
   		title_:title,
      	post_:post,
	  	time_:time,
  	});
}
$(".submit_button").click(function(){
	title = $("#add_title");
	text = $("#textarea");
	replace(text.val(), "g", "6");
	if(title.val() !== "" && text.val() !== ""){
		
		$(".check_submit").removeClass("not_displayed");
		$(".contain").addClass("blur"); 
		console.log(title.val());
		set_submission_text();
	}
});

var submission_type = ["solve", "type_text"];

function make_random_text(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
    return text;
}
var type;
var problem;
function set_submission_text(){
	type = submission_type[Math.round(randNum(0, 1))];
	if(type == "solve"){
		GID("submission_type").innerHTML = "If you wish to continue solve the problem you see here.";
		var num1 = Math.round(randNum(1, 20));
		var num2 = Math.round(randNum(1, 20));
		GID("submit_input_text").innerHTML = num1 + " + " + num2;
		problem = num1+num2;
	} else if(type == "type_text"){
		GID("submission_type").innerHTML = "If you wish to continue type what you see here.";
		problem = make_random_text(randNum(5, 15)); 
		GID("submit_input_text").innerHTML = problem;
	}
}

function solve(problems){
	if(type == "solve"){
		return problems;
	} else if(type == "type_text"){
		return problems;
	}
}

var solution;
window.setInterval(function(){
	solution = $(".submit_input").val();
	if(solve(problem) == solution){
		var time_posted = new Date().getTime();
		push_post(title.val(), text.val(), time_posted);
		GID("check_submit").innerHTML = "Posted! Redirecting to home page... :)";
		$(".check_submit").css("height", "20px");
		window.setTimeout(function(){
			window.location.href = 'index.html';
		}, 2000);
	}
}, 100);

$(".close_button").click(function(){
	$(".check_submit").addClass("not_displayed");
	$(".contain").removeClass("blur"); 
});