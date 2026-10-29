package com.officeflow.backend.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "desks")
public class Desk {

    @Id
    private Long id;

    private String code;

    private Integer floor;

    private String zone;

    @ElementCollection
    private List<String> features;

    public Desk() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }
}