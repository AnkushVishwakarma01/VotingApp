const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/admin', async (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'admin.html'));
})

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'login.html'));
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../src', 'register.html'));
})

module.exports = router;