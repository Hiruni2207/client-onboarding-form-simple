// This file handles the communication with the outside world.
// It now includes a fix to handle the placeholder URL in the assignment.

export async function submitOnboardingForm(data) {
  // This is the website address we will send the data to.
  const ONBOARD_URL = process.env.NEXT_PUBLIC_ONBOARD_URL || 'https://example.com/api/onboard';

  // --- START OF FIX ---
  // If the URL is the fake "example.com" address, we will simulate a successful response.
  // This prevents the "Failed to fetch" error and allows you to see the success message.
  if (ONBOARD_URL.includes('example.com')) {
    console.log('Using placeholder URL. Simulating a successful submission.', data);
    // We use a small delay to pretend a network request is happening.
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, message: 'Form submitted successfully! (Simulated)' };
  }
  // --- END OF FIX ---

  try {
    // The "fetch" command sends the data.
    const response = await fetch(ONBOARD_URL, {
      method: 'POST', // We are "posting" or sending the data
      headers: {
        'Content-Type': 'application/json', // We tell the website we are sending JSON data
      },
      body: JSON.stringify(data), // We turn our form data into JSON text
    });

    // We check if the website responded with a "success" code (like 200).
    if (response.ok) {
      return { success: true, message: 'Form submitted successfully!' };
    } else {
      // If there was a problem with the website's response, we show an error.
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Failed to submit the form. Please check your data and try again.';
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    // If there was a network error (like no internet), we show a different error.
    console.error('Submission error:', error);
    return { success: false, message: 'A network error occurred. Please check your internet connection.' };
  }
}