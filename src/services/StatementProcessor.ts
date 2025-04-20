import * as FileSystem from "expo-file-system";
import { Transaction } from "@/types";
import Papa from "papaparse";
import * as DocumentPicker from "expo-document-picker";

export interface ProcessedStatement {
  transactions: Transaction[];
  metadata: {
    accountNumber?: string;
    bankName?: string;
    statementDate?: Date;
    startDate?: Date;
    endDate?: Date;
  };
}

interface BankPattern {
  datePattern: RegExp;
  amountPattern: RegExp;
  descriptionPattern: RegExp;
  bankIdentifier: RegExp;
}

// Padrões específicos para bancos portugueses
const BANK_PATTERNS: Record<string, BankPattern> = {
  MILLENNIUM: {
    datePattern: /(\d{2}\/\d{2}\/\d{4})/,
    amountPattern: /([-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*EUR/,
    descriptionPattern:
      /([A-Za-zÀ-ÿ0-9\s.,/-]+?)(?=\s+[-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,
    bankIdentifier: /Millennium\s*BCP/i,
  },
  CGD: {
    datePattern: /(\d{2}[-/.]\d{2}[-/.]\d{4})/,
    amountPattern: /([-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*€/,
    descriptionPattern:
      /([A-Za-zÀ-ÿ0-9\s.,/-]+?)(?=\s+[-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,
    bankIdentifier: /Caixa\s*Geral\s*de\s*Depósitos/i,
  },
  SANTANDER: {
    datePattern: /(\d{2}[-/.]\d{2}[-/.]\d{4})/,
    amountPattern: /([-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*EUR/,
    descriptionPattern:
      /([A-Za-zÀ-ÿ0-9\s.,/-]+?)(?=\s+[-]?\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/,
    bankIdentifier: /Banco\s*Santander\s*Totta/i,
  },
};

export class StatementProcessor {
  private static async readFileContent(uri: string): Promise<string> {
    return await FileSystem.readAsStringAsync(uri);
  }

  private static async readPDFContent(uri: string): Promise<string> {
    try {
      // Lê o arquivo como base64
      const base64Content = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Retorna o conteúdo base64 para processamento posterior
      return base64Content;
    } catch (error) {
      console.error("Erro ao ler PDF:", error);
      throw new Error("Não foi possível ler o arquivo PDF");
    }
  }

  private static detectBank(text: string): BankPattern {
    for (const [bank, pattern] of Object.entries(BANK_PATTERNS)) {
      if (pattern.bankIdentifier.test(text)) {
        return pattern;
      }
    }
    // Padrão genérico se não identificar o banco
    return BANK_PATTERNS.MILLENNIUM;
  }

  private static parseAmount(amount: string): number {
    // Remove separadores de milhares e converte vírgula decimal para ponto
    const cleanAmount = amount
      .replace(/\./g, "") // Remove separador de milhares
      .replace(",", ".") // Converte vírgula decimal para ponto
      .replace(/[€EUR\s]/g, ""); // Remove símbolos de moeda
    return parseFloat(cleanAmount);
  }

  private static async processPDF(uri: string): Promise<ProcessedStatement> {
    try {
      // Lê o conteúdo do PDF
      const pdfContent = await this.readPDFContent(uri);
      // // Convert base64 to Uint8Array for pdfjs
      // const binaryString = atob(pdfContent);
      // const bytes = new Uint8Array(binaryString.length);
      // for (let i = 0; i < binaryString.length; i++) {
      //   bytes[i] = binaryString.charCodeAt(i);
      // }

      // // Load the PDF document
      // const loadingTask = pdfjsLib.getDocument({ data: bytes });
      // const pdf = await loadingTask.promise;

      // let extractedText = "";

      // // Extract text from all pages
      // for (let i = 1; i <= pdf.numPages; i++) {
      //   const page = await pdf.getPage(i);
      //   const textContent = await page.getTextContent();
      //   const pageText = textContent.items
      //     .map((item: any) => item.str)
      //     .join(" ");
      //   extractedText += pageText + "\n";
      // }

      // // Detect bank from extracted text
      // const bankPattern = this.detectBank(extractedText);

      // // Extract transactions using bank-specific patterns
      // const transactions: Transaction[] = [];
      // const matches = extractedText.matchAll(
      //   new RegExp(bankPattern.descriptionPattern, "g")
      // );

      // for (const match of matches) {
      //   const description = match[1]?.trim();
      //   const amount = this.parseAmount(match[2]);

      //   if (description && !isNaN(amount)) {
      //     transactions.push({
      //       id: Math.random().toString(36).substr(2, 9),
      //       title: description,
      //       amount: amount,
      //       date: new Date(), // TODO: Extract actual date
      //       category: this.categorizeTransaction(description),
      //       icon: amount > 0 ? "trending-up" : "trending-down",
      //     });
      //   }
      // }

      return {
        transactions: [],
        metadata: {
          bankName: "Detecção pendente",
          statementDate: new Date(),
        },
      };
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      throw new Error("Falha ao processar arquivo PDF");
    }
  }

  private static categorizeTransaction(description: string): string {
    // Categorização básica baseada em palavras-chave
    const categories = {
      Supermercado: /(continente|pingo doce|lidl|auchan|minipreço)/i,
      Restaurante: /(restaurante|cafetaria|café|pastelaria)/i,
      Transporte: /(cp|metro|carris|uber|bolt|taxi)/i,
      Utilidades: /(agua|luz|gas|energia|nos|meo|vodafone)/i,
      Saúde: /(farmacia|hospital|clinica|medico)/i,
      Salário: /(salario|vencimento|ordenado)/i,
    };

    for (const [category, pattern] of Object.entries(categories)) {
      if (pattern.test(description)) {
        return category;
      }
    }

    return "Outros";
  }

  private static async processCSV(
    content: string
  ): Promise<ProcessedStatement> {
    const { data } = Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
    });

    const transactions: Transaction[] = data.map((record: any) => ({
      id: Math.random().toString(36),
      title: record.description || record.memo || record.reference,
      amount: parseFloat(record.amount.replace(",", ".")), // Handle European number format
      date: this.parseDate(record.date), // Add date parsing for European format
      category: "Uncategorized",
      icon: "document",
    })) as unknown as Transaction[];

    return {
      transactions,
      metadata: {},
    };
  }

  // Helper method to parse dates in various formats
  private static parseDate(dateStr: string): Date {
    // Try European format (DD/MM/YYYY)
    const europeanMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (europeanMatch) {
      const [_, day, month, year] = europeanMatch;
      return new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
    }

    // Try ISO format (YYYY-MM-DD)
    const isoMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (isoMatch) {
      return new Date(dateStr);
    }

    // If no match, try parsing directly (fallback)
    const fallbackDate = new Date(dateStr);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate;
    }

    throw new Error(`Invalid date format: ${dateStr}`);
  }

  // private static async processOFX(
  //   content: string
  // ): Promise<ProcessedStatement> {
  //   const ofxData = await parseOfx(content);
  //   const transactions: Transaction[] = [];

  //   if (ofxData.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN) {
  //     const ofxTransactions = Array.isArray(
  //       ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN
  //     )
  //       ? ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN
  //       : [ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN];

  //     transactions.push(
  //       ...ofxTransactions.map((trn: any) => ({
  //         id: Math.random().toString(36).substr(2, 9),
  //         title: trn.MEMO || trn.NAME,
  //         amount: parseFloat(trn.TRNAMT),
  //         date: new Date(trn.DTPOSTED),
  //         category: "Uncategorized",
  //         icon: "document",
  //       }))
  //     );
  //   }

  //   return {
  //     transactions,
  //     metadata: {
  //       accountNumber:
  //         ofxData.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.ACCTID,
  //       bankName:
  //         ofxData.OFX?.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKACCTFROM?.BANKID,
  //     },
  //   };
  // }

  public static async processStatement(
    uri: string,
    fileType: "csv" | "ofx" | "pdf"
  ): Promise<ProcessedStatement> {
    switch (fileType) {
      case "csv":
        const csvContent = await this.readFileContent(uri);
        return await this.processCSV(csvContent);
      // case "ofx":
      //   return await this.processOFX(content);
      case "pdf":
        return await this.processPDF(uri);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }
}
