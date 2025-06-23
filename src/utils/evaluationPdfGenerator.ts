
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
  let yPosition = 30;
  
  // En-tête officiel avec logos
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 80, 'F');
  
  // Charger et ajouter le logo République de Madagascar à gauche
  const logoImg = new Image();
  logoImg.crossOrigin = 'anonymous';
  logoImg.onload = () => {
    try {
      doc.addImage(logoImg, 'PNG', 15, 10, 50, 40);
    } catch (error) {
      console.warn('Erreur lors du chargement du logo République:', error);
    }
  };
  logoImg.src = '/lovable-uploads/d9783536-a805-4722-af92-579aef58e0da.png';
  
  // Texte République centré
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(184, 134, 11); // couleur dorée
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition + 10, { align: 'center' });
  
  // Charger et ajouter le logo MTEFoP à droite
  const mtfopImg = new Image();
  mtfopImg.crossOrigin = 'anonymous';
  mtfopImg.onload = () => {
    try {
      doc.addImage(mtfopImg, 'PNG', pageWidth - 65, 10, 50, 40);
    } catch (error) {
      console.warn('Erreur lors du chargement du logo MTEFoP:', error);
    }
  };
  mtfopImg.src = '/lovable-uploads/63ed951d-9424-420b-b032-8466ab366df2.png';
  
  yPosition += 40;
  
  // Ligne de séparation aux couleurs nationales
  doc.setLineWidth(4);
  doc.setDrawColor(255, 0, 0); // Rouge
  doc.line(margin, yPosition, pageWidth / 3, yPosition);
  doc.setDrawColor(255, 255, 255); // Blanc
  doc.line(pageWidth / 3, yPosition, (pageWidth / 3) * 2, yPosition);
  doc.setDrawColor(0, 128, 0); // Vert
  doc.line((pageWidth / 3) * 2, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 25;
  
  // Titre du certificat avec style amélioré
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 20, 60); // Rouge
  doc.text('CERTIFICAT DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Sous-titre institution
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'italic');
  doc.text('République Démocratique de Madagascar', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('Ministère du Travail, de l\'Emploi et de la Fonction Publique', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  doc.text('(MTEFoP)', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 25;
  
  // Ligne de séparation décorative
  doc.setLineWidth(2);
  doc.setDrawColor(184, 134, 11); // Or
  doc.line(margin + 40, yPosition, pageWidth - margin - 40, yPosition);
  
  yPosition += 20;
  
  // Corps du certificat avec mise en forme améliorée
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const certificateText = [
    'Je soussigné(e), en qualité de responsable au sein du Ministère du',
    'Travail, de l\'Emploi et de la Fonction Publique,',
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
    'COMMENTAIRES ET OBSERVATIONS :',
    evaluation.comment || 'Aucun commentaire particulier.'
  ];
  
  certificateText.forEach(line => {
    if (line === 'CERTIFIE PAR LA PRÉSENTE QUE :' || line === 'ÉVALUATION FINALE :' || line === 'COMMENTAIRES ET OBSERVATIONS :') {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 139, 34); // Vert
      doc.setFontSize(16);
    } else if (line.includes(evaluation.firstName.toUpperCase())) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 20, 60); // Rouge
      doc.setFontSize(18);
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
  
  yPosition += 25;
  
  // Section signature avec amélioration
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Fait à Antananarivo, le :', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 80, yPosition);
  
  yPosition += 20;
  doc.text('Le Ministre', pageWidth - margin - 80, yPosition);
  doc.text('du MTEFoP', pageWidth - margin - 80, yPosition + 10);
  
  // Cadre décoratif amélioré
  doc.setDrawColor(255, 0, 0);
  doc.setLineWidth(3);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
  // Cadre intérieur doré
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Filigrane officiel
  doc.setTextColor(245, 245, 245);
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIEL', pageWidth / 2, pageHeight / 2, { 
    align: 'center', 
    angle: 45 
  });
  
  // Télécharger le PDF
  const fileName = `certificat_stage_${evaluation.firstName}_${evaluation.lastName}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
