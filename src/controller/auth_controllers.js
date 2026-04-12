import users from "../data/db.js";
import db from "../data/db.js";

export function register(req,res){
    let valid = registerValidation(req.body,res);
    if(!valid) {
        return;
    }
    let userHave = addUser(req.body);

    if(userHave) {
        res.status(201).json({
            success: true,
            message:"REGISTER Succes"
        });
    } else {
        res.status(200).json({
            success: false,
            message:"REGISTER: User already exist"
        });
    }
    console.log(db);

}

export function login(req,res) {
    let valid = registerValidation(req.body,res,false);
    if(!valid) {
        return;
    }
    res.status(201).json({
        success: true,
        data: req.body,
        message:"LOGIN"
    });
}

function addUser(user) {
    for(let key in db) {
        if(user.email===db[key].email) {
            return false;
        }
    }
    users.push(user);
    return true;
}

function registerValidation(user,res,isRegister = true) {
    console.log("9"*50);
    let message = "";
    const regex = /\S+@\S+\.\S+/;
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!user.email) {
        message = `${isRegister?"REGISTER":"Login"} failed: User email bo'sh`;
    }
    else if(!user.password) {
        message = `${isRegister?"REGISTER":"Login"} failed: User password bo'sh`;
    }
    else if(!regex.test(user.email)) {
        message = `${isRegister?"REGISTER":"Login"} failed: email valid emas`
    }
    else if(!strongRegex.test(user.password)) {
        message = `${isRegister?"REGISTER":"Login"} failed: password valid emas`
    }
    if(message) {
        res.status(400).json({
            success: false,
            message:message
        });
    }
    return message==="";
}

