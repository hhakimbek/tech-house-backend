import users from "../data/db.js";

export function register(req,res){
    console.log(req.body);
    let isValid = registerValidation(req.body,res);
    if(!isValid) {
        res.status(400).json({
            success: true,
            data: req.body,
            message:"REGISTER failed: User or password is empty"
        });
        return;
    }
    let userHave = addUser(req.body);
    if(userHave) {
        res.status(201).json({
            success: true,
            data: req.body,
            message:"REGISTER"
        });
    } else {
        res.status(201).json({
            success: false,
            data: req.body,
            message:"REGISTER: User already exist"
        });
    }

}
export function login(req,res){
    console.log(req.body);
    res.status(201).json({
        success: true,
        data: req.body,
        message:"LOGIN"
    });
}


function addUser(user) {
    for(let key in users) {
        if(user.email===users[key].email) {
            return false;
        }
    }
    users.push(user);
    return true;
}


function registerValidation(user) {
    return !(!user.email || !user.password);
}

function loginUser(user) {
    for(let key in users) {
        if(user.id===users[key].id && user.email===users[key].email) {
            return false;
        }
    }
    return true;
}
