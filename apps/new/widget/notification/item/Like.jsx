const { accountId, value } = props;
const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const { content, popup } =
  value.item.path === `${context.accountId}/post/main`
    ? {
        content: (
          <Link
            className="fw-bold text-muted"
            href={`/${config_account}/widget/Index?page=post&accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            post
          </Link>
        ),
        popup: (
          <Widget
            src="${alias_mob}/widget/MainPage.N.Post"
            props={{
              accountId: context.accountId,
              blockHeight: value.item.blockHeight,
              hideComments: true,
            }}
          />
        ),
      }
    : value.item.path === `${context.accountId}/post/comment`
      ? {
          content: (
            <Link
              className="fw-bold text-muted"
              href={`/${config_account}/widget/Index?page=comment&accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
            >
              comment
            </Link>
          ),
          popup: (
            <Widget
              src="${alias_mob}/widget/MainPage.N.Comment.Full"
              props={{
                accountId: context.accountId,
                blockHeight: value.item.blockHeight,
              }}
            />
          ),
        }
      : value.item.path === `${context.accountId}/post/insta`
        ? {
            content: (
              <Link
                className="fw-bold text-muted"
                href={`/${alias_mob}/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
              >
                insta
              </Link>
            ),
          }
        : { content: "item???" };

return (
  <Widget
    loading={props.loading}
    src="${alias_mob}/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          liked your
          <Widget
            loading={content}
            src="${alias_mob}/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup,
              children: content,
            }}
          />
        </>
      ),
      R:
        value.item.path === `${context.accountId}/post/main` ? (
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/${config_account}/widget/Index?page=post&accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View post
          </Link>
        ) : value.item.path === `${context.accountId}/post/comment` ? (
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/${config_account}/widget/Index?page=comment&accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View comment
          </Link>
        ) : value.item.path === `${context.accountId}/post/insta` ? (
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/${alias_mob}/widget/Insta.Post.Page?accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            View insta
          </Link>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
