//Load users from server
function loadUsers(callback) {
    $.ajax({
        url: 'http://localhost:8080/users'
    }).done(function (users) {
        console.log('Users loaded: ' + JSON.stringify(users));
        callback(users);
    })
}

//Create user in server
function createUser(user, callback) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/users',
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
        url: 'http://localhost:8080/users' + user.id,
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
        url: 'http://localhost:8080/users' + userId
    }).done(function (user) {
        console.log("Deleted user " + userId)
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



    var username = $('#name')
    var password = $('#password')
    var info = $('#info')






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

        createUser(user, function (userWithId) {
            //When user with id is returned from server
            showUser(userWithId);
        });
    })

})