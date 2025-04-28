// utils/formatDate.js

export function formatDate(isoString) {
    const date = new Date(isoString);
  
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: true,
    };
  
    return date.toLocaleString('en-US', options);
  }
  