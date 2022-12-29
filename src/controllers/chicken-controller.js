import logger from "../utils/logger.js";
import Chicken from "../models/Chicken.js";

export async function getAllChickens(req, res) {
    logger.info('Received getAllChickens request');
    await Chicken.find().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while trying to retrieve Chickens."
        });
    });
}

export async function getOneChicken(req, res) {
    const id = req.params.chickenId;
    logger.info('Received getOneChicken request');

    await Chicken.findOne({ _id: id }).then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Chicken with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Chicken with id=" + id });
        });
}

export async function createChicken(req, res) {
    const { name, weight } = req.body;
    name.toLowerCase();

    const chicken = new Chicken({
        name,
        weight,
    });

    logger.info('saving chicken to database...');
    await chicken.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Chicken."
            });
        });
}

export async function updateChicken(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.chickenId;

    Chicken.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find chicken`
                });
            } else res.send({ message: "Chicken was updated successfully!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Chicken"
            });
        });
}

export async function deleteChicken(req, res) {
    const id = req.params.chickenId;

    Chicken.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find chicken`
                });
            } else {
                res.send({
                    message: "Chicken was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting Chicken"
            });
        });
}

export async function incrementChickenSteps(req, res) {
    const id = req.params.chickenId;

    Chicken.findByIdAndUpdate(id, { $inc: { 'steps': 1 }})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find chicken`
                });
            } else res.send({ message: "Chicken steps was successfully incremented by 1!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Chicken"
            });
        });
}
