import * as fs from "fs";
import * as path from "path";

const FILE_PATH = path.join(__dirname, "../data/meetings.json");


export function loadMeetings(){
  let meetings;

  try {
    const json = fs.readFileSync(FILE_PATH, "utf8");
    meetings = JSON.parse(json);
  }catch(err){
    meetings = [];
  }

  return meetings;
}

export function saveMeetings(meetings) {
  const json = JSON.stringify(meetings);
  fs.writeFileSync(FILE_PATH, json);
}
