export interface RegisterRequest {
    user: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      email: string;
      vat: string;
      genderType: string; // Enum: MALE, FEMALE
      role: string;   // Enum: STUDENT, WARDEN
    };
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  