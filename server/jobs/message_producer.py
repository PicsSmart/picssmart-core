from server.jobs import producer

def send_message(topic, message):
    producer.send(topic, message)
    producer.flush()