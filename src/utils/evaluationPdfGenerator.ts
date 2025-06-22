
import jsPDF from 'jspdf';

export interface EvaluationData {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  grade: number;
  comment: string;
}

export const generateEvaluationPDF = (evaluation: EvaluationData) => {
  const doc = new jsPDF();
  
  // Configuration
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 20;
  
  // Logo République de Madagascar (simulation)
  doc.setFillColor(255, 255, 255);
  doc.rect(pageWidth / 2 - 30, yPosition, 60, 30, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition + 10, { align: 'center' });
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition + 15, { align: 'center' });
  doc.setFontSize(6);
  doc.text('[Logo République de Madagascar]', pageWidth / 2, yPosition + 25, { align: 'center' });
  
  yPosition += 40;
  
  // Titre du document
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICAT DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Ligne de séparation
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 25;
  
  // Informations du stagiaire
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMATIONS DU STAGIAIRE', margin, yPosition);
  
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const infoLines = [
    `Nom complet: ${evaluation.firstName} ${evaluation.lastName}`,
    `Période de stage: ${new Date(evaluation.startDate).toLocaleDateString('fr-FR')} au ${new Date(evaluation.endDate).toLocaleDateString('fr-FR')}`,
    `Note d'évaluation: ${evaluation.grade}/20`,
    '',
    'COMMENTAIRES:',
    evaluation.comment
  ];
  
  infoLines.forEach(line => {
    if (line === 'COMMENTAIRES:') {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    doc.text(line, margin, yPosition);
    yPosition += 10;
  });
  
  yPosition += 20;
  
  // Certificat officiel
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATION OFFICIELLE', margin, yPosition);
  
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const certificateText = [
    `Nous certifions que ${evaluation.firstName} ${evaluation.lastName} a effectué`,
    `un stage au sein de notre organisation avec une note d'évaluation de ${evaluation.grade}/20.`,
    '',
    'Ce certificat est délivré pour servir et valoir ce que de droit.'
  ];
  
  certificateText.forEach(line => {
    if (line) {
      doc.text(line, margin, yPosition);
    }
    yPosition += 8;
  });
  
  yPosition += 30;
  
  // Signature
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Fait à Antananarivo, le:', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 50, yPosition);
  
  yPosition += 20;
  doc.text('Signature du responsable:', pageWidth - margin - 80, yPosition);
  
  // Télécharger le PDF
  const fileName = `certificat_stage_${evaluation.firstName}_${evaluation.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
