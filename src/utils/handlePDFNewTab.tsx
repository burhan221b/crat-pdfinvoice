import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const handlePDFNewTab = (docDefinition: any) => {
    pdfMake.createPdf(docDefinition).open();
};

export { handlePDFNewTab }