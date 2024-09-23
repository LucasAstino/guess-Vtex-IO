import React from 'react'
import styles from'./styles/style.css'
import {TableMasculineTwo} from './TableMasculineTwo'

export const TableMasculineOne = () => {
  return (

    <div style={{display:'flex',flexDirection:'column'}}>
    <table  cellPadding="1" id={styles.tabelaFeminino} cellSpacing="1" style={{border:'1px solid black' }}>
      <tbody>
        <tr>
          <td style={{textAlign:'center'}}><strong>TAMANHO</strong></td>
          <td style={{textAlign:'center'}}><strong>CINTURA</strong></td>
          <td style={{textAlign:'center'}}><strong>QUADRIL</strong></td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>38</td>
          <td style={{textAlign:'center'}}>77 - 79</td>
          <td style={{textAlign:'center'}}>97 - 99</td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>40&nbsp;</td>
          <td style={{textAlign:'center'}}>81 - 83</td>
          <td style={{textAlign:'center'}}>101 - 103</td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>42&nbsp;&nbsp;</td>
          <td style={{textAlign:'center'}}>85 - 87</td>
          <td style={{textAlign:'center'}}>104 - 106</td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>44&nbsp;</td>
          <td style={{textAlign:'center'}}>89 - 91</td>
          <td style={{textAlign:'center'}}>109 - 111</td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>46&nbsp;&nbsp;</td>
          <td style={{textAlign:'center'}}>&nbsp;93 - 95</td>
          <td style={{textAlign:'center'}}>112 - 114</td>
        </tr>
        <tr>
          <td style={{textAlign:'center'}}>48&nbsp;&nbsp;</td>
          <td style={{textAlign:'center'}}>97 - 99</td>
          <td style={{textAlign:'center'}}>117 - 119</td>
        </tr>
      </tbody>
    </table>

    <TableMasculineTwo/>

    <p className={styles.paragraph}>Medidas em centímetros.</p>
    </div>
  )
}

