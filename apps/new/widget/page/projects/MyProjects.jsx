if (!context.accountId) {
  return (
    <h2 className="text-white">
      "Please log in in order to see involved projects!"
    </h2>
  );
}

const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { ProjectCard } = VM.require(
  "${config_account}/widget/components.project.Card",
) || {
  ProjectCard: () => <></>,
};
const { ListCard } = VM.require(
  "${config_account}/widget/components.project.ListCard",
) || {
  ListCard: () => <></>,
};

const { fetchProjects } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  fetchProjects: () => {},
};

if (!fetchProjects) {
  return "";
}

const projects = fetchProjects() || [];
projects = projects.filter(
  (project) => project.accountId === context.accountId,
);

if (!projects) {
  return "";
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: Poppins, sans-serif;

  input {
    font-family: Poppins, sans-serif;
    color: white;
    height: 40px;

    &::placeholder {
      color: #b0b0b0;
    }
  }
`;

const [filters, setFilters] = useState({
  title: "",
});
const [showFilterModal, setShowFilterModal] = useState(false);
const [showCreateModal, setShowCreateModal] = useState(false);
const [showCreateOptionsModal, setShowCreateOptionsModal] = useState(false);
const [showImportModal, setShowImportModal] = useState(false);

const toggleFilterModal = () => {
  setShowFilterModal((prev) => !prev);
};
const toggleCreateModal = () => {
  setShowCreateModal((prev) => !prev);
};

const toggleImportModal = () => {
  setShowImportModal((prev) => !prev);
};

const toggleCreateOptionsModal = () => {
  setShowCreateOptionsModal((prev) => !prev);
};

const filteredProjects = useMemo(() => {
  let filtered = projects;
  if (filters.title !== "") {
    filtered = filtered.filter((project) =>
      project.title.toLowerCase().includes(filters.title ?? "".toLowerCase()),
    );
  }

  if (filters.teamSize !== "") {
    filtered = filtered.filter((project) => {
      switch (filters.teamSize) {
        case "1-10":
          return project.collaborators.length <= 10;
        case "10-50":
          return (
            project.collaborators.length <= 50 &&
            project.collaborators.length >= 10
          );
        case "50-100":
          return (
            project.collaborators.length <= 100 &&
            project.collaborators.length >= 50
          );
        case "100+":
          return project.collaborators.length > 100;
        default:
          return true;
      }
    });
  }

  if (filters.tags.length > 0) {
    filtered = filtered.filter((project) =>
      filters.tags.every((tag) => project.tags.includes(tag)),
    );
  }
  return filtered;
}, [filters, projects]);

const tagFilters = useMemo(() => {
  let tags = (projects || []).map((project) => project.tags).flat();
  tags = [...new Set(tags)];
  return tags;
}, [projects]);

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins, sans-serif;
    font-size: 40px;
    line-height: 120%; /* 48px */
    letter-spacing: -1.6px;
    margin: 0;
  }

  p {
    color: #e8e8e8;
    font-family: Poppins, sans-serif;
    font-size: 18px;
    margin: 0;
    max-width: 490px;
  }
`;

const Subheading = styled.h3`
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 130%; /* 31.2px */
  letter-spacing: -0.48px;
  margin: 0;
`;

const [view, setStateView] = useState(
  Storage.get("${config_account}:projects-view") ?? "grid",
);
const setView = (v) => {
  setStateView(v);
  Storage.set("${config_account}:projects-view", v);
};

return (
  <Wrapper
    className="container-xl mx-auto d-flex flex-column gap-5"
    data-bs-theme="dark"
  >
    <Widget
      src="${alias_old}/widget/components.modals.projects.Filters"
      loading=""
      props={{
        showModal: showFilterModal,
        toggleModal: toggleFilterModal,
        filters: filters,
        setFilters: setFilters,
        tagFilters,
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.ImportAndCreate"
      loading=""
      props={{
        showModal: showCreateOptionsModal,
        toggleModal: toggleCreateOptionsModal,
        onClickImport: () => {
          setShowCreateOptionsModal(false);
          setShowImportModal(true);
        },
        onClickCreate: () => {
          setShowCreateOptionsModal(false);
          setShowCreateModal(true);
        },
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.PotlockImport"
      loading=""
      props={{
        showModal: showImportModal,
        toggleModal: toggleImportModal,
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.Create"
      loading=""
      props={{
        showModal: showCreateModal,
        toggleModal: toggleCreateModal,
      }}
    />

    <Heading>
      <div className="d-flex align-items-center justify-content-between">
        <h2>My Projects</h2>
        <div className="d-flex align-items-center gap-2">
          {context.accountId && (
            <Button
              variant="primary"
              onClick={() => setShowCreateOptionsModal(true)}
            >
              Create Project
            </Button>
          )}
          <Button>Open Roles</Button>
        </div>
      </div>
      <p>Projects created by you or which you own.</p>
    </Heading>
    <div className="d-flex flex-column gap-3">
      <Subheading>Find your projects</Subheading>
      <div className="form-group d-flex gap-4 align-items-center justify-content-between">
        <div className="input-group">
          <div
            className="input-group-text border-0"
            style={{ backgroundColor: "#23242b", color: "#B0B0B0" }}
          >
            <i className="bi bi-search"></i>
          </div>
          <input
            className="form-control border-0"
            style={{ backgroundColor: "#23242b" }}
            placeholder="Search by project ID or name"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button
            className="d-flex align-items-center gap-2"
            variant="outline"
            onClick={() => setShowFilterModal(true)}
          >
            Filter <i className="bi bi-sliders"></i>
          </Button>
          <div className="d-flex align-items-center gap-2">
            <Button
              type="icon"
              className="rounded-2"
              variant={view === "grid" ? "primary" : null}
              onClick={() => setView("grid")}
            >
              <i className="bi bi-grid"></i>
            </Button>
            <Button
              type="icon"
              className="rounded-2"
              variant={view === "list" ? "primary" : null}
              onClick={() => setView("list")}
            >
              <i className="bi bi-list-ul"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
    {filteredProjects && filteredProjects.length > 0 ? (
      <>
        {view === "grid" ? (
          <Container>
            {filteredProjects.map((project) => (
              <ProjectCard data={project} type={type} />
            ))}
          </Container>
        ) : (
          <div className="d-flex flex-column gap-3">
            {filteredProjects.map((project) => (
              <ListCard data={project} type={type} />
            ))}
          </div>
        )}
      </>
    ) : (
      <p className="fw-bold text-white">No Projects Found</p>
    )}
  </Wrapper>
);
