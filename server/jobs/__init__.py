from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import start_client

scheduler = BackgroundScheduler()

scheduler.add_job(start_client, 'cron', hour=0, minute=0, second=0)