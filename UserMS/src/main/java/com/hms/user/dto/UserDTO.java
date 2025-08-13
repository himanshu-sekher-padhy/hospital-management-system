package com.hms.user.dto;

import com.hms.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
     private long id;
     @NotBlank(message = "username cannot be blank")
    private String name;
    @NotBlank(message = "email cannot be blank")
    @Email(message= "Email should be valid")
    private String email;
    @NotBlank(message = "password cannot be blank")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$", message= "Password should contain atleast 1 uppercase, 1 lowercase, 1 digit, 1 special character and should contain atleast 8 characters")
    private String password;
    private Roles role;
    private Long profileId;
    
    public User toEntity(){
        return new User(this.id, this.name, this.email, this.password, this.role, this.profileId);
    }
}
