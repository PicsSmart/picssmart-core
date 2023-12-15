conn = new Mongo({ useUnifiedTopology: true });
db = conn.getDB("picssmart");


db.createCollection('albums');
db.createCollection('media');
