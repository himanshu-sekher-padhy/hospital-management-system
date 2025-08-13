package com.hms.user.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Column(unique=true)
    private String email;
    private String password;
    private Roles role;
    private Long profileId;
    
    public UserDTO toDTO(){
        return new UserDTO(this.id, this.name, this.email, this.password, this.role, this.profileId);
    }
}
