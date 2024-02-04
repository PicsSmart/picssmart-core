from torch.utils.data import Dataset, DataLoader
from server.federated_learning.image_captioning.Model import processor
from datasets import load_dataset
import os

class ImageCaptioningDataset(Dataset):
    def __init__(self, dataset, processor):
        self.dataset = dataset
        self.processor = processor

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        item = self.dataset[idx]
        encoding = self.processor(images=item["image"], text=item["text"], padding="max_length", return_tensors="pt")
        # remove batch dimension
        encoding = {k:v.squeeze() for k,v in encoding.items()}
        return encoding

datafolder = "data"
folder_path = os.path.join(os.getcwd(), datafolder)
dataset = load_dataset("imagefolder", data_dir=folder_path)["train"].train_test_split(test_size=0.2)

# Create Dataset objects for training and validation
train_dataset = ImageCaptioningDataset(dataset['train'], processor)
valid_dataset = ImageCaptioningDataset(dataset['test'], processor)

train_dataloader = DataLoader(train_dataset, shuffle=True, batch_size=2)
valid_dataloader = DataLoader(valid_dataset, shuffle=True, batch_size=2)