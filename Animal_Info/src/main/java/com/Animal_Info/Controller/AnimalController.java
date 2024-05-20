package com.Animal_Info.Controller;

import com.Animal_Info.Entity.Animal;
import com.Animal_Info.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/{id}")
    public Animal getAnimalById(@PathVariable Long id) {
        return animalService.getAnimalById(id);
    }

    @PostMapping
    public Animal saveAnimal(@RequestParam("name") String name,
                             @RequestParam("category") String category,
                             @RequestParam("image") MultipartFile image,
                             @RequestParam("description") String description,
                             @RequestParam("lifeExpectancy") String lifeExpectancy) throws IOException {
        Animal animal = new Animal();
        animal.setName(name);
        animal.setCategory(category);
        animal.setImage(image.getBytes());
        animal.setDescription(description);
        animal.setLifeExpectancy(lifeExpectancy);
        return animalService.saveAnimal(animal);
    }


    @PutMapping("/{id}")
    public Animal updateAnimal(@PathVariable Long id, @RequestBody Animal animal) throws IOException {
        Animal existingAnimal = animalService.getAnimalById(id);
        if (existingAnimal != null) {
            existingAnimal.setName(animal.getName());
            existingAnimal.setCategory(animal.getCategory());
            existingAnimal.setDescription(animal.getDescription());
            existingAnimal.setLifeExpectancy(animal.getLifeExpectancy());

            if (animal.getImage() != null && animal.getImage().length > 0) {
                existingAnimal.setImage(animal.getImage());
            }

            return animalService.saveAnimal(existingAnimal);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
    }
}