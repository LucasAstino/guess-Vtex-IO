// src/components/Menu/MenuStyles.ts
import styled from 'styled-components';

// Estilos principais
export const menuContainer = styled.nav`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  width: 100%;
  z-index: 1000;
`;

export const menuItem = styled.li`
  padding: 10px;
`;

export const menuLink = styled.a`
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

export const SubmenuToggleIcon = styled.span`
  content: "";
  display: block;
  float: right;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  transform: rotate(315deg);
  width: 8px;
  height: 8px;
`;

export const SubmenuContainer = styled.ul<{ level: number; isOpen: boolean }>`
  position: absolute;
  left: 0;
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  flex-direction: ${({ level }) => (level === 1 ? 'row' : 'column')};
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const SubmenuItem = styled.li`
  margin-bottom: 10px;
`;

export const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const SubmenuWrapper = styled.ul<{ level: number; isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  list-style: none;
  padding: 0;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const BannerContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
`;

export const BannerImage = styled.img`
  height: auto;
`;

export const BannerLink = styled.a`
  text-decoration: none;
`;

export const BannerText = styled.span`
  display: block;
`;

// Adicione mais estilos conforme necessário
