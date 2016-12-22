import {Response, ResponseOptions} from "@angular/http";
import * as fs from "fs";
import {Meeting} from "../app/models/meeting.model";
import {Participants} from "../app/models/participants.model";
import {partition} from "rxjs/operator/partition";
import {exists} from "fs";
import {DateSuggestion} from "../app/models/date.suggestion.model";
import {loadMeetings, saveMeetings} from "./dal/meeting";
import {loadUsers} from "./dal/user";
import {concatStatic} from "rxjs/operator/concat";

var path = require("path");
var FILE_PATH = path.join(__dirname, "../data/users.json");

exports.setup = function(app)
{
  app.post('/api/meeting', function (req, res) {
    var myMeeting: Meeting = req.body;
    console.log("Got new Meeting " + req.body)
    const meetings = loadMeetings();

    // save new user
    myMeeting.id = meetings.length + 1;

    var optimizedMeet = OptimizeMeeting(myMeeting)

    meetings.push(optimizedMeet);
    saveMeetings(meetings);

    // respond 200 OK
    res.status(200).send('{"status": "success"}');
  })

  app.put('/api/meeting', function (req, res) {
    console.log("1")
    var myMeeting: Meeting = req.body;
    const meetings = loadMeetings();
    console.log(JSON.stringify(myMeeting))
    var index = meetings.indexOf(myMeeting.id);
    meetings.splice(index, 1);

    meetings.push(myMeeting);
    saveMeetings(meetings);

    // respond 200 OK
    res.status(200).send('{"status": "success"}');
  })

  app.get('/api/meeting', function (req, res) {
    res.json(loadMeetings())
  })

  app.get('/api/meeting/user/:userId', function (req, res) {
    console.log(req.params.userId)
    var filteredMeetings = [];
    const meetings = loadMeetings();

    for(var i = 0; i < meetings.length; i++) {

      var IsUserMeeting = false;
      if (meetings[i].ParticipantsList) {

        for (var j = 0; j < meetings[i].ParticipantsList.length; j++) {

          console.log((JSON.stringify(meetings[i].ParticipantsList[j].us )))
          if (meetings[i].ParticipantsList[j].UserId == req.params.userId) {

            IsUserMeeting = true
          }
        }
        if (IsUserMeeting) {
          filteredMeetings.push(meetings[i]);
        }
      }
    }
    console.log(JSON.stringify(filteredMeetings));
      res.json(filteredMeetings)
  })

  app.get('/api/meeting/:meetingId', function (req, res) {

    const meetings = loadMeetings();


    let filteredMeetings = meetings.filter(meeting => {
      return meeting.id == req.params.meetingId;
    });

    if (filteredMeetings.length) {
      // if login details are valid return 200 OK with user details and fake jwt token
      let meeting = filteredMeetings[0];
      res.json(meeting)
    } else {
      // else return 400 bad request
      res.status(400).send(new Error('Username or password is incorrect'));
    }
  })
}

function OptimizeMeeting(meeting)
{

  var OptimizedMeeting: Meeting
  OptimizedMeeting = meeting
  const users = loadUsers();
  var tmpfilteredUsers =[];
  var filteredUsers =[];

  var optimatedDates=[];
  OptimizedMeeting.Suggestions = [];

  //console.log(users)

  if(meeting.ParticipantsList) {
    for (var i = 0; i < meeting.ParticipantsList.length; i++) {
       tmpfilteredUsers =[];
      meeting.ParticipantsList[i].response = [];
      tmpfilteredUsers.push(users.filter(user => {
        return user.id == meeting.ParticipantsList[i].UserId;
      }));

      //console.log(tmpfilteredUsers)

      if(tmpfilteredUsers)
      {
        if(tmpfilteredUsers.length > 0)
        {
          filteredUsers.push(tmpfilteredUsers[0])
        }
      }
    }

    //console.log("oooo" + filteredUsers)

    var luzMatrix: number[][] = [];

    //INITIALIZE MATRIX

    for (var i = 0; i < 7; i++) {
      luzMatrix[i] = [];
      for (var j = 0; j < 24; j++) {
        luzMatrix[i][j]=0;
      }
    }



    //FILL MATRIX WITH OPTIONS
    for (var i = 0; i < filteredUsers.length; i++) {
      for (var j = 0; j < filteredUsers[i][0].PreferedTimes.length; j++) {
        //console.log(filteredUsers[i][0].firstName +"  "+ JSON.stringify(filteredUsers[i][0].PreferedTimes[j]))
        var fromd = new Date(filteredUsers[i][0].PreferedTimes[j].fromTimeString).getHours() -2 ;
        var tod = new Date(filteredUsers[i][0].PreferedTimes[j].toTimeString).getHours()-2;
        console.log(filteredUsers[i][0].PreferedTimes[j].day.toLowerCase())
        console.log(JSON.stringify(filteredUsers[i][0].PreferedTimes[j]))
        switch (filteredUsers[i][0].PreferedTimes[j].day.toLowerCase()) {
          case 'sunday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[0][k]++
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
          case 'monday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[1][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
          case 'tuesday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[2][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
              //console.log(luzMatrix[2][k])
            }
            break;
          case 'wednesday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[3][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
          case 'thursday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[4][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
          case 'friday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[5][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
          case 'saturday' :
            for (var k = fromd; k <= tod; k++) {
              luzMatrix[6][k]++;
              console.log("0 " + k + " " + luzMatrix[0][k])
            }
            break;
        }
      }
    }



    var currDate = new Date(meeting.FromDate);

    var toD = new Date(meeting.ToDate);
    //var fromD = new Date(meeting.FromDate);

    //run on days in meeting owner range
    var suggestions = [];
    var sugId = 0

    while (currDate <= toD) {
      //console.log("ggggggggggggggg " + currDate + currDate.getDay())
      var dayInWeek = currDate.getDay();
      var BestMeeting = 0;
      var BestHour = 0;
      for (var p = 0; p < 24; p++) {
        //console.log("ggggdfdddd " + luzMatrix[dayInWeek][p])
        if (luzMatrix[dayInWeek][p] > BestMeeting) {
          BestMeeting = luzMatrix[dayInWeek][p];
          BestHour = p;
        }
      }
      //console.log("ggggggggggggggg " + BestMeeting)
      if (BestMeeting > 0) {
        var dateSugg: DateSuggestion = new DateSuggestion();

        dateSugg.Id = sugId;

        dateSugg.date = new Date(currDate.setHours(BestHour));

        dateSugg.city = 'Tel-Aviv';
        OptimizedMeeting.Suggestions.push(dateSugg);
        BestMeeting = 0;
        sugId++;
      }
      BestHour = 0

      //next day
      currDate.setDate(currDate.getDate() + 1);
      //console.log(currDate);

    }
  }

  return OptimizedMeeting
}


