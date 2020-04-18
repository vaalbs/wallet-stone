import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { SiderMenu } from "../../components/Sider-Menu";
import firebaseRef from "../../service/firebase";
import { Login } from "../Login";
import { SignUp } from "../SignUp";
import { WalletComponent } from "../Wallet";
import { GlobalStyle } from "./styled";

export const Main = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const user = firebaseRef.auth().currentUser;
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    onLogged();
  }, [user]);

  const onLogged = () => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  console.log("user", user, isLogged);

  return (
    <Layout>
      {isLogged && (
        <>
          <SiderMenu
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          />
          <Layout className="site-layout">
            <Header />
            <GlobalStyle />
            <Route path="/carteira" component={WalletComponent} />
            <Route path="/" component={WalletComponent} />
            <Footer />
          </Layout>
        </>
      )}
      <Switch>
        <Route path="/cadastre-se" component={SignUp} />
        <Route path="/entrar" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </Layout>
  );
};
