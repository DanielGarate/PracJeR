//Load users from server
function loadUsers(callback) {
	$.ajax({
		url: 'http://192.168.1.49:8080/users'
	}).done(function(users) {
		console.log("User loaded " + JSON.stringify(users));
		callback(users);
	})
}

//Create user in server
let exist = false;
function createUser(user, callback) {
	$.ajax({
		method: "POST",
		url: 'http://192.168.1.49:8080/users',
		data: JSON.stringify(user),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
		succes: function(boolean){
			exist = boolean;
		}
		
	}).done(function(user) {
		console.log("User created: " + JSON.stringify(user));
		callback(user);
	})
	
	if (exist) { // if we access with an existing user and correct password or create a new one we can change the scene
		Nexcena++;
		console.log("he cambiado");
	} else { // if the given password doesn't match the one of the existing user, we can't change the scene
		$('#info').append(
		'<div id="user-' + user.id + '> ' + user.name + '</div>')
	}
}

//Update user in server
function updateUser(user) {
	$.ajax({
		method: 'PUT',
		url: 'http://192.168.1.49:8080/users/' + user.id,
		data: JSON.stringify(user),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(user) {
		console.log("Updated user: " + JSON.stringify(user))
	})
}

//Delete user from server
function deleteUser(userId) {
	$.ajax({
		method: 'DELETE',
		url: 'http://192.168.1.49:8080/users/' + userId
	}).done(function(userId) {
		console.log("Deleted user " + userId)
	})
}

/*
function getUser(user) {
	console.log("estoy dentro");
	
	console.log(user.name);
	if (user.name != "" && user.password != "") {
		$.ajax({
			type: "POST",
			async: false,
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			//url: url + "users",
			url: "http://192.168.1.46:8080/usersV/",
			data: JSON.stringify({ nick: "" + user.name, password: "" + user.password}),
			dataType: "json",
			success: function(boolean) { // returned variable to check if we can change the scene
				change = boolean;
			}
		}).done(function(item) {
			console.log("User created: " + JSON.stringify({ nickname: "" + user.name, password: "" + user.password}));
		})
	}
}*/

/*.done(function(boolU) {
		console.log("done " + boolU);
		if (boolU) {
			console.log("USUARIO " + user.name + " EXISTE");
			Nexcena = 1;
		} else {
			console.log("ERROR USUARIO " + user.name + " NO EXISTE");
		}
	})
*/


//.-------------------------------------------------------------------------chat
function loadChat(callback) {
	$.ajax({
		url: 'http://192.168.1.49:8080/chat'
	}).done(function(msg) {
		console.log("User loaded CHAT" + JSON.stringify(msg));
		callback(msg);
	})
}

function createChat(chat, callback) {
	$.ajax({
		method: "POST",
		url: 'http://192.168.1.49:8080/chat',
		data: JSON.stringify(chat),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(chat) {
		console.log("Chat created: " + JSON.stringify(chat));
		callback(chat);
	})
}

function updateChat(chat) {
	$.ajax({
		method: 'PUT',
		url: 'http://192.168.1.49:8080/chat/' + chat.id,
		data: JSON.stringify(chat),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done(function(chat) {
		console.log("Updated user: " + JSON.stringify(chat))
	})
}

//Delete user from server
function deleteChat(chatId) {
	$.ajax({
		method: 'DELETE',
		url: 'http://192.168.1.49:8080/chat/' + chatId
	}).done(function(chatId) {
		console.log("Deleted user " + chatId)
	})
}

//Show user in page
function showUser(user) {

	var username = '';
	var password = '';
	var style = '';


	$('#info').append(
		'<div id="user-' + user.id + '> ' + user.name + '</div>');
}


/*$(document).onload(function (){
	
})*/
$(document).ready(function() {

	loadUsers(function(users) {
		//When users are loaded from server
		for (var i = 0; i < users.length; i++) {
			
			showUser(users[i]);
		}
	});
	//loadChat(function (msg) {
	//When users are loaded from server
	//        for (var i = 0; i < msg.length; i++) {
	//            showChat(msg[i]);
	//        }
	//    });


	var username = $('#name');
	var password = $('#password');
	var info = $('#info');

	//Handle add button
	
	$("#play-button").click(function() {
		console.log("QQQHH"); //----------------------------------------------------------------------------------------------------aqui
		var value1 = username.val();
		var value2 = password.val();
		username.val('');
		password.val('');
		
		var user = {
			name: value1,
			password: value2,
		}
		//getUser(user);
		loadUsers(function(users) {
			var existe = false;
			//When users are loaded from server
			for (var i = 0; i < users.length; i++) {
				if (users[i].name == value1 && users[i].password != value2) {
					console.log("Usuario repetido");
					existe = true;
				}else if (users[i].name == value1 && users[i].password == value2) {
					console.log("Bienvenido " + value1);
					existe = true;
					player1Name = value1;
					Nexcena = 1;
					$("#info").html("<div> Iniciada sesion J1: " + value1 + " Bienvenido</div>");
				}
			}
			if (!existe) {
				createUser(user, function(userWithId) {
					//When user with id is returned from server        
					showUser(userWithId);
					console.log("Usuario HOLA  " + value1 + " creado correctamente");
				});
			}
		});
	})
})


