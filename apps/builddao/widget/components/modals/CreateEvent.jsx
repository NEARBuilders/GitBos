const { Modal } = VM.require("buildhub.near/widget/components") || {
  Modal: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";

return (
  <Modal
    open={showModal}
    title={"Create Event"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <Widget
      src="buildhub.near/widget/components.modals.event.Form"
      loading=""
      props={{
        bootstrapTheme,
        toggleModal,
      }}
    />
  </Modal>
);
