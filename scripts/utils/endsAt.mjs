export function formatTimeDifference(endsAt) {
  const currentTime = new Date();
  const endTime = new Date(endsAt);
  const timeDifference = endTime - currentTime;

  if (timeDifference <= 0) {
    return "Auction is over";
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months >= 1) {
    return `Ends in: ${months} month${months > 1 ? 's' : ''}`;
  } else if (weeks >= 2) {
    return `Ends in: ${weeks} weeks`;
  } else if (weeks === 1) {
    return "Ends in: 1 week";
  } else if (days >= 2) {
    return `Ends in: ${days} days`;
  } else if (days === 1) {
    return "Ends in: 1 day";
  } else if (hours >= 1) {
    return `Ends in: ${hours} hours`;
  } else if (minutes >= 1) {
    return `Ends in: ${minutes} minutes`;
  } else {
    return `Ends in: ${seconds} seconds`;
  }
}