const express = require("express");
const hobbits = require("./hobbitsModel");

const router = express.Router();

router.get("/hobbits", async (req, res, next) => {
    try {
        const hobbitList = await hobbits.find();

        if (!hobbitList) {
            return res.status(404).json({
                message: "Hobbits not found"
            });
        }

        res.status(200).json(hobbitList);
    } catch (err) {
        next(err);
    }
});

router.get("/hobbits/:id", async (req, res, next) => {
    try {
        const hobbit = await hobbits.findById(req.params.id);
        if (!hobbit) {
            return res.status(404).json({
                message: "Hobbit not found"
            });
        }

        res.status(200).json(hobbit);
    } catch (err) {
        next(err);
    }
});

router.post("/hobbit", async (req, res, next) => {
    try {
        const hobbit = await hobbits.create(req.body);

        res.status(201).json(hobbit);
    } catch (err) {
        next(err);
    }
});

router.put("/hobbits/:id", async (req, res, next) => {
    try {
        const hobbit = await hobbits.update(req.params.id, req.body);
        if (!hobbit) {
            return res.status(404).json({
                message: "Hobbit not found"
            });
        }

        res.status(200).json(hobbit);
    } catch (err) {
        next(err);
    }
});

router.delete("/hobbits/:id", async (req, res, next) => {
    try {
        const hobbit = await hobbits.remove(req.params.id);
        if (!hobbit) {
            return res.status(404).json({
                message: "Hobbit not found"
            });
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
