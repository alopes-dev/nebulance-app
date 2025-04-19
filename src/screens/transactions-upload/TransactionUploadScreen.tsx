import { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import FileSourceCard from "@/components/upload/FileSourceCard";
import TransactionPreviewItem from "@/components/upload/TransactionPreviewItem";
import FieldMappingItem from "@/components/upload/FieldMappingItem";
import type { Transaction } from "@/types";

import * as S from "./TransactionUploadScreen.styles";

// Mock data for transaction preview
const mockTransactions: Partial<Transaction>[] = [
  {
    title: "Grocery Shopping",
    amount: -85.75,
    date: new Date("2023-04-15"),
    category: "Food",
  },
  {
    title: "Salary Deposit",
    amount: 2500.0,
    date: new Date("2023-04-10"),
    category: "Income",
  },
  {
    title: "Netflix Subscription",
    amount: -15.99,
    date: new Date("2023-04-05"),
    category: "Entertainment",
  },
];

// Field mapping options
const fieldMappingOptions = [
  { id: "title", label: "Description", mappedTo: "title" },
  { id: "amount", label: "Amount", mappedTo: "amount" },
  { id: "date", label: "Date", mappedTo: "date" },
  { id: "category", label: "Category", mappedTo: "category" },
  { id: "notes", label: "Notes", mappedTo: "notes" },
];

type UploadStackParamList = {
  Transactions: undefined;
};

type TransactionUploadScreenNavigationProp = StackNavigationProp<
  UploadStackParamList,
  "Transactions"
>;

const TransactionUploadScreen = () => {
  const navigation = useNavigation<TransactionUploadScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fieldMapping, setFieldMapping] = useState(fieldMappingOptions);

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    // In a real app, this would trigger a file picker or connection to the service
    setTimeout(() => {
      setFileUploaded(true);
      setCurrentStep(2);
    }, 500);
  };

  const handleFieldMappingChange = (fieldId: string, mappedTo: string) => {
    setFieldMapping(
      fieldMapping.map((field) =>
        field.id === fieldId ? { ...field, mappedTo } : field
      )
    );
  };

  const handleImportTransactions = () => {
    // In a real app, this would process the transactions and add them to the database
    Alert.alert("Success", "Transactions imported successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </S.BackButton>
          <S.HeaderTitle>Import Transactions</S.HeaderTitle>
          <S.CloseButton onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#333" />
          </S.CloseButton>
        </S.Header>

        <S.ProgressContainer>
          <S.ProgressStep active={currentStep >= 1} completed={currentStep > 1}>
            <S.ProgressStepCircle
              active={currentStep >= 1}
              completed={currentStep > 1}
            >
              {currentStep > 1 ? (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              ) : (
                <S.ProgressStepNumber>1</S.ProgressStepNumber>
              )}
            </S.ProgressStepCircle>
            <S.ProgressStepLabel active={currentStep >= 1}>
              Select Source
            </S.ProgressStepLabel>
          </S.ProgressStep>

          <S.ProgressLine active={currentStep > 1} />

          <S.ProgressStep active={currentStep >= 2} completed={currentStep > 2}>
            <S.ProgressStepCircle
              active={currentStep >= 2}
              completed={currentStep > 2}
            >
              {currentStep > 2 ? (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              ) : (
                <S.ProgressStepNumber>2</S.ProgressStepNumber>
              )}
            </S.ProgressStepCircle>
            <S.ProgressStepLabel active={currentStep >= 2}>
              Map Fields
            </S.ProgressStepLabel>
          </S.ProgressStep>

          <S.ProgressLine active={currentStep > 2} />

          <S.ProgressStep active={currentStep >= 3} completed={currentStep > 3}>
            <S.ProgressStepCircle
              active={currentStep >= 3}
              completed={currentStep > 3}
            >
              {currentStep > 3 ? (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              ) : (
                <S.ProgressStepNumber>3</S.ProgressStepNumber>
              )}
            </S.ProgressStepCircle>
            <S.ProgressStepLabel active={currentStep >= 3}>
              Review
            </S.ProgressStepLabel>
          </S.ProgressStep>
        </S.ProgressContainer>

        <ScrollView showsVerticalScrollIndicator={false}>
          {currentStep === 1 && (
            <S.StepContainer>
              <S.StepTitle>Select File Source</S.StepTitle>
              <S.StepDescription>
                Choose where you want to import your transactions from
              </S.StepDescription>

              <S.SourcesGrid>
                <FileSourceCard
                  title="Bank Connection"
                  icon="card"
                  selected={selectedSource === "bank"}
                  onPress={() => handleSourceSelect("bank")}
                />
                <FileSourceCard
                  title="CSV File"
                  icon="document-text"
                  selected={selectedSource === "csv"}
                  onPress={() => handleSourceSelect("csv")}
                />
                <FileSourceCard
                  title="Excel File"
                  icon="document"
                  selected={selectedSource === "excel"}
                  onPress={() => handleSourceSelect("excel")}
                />
                <FileSourceCard
                  title="PDF Statement"
                  icon="document-attach"
                  selected={selectedSource === "pdf"}
                  onPress={() => handleSourceSelect("pdf")}
                />
              </S.SourcesGrid>
            </S.StepContainer>
          )}

          {currentStep === 2 && (
            <S.StepContainer>
              <S.StepTitle>Map Fields</S.StepTitle>
              <S.StepDescription>
                Match the fields from your file to our transaction fields
              </S.StepDescription>

              <S.FieldMappingContainer>
                {fieldMapping.map((field) => (
                  <FieldMappingItem
                    key={field.id}
                    field={field}
                    onChange={(mappedTo) =>
                      handleFieldMappingChange(field.id, mappedTo)
                    }
                  />
                ))}
              </S.FieldMappingContainer>

              <S.ButtonContainer>
                <S.SecondaryButton onPress={() => setCurrentStep(1)}>
                  <S.SecondaryButtonText>Back</S.SecondaryButtonText>
                </S.SecondaryButton>
                <S.PrimaryButton onPress={() => setCurrentStep(3)}>
                  <S.PrimaryButtonText>Continue</S.PrimaryButtonText>
                </S.PrimaryButton>
              </S.ButtonContainer>
            </S.StepContainer>
          )}

          {currentStep === 3 && (
            <S.StepContainer>
              <S.StepTitle>Review Transactions</S.StepTitle>
              <S.StepDescription>
                Review and confirm the transactions to import
              </S.StepDescription>

              <S.TransactionSummary>
                <S.SummaryItem>
                  <S.SummaryLabel>Total Transactions</S.SummaryLabel>
                  <S.SummaryValue>{mockTransactions.length}</S.SummaryValue>
                </S.SummaryItem>
                <S.SummaryItem>
                  <S.SummaryLabel>Income Transactions</S.SummaryLabel>
                  <S.SummaryValue>
                    {mockTransactions.filter((t) => (t.amount || 0) > 0).length}
                  </S.SummaryValue>
                </S.SummaryItem>
                <S.SummaryItem>
                  <S.SummaryLabel>Expense Transactions</S.SummaryLabel>
                  <S.SummaryValue>
                    {mockTransactions.filter((t) => (t.amount || 0) < 0).length}
                  </S.SummaryValue>
                </S.SummaryItem>
              </S.TransactionSummary>

              <S.PreviewTitle>Transaction Preview</S.PreviewTitle>

              <S.TransactionPreviewContainer>
                {mockTransactions.map((transaction, index) => (
                  <TransactionPreviewItem
                    key={index}
                    transaction={transaction as Transaction}
                  />
                ))}
              </S.TransactionPreviewContainer>

              <S.ButtonContainer>
                <S.SecondaryButton onPress={() => setCurrentStep(2)}>
                  <S.SecondaryButtonText>Back</S.SecondaryButtonText>
                </S.SecondaryButton>
                <S.PrimaryButton onPress={handleImportTransactions}>
                  <S.PrimaryButtonText>Import Transactions</S.PrimaryButtonText>
                </S.PrimaryButton>
              </S.ButtonContainer>
            </S.StepContainer>
          )}
        </ScrollView>
      </S.Container>
    </S.RootContainer>
  );
};

export default TransactionUploadScreen;
