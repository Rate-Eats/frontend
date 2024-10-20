export const openGoogleMapAddress = (searchQuery: string) => {
  const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;

  window.open(url, '_blank');
};
