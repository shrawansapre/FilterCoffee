export const convertToGeoJSON = (jsonData) => {
    return {
      type: 'FeatureCollection',
      features: jsonData.map(item => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat]
        },
        properties: {
          name: item.name
        }
      }))
    };
  }
  
  
  