import React from "react";
import { useQuery } from "react-apollo";
import { useProduct } from "vtex.product-context";
import KitLook from "../../queries/kitLook.gql";
import { SliderLayout } from "vtex.slider-layout";
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";
import { CustomModal } from "../modal/index";

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

  const ids =
    productContext?.product?.properties[4]?.values[0]
      ?.split(";")
      .map((id) => id.trim()) || [];

  return (
    <div className={handles["kitLook__container"]}>
      <p className={handles["kitLook__title"]}>Complete o look</p>
      <SliderLayout
        itemsPerPage={{
          desktop: 2,
          tablet: 2,
          phone: 1,
        }}
        className="kitLook"
        centerMode="to-the-left"
        showNavigationArrows="always"
        showPaginationDots="always"
        usePagination
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
      </SliderLayout>
    </div>
  );
};

