const { Avatar, Hashtag, Button } = VM.require(
  "buildhub.near/widget/components"
) || {
  Hashtag: () => <></>,
  Avatar: () => <></>,
  Button: () => <></>,
};

const { ProfileImages } = VM.require(
  "buildhub.near/widget/components.ProfileImages"
) || {
  ProfileImages: () => <></>,
};

const Card = styled.div`
  border-radius: 16px;
  background: var(--bg-2, #23242b);

  display: flex;
  padding: 24px 29px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  color: var(--text-color, #fff);

  .info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;

    h4 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    span {
      color: var(--white-50, #b0b0b0);
      font-size: 13px;
      font-weight: 700;
    }
  }
  .bt-w {
    flex: 1;
    button {
      width: 90%;
    }
  }
`;

const ProjectCard = ({ title, tags, people, accountId }) => {
  return (
    <Card>
      <Avatar accountId={accountId} />
      <div className="info">
        <h4>{title.length > 30 ? `${title.slice(0, 25)}...` : title}</h4>
        <span>{`@${
          accountId.length > 30
            ? `${accountId.slice(0, 20)}...${accountId.slice(
                accountId.length - 4
              )}`
            : accountId
        }`}</span>
      </div>
      <div className="d-flex align-items-center flex-wrap gap-2">
        {tags.map((tag) => (
          <Hashtag>
            <span className="fw-bold">{tag}</span>
          </Hashtag>
        ))}
      </div>
      <div>
        <ProfileImages accountIds={people} />
      </div>
      <Button
        href={`/buildhub.near/widget/app?page=project&accountId=${accountId}`}
        // className="align-self-stretch"
        linkClassName="align-self-stretch bt-w"
        variant="outline"
      >
        Open
      </Button>
    </Card>
  );
};

return { ProjectCard };