const { Hero, Goals, Join, Purposes, AboutUs, Governance, Footer } = VM.require(
  "${config_account}/widget/home.Home",
) || {
  Hero: () => <></>,
  Goals: () => <></>,
  Join: () => <></>,
  Purposes: () => <></>,
  AboutUs: () => <></>,
  Governance: () => <></>,
  Footer: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #000);
  color: var(--text-color, #fff);
  width: 100%;
`;

return (
  <Root>
    <Hero {...props} />
    {/* <Goals /> */}
    {/* <Join /> */}
    <Purposes {...props} />
    {/* <AboutUs /> */}
    <Governance {...props} />
    <Footer {...props} />
  </Root>
);
