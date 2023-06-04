package com.example.Project3.repositories;

import com.example.Project3.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findByEmailAndPassword(String email, String password);
}
