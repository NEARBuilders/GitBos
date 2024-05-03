/**
 * This is a standard layout with a header, body, and a footer
 */

const { Button } = VM.require("${config_account}/widget/components") || {
  Button: () => <></>,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: var(--bg-1, #000000);
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = ({ page, routes, ...props }) => (
  <>
    <Widget src="${config_account}/widget/components.banners.potlock" />
    <Widget
      src="${config_account}/widget/components.Navbar"
      loading=""
      props={{ page, routes, ...props }}
    />
  </>
);

const Footer = (props) => {
  return <></>;
};

// Define the new component that follows the AppLayout pattern
function AppLayout({ routes, page, children, ...props }) {
  return (
    <Container>
      <Header page={page} routes={routes} {...props} />
      <ContentContainer key={page}>{children}</ContentContainer>
      <Footer page={page} />
    </Container>
  );
}

return { AppLayout };
