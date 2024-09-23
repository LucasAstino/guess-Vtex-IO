import React from 'react'
import styles from './styles/style.css'

export const TableFeminineTwo = ()=>{

    return(
        <table  cellPadding="1" cellSpacing="1" id={styles.tabelaFeminino} style={{border:'1px solid black' }}>
      <tbody>
        <tr>
          <td><strong className="title">TAMANHO</strong></td>
          <td><strong className="title">BUSTO</strong></td>
          <td><strong className="title">CINTURA&nbsp;</strong></td>
          <td><strong className="title">QUADRIL</strong></td>
        </tr>
        <tr>
          <td>PP ou XS&nbsp;</td>
          <td>79-84</td>
          <td>59-65</td>
          <td>87-93</td>
        </tr>
        <tr>
          <td>P ou S&nbsp;</td>
          <td>84-90</td>
          <td>65-71</td>
          <td>93-99</td>
        </tr>
        <tr>
          <td>M&nbsp;</td>
          <td>90-96</td>
          <td>71-77</td>
          <td>99-102</td>
        </tr>
        <tr>
          <td>G ou L&nbsp;</td>
          <td>96-102</td>
          <td>77-83</td>
          <td>105-111</td>
        </tr>
        <tr>
          <td>GG ou XL&nbsp;</td>
          <td>102-108</td>
          <td>83-89</td>
          <td>111-117</td>
        </tr>
        <tr>
          <td>EGG ou XXL&nbsp;</td>
          <td>108-114</td>
          <td>89-95</td>
          <td>117-123</td>
        </tr>
      </tbody>
    </table>
)
}