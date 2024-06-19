const { Modal, Button } = VM.require("${alias_old}/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};

const { href } = VM.require("${alias_old}/widget/lib.url") || {
  href: () => {},
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";

const Item = ({ title, description, src, tab }) => {
  return (
    <Link
      href={href({
        widgetSrc: `${alias_new}/widget/Index`,
        params: {
          page: "projects",
          tab: tab,
        },
      })}
    >
      <div className="d-flex gap-2 pointer-cursor">
        <img src={src} height={40} width={40} />
        <div className="d-flex flex-column">
          <h6>{title}</h6>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </Link>
  );
};

const Container = styled.div`
  .pointer-cursor {
    cursor: pointer;
  }
  .text-sm {
    font-size: 13px;
  }
  a {
    color: inherit !important;
    &:hover {
      text-decoration: none !important;
    }
  }
`;

return (
  <Modal
    open={showModal}
    title={"Create Project"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <Container
      className="d-flex flex-column gap-4 my-2"
      data-testid="create-project-modal"
    >
      <Item
        title="Create my own project"
        description="Create your own completely new project, customize it your way!"
        src="https://ipfs.near.social/ipfs/bafkreidbfu7uxtr4is7wxileg3mrbajve6cgkfmrqemc6pxsr6nnczz7ly"
        tab="editor"
      />

      <Item
        title="Import from Potlock"
        description="Import your projects from the Potlock platform."
        src="https://ipfs.near.social/ipfs/bafkreifk42ibqsg5sfky5tlhkfty6rkup5leqite5koenhesnuwq55kufi"
        tab="potlockImport"
      />

      <div className="my-1 d-flex justify-content-center">
        <Button variant="primary" onClick={toggleModal}>
          Cancel
        </Button>
      </div>
    </Container>
  </Modal>
);
