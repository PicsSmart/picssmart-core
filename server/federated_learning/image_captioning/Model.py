from transformers import BlipForConditionalGeneration, AutoProcessor
import torch
import os
import gc

DEVICE="cuda" if torch.cuda.is_available() else "cpu"

def train(epocs, model, loader, optimizer):
    model.train()
    for epoch in range(1, epocs+1):
        print("---------------------------------------")
        print("Epoch:", epoch)
        for idx, batch in enumerate(loader):
            # if idx == 3:
            #     break
            input_ids = batch.pop("input_ids").to(DEVICE)
            pixel_values = batch.pop("pixel_values").to(DEVICE)

            outputs = model(input_ids=input_ids,
                            pixel_values=pixel_values,
                            labels=input_ids)
            
            loss = outputs.loss
            print(f"Loss in batch {idx}: {loss.item()}")
            loss.backward()

            optimizer.step()
            optimizer.zero_grad()
    gc.collect()


@torch.no_grad()
def test(model, loader):
    model.eval()
    
    dataset_size = 0
    running_loss = 0.0
    correct_predictions = 0
    mis_predictions = 0
    
    for idx, batch in enumerate(loader):
        # if idx == 3:
        #     break
        print("---------------------------------------")
        print("Step:", idx)      
        input_ids = batch['input_ids'].to(DEVICE)
        pixel_values = batch['pixel_values'].to(DEVICE)
        
        batch_size = input_ids.size(0)

        outputs = model(input_ids=input_ids, 
                        pixel_values=pixel_values, 
                        labels=input_ids)
        logits = outputs.decoder_logits
        loss = outputs.loss
        print(f"Loss in batch {idx}: {loss.item()}")
        
        running_loss += (loss.item() * batch_size)
        dataset_size += batch_size
        predictions = torch.argmax(logits, dim=-1)
        correct_predictions += torch.sum(predictions == input_ids).item()
        mis_predictions += torch.sum(predictions != input_ids).item()
        epoch_accuracy = correct_predictions / (correct_predictions+mis_predictions)
        epoch_loss = running_loss / dataset_size
        print("Epoch Loss:", epoch_loss, "Epoch Accuracy:", epoch_accuracy)
    
    gc.collect()
    
    return epoch_loss, epoch_accuracy

if os.path.exists("captioning_model"):
    checkpoint_model = "captioning_model"
else:
    checkpoint_model = "Salesforce/blip-image-captioning-base"

if os.path.exists("captioning_processor"):
    checkpoint_processor = "captioning_processor"
else:
    checkpoint_processor = "Salesforce/blip-image-captioning-base"

processor = AutoProcessor.from_pretrained(checkpoint_processor)
model = BlipForConditionalGeneration.from_pretrained(checkpoint_model).to(DEVICE)

for vision_layer in list(list(model.children())[0].parameters()):
  vision_layer.requires_grad = False

optimizer = torch.optim.SGD(model.parameters(), lr=5e-5)
