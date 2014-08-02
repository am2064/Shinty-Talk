Chat = new Meteor.Collection('chat');

if (Meteor.isClient) {
	Template.chat.events({
		'click .send': function() {
			var chat_name = document.getElementById("user").value.trim();
			var chat_text = document.getElementById("words").value.trim();
			if(chat_name=="") chat_name="Anon";
			if(chat_text!="") Chat.insert({name: chat_name, words: chat_text, timestamp: new Date().getTime()});
		}
	});

	Template.chat.output=function(){
		return Chat.find({}, {sort: {timestamp: -1}});
	}
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if(Chat.find().count()===0){
			Chat.insert({name: "Server-kun", words: "Looks like no one has said anything yet. Go ahead and say something!", timestamp: new Date().getTime()});
		}
		var currentdate = new Date();
		var output = "Server Restarted at ".concat(currentdate.toUTCString());
		Chat.insert({name: "Server-kun", words: output, timestamp: currentdate.getTime()});
	});
}
