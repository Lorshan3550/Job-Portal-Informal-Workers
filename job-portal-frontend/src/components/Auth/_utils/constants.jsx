// export const provinces = {
//     Western: ["Colombo", "Gampaha", "Kalutara"],
//     Central: ["Kandy", "Matale", "Nuwara Eliya"],
//     Southern: ["Galle", "Matara", "Hambantota"],
//     Northern: ["Jaffna", "Kilinochchi", "Mullaitivu", "Vavuniya", "Mannar"],
//     Eastern: ["Batticaloa", "Ampara", "Trincomalee"],
//     Uva: ["Badulla", "Monaragala"],
//     Sabaragamuwa: ["Ratnapura", "Kegalle"],
//     NorthWestern: ["Kurunegala", "Puttalam"],
//     NorthCentral: ["Anuradhapura", "Polonnaruwa"],
//   };

  export const provinces = Object.fromEntries(
    Object.entries({
      Western: ["Colombo", "Gampaha", "Kalutara"],
      Central: ["Kandy", "Matale", "Nuwara Eliya"],
      Southern: ["Galle", "Matara", "Hambantota"],
      Northern: ["Jaffna", "Kilinochchi", "Mullaitivu", "Vavuniya", "Mannar"],
      Eastern: ["Batticaloa", "Ampara", "Trincomalee"],
      Uva: ["Badulla", "Monaragala"],
      Sabaragamuwa: ["Ratnapura", "Kegalle"],
      NorthWestern: ["Kurunegala", "Puttalam"],
      NorthCentral: ["Anuradhapura", "Polonnaruwa"],
    }).map(([key, value]) => [
      key.toLowerCase(),
      value.map((v) => v.toLowerCase()),
    ])
  );
  

  export const educationLevels = [
    "School Leaver",
    "Ordinary Level",
    "Advanced Level",
    "Certification Level",
    "Diploma Level",
    "Higher Education",
  ]
  
  export const gender = ["Male", "Female", "Other"]
  
  export const jobExperience = [
    "No Experience/Fresher",
    "1-2 years",
    "2-4 years",
    "More than 4 years",
  ]
  
  export const profiencyLevels = ["Excellent", "Good", "Fair", "Poor"]
  
  export const jobPostStatus = ["Pending", "Accepted", "Rejected"]