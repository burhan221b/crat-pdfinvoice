import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Invoice from './components/Invoice';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const handlePDFDownload = () => {
    var val = htmlToPdfmake(`
    <div>
      <h1>My title</h1>
      <p>
        This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
        and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
      </p>
    </div>
    `);
    var dd = { content: val };
    pdfMake.createPdf(dd).download();
  }

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
