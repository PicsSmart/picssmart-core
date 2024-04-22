from apscheduler.schedulers.background import BackgroundScheduler
from kafka import KafkaProducer
import json

from server.federated_learning.image_captioning.client import start_client

scheduler = BackgroundScheduler()

scheduler.add_job(start_client, 'cron', hour=0, minute=0, second=0) #TODO: Determine the time to start the client

producer = KafkaProducer(
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)