import jsPDF from 'jspdf';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface MenuPdfPage {
  title: string;
  category: string;
  image: string;
}

export const MENU_PDF_PAGES: MenuPdfPage[] = [
  {
    title: 'الوجبات والمشويات على الفحم',
    category: 'الوجبات',
    image: '/assets/aistudio/639175281_1476499627820453_8080231246300345417_n_c042c88c.jpg',
  },
  {
    title: 'سندوتشات اللحوم والطيور والبرجر والشاورما',
    category: 'اللحوم والطيور',
    image: '/assets/aistudio/634402911_1476499471153802_5465416429470518868_n_056c746d.jpg',
  },
  {
    title: 'سندوتشات رول الطعمية المميزة',
    category: 'الرولات',
    image: '/assets/aistudio/637598592_1476499461153803_7208587326028574383_n_5c161425.jpg',
  },
  {
    title: 'سندوتشات رول البطاطس بالصوصات',
    category: 'الرولات',
    image: '/assets/aistudio/637840746_1476499734487109_7246479383529452350_n_0da1bd0f.jpg',
  },
  {
    title: 'سندوتشات رول الجبنة وتشكيلة التشيز',
    category: 'الرولات',
    image: '/assets/aistudio/634767826_1476499387820477_4382898674013496280_n_c1808ecc.jpg',
  },
  {
    title: 'سندوتشات رول البيض والبسطرمة والعالمية',
    category: 'الرولات',
    image: '/assets/aistudio/634997072_1476499594487123_2035706656578588725_n_6f9a238f.jpg',
  },
  {
    title: 'سندوتشات الفول بكافة أنواعه والخلطات',
    category: 'الفول',
    image: '/assets/aistudio/638629147_1476499531153796_8966278959449469093_n_66679d88.jpg',
  },
  {
    title: 'سندوتشات الطعمية المقرمشة والمحشية',
    category: 'الطعمية',
    image: '/assets/aistudio/636934428_1476499671153782_2576869425625736263_n_82553d43.jpg',
  },
  {
    title: 'سندوتشات البطاطس المقلية والبورية',
    category: 'البطاطس',
    image: '/assets/aistudio/637006463_1476499691153780_5839630843399342371_n_40d44160.jpg',
  },
  {
    title: 'سندوتشات الجبنة بكافة الخيارات والأحجام',
    category: 'الجبنة',
    image: '/assets/aistudio/637173306_1476499807820435_7116535866467222723_n_ef9f7095.jpg',
  },
  {
    title: 'سندوتشات البيض بالأومليت والعيون',
    category: 'البيض',
    image: '/assets/aistudio/637177907_1476499587820457_7804491959357578010_n_c7a2d6e5.jpg',
  },
  {
    title: 'سندوتشات مشكلة (مسقعة، بابا غنوج، بلوبيف، تونة)',
    category: 'سندوتشات مشكلة',
    image: '/assets/aistudio/637101450_1476499761153773_5380500107603806436_n_f07da8ab.jpg',
  },
  {
    title: 'سندوتشات الحلو (حلاوة، لوتس، عسل، ديناميت)',
    category: 'الحلو',
    image: '/assets/aistudio/636727751_1476499424487140_2713011824449116564_n_a6030679.jpg',
  },
  {
    title: 'طلبات وأقراص الطعمية وعلب الجبنة',
    category: 'طلبات وعلب',
    image: '/assets/aistudio/635210480_1476499527820463_987852489030057550_n_e253329b.jpg',
  },
  {
    title: 'علب الفول بالزيت الحار والسمنة والخلطات',
    category: 'طلبات وعلب',
    image: '/assets/aistudio/636824697_1476499644487118_6877158038446514229_n_f404ef0b.jpg',
  },
  {
    title: 'باكتات البطاطس والعلب بالبشاميل والعالمية',
    category: 'طلبات وعلب',
    image: '/assets/aistudio/637789182_1476499327820483_7038713125244779222_n_076667a2.jpg',
  },
  {
    title: 'طلبات مشكلة (مسقعة، باذنجان مخلل، طرشي، بيض مدحرج)',
    category: 'طلبات وعلب',
    image: '/assets/aistudio/637150779_1476499794487103_2550922358564042372_n_9e8e829a.jpg',
  },
];

/**
 * Loads an image from URL and returns a Data URL via canvas.
 */
function loadImageDataUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas 2d context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

/**
 * Generates and downloads a complete PDF containing all authentic menu boards.
 */
export async function generateAndDownloadMenuPdf(
  onProgress?: (current: number, total: number, pageTitle: string) => void
): Promise<void> {
  const totalSteps = MENU_PDF_PAGES.length + 1; // 1 cover + 17 menu pages

  // Initialize jsPDF in Portrait A4 format (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // 1. Cover Page
  if (onProgress) {
    onProgress(1, totalSteps, 'غلاف قائمة الطعام الرسمية');
  }

  // Draw dark luxury background
  pdf.setFillColor(15, 18, 23);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative gold borders
  pdf.setDrawColor(245, 158, 11); // Amber / Gold
  pdf.setLineWidth(1.5);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20, 'D');
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

  // Load and place Logo
  try {
    const logoData = await loadImageDataUrl(RESTAURANT_INFO.logo);
    // Add circular or square logo in center
    const logoSize = 75;
    const logoX = (pageWidth - logoSize) / 2;
    pdf.addImage(logoData, 'JPEG', logoX, 40, logoSize, logoSize);
  } catch (e) {
    console.warn('Failed to load logo for PDF cover', e);
  }

  // Cover Typography
  pdf.setTextColor(245, 158, 11); // Amber-500
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(26);
  pdf.text('AL ALAMIA', pageWidth / 2, 135, { align: 'center' });

  pdf.setFontSize(16);
  pdf.setTextColor(220, 220, 225);
  pdf.text('Cafe & Restaurant - Suez', pageWidth / 2, 145, { align: 'center' });

  pdf.setDrawColor(245, 158, 11);
  pdf.setLineWidth(0.8);
  pdf.line(40, 155, pageWidth - 40, 155);

  pdf.setFontSize(20);
  pdf.setTextColor(255, 255, 255);
  pdf.text('Official Menu & Price Guide', pageWidth / 2, 170, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setTextColor(200, 200, 210);
  pdf.text('Delivery & Dine-In: 24/7', pageWidth / 2, 182, { align: 'center' });

  // Order Details Box on Cover
  pdf.setFillColor(25, 30, 40);
  pdf.setDrawColor(50, 60, 80);
  pdf.roundedRect(30, 210, pageWidth - 60, 45, 4, 4, 'FD');

  pdf.setTextColor(245, 158, 11);
  pdf.setFontSize(13);
  pdf.text('Call to Order: ' + RESTAURANT_INFO.phone, pageWidth / 2, 224, { align: 'center' });

  pdf.setTextColor(16, 185, 129); // Emerald
  pdf.text('WhatsApp: ' + RESTAURANT_INFO.phone, pageWidth / 2, 233, { align: 'center' });

  pdf.setTextColor(180, 185, 195);
  pdf.setFontSize(10);
  pdf.text('Suez, Egypt - Maps: maps.app.goo.gl/kJu2AxEPFDuEEAnt7', pageWidth / 2, 243, { align: 'center' });

  // 2. Add each authentic menu page
  for (let i = 0; i < MENU_PDF_PAGES.length; i++) {
    const pageItem = MENU_PDF_PAGES[i];
    const currentStep = i + 2;

    if (onProgress) {
      onProgress(currentStep, totalSteps, pageItem.title);
    }

    pdf.addPage('a4', 'portrait');

    // Page Background
    pdf.setFillColor(15, 18, 23);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Header strip on top
    pdf.setFillColor(24, 29, 38);
    pdf.rect(0, 0, pageWidth, 20, 'F');
    pdf.setDrawColor(245, 158, 11);
    pdf.setLineWidth(0.8);
    pdf.line(0, 20, pageWidth, 20);

    // Header Text (English / Romanized for maximum universal rendering in standard PDF fonts)
    pdf.setTextColor(245, 158, 11);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('AL ALAMIA RESTAURANT - ' + pageItem.category, 15, 13);

    pdf.setTextColor(180, 185, 195);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Tel: ${RESTAURANT_INFO.displayPhone}`, pageWidth - 15, 13, { align: 'right' });

    // Menu Image (Scale to fit page with margins)
    try {
      const imgData = await loadImageDataUrl(pageItem.image);
      const imgMarginTop = 24;
      const imgMarginBottom = 16;
      const availableHeight = pageHeight - imgMarginTop - imgMarginBottom;
      const availableWidth = pageWidth - 20;

      // Menu sheets are tall (roughly aspect ratio 9:16 or 3:4)
      const targetHeight = availableHeight;
      const targetWidth = availableWidth;
      const xPos = 10;
      const yPos = imgMarginTop;

      pdf.addImage(imgData, 'JPEG', xPos, yPos, targetWidth, targetHeight, undefined, 'FAST');
    } catch (e) {
      console.warn(`Failed to render menu image ${pageItem.image} to PDF`, e);
      pdf.setTextColor(255, 100, 100);
      pdf.text('Page image preview', pageWidth / 2, pageHeight / 2, { align: 'center' });
    }

    // Footer with Page Number
    pdf.setTextColor(140, 145, 155);
    pdf.setFontSize(9);
    pdf.text(`Page ${i + 1} of ${MENU_PDF_PAGES.length}`, pageWidth / 2, pageHeight - 6, {
      align: 'center',
    });
  }

  // Save the PDF
  pdf.save('منيو-مطعم-العالمية-السويس.pdf');
}
