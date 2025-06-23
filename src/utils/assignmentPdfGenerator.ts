
import jsPDF from 'jspdf';

export interface AssignmentData {
  id: number;
  student: string;
  supervisor: string;
  company: string;
  department: string;
  status: string;
  startDate: string;
  endDate: string;
}

export const generateAssignmentPDF = (assignment: AssignmentData) => {
  const doc = new jsPDF();
  
  // Configuration
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 30;
  
  // En-tête officiel avec logos
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 80, 'F');
  
  // Logo République de Madagascar à gauche
  const logoImg = new Image();
  logoImg.src = '/lovable-uploads/5892fd8e-6c80-40ec-ad0b-1869e82bd073.png';
  logoImg.onload = () => {
    doc.addImage(logoImg, 'PNG', 15, 10, 50, 40);
  };
  
  // Texte République centré
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(184, 134, 11);
  doc.text('REPOBLIKAN\'I MADAGASIKARA', pageWidth / 2, yPosition, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text('Fitiavana - Tanindrazana - Fandrosoana', pageWidth / 2, yPosition + 10, { align: 'center' });
  
  // Logo MTEFoP à droite
  const mtfopImg = new Image();
  mtfopImg.src = '/lovable-uploads/c4628ed0-0fc5-4dd4-87d6-c410367e257c.png';
  mtfopImg.onload = () => {
    doc.addImage(mtfopImg, 'PNG', pageWidth - 65, 10, 50, 40);
  };
  
  yPosition += 40;
  
  // Ligne de séparation
  doc.setLineWidth(4);
  doc.setDrawColor(255, 0, 0);
  doc.line(margin, yPosition, pageWidth / 3, yPosition);
  doc.setDrawColor(255, 255, 255);
  doc.line(pageWidth / 3, yPosition, (pageWidth / 3) * 2, yPosition);
  doc.setDrawColor(0, 128, 0);
  doc.line((pageWidth / 3) * 2, yPosition, pageWidth - margin, yPosition);
  
  yPosition += 25;
  
  // Titre
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 20, 60);
  doc.text('ORDRE D\'AFFECTATION DE STAGE', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 20;
  
  // Sous-titre
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'italic');
  doc.text('Ministère du Travail, de l\'Emploi et de la Fonction Publique', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 30;
  
  // Corps du document
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  const affectationText = [
    'Par la présente, nous informons que :',
    '',
    `L'étudiant(e) : ${assignment.student.toUpperCase()}`,
    '',
    `est affecté(e) en stage dans l'entreprise : ${assignment.company.toUpperCase()}`,
    `Département : ${assignment.department}`,
    `Sous la supervision de : ${assignment.supervisor}`,
    '',
    `Période de stage : du ${new Date(assignment.startDate).toLocaleDateString('fr-FR')} au ${new Date(assignment.endDate).toLocaleDateString('fr-FR')}`,
    '',
    `Statut actuel : ${assignment.status === 'assigned' ? 'AFFECTÉ' : assignment.status === 'pending' ? 'EN ATTENTE' : 'TERMINÉ'}`,
    '',
    'Cette affectation est effective et doit être respectée par toutes les parties concernées.',
    '',
    'L\'étudiant(e) devra se présenter à l\'entreprise selon les modalités convenues',
    'et respecter le règlement intérieur de l\'établissement d\'accueil.'
  ];
  
  affectationText.forEach(line => {
    if (line.includes(assignment.student.toUpperCase()) || line.includes(assignment.company.toUpperCase())) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 20, 60);
      doc.setFontSize(16);
    } else if (line.includes('Statut actuel') || line.includes('Période de stage')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 139, 34);
      doc.setFontSize(14);
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
  
  // Signature
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Fait à Antananarivo, le :', margin, yPosition);
  doc.text(new Date().toLocaleDateString('fr-FR'), margin + 80, yPosition);
  
  yPosition += 20;
  doc.text('Le Responsable des Stages', pageWidth - margin - 100, yPosition);
  doc.text('MTEFoP', pageWidth - margin - 100, yPosition + 10);
  
  // Cadres décoratifs
  doc.setDrawColor(255, 0, 0);
  doc.setLineWidth(3);
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
  
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Télécharger le PDF
  const fileName = `affectation_${assignment.student.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
  doc.save(fileName);
};
