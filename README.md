# Job Portal for Informal Workers

## Overview
This project is an open-source job portal designed to connect informal workers (e.g., cleaners, carpenters, plumbers) with potential clients such as households and businesses in Sri Lanka. The platform aims to bridge the employment gap by offering a centralized system for job postings, worker profiles, and client feedback.

## Features
- **Employee Profile:** Includes personal details, certifications, work history, and client reviews.
- **Job Vacancies:** Allows employers to post jobs with skill requirements, location, and budget.
- **Search & Matchmaking:** Smart matching of workers and jobs based on location and skills.
- **Admin Dashboard:** Controls for approving job posts and maintaining platform integrity.
- **Authentication:** Secured login using JWT.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS / Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Version Control:** GitHub

## Architecture
The platform follows the **Model-View-Controller (MVC)** architectural pattern:
- **Model:** Handles database operations and data logic.
- **View:** Manages UI and presentation.
- **Controller:** Manages application flow and user requests.

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-portal-informal-workers.git

   cd job-portal-informal-workers
   ```

2. Install dependencies in the both frontend and backend:
   ```bash
   cd job-portal-frontend
   npm install

   cd job-portal-backend
   npm install
   ```

3. Start the frontend
   ```
   npm run dev
   ```

4. Start the backend
   ``` 
   nodemon server.js
   ```


