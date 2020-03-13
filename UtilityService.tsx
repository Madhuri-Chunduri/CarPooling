import axios from "axios";
import { User } from "../Models/User";

let ActiveUser : User = new User("-1","","","","");
axios.defaults.baseURL = 'https://localhost:44362/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const baseUrl : string = "https://localhost:44362/api/";

export function GetData(url: string) {

    return axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        }).then((res) => {
         try {
            return res.data;
            }
         catch (error) {
            console.log(error);
        }
        }
        )
        .catch(error => {
            console.log(error);
        });

}

export function PostData(url : string, data: any){
    return axios.post(url, data,{
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        }).then((res) => {
         try {
            return res.data;
            }
         catch (error) {
            console.log(error);
        }
        }
        )
        .catch(error => {
            console.log(error);
        });
}

export function PutData(url : string, data: any){
    return axios.put(url, data,{
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        }).then((res) => {
         try {
            return res.data;
            }
         catch (error) {
            console.log(error);
        }
        }
        )
        .catch(error => {
            console.log(error);
        });
}

export const setCurrentUser = (user : User) =>{
    localStorage.setItem('activeUser',JSON.stringify(user));
}

export const getCurrentUser = ()=> {
    var retrievedObject = localStorage.getItem('activeUser');
    var activeUser: User = JSON.parse(retrievedObject);
    return activeUser;
}