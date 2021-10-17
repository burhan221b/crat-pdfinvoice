import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import htmlToPdfmake from "html-to-pdfmake";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const handlePDFDownload = (pdf_string: string) => {
//   console.log("Running handlePDFDownload")
//   var val = htmlToPdfmake(pdf_string);
//   var dd = { content: val };
//   pdfMake.createPdf(dd).download();
// };

const handlePDFDownload = (docDefinition: any) => {
  pdfMake.createPdf(docDefinition).download();
};

export { handlePDFDownload }