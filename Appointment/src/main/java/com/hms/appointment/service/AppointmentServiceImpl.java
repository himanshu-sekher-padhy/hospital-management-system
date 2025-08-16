package com.hms.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.DoctorDTO;
import com.hms.appointment.dto.PatientDTO;
import com.hms.appointment.dto.Status;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ApiService apiService;
    
    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HmsException {
        Boolean doctorExists= apiService.doctorExists(appointmentDTO.getDoctorId()).block();
        if (doctorExists == null || !doctorExists) {
            throw new HmsException("DOCTOR_NOT_FOUND");
        }
        Boolean patientExists= apiService.patientExists(appointmentDTO.getPatientId()).block();
        if (patientExists == null || !patientExists) {
            throw new HmsException("PATIENT_NOT_FOUND");
        }
        appointmentDTO.setStatus(Status.SCHEDULED);
        return appointmentRepository.save(appointmentDTO.toEntity()).getId();
    }

    @Override
    public void cancelAppointment(Long appointmentId) throws HmsException {
       Appointment appointment= appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND"));
       if(appointment.getStatus().equals(Status.CANCELED)) {
        throw new HmsException("APPOINTMENT_ALREADY_CANCELED");
       }
       appointment.setStatus(Status.CANCELED);
       appointmentRepository.save(appointment);
    }

    @Override
    public void completeAppointment(Long appointmentId) {
       
    }

    @Override
    public void rescheduleAppointment(Long appointmentId, String newDateTime) {
        
    }

    @Override
    public AppointmentDTO getAppointmentDetails(Long appointmentId) throws HmsException {
        return appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AppointmentDetails getAppointmentDetailsWithName(Long appointmentId) throws HmsException {
        AppointmentDTO appointmentDTO= appointmentRepository.findById(appointmentId).orElseThrow(()-> new HmsException("APPOINTMENT_NOT_FOUND")).toDTO();
        DoctorDTO doctorDTO= apiService.getDoctorById(appointmentDTO.getDoctorId()).block();
        PatientDTO patientDTO= apiService.getPatientById(appointmentDTO.getPatientId()).block();

        return new AppointmentDetails(appointmentDTO.getId(), appointmentDTO.getPatientId(), patientDTO.getName(), patientDTO.getEmail(), patientDTO.getPhone(), appointmentDTO.getDoctorId(), doctorDTO.getName(), appointmentDTO.getAppointmentTime(), appointmentDTO.getStatus(), appointmentDTO.getReason(), appointmentDTO.getNotes()); 
    }
    
}
