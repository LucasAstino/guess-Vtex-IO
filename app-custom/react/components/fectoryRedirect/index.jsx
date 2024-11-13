import React, { useState } from 'react';
import Papa from 'papaparse';

export const CsvPreview = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePreviewAndDownload = () => {
    if (!file) {
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const formattedData = results.data
          .filter((row) => {
            const rowString = `${row.from || row.oldURL};${row.to || '/'};PERMANENT;`;
            return (rowString.match(/;/g) || []).length <= 4;
          })
          .map((row) => ({
            from: row.from || row.oldURL,
            to: row.to || '/',
            type: 'PERMANENT',
            endDate: ''
          }))
          .filter((row) => row.from.toLowerCase() !== row.to.toLowerCase()); 

        const header = 'from;to;type;endDate';
     
        const csvString = [
          header,
          ...formattedData.map(row => `${row.from};${row.to};${row.type};${row.endDate}`)
        ].join('\n');

        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'redirects.csv');
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(url);
        document.body.removeChild(link);

      },
      error: (error) => {
        console.error('Erro ao processar CSV:', error);
      },
    });
  };

  return (
    <div>
      <h2>Pré-visualizar CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handlePreviewAndDownload}>Baixar CSV Formatado</button>
    </div>
  );
};
