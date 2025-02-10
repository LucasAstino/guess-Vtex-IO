import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { useProduct } from "vtex.product-context";
import KitLook from "../../queries/kitLook.gql";
import Slider from "react-slick";
import { SliderLayout } from "vtex.slider-layout";
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";
import { CustomModal } from "../modal/index";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export const KITLOOK = [
  "kitLook__container",
  "kitLook__title",
  "kitLook__item",
  "kitLook__item-wrapper",
  "kitLook__item-image",
  "kitLook__item-link",
  "kitLook__item-name",
  "product__viewed-addtocart",
];

export const KitLookComponent = () => {
  const productContext = useProduct();
  const { handles } = useCssHandles(KITLOOK);
  const [hasItems, setHasItems] = useState(false);

  // Hook para monitorar tamanho da tela
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Define o estado inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (ids.length > 0) {
      setHasItems(true);
    }
  }, [ids]);

  
  const ids =
  productContext?.product?.properties[4]?.values[0]
  ?.split(";")
  .map((id) => id.trim()) || [];
  

  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 2,
    arrows: false,
    swipeToSlide: true,
  };

  

  return (
    <div className={handles["kitLook__container"]}>
      {hasItems && <p className={handles["kitLook__title"]}>Complete o look</p>}
      <div className="slider-wrapper">
        {isMobile ? (
         <SliderLayout
         itemsPerPage={{
           phone: 2,
         }}
         
         showNavigationArrows="always"
         showPaginationDots="never"
         centerMode="to-the-left"
         centerModeSlidesGap={8}
         fullWidth
       >
            {ids.map((id, index) => {
              const { data, loading, error } = useQuery(KitLook, {
                variables: {
                  identifier: { field: "id", value: id },
                },
                skip: !id,
              });

              if (loading) return <p key={index}>Carregando...</p>;
              if (error) return <p key={index}>Erro ao carregar dados do SKU</p>;

              const item = data?.product;

              return (
                item && (
                  <div
                    className={`vtex-slider__item ${handles["kitLook__item"]}`}
                    key={index}
                  >
                    <a
                      className={handles["kitLook__item-link"]}
                      href={`/${item.linkText}/p`}
                    >
                      <div className={handles["kitLook__item-wrapper"]}>
                        <img
                          className={handles["kitLook__item-image"]}
                          src={item.items[0]?.images[0]?.imageUrl}
                          alt={item.productName}
                        />
                        <CustomModal>
                          <button className="guessbr-agenciafg-custom-0-x-product__viewed-addtocart">
                            Add
                          </button>
                          <SkuFromShelf productQuery={{ product: item }} />
                        </CustomModal>
                      </div>
                      <p className={handles["kitLook__item-name"]}>
                        {item.productName}
                      </p>
                    </a>
                  </div>
                )
              );
            })}
          </SliderLayout>
        ) : (
          <Slider {...slickSettings}>
            {ids.map((id, index) => {
              const { data, loading, error } = useQuery(KitLook, {
                variables: {
                  identifier: { field: "id", value: id },
                },
                skip: !id,
              });

              if (loading) return <p key={index}>Carregando...</p>;
              if (error) return <p key={index}>Erro ao carregar dados do SKU</p>;

              const item = data?.product;

              return (
                item && (
                  <div className={handles["kitLook__item"]} key={index}>
                    <a
                      className={handles["kitLook__item-link"]}
                      href={`/${item.linkText}/p`}
                    >
                      <div className={handles["kitLook__item-wrapper"]}>
                        <img
                          className={handles["kitLook__item-image"]}
                          src={item.items[0]?.images[0]?.imageUrl}
                          alt={item.productName}
                        />
                        <CustomModal>
                          <button className="guessbr-agenciafg-custom-0-x-product__viewed-addtocart">
                            Add
                          </button>
                          <SkuFromShelf productQuery={{ product: item }} />
                        </CustomModal>
                      </div>
                      <p className={handles["kitLook__item-name"]}>
                        {item.productName}
                      </p>
                    </a>
                  </div>
                )
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};
