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
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    onLogged();
  }, [isLogged]);

  const onLogged = () => {
    firebaseRef.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  };

  return (
    <Layout>
      {isLogged ? (
        <>
          <SiderMenu
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          />
          <Layout className="site-layout">
            <Header />
            <GlobalStyle />
            <Route path="/carteira" exact component={WalletComponent} />
            <Route path="/" exact component={WalletComponent} />
            <Footer />
          </Layout>
        </>
      ) : (
        <Switch>
          <Route
            path="/cadastre-se"
            render={() => <SignUp onLogged={() => onLogged()} />}
          />
          <Route
            path="/entrar"
            render={() => <Login onLogged={() => onLogged()} />}
          />
          <Route
            path="/"
            render={() => <Login onLogged={() => onLogged()} />}
          />
        </Switch>
      )}
    </Layout>
  );
};
