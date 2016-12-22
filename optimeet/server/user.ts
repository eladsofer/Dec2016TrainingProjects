import {Response, ResponseOptions} from "@angular/http";
import {user} from "../app/models/user.model";
import {loadUsers, saveUsers} from "./dal/user";

exports.setup = function(app) {
  app.post('/api/authenticate', function (req, res) {
    console.log("GOT auth" + JSON.stringify(req.body))
    var mylogin: user = req.body;
    const users = loadUsers();


    let filteredUsers = users.filter(user => {
      return user.username == mylogin.username && user.password == mylogin.password;
    });

    if (filteredUsers.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
      let user = filteredUsers[0];
      res.send(new Response(new ResponseOptions({
        status: 200,
        body: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: 'fake-jwt-token'
        }
      })));
    } else {
      // else return 400 bad request
      res.send(new Error('Username or password is incorrect'));
    }

    // get parameters from post request

    // else return 400 bad request
    //res.send(new Error('Username or password is incorrect'));
  })

  app.post('/api/user', function (req, res) {
    console.log("GOT user" + JSON.stringify(req.body))
    var mylogin: user = req.body;
    const users = loadUsers();

    // validation
    let duplicateUser = users.filter(user => {
      return user.username === mylogin.username;
    }).length;
    if (duplicateUser) {
      return res.status(400).send(new Error('Username "' + mylogin.username + '" is already taken'));
    }
    else {
      // save new user
      mylogin.id = getNextValidID(users);
      users.push(mylogin);
      saveUsers(users);

      // respond 200 OK
      res.send(new Response(new ResponseOptions({status: 200})));
    }
  })

  app.get('/api/user', function (req, res) {
    res.json(loadUsers())
  })

  app.get('/api/user/:userId', function (req, res) {

    const users = loadUsers();


    let filteredUsers = users.filter(user => {
      return user.id = req.params.userId;
    });

    if (filteredUsers.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
      let user = filteredUsers[0];
      res.json(user)
    } else {
      // else return 400 bad request
      res.status(400).send(new Error('Username or password is incorrect'));
    }
  })

  app.delete('/api/user/:userid', function (req, res) {
    console.log("delete user: " + req.params.userid)
    const users = loadUsers();

    let filteredUsers = users.filter(user => {
      return user.id == req.params.userid;
    });

    if (filteredUsers.length) {
      let user = filteredUsers[0];
      var index = users.indexOf(user);
      users.splice(index, 1);
      saveUsers(users);
      res.send("User deleted")
    } else {
      // else return 400 bad request
      res.status(400).send(new Error('Usernamenot exist'));
    }
  })
}

function getNextValidID(users)
{
  if(users) {
    if(users.length >0) {
      users.sort(function (a: user, b: user) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })

      console.log(users[users.length - 1].id);

      return users[users.length - 1].id + 1;
    }
    else
    {
      return 1;
    }
  }
}
