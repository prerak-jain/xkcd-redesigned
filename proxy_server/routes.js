const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const getRandomComicNumber = async () => {
    const response = await axios.get('https://xkcd.com/info.0.json');
    const upperBound = await response.data.num;
    const randomComicNumber = Math.floor(Math.random() * upperBound + 1);
    return randomComicNumber;
};

// call this for home page - current comic
router.get('/info.0.json', async function (req, res, next) {
    let response = await axios.get('https://xkcd.com/info.0.json');
    res.json(response.data);
});

// call this for 1. /comicNum URL
router.get('/:comicID/info.0.json', async function (req, res, next) {
    let response = await axios.get(
        `https://xkcd.com/${req.params.comicID}/info.0.json`
    );
    res.json(response.data);
});

router.get('/randomComic', async function (req, res, next) {
    const randomComicNumber = await getRandomComicNumber();
    let randomComic = await axios.get(
        `https://xkcd.com/${randomComicNumber}/info.0.json`
    );
    res.json(randomComic.data);
});

module.exports = router;
