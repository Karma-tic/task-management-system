import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
