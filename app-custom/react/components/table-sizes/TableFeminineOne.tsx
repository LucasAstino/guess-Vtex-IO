import React from 'react'
import styles from'./styles/style.css'
import {TableFeminineTwo} from './TableFeminineTwo'

export const TableFeminineOne = () => {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
    <table cellPadding="1" cellSpacing="2" id={styles.tabelaFeminino} style={{border: '1px solid black' }}>
      <tbody>
        <tr>
          <td style={{ textAlign: 'center' }}><strong>TAMANHO</strong></td>
          <td style={{ textAlign: 'center' }}><strong>BUSTO</strong></td>
          <td style={{ textAlign: 'center' }}><strong className="title">CINTURA</strong></td>
          <td style={{ textAlign: 'center' }}><strong className="title">QUADRIL</strong></td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>36 ou 2</td>
          <td style={{ textAlign: 'center' }}>81-85</td>
          <td style={{ textAlign: 'center' }}>62-66</td>
          <td style={{ textAlign: 'center' }}>90-94</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>38 ou 4</td>
          <td style={{ textAlign: 'center' }}>85-89</td>
          <td style={{ textAlign: 'center' }}>66-70</td>
          <td style={{ textAlign: 'center' }}>94-98</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>40 ou 6</td>
          <td style={{ textAlign: 'center' }}>89-93</td>
          <td style={{ textAlign: 'center' }}>70-74</td>
          <td style={{ textAlign: 'center' }}>98-102</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>42 ou 8 </td>
          <td style={{ textAlign: 'center' }}>93-97</td>
          <td style={{ textAlign: 'center' }}>74-78</td>
          <td style={{ textAlign: 'center' }}>102-106</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'center' }}>44 ou 10</td>
          <td style={{ textAlign: 'center' }}>97-101</td>
          <td style={{ textAlign: 'center' }}>78-82</td>
          <td style={{ textAlign: 'center' }}>106-110</td>
        </tr>
      </tbody>
    </table>

    <TableFeminineTwo/>

    <p className={styles.paragraph}>Medidas em centímetros.</p>
    </div>
  )
}

