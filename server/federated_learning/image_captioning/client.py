import tensorflow as tf
import flwr as fl
import torch
from server import conf

from server.federated_learning.image_captioning.Model import model, test, train
# from server.federated_learning.image_captioning.CaptioningDataset import train_dataloader, valid_dataloader

from collections import OrderedDict

import flwr as fl

EPOCS = conf.EPOCS_FEDERATED
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-5)

class FlowerClient(fl.client.NumPyClient):
        def get_parameters(self, config):
            return [val.cpu().numpy() for _, val in model.state_dict().items()]

        def set_parameters(self, parameters):
            params_dict = zip(model.state_dict().keys(), parameters)
            state_dict = OrderedDict({k: torch.Tensor(v) for k, v in params_dict})
            model.load_state_dict(state_dict, strict=True)

        def fit(self, parameters, config):
            self.set_parameters(parameters)
            print("Training Started...")
            train(1, model, train_dataloader, optimizer)
            print("Training Finished.")
            return self.get_parameters(config={}), len(train_dataloader), {}

        def evaluate(self, parameters, config):
            self.set_parameters(parameters)
            loss, accuracy = test(model, valid_dataloader)
            return float(loss), len(valid_dataloader), {"accuracy": float(accuracy)}
        
def start_client():
    print("Client is started")
    # fl.client.start_numpy_client(
    #     server_address=conf.server_address_federated, 
    #     client=FlowerClient(),
    #     grpc_max_message_length=2000000000
    # )