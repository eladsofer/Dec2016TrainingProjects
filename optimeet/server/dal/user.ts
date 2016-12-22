import * as fs from "fs";
import * as path from "path";

const FILE_PATH = path.join(__dirname, "../data/users.json");

export function saveUsers(users) {
  const json = JSON.stringify(users);
  fs.writeFileSync(FILE_PATH, json);
}

export function loadUsers(){
  let users;

  try {
    const json = fs.readFileSync(FILE_PATH, "utf8");
    users = JSON.parse(json);
  }catch(err){
    users = [];
  }

  return users;
}
