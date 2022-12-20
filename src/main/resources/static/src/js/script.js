//Load users from server
function loadUsers(callback) {
    $.ajax({
        url: 'http://192.168.1.46:8080/users'
    }).done(function (users) {
        console.log("User loaded BRO" + JSON.stringify(users));
        callback(users);
    })
}

//Create user in server
function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: 'http://192.168.1.46:8080/users',
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("User created: " + JSON.stringify(user));
        callback(user);
    })
}

//Update user in server
function updateUser(user) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.46:8080/users' + user.id,
        data: JSON.stringify(user),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (user) {
        console.log("Updated user: " + JSON.stringify(user))
    })
}

//Delete user from server
function deleteUser(userId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.46:8080/users' + userId
    }).done(function (userId) {
        console.log("Deleted user " + userId)
    })
}


//.-------------------------------------------------------------------------chat
function loadChat(callback) {
    $.ajax({
        url: 'http://192.168.1.46:8080/users/chat'
    }).done(function (msg) {
        console.log("User loaded CHAT" + JSON.stringify(msg));
        callback(msg);
    })
}

function createChat(chat, callback){
	    $.ajax({
        method: "POST",
        url: 'http://192.168.1.46:8080/users/chat',
        data: JSON.stringify(chat),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (chat) {
        console.log("Chat created: " + JSON.stringify(chat));
        callback(chat);
    })
}

function updateChat(chat) {
    $.ajax({
        method: 'PUT',
        url: 'http://192.168.1.46:8080/users/chat' + chat.id,
        data: JSON.stringify(chat),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (chat) {
        console.log("Updated user: " + JSON.stringify(chat))
    })
}

//Delete user from server
function deleteChat(chatId) {
    $.ajax({
        method: 'DELETE',
        url: 'http://192.168.1.46:8080/users/chat' + chatId
    }).done(function (chatId) {
        console.log("Deleted user " + chatId)
    })
}

//Show user in page
function showUser(user) {

    var username = '';
    var password = '';
    var style = '';


    $('#info').append(
        '<div id="user-' + user.id + '> ' + user.name + '</div>')
}


$(document).ready(function () {

    loadUsers(function (users) {
        //When users are loaded from server
        for (var i = 0; i < users.length; i++) {
            showUser(users[i]);
        }
    });
	loadChat(function (msg) {
	        //When users are loaded from server
	        for (var i = 0; i < msg.length; i++) {
	            showChat(msg[i]);
	        }
	    });


    var username = $('#name');
    var password = $('#password');
    var info = $('#info');

    //Handle add button
    $("#play-button").click(function () {

        var value1 = username.val();
        var value2 = password.val();
        username.val('');
        password.val('');

        var user = {
            name: value1,
            password: value2,
        }
        
       
        loadUsers(function (users) {
			 
		var existe = false;
			 
        //When users are loaded from server
        for (var i = 0; i < users.length; i++) {
            if(users[i].name == value1 && users[i].password != value2){
            	console.log("Usuario repetido");
            	
            	existe = true;
			}else if(users[i].name == value1 && users[i].password == value2){
            	console.log("Bienvenido " + value1);
            	existe = true;
			}
        }
        	if(!existe){
                createUser(user, function (userWithId) {
            //When user with id is returned from server        
            showUser(userWithId);
            console.log("Usuario HOLA  " + value1 + " creado correctamente");
        });
        }

        
    });


    })
})


