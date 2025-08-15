package com.hms.profile.dto;

import java.time.LocalDate;

import com.hms.profile.entity.Doctor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private long id;
    private String name;
    private String email;
    private LocalDate dob;
    private String phone;
    private String address;
    private String licenseNo;
    private String specialization;
    private String department;
    private Integer experience;

    public Doctor toEntity(){
        return new Doctor(this.id, this.name, this.email, this.dob, this.phone, this.address, this.licenseNo, this.specialization, this.department, this.experience);
    }
}
