const bcrypt = require('bcrypt');
const { users, candidates } = require('../database/database');
const {userExist, tokenGen} = require('../public/js/utils');

const register = async (req, res) => {
    try {
        const { username, email, phone_no } = req.body;
        let { password } = req.body;

        const saltRounds = 10;
        const isUserExist = await userExist(users, email);

        if (!isUserExist) {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err) throw err;
                const registerUser = await users.create({
                    username: username,
                    password: hash,
                    email: email,
                    phone_no: phone_no,
                    token: tokenGen()
                });
    
                const response = {
                    status: "success",
                    statusCode: 200,
                    data: registerUser
                }
    
                res.status(200).json(response);
            });
        }else{
            const response = {
                status: "Failure",
                statusCode: 403, // Already exists
                message: "User already exist."
            }

            res.status(401).json(response);
        }

    } catch (error) {
        const response = {
            status: "failure",
            statusCode: 500,
            message: error.message
        }

        res.status(500).json(response);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await users.findOne({ email: email });

        if (userData) {
            bcrypt.compare(password, userData.password, function (err, result) {
                if (result == true) {
                    const response = {
                        status: "success",
                        statusCode: 200,
                        data: userData
                    }

                    return res.status(200).json(response);
                } else {
                    const response = {
                        status: "success",
                        statusCode: 401,
                        data: {},
                        message: "Password was incorrect"
                    }

                    return res.status(200).json(response);
                }
            });
        } else {
            const response = {
                status: "Failure",
                statusCode: 404,
                data: {},
                message: "Not Found!"
            }

            return res.status(404).json(response);
        }
    } catch (error) {
        const response = {
            status: "failure",
            statusCode: 500,
            message: error.message
        }

        res.status(500).json(response);
    }
}

const searchUserByToken = async (req, res) => {
    try {
        const { token } = req.params;

        const userData = await users.findOne({ token: token });

        if (userData) {
            const response = {
                status: "success",
                statusCode: 200,
                data: userData
            }

            return res.status(200).json(response);
        } else {
            const response = {
                status: "Failure",
                statusCode: 404,
                data: {},
                message: "Not Found!"
            }

            return res.status(200).json(response);
        }
    } catch (error) {
        const response = {
            status: "failure",
            statusCode: 500,
            message: error.message
        }

        res.status(500).json(response);
    }
}

const updateUserAndCandidate = async (req, res) => {
    try {
        const { token, candidate } = req.body;

        const user = await users.findOne({ token: token });
        const votedCandidate = await candidates.findOne({ name: candidate });

        user.is_voted = true;
        votedCandidate.votes += 1;
        votedCandidate.votes_list.push({
            name: user.username,
            phone_no: user.phone_no
        })

        user.save();
        votedCandidate.save();

        if (!user && !votedCandidate) {
            const response = {
                status: "failure",
                statuscode: 401,
                message: "unable to vote."
            }
            return res.status(401).json(response);
        }

        const response = {
            status: "success",
            statusCode: 200,
            data: {
                user: user,
                candidate: votedCandidate
            }
        }

        return res.status(200).json(response);


    } catch (error) {
        const response = {
            status: "failure",
            statusCode: 500,
            message: error.message
        }

        res.status(500).json(response);
    }
}

module.exports = { register, login, searchUserByToken, updateUserAndCandidate }