import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Invoice from './components/Invoice';
import Version from './components/Version';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {


  return (
    <div className="App">
      {/* <button onClick={handlePDFDownload}></button> */}
      <Invoice InvoiceId="1">
        <Invoice.Form />
      </Invoice>
      <Version />
    </div>
  );
}

export default App;
