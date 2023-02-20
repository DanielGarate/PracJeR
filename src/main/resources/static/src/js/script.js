let url = 'http://192.168.1.54:8080/';
//Load users from server
function loadUsers(callback) {
	$.ajax({
		url: 'http://192.168.1.54:8080/users'
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
		url: 'http://192.168.1.54:8080/users',
		data: JSON.stringify(user),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
		succes: function(boolean) {
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
		url: 'http://192.168.1.54:8080/users/' + user.id,
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
		url: 'http://192.168.1.54:8080/users/' + userId
	}).done(function(userId) {
		console.log("Deleted user " + userId)
	})
}
//.-------------------------------------------------------------------------chat
function sendMessage(user, message) {
	$.ajax({
		type: "POST",
		async: false,
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		url: url + "chat",
		data: JSON.stringify({ user: "-" + user, message: "" + message }),
		dataType: "json"
	})
	getMessage();
}

function getMessage() {
	for (let i = 0; i < 8; i++) {
		$.ajax({
			method: "GET",
			url: url + "chat/" + i.toString()
		}).done(function(data) {
			if (data != "")
				document.getElementById("message" + i.toString()).innerHTML = data;
		})
	}

}
//.-------------------------------------------------------------------------chat
//Show user in page
function showUser(user) {

	var username = '';
	var password = '';
	var style = '';


	$('#info').append(
		'<div id="user-' + user.id + '> ' + user.name + '</div>');
}

$(document).ready(function() {

	loadUsers(function(users) {
		//When users are loaded from server
		for (var i = 0; i < users.length; i++) {

			showUser(users[i]);
		}
	});

	var username = $('#name');
	var password = $('#password');
	var info = $('#info');

	var input = $('#chatBox');
	//Handle add button
	let unavez = 0;
	let dosvez = 0;
	$("#play-button").click(function() {
		console.log("QQQHH"); //----------------------------------------------------------------------------------------------------aqui
		if (username.val() != null && password.val() != null) {
			var value1 = username.val();
		}
		if (username.val() != undefined && password.val() != undefined) {
			var value2 = username.val();
		}
		//var value1 = username.val();
		//var value2 = password.val();
		username.val('');
		password.val('');

		var user = {
			name: value1,
			password: value2,
		}
		loadUsers(function(users) {
			var existe = false;
			//When users are loaded from server
			for (var i = 0; i < users.length; i++) {
				if (users[i].name == value1 && users[i].password != value2) {
					console.log("Usuario repetido");
					existe = true;
				} else if (users[i].name == value1 && users[i].password == value2) {
					console.log("Bienvenido " + value1);
					existe = true;
					if (unavez == 0) {
						$("#info").html("<div> Iniciada sesion J1: " + value1 + " Bienvenido</div>");
						$("#info1").html("Inicia sesion J2");
						player1Name = value1;
						dosvez++;
						unavez++;
					} else {
						$("#info").html("<div> Iniciada sesion J2: " + value1 + " Bienvenido</div>");
						player2Name = value1;
						Nexcena = 1;
					}
				}
			}
			if (!existe) {
				createUser(user, function(userWithId) {
					//When user with id is returned from server        
					showUser(userWithId);
					console.log("Usuario HOLA  " + value1 + " creado correctamente");
					if (dosvez == 0) {
						$("#info").html("<div> Usuario  creado J1: " + value1 + " Bienvenido</div>");
						player1Name = value1;
						dosvez++;
						unavez++;
					} else {
						$("#info").html("<div> Usuario  creado J2: " + value1 + " Bienvenido</div>");
						player2Name = value1;
					}
					Nexcena = 1;
				});
			}
		});
	})
	
	setInterval (getMessage, 2500);
	$("#chatButton").click(function() {
		sendMessage(player1Name, input.val());
		input.value = "";
	});



	
})


