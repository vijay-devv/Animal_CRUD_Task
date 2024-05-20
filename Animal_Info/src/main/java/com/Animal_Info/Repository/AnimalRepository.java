package com.Animal_Info.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Animal_Info.Entity.Animal;


public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
