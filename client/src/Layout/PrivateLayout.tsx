import React, { ReactNode } from "react";
import FooterComponent from "../Components/Footer";
import HeaderComponent from "../Components/Header";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  );
};

export default PrivateLayout;
