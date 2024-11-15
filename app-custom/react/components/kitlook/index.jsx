// import React, { useEffect } from "react";
// import { useQuery } from "react-apollo";
// import { useProduct } from "vtex.product-context";
// import KitLook from "../../queries/kitLook.gql";
// import { SliderLayout } from "vtex.slider-layout";
// import { useCssHandles } from "vtex.css-handles";

// export const KITLOOK = [
//   "kitLook__container",
//   "kitLook__title",
//   "kitLook__item",
//   "kitLook__item-wrapper",
//   "kitLook__item-image",
//   "kitLook__item-link",
//   "kitLook__item-name",
//   "product__viewed-addtocart",
// ];

// export const KitLookComponent = () => {
//   const productContext = useProduct();
//   const { handles } = useCssHandles(KITLOOK);
//   console.log("productContext:", productContext);

//   const id = productContext?.product?.properties[4]?.values;
//   console.log("Product ID:", id);

//   const { data, loading, error } = useQuery(KitLook, {
//     variables: {
//       identifier: { field: "id", value: id },
//     },
//     skip: !id,
//   });

//   console.log("Loading state:", loading);
//   console.log("Error state:", error);
//   console.log("Data fetched:", data);

//   useEffect(() => {
//     console.log("Component mounted or data updated");
//   }, [data]);

//   if (loading) {
//     console.log("Component is loading data");
//     return <p>Carregando...</p>;
//   }

//   if (error) {
//     console.log("An error occurred while fetching data");
//     return <p>Erro ao carregar dados do SKU</p>;
//   }

//   const kitItems = data?.product ? [].concat(data.product) : [];

//   return (
//     <div className={handles["kitLook__container"]}>
//       <p className={handles["kitLook__title"]}>Complete o look</p>

//       <SliderLayout
//         itemsPerPage={{
//           desktop: 2,
//           tablet: 2,
//           phone: 1,
//         }}
//         showNavigationArrows="never"
//         showPaginationDots="never"
//       >
//         {kitItems.map((item, index) => (
//           <div className={handles.kitLook__item} key={index}>
//             {console.log("Rendering item:", item)}
//             <a
//               className={handles["kitLook__item-link"]}
//               href={`\\${item.linkText}/p`}
//             >
//               <div className={handles["kitLook__item-wrapper"]}>
//                 <img
//                   className={handles["kitLook__item-image"]}
//                   src={item?.items[0]?.images[0]?.imageUrl}
//                   alt={item.productName}
//                 />
//                 <button
//                   className={handles["product__viewed-addtocart"]}
//                   onClick={(event) => {
//                     event.preventDefault();
//                     event.stopPropagation();
//                     handleOpenModal(product);
//                   }}
//                 >
//                   Add
//                 </button>
//               </div>
//               <p className={handles["kitLook__item-name"]}>
//                 {item.productName}
//               </p>
//             </a>
//           </div>
//         ))}
//       </SliderLayout>
//     </div>
//   );
// };

import React from "react";
import { useQuery } from "react-apollo";
import { useProduct } from "vtex.product-context";
import KitLook from "../../queries/kitLook.gql";
import { SliderLayout } from "vtex.slider-layout";
import { SkuFromShelf } from "../shelfSku";
import { useCssHandles } from "vtex.css-handles";
import { CustomModal } from "../modal/index"; // Ensure this import path is correct

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
        showNavigationArrows="never"
        showPaginationDots="never"
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
                <CustomModal>
                  Add
                  <SkuFromShelf productQuery={{ product: item }} />
                </CustomModal>

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
