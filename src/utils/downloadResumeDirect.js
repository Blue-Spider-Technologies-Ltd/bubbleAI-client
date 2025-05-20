import { pdf } from '@react-pdf/renderer';

const templateMap = {
  Auckland: () => import('../components/Resume/Templates/Auckland/Auckland'),
  BubbleFish: () => import('../components/Resume/Templates/BubbleFish/BubbleFish'),
  EuroPass: () => import('../components/Resume/Templates/Europass/EuroPass'),
  RadiantMoon: () => import('../components/Resume/Templates/RadiantMoon/RadiantMoon'),
  Standard: () => import('../components/Resume/Templates/Standard/StandardPDF'),
  SwimmingElephant: () => import('../components/Resume/Templates/SwimmingElephant/SwimmingElephant'),
  WaterTrain: () => import('../components/Resume/Templates/WaterTrain/WaterTrain'),
};

/**
 * Download a resume as PDF using the correct template (no preview, direct download)
 * @param {object} resumeObj - The resume object (must have storageDetails.template)
 * @param {string} [fileName] - Optional file name for the PDF
 */
export async function downloadResumeDirect(resumeObj) {
    if (!resumeObj?.storageDetails?.template) throw new Error('No template specified');
    
    const fileName = `${resumeObj.storageDetails.name} ${new Date().toISOString()}.pdf`;
    // const templateName = resumeObj.storageDetails.template.replace(/\s+/g, '');
    const templateName = "Standard";
    const importTemplate = templateMap[templateName];
    if (!importTemplate) throw new Error(`Unknown template: ${templateName}`);

    const { default: TemplateComponent } = await importTemplate();
    
    const doc = <TemplateComponent 
      resume={resumeObj} 
      imgUrl={resumeObj?.storageDetails?.imgUrl} 
    />;
  
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob({
      compress: true,
      quality: 0.8,  // Adjust quality
    });
  
    // Efficient download handling
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
}

const clTemplateMap = {
  Auckland: () => import('../components/Resume/CoverLetters/CLAuckland'),
  BubbleFish: () => import('../components/Resume/CoverLetters/CLBubbleFish'),
  EuroPass: () => import('../components/Resume/CoverLetters/CLEuroPass'),
  Standard: () => import('../components/Resume/CoverLetters/CLStandardPDF'),
};

/**
 * Download a cover letter as PDF using the correct template (no preview, direct download)
 * @param {string} coverLetterText - The cover letter text
 * @param {object} resumeObj - The resume object (must have storageDetails.template)
 * @param {string} [fileName] - Optional file name for the PDF
 */
export async function downloadCoverLetterDirect(coverLetterText, resumeObj) {
    if (!resumeObj?.storageDetails?.template) throw new Error('No template specified in resume object');
    if (!coverLetterText) throw new Error('Failed, Try again');

    const fileName = `Cover Letter for ${resumeObj.storageDetails.name} ${resumeObj.basicInfo.jobPosition}.pdf`;
    const templateName = resumeObj.storageDetails.template.replace(/\s+/g, '');
    const importTemplate = clTemplateMap[templateName];
    if (!importTemplate) throw new Error('Unknown cover letter template: ' + templateName);
    const module = await importTemplate();
    const TemplateComponent = module.default;
    const doc = <TemplateComponent 
                  letter={coverLetterText} 
                  resume={resumeObj}       
                  imgUrl={resumeObj?.storageDetails?.imgUrl} 
                />;
    const asPdf = pdf([]);
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}

