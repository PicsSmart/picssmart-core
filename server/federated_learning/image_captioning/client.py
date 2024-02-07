import tensorflow as tf
import flwr as fl
import torch
from server import conf
import asyncio
import logging

from server.federated_learning.image_captioning.Model import model, test, train
from server.federated_learning.image_captioning.CaptioningDataset import load_dataloaders
from server.federated_learning.image_captioning.prepare_dataset import prepate_csv

from collections import OrderedDict

import flwr as fl

LOG = logging.getLogger(__name__)
EPOCS = conf.EPOCS_FEDERATED
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

class FlowerClient(fl.client.NumPyClient):
    
        def __init__(self):
            self.train_dataloader, self.valid_dataloader = load_dataloaders()
        
        def get_parameters(self, config):
            return [val.cpu().numpy() for _, val in model.state_dict().items()]

        def set_parameters(self, parameters):
            params_dict = zip(model.state_dict().keys(), parameters)
            state_dict = OrderedDict({k: torch.Tensor(v) for k, v in params_dict})
            model.load_state_dict(state_dict, strict=True)

        def fit(self, parameters, config):
            self.set_parameters(parameters)
            LOG.debug("Training Started...")
            train(1, model, self.train_dataloader, optimizer)
            LOG.debug("Training Finished.")
            return self.get_parameters(config={}), len(self.train_dataloader), {}

        def evaluate(self, parameters, config):
            self.set_parameters(parameters)
            loss, accuracy = test(model, self.valid_dataloader)
            return float(loss), len(self.valid_dataloader), {"accuracy": float(accuracy)}
        
def start_client():
    asyncio.run(prepate_csv())
    LOG.debug("Starting Federated Client...")
    fl.client.start_numpy_client(
        server_address=conf.server_address_federated, 
        client=FlowerClient(),
        grpc_max_message_length=2000000000
    )