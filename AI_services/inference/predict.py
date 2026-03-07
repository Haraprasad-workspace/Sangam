import torch
from transformers import (
    DistilBertTokenizerFast,
    DistilBertForSequenceClassification
)

model_name = "iamHarii22/emotion-distilbert"

tokenizer = DistilBertTokenizerFast.from_pretrained(model_name)
model = DistilBertForSequenceClassification.from_pretrained(model_name)

labels = ["sadness", "joy", "love", "anger", "fear", "surprise"]


def predict_emotion(text):

    inputs = tokenizer(text, return_tensors="pt", truncation=True)

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)

    predicted_class = torch.argmax(probs).item()
    confidence = probs[0][predicted_class].item()

    return {
        "emotion": labels[predicted_class],
        "confidence": confidence
    }