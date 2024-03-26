export const formatDate = (date: string): string => {
  const currentDate = new Date();
  const providedDate = new Date(date);
  const timeDifference = currentDate.getTime() - providedDate.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutes < 1) {
    return '1 minute ago';
  }

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  if (currentDate.getDate() - providedDate.getDate() === 1) {
    return `Yesterday ${providedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return providedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
