export function formatTimeDifference(endsAt) {
  const currentTime = new Date();
  const endTime = new Date(endsAt);
  const timeDifference = endTime - currentTime;

  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  return `Ends in: ${hoursDifference} hours`;
}