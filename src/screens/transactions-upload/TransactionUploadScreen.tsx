import { Fragment, useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import * as DocumentPicker from "expo-document-picker";
import FileSourceCard from "@/components/upload/FileSourceCard";
import TransactionPreviewItem from "@/components/upload/TransactionPreviewItem";
import type { Transaction } from "@/types";
import { useTheme } from "@/context/ThemeContext";
import { StatementProcessor } from "@/services/StatementProcessor";
import * as S from "./TransactionUploadScreen.styles";
import { useTransactionsQueries } from "@/hooks/useTransactionsQueries";
import LottieView from "lottie-react-native";
import { NebulaToast } from "@/components/toast/Toast";
import Toast from "react-native-toast-message";

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
  const { isDarkMode, theme } = useTheme();
  const { mutateUploadTransactions, isUploadingTransactions } =
    useTransactionsQueries();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileContentRef = useRef<string | null>(null);

  const handleSourceSelect = async (source: string) => {
    setSelectedSource(source);
    setIsProcessing(true);

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type:
          source === "csv"
            ? "text/csv"
            : source === "ofx"
            ? "application/x-ofx"
            : "application/pdf",
      });

      if (result.canceled) {
        Alert.alert("Error", "No file selected");
        return;
      }

      // Get base64 string of the file
      const base64Content = await StatementProcessor.readFileAsBase64(
        result.assets[0].uri
      );

      fileContentRef.current = base64Content;

      setCurrentStep(2);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to process the statement. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
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

  const handleContinue = useCallback(async () => {
    if (currentStep === 2) {
      if (!fileContentRef.current) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No file content found",
          position: "bottom",
        });
        return;
      }

      mutateUploadTransactions(fileContentRef.current, {
        onSuccess: (data) => {
          setTransactions(data || []);
          setCurrentStep(3);
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
            position: "bottom",
          });
        },
      });
    }
  }, [selectedSource, currentStep, fileContentRef, mutateUploadTransactions]);

  return (
    <S.RootContainer>
      <S.Container>
        <S.Header>
          <S.BackButton onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? theme.colors.text : theme.colors.border}
            />
          </S.BackButton>
          <S.HeaderTitle>Import Transactions</S.HeaderTitle>
          <S.CloseButton onPress={() => navigation.goBack()}>
            <Ionicons
              name="close"
              size={24}
              color={isDarkMode ? theme.colors.text : theme.colors.border}
            />
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
              Source selected
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

        {currentStep === 1 && (
          <S.StepContainer>
            <S.StepTitle>Select File Source</S.StepTitle>
            <S.StepDescription>
              Choose where you want to import your transactions from
            </S.StepDescription>

            <S.SourcesGrid>
              {/* <FileSourceCard
                title="CSV File"
                icon="document-text"
                selected={selectedSource === "csv"}
                onPress={() => handleSourceSelect("csv")}
                disabled={isProcessing}
              />
              <FileSourceCard
                title="OFX File"
                icon="document"
                selected={selectedSource === "ofx"}
                onPress={() => handleSourceSelect("ofx")}
                disabled={isProcessing}
              /> */}
              <FileSourceCard
                title="PDF Statement"
                icon="document-attach"
                selected={selectedSource === "pdf"}
                onPress={() => handleSourceSelect("pdf")}
                disabled={isProcessing}
              />
            </S.SourcesGrid>
          </S.StepContainer>
        )}

        {currentStep === 2 && (
          <S.StepContainer
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <S.FieldMappingContainer>
              {!isUploadingTransactions && (
                <Fragment>
                  <S.StepTitle>Source selected</S.StepTitle>
                  <S.StepDescription>
                    Continue to upload your file to our transaction
                  </S.StepDescription>
                </Fragment>
              )}

              {!isUploadingTransactions && (
                <S.FileMappingContainer>
                  <S.FileIconContainer>
                    <Ionicons
                      name="document-attach"
                      size={50}
                      color={theme.colors.text}
                    />
                  </S.FileIconContainer>
                </S.FileMappingContainer>
              )}

              {isUploadingTransactions && (
                <Fragment>
                  <LottieView
                    source={require("@/assets/uploading.json")}
                    autoPlay
                    loop
                    style={{
                      width: "100%",
                      height: 300,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />

                  <S.UploadingContainer>
                    <S.UploadingText>Uploading transactions...</S.UploadingText>
                  </S.UploadingContainer>
                </Fragment>
              )}
            </S.FieldMappingContainer>

            <S.ButtonContainer>
              <S.SecondaryButton onPress={() => setCurrentStep(1)}>
                <S.SecondaryButtonText>Back</S.SecondaryButtonText>
              </S.SecondaryButton>
              <S.PrimaryButton
                onPress={handleContinue}
                disabled={isUploadingTransactions}
              >
                <S.PrimaryButtonText>
                  {isUploadingTransactions ? "Uploading..." : "Continue"}
                </S.PrimaryButtonText>
              </S.PrimaryButton>
            </S.ButtonContainer>
          </S.StepContainer>
        )}

        {currentStep === 3 && (
          <S.StepContainer>
            <S.StepTitle>Review Transactions</S.StepTitle>
            <S.StepDescription>
              Transactions successfully uploaded
            </S.StepDescription>

            <S.TransactionSummary>
              <S.SummaryItem>
                <S.SummaryLabel>Total Transactions</S.SummaryLabel>
                <S.SummaryValue>{transactions.length}</S.SummaryValue>
              </S.SummaryItem>
              <S.SummaryItem>
                <S.SummaryLabel>Income Transactions</S.SummaryLabel>
                <S.SummaryValue>
                  {transactions?.filter((t) => t.type === "INCOME").length}
                </S.SummaryValue>
              </S.SummaryItem>
              <S.SummaryItem>
                <S.SummaryLabel>Expense Transactions</S.SummaryLabel>
                <S.SummaryValue>
                  {transactions?.filter((t) => t.type === "EXPENSE").length}
                </S.SummaryValue>
              </S.SummaryItem>
            </S.TransactionSummary>
            <S.ButtonContainer style={{ marginBottom: 20, marginTop: 0 }}>
              <S.PrimaryButton onPress={() => navigation.goBack()}>
                <S.PrimaryButtonText>Done</S.PrimaryButtonText>
              </S.PrimaryButton>
            </S.ButtonContainer>

            <S.PreviewTitle>Transaction Preview</S.PreviewTitle>

            <S.TransactionPreviewContainer
              contentContainerStyle={{
                paddingBottom: 350,
              }}
            >
              {transactions.map((transaction, index) => (
                <TransactionPreviewItem key={index} transaction={transaction} />
              ))}
            </S.TransactionPreviewContainer>
          </S.StepContainer>
        )}
        <NebulaToast />
      </S.Container>
    </S.RootContainer>
  );
};

export default TransactionUploadScreen;
