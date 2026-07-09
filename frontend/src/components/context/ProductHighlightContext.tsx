// import { createContext, useState } from "react";

// type ProductHighlightContextType = {
//   highlightProductId: string | null;
//   highlightProduct: (productId: string) => void;
//   clearHighlight: () => void;
// };

// export const ProductHighlightContext = createContext<ProductHighlightContextType | null>(
//   null
// );

// export const ProductHighlightProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [highlightProductId, setHighlightProductId] = useState<string | null>(
//     null
//   );

//   const highlightProduct = (productId: string) => {
//     setHighlightProductId(productId);
//   };

//   const clearHighlight = () => {
//     setHighlightProductId(null);
//   };

//   return (
//     <ProductHighlightContext.Provider
//       value={{ highlightProductId, highlightProduct, clearHighlight }}
//     >
//       {children}
//     </ProductHighlightContext.Provider>
//   );
// };

import { createContext, useCallback,  useState } from "react";

type ProductHighlightContextType = {
    highlightProductId: string | null;
    highlightProduct: (productId: string) => void;
    clearHighlight: () => void;
};

export const ProductHighlightContext = createContext<ProductHighlightContextType | null>(
    null
);

export const ProductHighlightProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [highlightProductId, setHighlightProductId] = useState<string | null>(
        null
    );

    const highlightProduct = useCallback((productId: string) => {
        setHighlightProductId(productId);
    }, []);

    const clearHighlight = useCallback(() => {
        setHighlightProductId(null);
    }, []);

    return (
        <ProductHighlightContext.Provider
            value={{ highlightProductId, highlightProduct, clearHighlight }}
        >
            {children}
        </ProductHighlightContext.Provider>
    );
};

