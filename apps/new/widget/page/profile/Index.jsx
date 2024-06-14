const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "AccountID prop or signed in account is required";
}

const profile = Social.getr(`${accountId}/profile`);

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SideContainer = styled.div`
  grid-column: span 2 / span 1;
`;

const MainContainer = styled.div`
  grid-column: span 4 / span 4;
`;

return (
  <div className="container-xl mt-3">
    <ProfileContainer>
      <SideContainer>
        <Widget
          src="${alias_old}/widget/components.profile.ProfileInfo"
          props={{ accountId }}
        />
      </SideContainer>
      <MainContainer>
        <Widget
          src="${alias_old}/widget/components.profile.ProfileTabs"
          props={{
            accountId,
            profile,
          }}
        />
      </MainContainer>
    </ProfileContainer>
  </div>
);
