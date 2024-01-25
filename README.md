# PicsSmart

# Setup

## python dependencies

```bash
conda env create -f picssmart-env.yaml
```

## post install

```bash
python -m spacy download en_core_web_sm
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$CONDA_PREFIX/lib/
```

# Development

## Docker for mongodb   

```bash
export UID=$(id -u) 
export GID=$(id -g)

docker-compose up -d mongo
docker-compose up -d mongo-express
```

## Running the dev server

- Add a `.env` file as in below format inside the `server` folder

```.env
mongo_db_host="localhost"
mongo_db_port=27017
mongo_db_user=<db_user>
mongo_db_password=<db_password>
mongo_db_database=<db_name>
mongo_db_auth=<db_auth>

qdrant_host=<qdrant_host>
qdrant_port=<qdrant_port>
qdrant_collection=<qdrant_collection>
```

- Create a folder called `data` and mount or copy some albums as folders and nested folders

```
uvicorn server.__main__:create_app --factory --reload
```

# Deployment

```
python -m server
```


# Clean DB entries

```bash
python clean.py
```

# Running the Client

- Add a `.env` file as in below format
```.env
REACT_APP_BASE_URL=<server url>
```
- Run `npm run dev`