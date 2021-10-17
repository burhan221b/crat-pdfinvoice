import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Invoice from './components/Invoice';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {


  return (
    <div className="App">
      {/* <button onClick={handlePDFDownload}></button> */}
      <Invoice InvoiceId="1">
        <Invoice.Form />
      </Invoice>
    </div>
  );
}

export default App;
