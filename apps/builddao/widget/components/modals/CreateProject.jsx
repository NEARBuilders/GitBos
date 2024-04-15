const accountId = context.accountId;
const { Modal, Button, InputField, TextEditor } = VM.require(
  "${config_account}/widget/components",
) || {
  Modal: () => <></>,
  Button: () => <></>,
  InputField: () => <></>,
  TextEditor: () => <></>,
};
const { normalize } = VM.require("devhub.near/widget/core.lib.stringUtils") || {
  normalize: () => {},
};
const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;

const tabs = [
  { id: "overview", label: "Overview", disabled: true, checked: true },
  { id: "discussion", label: "Discussion", checked: false },
  { id: "tasks", label: "Tasks", checked: false },
  { id: "code", label: "Code", checked: false },
  { id: "roadmap", label: "Roadmap", checked: false },
];

const app = props.app ?? "testing122.near";

const [tags, setTags] = useState(props.filters.tags ?? []);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [contributors, setDistributors] = useState("");
const [twitter, setTwitter] = useState("");
const [gitHub, setGitHub] = useState("");
const [telegram, setTelegram] = useState("");
const [website, setWebsite] = useState("");
const [selectedTabs, setSelectedTabs] = useState(
  new Set(tabs.filter((tab) => tab.checked).map((tab) => tab.id.toLowerCase())),
);
const [avatar, setAvatar] = useState("");
const [coverImage, setCoverImage] = useState("");

const handleCheckboxChange = (event) => {
  const { id } = event.target;
  const newSelectedTabs = new Set(selectedTabs); // Create a copy to avoid mutation
  if (event.target.checked) {
    newSelectedTabs.add(id.toLowerCase());
  } else {
    newSelectedTabs.delete(id.toLowerCase());
  }
  setSelectedTabs(newSelectedTabs);
};

const following = Social.get(`${context.accountId}/graph/follow/*`);

const accounts = following && Object.keys(following);

const handleTags = (tags) => {
  let filtered = tags.map((tag) => (tag.customOption ? tag.label : tag));
  setTags(filtered);
};

const handleContributors = (contributors) => {
  let filtered = contributors.map((contributor) =>
    contributor.customOption ? contributor.label : contributor,
  );
  setDistributors(filtered);
};

function isValidUrl(url) {
  const regex = /^(?:(http|https):\/\/)?([^\s]+\.[^\s]+)?(?:\/[\w\-\.]+)*\/?$/;
  return regex.test(url);
}

const websiteUrlHandler = (e) => {
  const url = e.target.value;
  setWebsite(url);
};

const Main = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  .form-control {
    background: transparent;
  }
  .lhs {
    width: 400px;
    > div {
      width: 100%;
    }
  }
  .rhs {
    width: 400px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    .lhs,
    .rhs {
      width: auto;
    }
  }

  .form-group {
    width: 100%;
    & > div > div.p-2 {
      background: transparent !important;
      border: 1px solid var(--border-color, #ccc);
      border-width: 0px 1px 1px;
      border-top-style: initial;
      border-right-style: solid;
      border-bottom-style: solid;
      border-left-style: solid;
      border-top-color: initial;
      border-right-color: rgb(222, 226, 230);
      border-bottom-color: rgb(222, 226, 230);
      border-left-color: rgb(222, 226, 230);
      border-image: initial;
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      min-height: 9em;
      * {
        color: var(--text-color, #fff);
      }
    }
    .nav-link {
      color: var(--text-color, #fff);
    }
  }
  .form-check {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 0px;
  }
  .form-check-input {
    background-color: transparent;
    border: 1px solid var(--border-color, #ccc);
    &:checked {
      background-color: var(--primary-color, #38c793);
      border-color: var(--primary-color, #38c793);
      &:focus {
        box-shadow: none;
      }
    }
    &:focus {
      box-shadow: none;
    }
    &:not(:checked):not(:focus) {
      background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e");
    }
  }
`;

function onCreateProject() {
  const projectAccountId = "testing122.near";
  const projectID = normalize(title);
  const project = {
    title,
    description,
    location,
    tags,
    contributors,
    twitter,
    github: gitHub,
    telegram,
    website,
    tabs: Array.from(selectedTabs),
    profileImage: avatar,
    backgroundImage: coverImage,
    projectAccountId,
  };
  const data = {
    project: {
      [projectID]: {
        "": JSON.stringify(project),
        metadata: project,
      },
    },
    [app]: {
      project: {
        [`${context.accountId}_project_${projectID}`]: "",
      },
    },
  };
  if (projectAccountId.includes(".sputnik-dao.near")) {
    const policy = Near.view(projectAccountId, "get_policy");
    const base64 = Buffer.from(
      JSON.stringify({
        data: {
          [projectAccountId]: data,
        },
        options: { refund_unused_deposit: true },
      }),
      "utf-8",
    ).toString("base64");
    Near.call({
      contractName: projectAccountId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `Project creation using BuildDAO created by ${context.accountId}`,
          kind: {
            FunctionCall: {
              receiver_id: "${alias_socialdb}",
              actions: [
                {
                  method_name: "set",
                  args: base64,
                  deposit: "100000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: policy?.proposal_bond || 100000000000000000000000,
      gas: 200000000000000,
    });
  } else {
    Social.set(data);
  }
}

return (
  <Modal
    open={showModal}
    title={"Create Project"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <Main>
      <div className="lhs d-flex flex-column gap-4">
        <InputField
          key={"Project-Title"}
          label={"Project Title"}
          placeholder={"Enter Project Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="form-group">
          <label className="mb-1">Description</label>
          <TextEditor value={description} onChange={(e) => setDescription(e)} />
        </div>
        <InputField
          key={"Location"}
          label={"Location"}
          placeholder={"Enter location"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="form-group">
          <label className="mb-1">Project Contributors</label>
          <Typeahead
            multiple
            options={
              allMainnetAddresses ?? ["frank.near", "ellie.near", "jane.near"]
            }
            allowNew
            placeholder="frank.near, ellie.near"
            selected={contributors}
            onChange={(e) => handleContributors(e)}
          />
        </div>

        <InputField
          key={"twitter"}
          label={"Twitter"}
          error={twitter && !isValidUrl(twitter)}
          placeholder={"https://twitter.com/handle"}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />

        <InputField
          key={"github"}
          label={"GitHub"}
          error={gitHub && !isValidUrl(gitHub)}
          placeholder={"https://github.com/handle"}
          value={gitHub}
          onChange={(e) => setGitHub(e.target.value)}
        />

        <InputField
          key={"telegram"}
          label={"Telegram"}
          error={telegram && !isValidUrl(telegram)}
          placeholder={"https://t.me/handle"}
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
        />

        <InputField
          key={"website"}
          label={"Website"}
          error={website && !isValidUrl(website)}
          placeholder={"https://www.nearbuilders.org/"}
          value={website}
          onChange={websiteUrlHandler}
        />

        <div className="form-group">
          <label className="mb-3">Tabs</label>
          <div className="d-flex flex-column gap-1">
            {tabs.map((tab) => (
              <div className="form-check form-switch" key={tab.id}>
                <label className="form-check-label" htmlFor={tab.id}>
                  {tab.label}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={tab.id}
                  checked={selectedTabs.has(tab.id.toLowerCase())}
                  onChange={handleCheckboxChange}
                  disabled={tab.disabled}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="mb-1">Tags</label>
          <Typeahead
            multiple
            options={
              props.tagFilters ?? ["Community", "Open Source", "Weekly", "DAO"]
            }
            allowNew
            placeholder="Start Typing"
            selected={tags}
            onChange={(e) => handleTags(e)}
          />
        </div>
      </div>
      <div className="rhs">
        <div className="form-group mb-3">
          <label className="pb-2">Avatar</label>
          <Widget
            src="${config_account}/widget/components.ImageUploader"
            props={{
              image: avatar,
              onChange: (image) => setAvatar({ image }),
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label className="pb-2">Cover Image</label>
          <Widget
            src="${config_account}/widget/components.ImageUploader"
            props={{
              image: coverImage,
              onChange: (image) => setCoverImage({ image }),
            }}
          />
        </div>
      </div>
    </Main>
    <div className="d-flex align-items-center justify-content-end gap-2">
      <Button variant="primary" onClick={onCreateProject}>
        Create
      </Button>
    </div>
  </Modal>
);
