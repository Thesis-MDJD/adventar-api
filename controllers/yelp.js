import axios from 'axios';

export const getBusinessById = async (req, res) => {
  try {
    const key = process.env.REST_API_KEY;
    if (key !== req.query.API_KEY) {
      res.status(403).send('Invalid request');
    } else {
      const data = await yelpRequest(`${req.params.id}`);
      res.json(data);
    }
  } catch (err) {
    console.log('getBusinessById', err);
    res.status(400).send(err);
  }
};

export const getNearby = async (req, res) => {
  try {
    const lat = req.query.latitude;
    const long = req.query.longitude;
    const key = process.env.REST_API_KEY;
    const radius = 1609; // 1 mile
    if (key !== req.query.API_KEY) {
      res.status(403).send('Invalid request');
    } else if (lat && long) {
      const data = await yelpRequest(`search?term=food&latitude=${lat}&longitude=${long}&radius=${radius}&limit=50&sort_by=distance`);
      res.json(data);
    } else {
      res.status(400).send('Invalid coords');
    }
  } catch (err) {
    console.log('getNearby', err);
    res.status(400).send(err);
  }
};

async function yelpRequest(urlSuffix) {
  const token = process.env.YELP_API_KEY;
  try {
    if (!token) {
      throw 'No token';
    }
    const response = await axios({
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/' + urlSuffix,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return response.data;
  } catch (err) {
    console.log('error in yelp request:', err);
    throw err;
  }
}