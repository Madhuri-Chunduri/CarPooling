import {User} from "./User";

var users : any = [];
var user : User = new User(1,"madhuri.c@technovert.net","Madhuri07");
users.push(user);

export const AddUser= (user : User)=>{
    user.id = users.length+1;
    users.push(user);
}

export const IsValidUser = (email : string, password : string) => {
     var user : User = users.find(obj => obj.email==email);
     if(user == null) return false;
    if(user.password == password) {
        return true;
    }
    return false;
}