const StyledHashtag = styled.span`
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 4px;
  flex-wrap: wrap;

  border-radius: 100px;
  border: 1px solid var(--Yellow-Dark-6, #493c00);
  background: var(--Yellow-Dark-2, #221a00);

  /* Pixel/Shadow/Light/Post */
  box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);

  /* Body/10px */
  color: var(--Yellow-Dark-11, #f0c000);
  font-size: 16px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;

  .tag {
    color: var(--Yellow-Dark-11, #f0c000);
  }
`;
const Hashtag = ({ children }) => {
  return (
    <StyledHashtag>
      <span className="tag">#</span> {children}
    </StyledHashtag>
  );
};

return { Hashtag };
