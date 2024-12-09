import animalsService from '../services/AnimalsService.js';

const AnimalsController = {
    async getAllAnimals(req, res) {
        try {
            const animals = await animalsService.getAllAnimals();
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAnimalById(req, res) {
        try {
            const animal = await animalsService.getAnimalById(parseInt(req.params.id));
            res.status(200).json(animal);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async getEndangeredAnimals(req, res) {
        try {
            const animals = await animalsService.getEndangeredAnimals();
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAnimalsByHabitat(req, res) {
        try {
            const animals = await animalsService.getAnimalsByHabitat(req.params.habitat);
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAnimalsBySpecies(req, res) {
        try {
            const species = req.query.species;
            const animals = await animalsService.getAnimalsBySpecies(species);
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addAnimal(req, res) {
        try {
            const newAnimal = req.body;
            const animal = await animalsService.addAnimal(newAnimal);
            res.status(201).json(animal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateAnimal(req, res) {
        try {
            const animalId = parseInt(req.params.id);
            const updates = req.body;
            const updatedAnimal = await animalsService.updateAnimal(animalId, updates);
            res.status(200).json(updatedAnimal);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteAnimal(req, res) {
        try {
            const animalId = parseInt(req.params.id);
            const result = await animalsService.deleteAnimal(animalId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AnimalsController;
