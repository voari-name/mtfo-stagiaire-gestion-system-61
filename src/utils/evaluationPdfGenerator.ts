
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
  let yPosition = 15;
  
  // En-tête officiel avec logo République de Madagascar
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Logo et drapeau de Madagascar (simulé)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(184, 134, 11); // couleur dorée
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition + 8, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition + 15, { align: 'center' });
  
  // Simulation du logo officiel
  doc.setFillColor(255, 215, 0); // Or
  doc.circle(pageWidth / 2, yPosition + 25, 8, 'F');
  doc.setTextColor(139, 69, 19);
  doc.setFontSize(6);
  doc.text('LOGO', pageWidth / 2, yPosition + 27, { align: 'center' });
  
  yPosition += 45;
  
  // Ligne de séparation
  doc.setLineWidth(2);
  doc.setDrawColor(34, 139, 34); // Vert
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 15;
  
  // Titre du certificat
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 20, 60); // Rouge
  doc.text('CERTIFICAT DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Sous-titre
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'italic');
  doc.text('République Démocratique de Madagascar', pageWidth / 2, yPosition, { align: 'center' });
  doc.text('Ministère des Télécommunications, des Technologies Numériques', pageWidth / 2, yPosition + 8, { align: 'center' });
  doc.text('et de la Poste (MTFoP)', pageWidth / 2, yPosition + 16, { align: 'center' });
  
  yPosition += 35;
  
  // Ligne de séparation décorative
  doc.setLineWidth(1);
  doc.setDrawColor(100, 100, 100);
  doc.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition);
  
  yPosition += 20;
  
  // Corps du certificat
  doc.setFontSize(12);
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
    } else if (line.includes(evaluation.firstName.toUpperCase())) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 20, 60); // Rouge
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
    }
    
    if (line) {
      if (line.length > 80) {
        const words = line.split(' ');
        let currentLine = '';
        words.forEach(word => {
          if ((currentLine + word).length > 80) {
            doc.text(currentLine, pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 6;
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
    yPosition += 8;
  });
  
  yPosition += 20;
  
  // Section signature
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Fait à Antananarivo, le :', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 60, yPosition);
  
  yPosition += 20;
  doc.text('Le Directeur Général', pageWidth - margin - 60, yPosition);
  doc.text('du MTFoP', pageWidth - margin - 60, yPosition + 8);
  
  // Cadre décoratif autour du certificat
  doc.setDrawColor(34, 139, 34);
  doc.setLineWidth(3);
  doc.rect(10, 10, pageWidth - 20, doc.internal.pageSize.getHeight() - 20);
  
  // Filigrane subtil
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIEL', pageWidth / 2, doc.internal.pageSize.getHeight() / 2, { 
    align: 'center', 
    angle: 45 
  });
  
  // Télécharger le PDF
  const fileName = `certificat_stage_${evaluation.firstName}_${evaluation.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
