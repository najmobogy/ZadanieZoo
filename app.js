import express from 'express';
import animalsController from './controllers/AnimalsController.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoints
app.get("/animals", animalsController.getAllAnimals);
app.get("/animals/:id", animalsController.getAnimalById);
app.get("/animals/endangered", animalsController.getEndangeredAnimals);
app.get("/animals/habitat/:habitat", animalsController.getAnimalsByHabitat);
app.get("/animals/species", animalsController.getAnimalsBySpecies); // Query param
app.post("/animals", animalsController.addAnimal);
app.put("/animals/:id", animalsController.updateAnimal);
app.delete("/animals/:id", animalsController.deleteAnimal);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
