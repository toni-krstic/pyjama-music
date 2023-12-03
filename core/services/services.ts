export const getCountry = async () => {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_IPIFY_API_KEY}`
    );
    if (response.ok) {
      const result = await response.json();
      return result.location.country;
    }
  } catch (err) {
    return err;
  }
};

export const serviceUrl = {
  country: (countryCode: string) =>
    `https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-${countryCode}`,
  artist: (artistId: string) =>
    `https://shazam.p.rapidapi.com/artists/get-top-songs?id=${artistId}`,
  genre: (genre: string) =>
    `https://shazam.p.rapidapi.com/charts/track?listId=${genre}`,
  search: (searchTerm: string) =>
    `https://shazam.p.rapidapi.com/search?term=${searchTerm}`,
  topCharts: () => `https://shazam.p.rapidapi.com/charts/track`,
};

export const getSongs = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY as string,
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    return err;
  }
};
