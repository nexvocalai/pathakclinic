package com.pathak.clinic.repository;

import com.pathak.clinic.entity.Disease;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DiseaseRepository extends JpaRepository<Disease, UUID> {
    Optional<Disease> findBySlug(String slug);
    Page<Disease> findByCategoryIgnoreCase(String category, Pageable pageable);

    @Query("select distinct d from Disease d left join d.symptoms s where lower(d.name) like lower(concat('%', :q, '%')) or lower(d.description) like lower(concat('%', :q, '%')) or lower(s) like lower(concat('%', :q, '%'))")
    List<Disease> search(@Param("q") String query);
}
