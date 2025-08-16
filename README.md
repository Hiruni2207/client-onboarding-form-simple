# 🌐 Client Onboarding Form

This is a simple **client onboarding form** built with **Next.js (App Router)** that demonstrates core web development skills.  
It uses **React Hook Form** for state management and **Zod** for robust data validation.

---

## Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Hiruni2207/client-onboarding-form-simple
cd client-onboarding-form-simple
```
### 2. Install Dependencies
This command installs all the necessary libraries, including Next.js, React Hook Form, and Zod.
```bash
npm install
```
### 3. Set Up Environment Variables
Create a file named .env.local in the root of our project.
This file holds the API endpoint.
```env
NEXT_PUBLIC_ONBOARD_URL=https://example.com/api/onboard
```
### 4. Run the Project
```bash
npm run dev
```
Open browser and navigate to http://localhost:3000 to see the form.

## File Structure

The project is organized to keep the code clean and easy to manage:

- **`app/page.js`** → Main page component that renders the form UI, handles state, and calls external functions.  
- **`lib/formSchema.js`** → Contains all validation rules defined using Zod (separated for cleaner code).  
- **`lib/onboardService.js`** → Contains the logic for sending form data to the API. Includes a fix to simulate successful submission when using the placeholder URL.  

---

## Technical Choices & Implementation

### React Hook Form (RHF) + Zod Integration
- RHF manages the form efficiently.  
- The `useForm` hook is configured with **Zod** as the resolver.  
- Validation errors are tied directly to the corresponding form fields.  

### Form UX & Accessibility
- **Inline Errors**: Validation errors appear immediately below input fields.  
- **Disabled Submit Button**: Prevents multiple submissions during processing.  
- **Keyboard Navigability**: All fields are accessible with visible focus states.  
- **Modern Design**: Clean design with white background, black font, and rounded corners.  
- **Placeholder Text**: Guides users with example inputs.  

### Submission Behavior & Error Handling
- The `onSubmit` function calls a separate service to POST data.  
- Handles both **success (2xx)** and **error (non-2xx or network)** responses.  
- Displays a clear success/error message at the top of the form.  
- Special handling for the placeholder URL avoids the common **"Failed to fetch"** error during testing.  

---

## Summary of Design Choices
- Logic is separated into `formSchema.js` and `onboardService.js` for maintainability.  
- The `page.js` file remains focused on the UI.  
- Inline styles were used for simplicity, but for production a CSS framework (e.g., **TailwindCSS**) would be better.  
- Placeholder URL handling improves developer experience during testing.  

---