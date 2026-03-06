import torch 
import os
from transformers import (
    DistilBertTokenizerFast , 
    DistilBertForSequenceClassification ,
)


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
model_path = os.path.join(BASE_DIR, "model", "emotion_classifier")


tokenizer = DistilBertTokenizerFast.from_pretrained(model_path)

model = DistilBertForSequenceClassification.from_pretrained(model_path)
labels = ["sadness","joy" , "love" , "anger" , "fear" , "surprise"]

def predict_emotion(text):

    inputs = tokenizer(text  , return_tensors="pt", truncation=True)

    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits , dim=-1)
    predicted_class = torch.argmax(probs).item()
    confidence = probs[0][predicted_class].item()
    return {
        "emotion":labels[predicted_class]
        ,"confidence":confidence
    }

# thought = input("please enter a text to test the prediction of the emotion predicting model: ")
# res =predict_emotion(thought)

# print(f"the predicted emotion is {res.get("emotion")} \n this prediction have a confidence probability of {res.get("confidence")}")