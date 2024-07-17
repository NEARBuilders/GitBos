const content = props.content;
const noEmbed = !!props.noEmbed;

const [truncated, setTruncated] = useState(props.truncateContent ?? true);

const Wrapper = styled.div`
  overflow: hidden;
  .truncated-content {
    max-height: 10em;
    position: relative;
    overflow: hidden;

    .expand-post {
      position: absolute;
      z-index: 1;
      top: 7em;
      left: 0;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1) 25%
      );
      width: 100%;
      height: 3em;

      > div {
        position: relative;
        width: 100%;
        height: 100%;
        vertical-align: bottom;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        cursor: pointer;
        > a {
          margin: 0 0 0.7em 0.7em;
        }
      }
    }

    @media (max-width: 991px) {
      max-height: 6em;
      .expand-post {
        top: 3.4em;
      }
    }
  }

  .full-content {
    .expand-post {
      display: none;
    }
  }
`;

const currentPath = props.currentPath ?? "/${config_index}?page=activity";

const [onHashtag] = useState(() => (hashtag) => (
  <span
    key={hashtag}
    className="d-inline-flex"
    style={{ color: "var(--bs-link-color)" }}
  >
    <Link href={`${currentPath}&hashtag=${hashtag}`}>#{hashtag}</Link>
  </span>
));

const [showLightbox, setShowLightbox] = useState(false);

const [onImage] = useState(
  () => (props) =>
    props.src && (
      <Widget
        key="content-img"
        src="${alias_mob}/widget/MainPage.N.Post.Content.Image"
        loading={<div className="w-100" style={{ height: "24em" }} />}
        props={{
          image: {
            url: props.src,
          },
          alt: props.alt ?? "inline image",
        }}
      />
    ),
);

const onLink = useCallback((props) => {
  if (props.children[0] === "EMBED") {
    // EMBED
    return (
      <Widget
        src="${config_account}/widget/components.post.Embed"
        loading=""
        props={props}
      />
    );
  } else {
    return <a {...props} />;
  }
}, []);

return (
  <Wrapper>
    <div className={truncated ? "truncated-content" : "full-content"}>
      <div key="text" className="text-break">
        <Widget
          key="content"
          loading={<div className="w-100" style={{ height: "100px" }} />}
          src="${alias_mob}/widget/N.SocialMarkdown"
          props={{
            text: content.text,
            onHashtag,
            onImage,
            onLink: noEmbed ? undefined : onLink,
          }}
        />
      </div>
      {content.image && (
        <div key="content-img" className="mt-2">
          <Widget
            src="${alias_mob}/widget/MainPage.N.Post.Content.Image"
            loading={<div className="w-100" style={{ height: "24em" }} />}
            props={{ image: content.image, alt: "attached image" }}
          />
        </div>
      )}
      <div className="expand-post">
        <div>
          <a className="stretched-link" onClick={() => setTruncated(false)}>
            Show more
          </a>
        </div>
      </div>
    </div>
  </Wrapper>
);
