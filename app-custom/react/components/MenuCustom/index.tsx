import React, { useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import "./style.css";

type SubmenuLink = {
  text: string;
  url: string;
  hasSubmenu?: boolean;
  submenuLinks?: SubmenuLink[];
  linkColor?: string;
};

type Banner = {
  bannerImage: string;
  bannerLink: string;
};

type MenuLink = {
  __editorItemTitle?: string;
  text: string;
  url: string;
  hasSubmenu: boolean;
  submenuLinks?: SubmenuLink[];
  banner: Banner;
  linkColor?: string;
};

interface Props {
  menuLinks: MenuLink[];
}

const CSS_HANDLES = [
  "menuContainer",
  "submenuWrapper",
  "wrapper",
  "menuItem",
  "menuLink",
  "submenuContainer",
  "submenuItem",
  "bannerContainer",
  "bannerImage",
  "submenuToggleIcon",
  "activeMenuItem",
  "hoverMenuItem",
  "openSubmenu",
  "level-",
] as const;

export const MenuCustom = (props: Props) => {
  const { menuLinks } = props;
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const { handles } = useCssHandles(CSS_HANDLES);

  const isMobile = window.innerWidth <= 768;

  const handleSubmenuToggle = (indexPath: string) => {
    setOpenSubmenus((prevOpenSubmenus) =>
      prevOpenSubmenus.includes(indexPath)
        ? prevOpenSubmenus.filter((path) => path !== indexPath)
        : [...prevOpenSubmenus, indexPath]
    );
  };

  const renderSubmenu = (
    submenuLinks: SubmenuLink[] | undefined,
    level: number = 0,
    parentIndexPath: string = ""
  ) => {
    if (!submenuLinks) return null;

    return (
      <ul
        className={`${handles.submenuWrapper} ${handles["level-"]}${level} ${
          openSubmenus.includes(parentIndexPath) ? handles.openSubmenu : ""
        }`}
      >
        {submenuLinks.map((submenuLink, subIndex) => {
          const currentPath = `${parentIndexPath}-${subIndex}`;

          return (
            <li
              key={currentPath}
              className={`${handles.submenuItem} ${
                openSubmenus.includes(currentPath) ? handles.activeMenuItem : ""
              }`}
              onMouseEnter={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.includes(currentPath)
                    ? prevOpenSubmenus
                    : [...prevOpenSubmenus, currentPath]
                )
              }
              onMouseLeave={() =>
                !isMobile &&
                setOpenSubmenus((prevOpenSubmenus) =>
                  prevOpenSubmenus.filter((path) => path !== currentPath)
                )
              }
            >
              {isMobile ? (
                <p
                  style={{ color: submenuLink.linkColor || "#000" }}
                  className={handles.menuLink}
                  onClick={(e) => {
                    if (submenuLink.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(currentPath);
                    }
                  }}
                  aria-controls={`submenu-${currentPath}`}
                  aria-expanded={
                    openSubmenus.includes(currentPath) ? "true" : "false"
                  }
                >
                  {submenuLink.text}
                  {submenuLink.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${
                        openSubmenus.includes(currentPath) ? "active" : ""
                      }`}
                    ></span>
                  )}
                </p>
              ) : (
                <a
                  href={submenuLink.url}
                  style={{ color: submenuLink.linkColor || "#000" }}
                  className={handles.menuLink}
                >
                  {submenuLink.text}
                </a>
              )}
              {submenuLink.hasSubmenu &&
                renderSubmenu(submenuLink.submenuLinks, level + 1, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav
      className={handles.menuContainer}
      role="navigation"
      aria-label="Main Menu"
    >
      <ul className={handles.wrapper}>
        {menuLinks.map((link, index) => {
          const indexPath = `${index}`;

          return (
            <li
              key={indexPath}
              className={`${handles.menuItem} ${
                openSubmenus.includes(indexPath) ? handles.activeMenuItem : ""
              } ${!isMobile ? handles.hoverMenuItem : ""}`}
              onMouseEnter={() => !isMobile && setOpenSubmenus([indexPath])}
              onMouseLeave={() => !isMobile && setOpenSubmenus([])}
              aria-haspopup={link.hasSubmenu ? "true" : undefined}
              aria-expanded={
                openSubmenus.includes(indexPath) ? "true" : "false"
              }
            >
              {isMobile ? (
                <p
                  className={handles.menuLink}
                  style={{ color: link.linkColor || "#000" }}
                  onClick={(e) => {
                    if (link.hasSubmenu) {
                      e.preventDefault();
                      handleSubmenuToggle(indexPath);
                    }
                  }}
                  aria-controls={`submenu-${indexPath}`}
                  aria-expanded={
                    openSubmenus.includes(indexPath) ? "true" : "false"
                  }
                >
                  {link.text}
                  {link.hasSubmenu && (
                    <span
                      className={`${handles.submenuToggleIcon} ${
                        openSubmenus.includes(indexPath) ? "active" : ""
                      }`}
                    ></span>
                  )}
                </p>
              ) : (
                <a
                  href={link.url}
                  className={handles.menuLink}
                  style={{ color: link.linkColor || "#000" }}
                >
                  {link.text}
                </a>
              )}
              {link.hasSubmenu && (
                <div
                  id={`submenu-${indexPath}`}
                  className={`${handles.submenuContainer} ${
                    openSubmenus.includes(indexPath) ? handles.openSubmenu : ""
                  }`}
                  role="region"
                  aria-label={`${link.text} submenu`}
                  style={{
                    display: openSubmenus.includes(indexPath) ? "flex" : "none",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{renderSubmenu(link.submenuLinks, 0, indexPath)}</div>
                  {link.banner && (
                    <div className={handles.bannerContainer}>
                      <a href={link.banner.bannerLink || "#"}>
                        <img
                          src={link.banner.bannerImage} // Verifique aqui se o valor está presente
                          alt={`${link.text} banner`}
                          className={handles.bannerImage}
                          loading="lazy"
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

MenuCustom.schema = {
  title: "Menu Customizado",
  description: "Um menu customizado com links dinâmicos e banners nos submenus",
  type: "object",
  properties: {
    menuLinks: {
      type: "array",
      title: "Links do Menu",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            type: "string",
            title: "Título no Editor",
          },
          text: {
            type: "string",
            title: "Texto do Link",
            default: "Link",
          },
          url: {
            type: "string",
            title: "URL do Link",
            default: "#",
          },
          hasSubmenu: {
            type: "boolean",
            title: "Este link possui um submenu?",
            default: false,
          },
          submenuLinks: {
            type: "array",
            title: "Links do Submenu",
            items: {
              type: "object",
              properties: {
                text: {
                  type: "string",
                  title: "Texto do Link",
                  default: "Submenu Link",
                },
                url: {
                  type: "string",
                  title: "URL do Link",
                  default: "#",
                },
                hasSubmenu: {
                  type: "boolean",
                  title: "Este link possui outro submenu?",
                  default: false,
                },
                submenuLinks: {
                  type: "array",
                  title: "Links do Submenu Aninhado",
                  items: {
                    type: "object",
                    properties: {
                      text: {
                        type: "string",
                        title: "Texto do Link",
                        default: "Submenu Link",
                      },
                      url: {
                        type: "string",
                        title: "URL do Link",
                        default: "#",
                      },
                    },
                  },
                },
              },
            },
          },
          banner: {
            type: "object",
            title: "Banner",
            properties: {
              bannerImage: {
                type: "string",
                title: "URL da Imagem do Banner",
                widget: {
                  "ui:widget": "image-uploader",
                },
                default: "",
              },
              bannerLink: {
                type: "string",
                title: "URL do Link do Banner",
                default: "#",
              },
            },
          },
          linkColor: {
            type: "string",
            title: "Cor dos Links",
            default: "#000000",
            widget: {
              "ui:widget": "color",
            },
          },
        },
      },
      minItems: 1,
      addItemText: "Adicionar novo link",
      deleteItemText: "Remover link",
    },
  },
};
