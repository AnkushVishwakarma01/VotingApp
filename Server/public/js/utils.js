const userExist = async function(userModel, filter){
    const checkUser = await userModel.findOne({email: filter});

    if(checkUser == null){
        console.log("data is empty");
        return false;
    }else{
        return true;
    }
}

const rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};

const tokenGen = function () {
    return rand() + rand() + rand() + "-" + rand() + rand() + rand(); // to make it longer
};

module.exports = {
    userExist,
    tokenGen
}