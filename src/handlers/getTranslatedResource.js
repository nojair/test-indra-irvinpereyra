const axios = require('axios');

const swapiEndpoint = 'https://swapi.py4e.com/api';

const translations = {
  title: 'título',
  episode_id: 'episodio_id',
  opening_crawl: 'rastreo_inicial',
  director: 'director',
  producer: 'productor',
  release_date: 'fecha_de_lanzamiento',
  name: 'nombre',
  height: 'altura',
  mass: 'peso',
  hair_color: 'color_de_cabello',
  skin_color: 'color_de_piel',
  eye_color: 'color_de_ojos',
  birth_year: 'año_de_nacimiento',
  gender: 'género',
  rotation_period: 'periodo_de_rotación',
  orbital_period: 'periodo_orbital',
  diameter: 'diámetro',
  climate: 'clima',
  gravity: 'gravedad',
  terrain: 'terreno',
  surface_water: 'agua_superficial',
  population: 'población',
  classification: 'clasificación',
  designation: 'designación',
  average_height: 'altura_promedio',
  skin_colors: 'colores_de_piel',
  hair_colors: 'colores_de_cabello',
  eye_colors: 'colores_de_ojos',
  average_lifespan: 'vida_promedio',
  language: 'lenguaje',
  model: 'modelo',
  manufacturer: 'fabricante',
  cost_in_credits: 'costo_en_créditos',
  length: 'longitud',
  max_atmosphering_speed: 'velocidad_atmosférica_máxima',
  crew: 'tripulación',
  passengers: 'pasajeros',
  cargo_capacity: 'capacidad_de_carga'
};

const translateProperties = (data) => {
  const translatedData = {};

  for (const key in data) {
    const translatedKey = translations[key] || key;
    translatedData[translatedKey] = data[key];
  }

  return translatedData;
};

module.exports.handler = async (event) => {
  try {
    const { resourceType, id } = event.pathParameters;

    const validResources = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];
    if (!validResources.includes(resourceType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Tipo de recurso inválido' })
      };
    }

    const response = await axios.get(`${swapiEndpoint}/${resourceType}/${id}`);

    if (!response.data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Recurso no encontrado' })
      };
    }

    const translatedData = translateProperties(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(translatedData)
    };
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response && error.response.data ? error.response.data.message : 'Error interno del servidor';

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message })
    };
  }
};
