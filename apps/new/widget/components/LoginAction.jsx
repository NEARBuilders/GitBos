const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const Logo =
  "https://ipfs.near.social/ipfs/bafkreihsuyli6i2wphsutag6xcxnyhyrn7wtkklvqebx4szgpz3ieqacxu";

const LoginContainer = styled.div`
  color: #fff;

  width: 100%;
  height: 100%;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;
`;

const LogoStyle = styled.img`
  width: 121.949px;
  height: 87.799px;
  transform: rotate(-4.223deg);
`;

const text = props.text;

return (
  <LoginContainer>
    <LogoStyle src={Logo} />
    <h4>You’re not connected</h4>
    {text && <h6>{text}</h6>}
    <a href={"${alias_gateway_url}/join"} style={{ textDecoration: "none" }}>
      <Button variant="primary">Connect</Button>
    </a>
  </LoginContainer>
);
