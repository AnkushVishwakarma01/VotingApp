const express = require('express');
const router = express.Router();
const { candidates } = require('../database/database');

const fetchAllCandidates = async (req, res) => {
    try {
        const candidatesList = await candidates.find({});
        candidatesList.forEach((candidate, index) => {
            if(candidate.name == "Candidate 0"){
                delete candidatesList.splice(index, 1);
            }
        })

        const response = {
            status: "success",
            statusCode: 200,
            data: candidatesList
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

const updateCandidate0 = async (req, res) => {
    try {
        const { expression } = req.body;

        const updateCandidates0 = await candidates.updateMany({ name: "Candidate 0" }, { is_voting_end: expression });

        const response = {
            status: "success",
            statusCode: 200,
            data: updateCandidates0
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

const fetchCandidate0 = async (req, res) => {
    try {
        const candidate0 = await candidates.findOne({name: "Candidate 0"});

        const response = {
            status: "success",
            statusCode: 200,
            data: candidate0
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

module.exports = { fetchAllCandidates, updateCandidate0, fetchCandidate0 }