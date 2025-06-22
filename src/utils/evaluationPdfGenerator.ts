
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
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 20;
  
  // En-tête officiel avec logo République de Madagascar
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  // Logo République de Madagascar à gauche
  doc.setFillColor(255, 215, 0); // Or
  doc.circle(40, yPosition + 20, 15, 'F');
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(8);
  doc.text('ARIARY', 40, yPosition + 23, { align: 'center' });
  
  // Texte République centré
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(184, 134, 11); // couleur dorée
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition + 10, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition + 20, { align: 'center' });
  
  // Logo MTFoP à droite
  doc.setFillColor(0, 0, 255); // Bleu
  doc.circle(pageWidth - 40, yPosition + 20, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('MTFoP', pageWidth - 40, yPosition + 23, { align: 'center' });
  
  yPosition += 50;
  
  // Ligne de séparation
  doc.setLineWidth(3);
  doc.setDrawColor(255, 0, 0); // Rouge
  doc.line(margin, yPosition, pageWidth / 3, yPosition);
  doc.setDrawColor(255, 255, 255); // Blanc
  doc.line(pageWidth / 3, yPosition, (pageWidth / 3) * 2, yPosition);
  doc.setDrawColor(0, 128, 0); // Vert
  doc.line((pageWidth / 3) * 2, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 20;
  
  // Titre du certificat
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 20, 60); // Rouge
  doc.text('CERTIFICAT DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 25;
  
  // Sous-titre
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'italic');
  doc.text('République Démocratique de Madagascar', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text('Ministère des Télécommunications, des Technologies Numériques', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  doc.text('et de la Poste (MTFoP)', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 25;
  
  // Ligne de séparation décorative
  doc.setLineWidth(1);
  doc.setDrawColor(100, 100, 100);
  doc.line(margin + 30, yPosition, pageWidth - margin - 30, yPosition);
  
  yPosition += 20;
  
  // Corps du certificat
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const certificateText = [
    'Je soussigné(e), en qualité de responsable au sein du Ministère des',
    'Télécommunications, des Technologies Numériques et de la Poste,',
    '',
    'CERTIFIE PAR LA PRÉSENTE QUE :',
    '',
    `Monsieur/Madame ${evaluation.firstName.toUpperCase()} ${evaluation.lastName.toUpperCase()}`,
    '',
    `a effectué un stage dans nos services du ${new Date(evaluation.startDate).toLocaleDateString('fr-FR')}`,
    `au ${new Date(evaluation.endDate).toLocaleDateString('fr-FR')}.`,
    '',
    'ÉVALUATION FINALE :',
    `Note obtenue : ${evaluation.grade}/20`,
    `Appréciation : ${evaluation.grade >= 16 ? 'TRÈS BIEN' : evaluation.grade >= 14 ? 'BIEN' : evaluation.grade >= 12 ? 'ASSEZ BIEN' : evaluation.grade >= 10 ? 'PASSABLE' : 'INSUFFISANT'}`,
    '',
    'COMMENTAIRES :',
    evaluation.comment
  ];
  
  certificateText.forEach(line => {
    if (line === 'CERTIFIE PAR LA PRÉSENTE QUE :' || line === 'ÉVALUATION FINALE :' || line === 'COMMENTAIRES :') {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 139, 34); // Vert
      doc.setFontSize(16);
    } else if (line.includes(evaluation.firstName.toUpperCase())) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 20, 60); // Rouge
      doc.setFontSize(16);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
    }
    
    if (line) {
      if (line.length > 70) {
        const words = line.split(' ');
        let currentLine = '';
        words.forEach(word => {
          if ((currentLine + word).length > 70) {
            doc.text(currentLine.trim(), pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 8;
            currentLine = word + ' ';
          } else {
            currentLine += word + ' ';
          }
        });
        if (currentLine.trim()) {
          doc.text(currentLine.trim(), pageWidth / 2, yPosition, { align: 'center' });
        }
      } else {
        doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
      }
    }
    yPosition += 10;
  });
  
  yPosition += 30;
  
  // Section signature
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Fait à Antananarivo, le :', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 70, yPosition);
  
  yPosition += 25;
  doc.text('Le Directeur Général', pageWidth - margin - 80, yPosition);
  doc.text('du MTFoP', pageWidth - margin - 80, yPosition + 10);
  
  // Cadre décoratif autour du certificat
  doc.setDrawColor(255, 0, 0);
  doc.setLineWidth(2);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
  // Cadre intérieur
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Filigrane subtil
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(50);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIEL', pageWidth / 2, pageHeight / 2, { 
    align: 'center', 
    angle: 45 
  });
  
  // Télécharger le PDF
  const fileName = `certificat_stage_${evaluation.firstName}_${evaluation.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
