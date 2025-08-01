const bloodGroups = [
  { label: 'A+', value: 'A_POSITIVE' },
  { label: 'A-', value: 'A_NEGATIVE' },
  { label: 'B+', value: 'B_POSITIVE' },
  { label: 'B-', value: 'B_NEGATIVE' },
  { label: 'AB+', value: 'AB_POSITIVE' },
  { label: 'AB-', value: 'AB_NEGATIVE' },
  { label: 'O+', value: 'O_POSITIVE' },
  { label: 'O-', value: 'O_NEGATIVE' },
];

const bloodGroup: Record<string, string> = {
  A_POSITIVE: 'A+',
  A_NEGATIVE: 'A-',
  B_POSITIVE: 'B+',
  B_NEGATIVE: 'B-',
  AB_POSITIVE: 'AB+',
  AB_NEGATIVE: 'AB-',
  O_POSITIVE: 'O+',
  O_NEGATIVE: 'O-',
};

const specializations = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Psychiatry', 'Gynecology', 'Urology', 'Ophthalmology', 'Oncology', 'Gastroenterology', 'Pulmonology', 'Endocrinology', 'Nephrology', 'Rheumatology', 'ENT', 'General Surgery', 'Internal Medicine', 'Anesthesiology', 'Radiology'];

const doctorDepartments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'Dermatology', 'Oncology', 'Psychiatry', 'ENT', 'Ophthalmology', 'Urology', 'Gastroenterology', 'Nephrology', 'Pulmonology', 'Endocrinology', 'General Medicine', 'General Surgery', 'Radiology', 'Anesthesiology', 'Rheumatology'];


export { bloodGroups, specializations, doctorDepartments, bloodGroup };