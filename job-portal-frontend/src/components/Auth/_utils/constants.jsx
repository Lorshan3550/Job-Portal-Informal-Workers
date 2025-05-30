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

  export const sriLankaProvinces = [
    {
      province: "western",
      districts: ["colombo", "gampaha", "kalutara"]
    },
    {
      province: "central",
      districts: ["kandy", "matale", "nuwara eliya"]
    },
    {
      province: "southern",
      districts: ["galle", "matara", "hambantota"]
    },
    {
      province: "northern",
      districts: ["jaffna", "kilinochchi", "mannar", "mullaitivu", "vavuniya"]
    },
    {
      province: "eastern",
      districts: ["trincomalee", "batticaloa", "ampara"]
    },
    {
      province: "north western",
      districts: ["kurunegala", "puttalam"]
    },
    {
      province: "north central",
      districts: ["anuradhapura", "polonnaruwa"]
    },
    {
      province: "uva",
      districts: ["badulla", "monaragala"]
    },
    {
      province: "sabaragamuwa",
      districts: ["ratnapura", "kegalle"]
    }
];


export const workTypes = [
  "Part Time", 
  "Full Time", 
  "Contract", 
  "Permanent"
]

export const jobSkills = [
   "Housekeeping",
   "Childcare",
   "Elderly Care",
   "Gardening",
   "Packing and Moving",
   "Pest Control",
   "Delivery Driving",
   "Vehicle Maintenance",
   "Navigation",
   "Courier Services",
   "Farm Work",
   "Livestock Care",
   "Harvesting",
   "Irrigation Management",
   "Hair Styling",
   "Barbering",
   "Makeup Application",
   "Beauty Treatments",
   "Spa Therapies",
   "Event Decoration",
   "Catering",
   "Photography",
   "Floral Arranging",
          "Music/DJ Services",
          "Appliance Repair",
          "Mobile Phone Repair",
          "Computer/Laptop Repair",
          "Furniture Repair",
          "Appliance Repair",
          "Mobile Phone Repair",
          "Computer/Laptop Repair",
          "Furniture Repair",
          "Tailoring",
          "Embroidery",
          "Upholstery",
          "Handicraft Making",
          "Private Tutoring",
          "Vocational Training",
          "Dance Instruction",
          "Sports Coaching",
          "Cooking",
          "Serving",
          "Bartending",
          "Cleaning",
          "Graphic Design",
          "Web Development",
          "Social Media Management",
          "Content Creation",
          "Data Entry",
          "Physiotherapy",
          "Yoga Instruction",
          "Fitness Training",
          "Massage Therapy",
          "Machine Operation",
          "Fabrication",
          "Crane Operation",
          "Warehouse Packing",
          "Garbage Collection",
          "Scrap Collection",
          "Recycling Work",
          "E-Waste Handling",
          "Pet Grooming",
          "Pet Sitting",
          "Shoe Repair",
          "Cobbling",
          "Plumbing",
        "Electrical Work",
        "Carpentry",
        "Masonry",
        "Painting",
        "Welding",
        "Tiling",
        "Heating, Ventilation, and Air Conditioning (HVAC)",
          "Other"

        


].map((skill) => skill.toLowerCase())

  export const jobCategories = [
    {
      name: "Construction and Maintenance",
      skills: [
        "Plumbing",
        "Electrical Work",
        "Carpentry",
        "Masonry",
        "Painting",
        "Welding",
        "Tiling",
        "Heating, Ventilation, and Air Conditioning (HVAC)"
      ],
      workRoles: [
        "Plumber",
        "Electrician",
        "Carpenter",
        "Mason",
        "Painter",
        "Welder",
        "Tiler",
        "HVAC Technician"
      ]
    },
    {
      name: "Home Services",
      skills: [
        "Housekeeping",
        "Childcare",
        "Elderly Care",
        "Gardening",
        "Packing and Moving",
        "Pest Control"
      ],
      workRoles: [
        "Housekeeper",
        "Babysitter/Nanny",
        "Elderly Caregiver",
        "Gardener",
        "Mover/Packer",
        "Pest Control Worker"
      ]
    },
    {
      name: "Transportation and Delivery",
      skills: [
        "Delivery Driving",
        "Vehicle Maintenance",
        "Navigation",
        "Courier Services"
      ],
      workRoles: [
        "Delivery Driver",
        "Taxi/Three-Wheeler Driver",
        "Bike Rider",
        "Vehicle Mechanic"
      ]
    },
    {
      name: "Agriculture and Farming",
      skills: [
        "Farm Work",
        "Livestock Care",
        "Harvesting",
        "Irrigation Management"
      ],
      workRoles: [
        "Farm Laborer",
        "Livestock Caretaker",
        "Harvester",
        "Irrigation Worker"
      ]
    },
    {
      name: "Beauty and Personal Care",
      skills: [
        "Hair Styling",
        "Barbering",
        "Makeup Application",
        "Beauty Treatments",
        "Spa Therapies"
      ],
      workRoles: [
        "Hairdresser",
        "Barber",
        "Beautician",
        "Makeup Artist",
        "Spa Therapist"
      ]
    },
    {
      name: "Event Services",
      skills: [
        "Event Decoration",
        "Catering",
        "Photography",
        "Floral Arranging",
        "Music/DJ Services"
      ],
      workRoles: [
        "Event Decorator",
        "Caterer",
        "Photographer/Videographer",
        "Florist",
        "Musician/Band",
        "DJ"
      ]
    },
    {
      name: "Repairs and Maintenance",
      skills: [
        "Appliance Repair",
        "Mobile Phone Repair",
        "Computer/Laptop Repair",
        "Furniture Repair"
      ],
      workRoles: [
        "Appliance Repair Technician",
        "Mobile Phone Repair Technician",
        "Computer/Laptop Repair Technician",
        "Furniture Repair Worker"
      ]
    },
    {
      name: "Tailoring and Crafting",
      skills: [
        "Tailoring",
        "Embroidery",
        "Upholstery",
        "Handicraft Making"
      ],
      workRoles: [
        "Tailor",
        "Embroiderer",
        "Upholsterer",
        "Handicraft Maker"
      ]
    },
    {
      name: "Educational and Training Services",
      skills: [
        "Private Tutoring",
        "Vocational Training",
        "Dance Instruction",
        "Sports Coaching"
      ],
      workRoles: [
        "Private Tutor",
        "Vocational Trainer",
        "Dance Instructor",
        "Sports Coach"
      ]
    },
    {
      name: "Hospitality and Catering",
      skills: [
        "Cooking",
        "Serving",
        "Bartending",
        "Cleaning"
      ],
      workRoles: [
        "Cook/Chef",
        "Waitstaff",
        "Bartender",
        "Cleaner"
      ]
    },
    {
      name: "Technology and Digital Services",
      skills: [
        "Graphic Design",
        "Web Development",
        "Social Media Management",
        "Content Creation",
        "Data Entry"
      ],
      workRoles: [
        "Freelance Graphic Designer",
        "Website Developer",
        "Social Media Manager",
        "Content Creator/Writer",
        "Data Entry Specialist"
      ]
    },
    {
      name: "Health and Wellness",
      skills: [
        "Physiotherapy",
        "Yoga Instruction",
        "Fitness Training",
        "Massage Therapy"
      ],
      workRoles: [
        "Physiotherapist",
        "Yoga Instructor",
        "Fitness Trainer",
        "Massage Therapist"
      ]
    },
    {
      name: "Skilled Labor",
      skills: [
        "Machine Operation",
        "Fabrication",
        "Crane Operation",
        "Warehouse Packing"
      ],
      workRoles: [
        "Machine Operator",
        "Welder/Fabricator",
        "Crane Operator",
        "Warehouse Packer"
      ]
    },
    {
      name: "Waste Management and Recycling",
      skills: [
        "Garbage Collection",
        "Scrap Collection",
        "Recycling Work",
        "E-Waste Handling"
      ],
      workRoles: [
        "Garbage Collector",
        "Scrap Collector",
        "Recycling Worker",
        "E-Waste Handler"
      ]
    },
    {
      name: "Other Specialized Services",
      skills: [
        "Pet Grooming",
        "Pet Sitting",
        "Shoe Repair",
        "Cobbling"
      ],
      workRoles: [
        "Pet Groomer",
        "Pet Sitter",
        "Shoemaker",
        "Cobbler"
      ]
    },
    {
      name: "Other",
      skills: [
        "Other",
      ],
      workRoles: [
        "Other",
      ]
    }
  ];
  

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