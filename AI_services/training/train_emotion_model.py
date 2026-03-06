from datasets import load_dataset
from transformers import ( DistilBertTokenizerFast, DistilBertForSequenceClassification,Trainer,DataCollatorWithPadding, TrainingArguments )
from sklearn.metrics import accuracy_score, f1_score

dataset = load_dataset("emotion")

tokenizer = DistilBertTokenizerFast.from_pretrained("distilbert-base-uncased")
def tokenize(batch):
    return tokenizer(batch["text"]  , truncation=True ,  max_length=128)
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

dataset = dataset.map(tokenize , batched=True)
 
dataset.set_format("torch" , columns=["input_ids" , "attention_mask" , "label"])

train_dataset = dataset["train"]
eval_dataset = dataset["validation"]

model = DistilBertForSequenceClassification.from_pretrained("distilbert-base-uncased" , num_labels = 6)

for param in model.distilbert.parameters():
    param.requires_grad = False

def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)

    acc = accuracy_score(labels , preds)
    f1 = f1_score(labels  , preds , average="weighted")

    return {"accuracy":acc , "f1score":f1}

training_args = TrainingArguments(
    output_dir="AI_services/model",
    learning_rate=5e-4,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=2,
    eval_strategy="epoch",
    save_strategy="epoch",
    # logging_steps=100,
    load_best_model_at_end=True,
    metric_for_best_model="f1score",
    report_to="none"
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    compute_metrics=compute_metrics ,
    data_collator=data_collator
)

trainer.train()
trainer.save_model("AI_services/model/emotion_classifier")
tokenizer.save_pretrained("AI_services/model/emotion_classifier")