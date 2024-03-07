const express = require('express');
const router = express.Router();

//User
const {register, login, searchUserByToken, updateUserAndCandidate} = require('./userRoutes');
router.post('/register', register);
router.post('/login', login);

router.get('/searchUserByToken/:token', searchUserByToken);

router.put('/updateUserAndCandidate', updateUserAndCandidate);

//Candidate
const {fetchAllCandidates, updateCandidate0, fetchCandidate0} = require('./candidateRoutes');
router.get('/fetchAllCandidates', fetchAllCandidates);
router.get('/fetchCandidate0', fetchCandidate0);

router.put('/toggleVoting/', updateCandidate0);

module.exports = router;