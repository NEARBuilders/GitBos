const [view, setView] = useState("editor");
const [postContent, setPostContent] = useState("What do you have in mind?");
const [hideAdvanced, setHideAdvanced] = useState(true);
const [labels, setLabels] = useState([]);

function generateUID() {
  const maxHex = 0xffffffff;
  const randomNumber = Math.floor(Math.random() * maxHex);
  return randomNumber.toString(16).padStart(8, '0');
}

const postToCustomFeed = ({ feed, text, labels }) => {
  const postId = generateUID()
  if (!labels) labels = []
  return Social.set({
    "update": {
      [postId]: {
        "content": JSON.stringify({
          type: "md",
          text,
          labels,
        }),
        "metadata": {
          type: feed
        },
      },
    },
    "post": {
      "main": JSON.stringify({
        type: "md",
        text: `[EMBED](${context.accountId}/${feed}/${postId})`,
      }),
    },
    "index": {
      "every": JSON.stringify([
        { key: feed, value: { type: "md" }},
      ])
    }
  }, {
    force: true,
    onCommit: () => {
      console.log(`Commited ${feed}: #${postId}`)
    },
    onCancel: () => {
      console.log(`Cancelled ${feed}: #${postId}`)
    },
  });
}

const PostCreator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1rem;
  background: #23242b;
  border-radius: 12px;

  margin-bottom: 1rem;
`;

const MarkdownEditor = `
  * {
    border: none !important;
  }

  .rc-md-editor {
    background: #4f5055;
    border-top: 1px solid #4f5055 !important; 
  }

  .editor-container {
    background: #4f5055;
  }
  
  .drop-wrap {
    top: -110px !important;
    border-radius: 0.5rem !important;
  }

  .header-list {
    display: flex;
    align-items: center;
  }

  textarea {
    background: #23242b !important;
    color: #fff !important;

    font-family: sans-serif !important;
    font-size: 1rem;

    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
  }

  .rc-md-navigation {
    background: #23242b !important;
    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
  
    i {
      color: #cdd0d5;
    }
  }
`;

const Button = styled.button`
  all: unset;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 8px;
  background: var(--Yellow, #ffaf51);

  color: var(--black-100, #000);

  /* Other/Button_text */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SecondaryButton = styled.button`
  all: unset;
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  border-radius: 8px;
  border: 1px solid var(--white-100, #fff);
  background: transparent;
  color: var(--white-100, #fff);

  /* Other/Button_text */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  transition: all 300ms;

  &:hover {
    background: #fff;
    color: #000;
  }
`;

const MarkdownPreview = styled.div`
  * {
    color: #b6b6b8 !important;
  }
`;

const LabelSelect = styled.div`
  label {
    color: #fff;
  }

  .rbt-input-multi {
    background: #23242b !important;
    color: #fff !important;
  }

  .rbt-token {
    background: #202020 !important;
    color: #fff !important;
  }

  .rbt-menu {
    background: #23242b !important;
    color: #fff !important;

    .dropdown-item {
      color: #fff !important;
      transition: all 300ms;

      &:hover {
        background: #202020;
      }
    }
  }
`;

return (
  <PostCreator>
    <div className="d-flex gap-3">
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId: context.accountId,
          tooltip: false,
          link: true,
          style: imgWrapperStyle,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
      <div
        className="d-flex flex-column"
        style={{ color: "white", fontSize: 16 }}
      >
        <p className="fw-bold m-0">{name}</p>
        <p className="m-0">@{context.accountId}</p>
      </div>
    </div>

    <div style={{ border: "none" }}>
      {view === "editor" ? (
        <Widget
          src="mob.near/widget/MarkdownEditorIframe"
          props={{
            initialText: postContent,
            embedCss: MarkdownEditor,
            onChange: setPostContent,
          }}
        />
      ) : (
        <MarkdownPreview>
          <Widget
            src="efiz.near/widget/every.markdown.view"
            props={{ data: { content: postContent } }}
          />
        </MarkdownPreview>
      )}
    </div>

    {view === "editor" && (
      <div style={{ color: "white" }}>
        <div
          className="d-flex justify-content-between align-items-center"
          onClick={() => setHideAdvanced(!hideAdvanced)}
          style={{ cursor: "pointer" }}
        >
          <h6 className="fw-bold">Advanced</h6>
          <i className={`bi bi-chevron-${hideAdvanced ? "up" : "down"}`}></i>
        </div>

        <LabelSelect
          className={`d-${hideAdvanced ? "none" : "flex"} flex-column mt-3`}
        >
          <Widget
            src="discover.near/widget/Inputs.MultiSelect"
            props={{
              label: "Labels",
              placeholder: "Near.social, Widget, NEP, Standard, Protocol, Tool",
              options: [
                "Near.social",
                "Widget",
                "NEP",
                "Standard",
                "Protocol",
                "Tool",
              ],
              labelKey: "labels",
              value: labels,
              onChange: setLabels,
            }}
          />
        </LabelSelect>
      </div>
    )}

    <div className="d-flex gap-3 align-self-end">
      <SecondaryButton
        onClick={() => setView(view === "editor" ? "preview" : "editor")}
      >
        {view === "editor" ? (
          <>
            Preview <i className="bi bi-eye"></i>
          </>
        ) : (
          <>
            Edit <i className="bi bi-pencil-square"></i>
          </>
        )}
      </SecondaryButton>
      <Button onClick={() => postToCustomFeed({ feed: props.key, text: postContent, labels })}>Post Update</Button>
    </div>
  </PostCreator>
);
