import React from 'react'
import styles from './styles/style.css'

export const TableMasculineTwo = ()=>{

    return(
        <table  cellPadding="1" cellSpacing="1" id={styles.tabelaFeminino} style={{border:'1px solid black' }}>
        <tbody>
          <tr>
            <td style={{textAlign:'center'}}>&nbsp;<strong>TAMANHO</strong></td>
            <td style={{textAlign:'center'}}><strong>OMBROS</strong></td>
            <td style={{textAlign:'center'}}><strong> TÓRAX&nbsp;</strong></td>
            <td style={{textAlign:'center'}}><strong>CINTURA</strong></td>
            <td style={{textAlign:'center'}}><strong>QUADRIL&nbsp;</strong></td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>P ou S</td>
            <td style={{textAlign:'center'}}>40 - 41,5</td>
            <td style={{textAlign:'center'}}>91 - 93</td>
            <td style={{textAlign:'center'}}>73 - 75</td>
            <td style={{textAlign:'center'}}>93 - 95</td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>M&nbsp;</td>
            <td style={{textAlign:'center'}}>42 - 43,5</td>
            <td style={{textAlign:'center'}}>97 - 99</td>
            <td style={{textAlign:'center'}}>77 - 79</td>
            <td style={{textAlign:'center'}}>97 - 99</td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>G ou&nbsp; L&nbsp;</td>
            <td style={{textAlign:'center'}}>44 - 45,5</td>
            <td style={{textAlign:'center'}}>&nbsp;103 - 105</td>
            <td style={{textAlign:'center'}}>81 - 83</td>
            <td style={{textAlign:'center'}}>101 - 103</td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>GG&nbsp; ou XL&nbsp;</td>
            <td style={{textAlign:'center'}}>46 - 47,5</td>
            <td style={{textAlign:'center'}}>&nbsp;109 - 111</td>
            <td style={{textAlign:'center'}}>85 - 87</td>
            <td style={{textAlign:'center'}}>104 - 107</td>
          </tr>
          <tr>
            <td style={{textAlign:'center'}}>EGG ou XXL&nbsp;</td>
            <td style={{textAlign:'center'}}>48 - 49,5</td>
            <td style={{textAlign:'center'}}>115 - 117</td>
            <td style={{textAlign:'center'}}>89 - 91</td>
            <td style={{textAlign:'center'}}>108 - 111</td>
          </tr>
        </tbody>
      </table>
)
}