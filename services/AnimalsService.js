import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.resolve('data', 'animals.json');

const AnimalsService = {
    async getAllAnimals() {
        const data = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    },

    async getAnimalById(id) {
        const animals = await this.getAllAnimals();
        const animal = animals.find(a => a.id === id);
        if (!animal) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        return animal;
    },

    async getEndangeredAnimals() {
        const animals = await this.getAllAnimals();
        return animals.filter(a => a.isEndangered);
    },

    async getAnimalsByHabitat(habitat) {
        const animals = await this.getAllAnimals();
        return animals.filter(a => a.habitat.toLowerCase() === habitat.toLowerCase());
    },

    async getAnimalsBySpecies(species) {
        const animals = await this.getAllAnimals();
        return animals.filter(a => a.species.toLowerCase() === species.toLowerCase());
    },

    async addAnimal(newAnimal) {
        const animals = await this.getAllAnimals();
        const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
        const animal = { id, ...newAnimal };
        animals.push(animal);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animal;
    },

    async updateAnimal(id, updates) {
        const animals = await this.getAllAnimals();
        const index = animals.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals[index] = { ...animals[index], ...updates };
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animals[index];
    },

    async deleteAnimal(id) {
        const animals = await this.getAllAnimals();
        const index = animals.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals.splice(index, 1);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return { message: `Animal with id ${id} has been removed.` };
    }
};

export default AnimalsService;
