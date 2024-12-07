import React from "react";

export default function DateDisplay() {
  const today = new Date(); // Get today's date
  const sevenDaysLater = new Date(today); // Clone the date object
  sevenDaysLater.setDate(today.getDate() + 7); // Add 7 days

  const formatDate = (date) => {
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <p>{formatDate(sevenDaysLater)}</p>
    </div>
  );
}
