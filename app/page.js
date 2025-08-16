'use client'; 

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '../lib/formSchema'; // We import the rulebook
import { submitOnboardingForm } from '../lib/onboardService'; // We import the sending function

// The main part of our web page that shows the form.
export default function FormPage() {
  // We use these to show success or error messages to the user.
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // This is the main tool that handles the form.
  const {
    register, // A function to connect inputs to our tool
    handleSubmit, // The function that runs when the form is submitted
    formState: { errors, isSubmitting }, // Tells us if there are errors or if the form is busy
    reset, // A function to clear the form fields
  } = useForm({
    resolver: zodResolver(formSchema), // We tell it to use our rulebook
    defaultValues: { // This sets the starting values for all the fields
      fullName: '',
      email: '',
      companyName: '',
      services: [],
      budgetUsd: '',
      projectStartDate: '',
      acceptTerms: false,
    },
  });

  // This function runs when the user clicks "Submit" and everything is valid.
  const onSubmit = async (data) => {
    // First, clear any old messages
    setSuccessMessage(null);
    setErrorMessage(null);

    // Now, we call the function to send the data
    const result = await submitOnboardingForm(data);

    if (result.success) {
      // If it worked, show the success message and clear the form
      setSuccessMessage(result.message);
      reset();
    } else {
      // If there was a problem, show the error message
      setErrorMessage(result.message);
    }
  };

  // This is the part that creates what you see on the screen.
  // It's a mix of HTML and JavaScript.
  return (
    <>
      <div style={{
        maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.05)', backgroundColor: '#fff'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Client Onboarding</h1>

        {/* Show the error message if it exists */}
        {errorMessage && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #f5c6cb' }}>{errorMessage}</div>
        )}
        {/* Show the success message if it exists */}
        {successMessage && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #c3e6cb' }}>{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: 'grid', gap: '20px' }}>
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              disabled={isSubmitting}
              placeholder="e.g., Ada Lovelace" /* Example typing text */
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.fullName ? '1px solid #dc3545' : '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
            />
            {errors.fullName && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              disabled={isSubmitting}
              placeholder="e.g., ada@example.com" /* Example typing text */
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.email ? '1px solid #dc3545' : '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
            />
            {errors.email && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.email.message}</p>
            )}
          </div>

          {/* Company Name Field */}
          <div>
            <label htmlFor="companyName" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Company Name</label>
            <input
              id="companyName"
              type="text"
              {...register('companyName')}
              disabled={isSubmitting}
              placeholder="e.g., Analytical Engines Ltd" /* Example typing text */
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.companyName ? '1px solid #dc3545' : '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
            />
            {errors.companyName && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.companyName.message}</p>
            )}
          </div>

          {/* Services Checkboxes */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Services interested in</label>
            {['UI/UX', 'Branding', 'Web Dev', 'Mobile App'].map((service) => (
              <div key={service} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  id={`service-${service}`}
                  type="checkbox"
                  value={service}
                  {...register('services')}
                  disabled={isSubmitting}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor={`service-${service}`} style={{ fontWeight: 'normal' }}>{service}</label>
              </div>
            ))}
            {errors.services && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.services.message}</p>
            )}
          </div>

          {/* Budget Field */}
          <div>
            <label htmlFor="budgetUsd" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Budget (USD)</label>
            <input
              id="budgetUsd"
              type="number"
              {...register('budgetUsd', { valueAsNumber: true })}
              disabled={isSubmitting}
              placeholder="e.g., 50000" /* Example typing text */
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.budgetUsd ? '1px solid #dc3545' : '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
            />
            {errors.budgetUsd && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.budgetUsd.message}</p>
            )}
          </div>

          {/* Project Start Date Field */}
          <div>
            <label htmlFor="projectStartDate" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Project start date</label>
            <input
              id="projectStartDate"
              type="date"
              {...register('projectStartDate')}
              disabled={isSubmitting}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: errors.projectStartDate ? '1px solid #dc3545' : '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}
            />
            {errors.projectStartDate && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.projectStartDate.message}</p>
            )}
          </div>

          {/* Accept Terms Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              disabled={isSubmitting}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor="acceptTerms" style={{ fontWeight: 'normal' }}>I accept the terms and conditions.</label>
            {errors.acceptTerms && (
              <p style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px' }}>{errors.acceptTerms.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting} // The button is disabled while the form is submitting
            style={{
              padding: '12px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? '0.7' : '1',
              transition: 'opacity 0.2s ease-in-out',
              boxShadow: '0 4px 6px rgba(0, 123, 255, 0.2)'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}
