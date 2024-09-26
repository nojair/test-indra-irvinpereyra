# test-indra-irvinpereyra API

# TRAER RECURSO DE SWAPI:

GET https://02xqbmot6f.execute-api.us-east-1.amazonaws.com/dev/swapi/{resourcetype}/{id}
resourcetype: tipo de recurso de SWAPI
id: el id de un recurso en SWAPI

# GUARDAR UN RECURSO DE SWAPI CON LAS PROPIEDADES TRADUCIDAS

POST https://02xqbmot6f.execute-api.us-east-1.amazonaws.com/dev/entities
BODY: un recurso (puede ser todo el objeto) devuelto por en endpoint anterior

# VERIFICAR UN RECURSO GUARDADO CON EL PARÁMETRO DEVUELTO POR EL ENDPOINT ANTERIOR

GET https://02xqbmot6f.execute-api.us-east-1.amazonaws.com/dev/entities/{ENTITY_ID}