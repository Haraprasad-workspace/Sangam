from datasets import load_dataset
from inference.predict import predict_emotion

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix
)

import numpy as np

# Load dataset
dataset = load_dataset("emotion")
test_data = dataset["test"]

true_labels = []
predicted_labels = []

label_map = ["sadness", "joy", "love", "anger", "fear", "surprise"]

print("\nRunning model evaluation...\n")

for sample in test_data:
    
    text = sample["text"]
    true_label = label_map[sample["label"]]

    prediction = predict_emotion(text)
    predicted_label = prediction["emotion"]

    true_labels.append(true_label)
    predicted_labels.append(predicted_label)

accuracy = accuracy_score(true_labels, predicted_labels)
# Accuracy: overall percentage of correct predictions made by the model

precision = precision_score(true_labels, predicted_labels, average="weighted")
# Precision: how many predicted emotions are actually correct (important for reducing false positives)

recall = recall_score(true_labels, predicted_labels, average="weighted")
# Recall: how many actual emotions the model successfully detected (important for reducing false negatives)

f1_weighted = f1_score(true_labels, predicted_labels, average="weighted")
# F1 Weighted: balanced score of precision and recall, weighted by class frequency

f1_macro = f1_score(true_labels, predicted_labels, average="macro")
# F1 Macro: average F1 across all emotions treating each class equally (good for class imbalance analysis)

cm = confusion_matrix(true_labels, predicted_labels)
# Confusion Matrix: table showing how predictions are distributed across true vs predicted classes

report = classification_report(true_labels, predicted_labels)
# Classification Report: detailed summary of precision, recall, and F1 for each emotion class

# Output
print("\n")
print("MODEL EVALUATION RESULTS")
print("\n")

print(f"Total Test Samples : {len(test_data)}")

print("\nPerformance Metrics")
print("\n")

print(f"Accuracy           : {accuracy:.4f}")
print(f"Precision (weighted): {precision:.4f}")
print(f"Recall (weighted)   : {recall:.4f}")
print(f"F1 Score (weighted) : {f1_weighted:.4f}")
print(f"F1 Score (macro)    : {f1_macro:.4f}")

print("\nClassification Report")
print("\n")
print(report)

print("\nConfusion Matrix")
print("\n")
print(cm)

