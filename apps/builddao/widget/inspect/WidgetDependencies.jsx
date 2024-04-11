const src = props.src;
const code = props.code ?? Social.get(src);

const dependencyMatch =
  code && code.matchAll(/<Widget[\s\S]*?src=.*?"(.+)"[\s\S]*?\/>/g);
let dependencySources = [...(dependencyMatch || [])]
  .map((r) => r[1])
  .filter((r) => !!r);
dependencySources = dependencySources
  .filter((r, i) => dependencySources.indexOf(r) === i && r !== "(.+)")
  .map((src) => {
    const parts = src.split("/");
    return { src, accountId: parts[0], widgetName: parts[2] };
  });

const { href } = VM.require("${config_account}/widget/lib.url") || {
  href: () => {},
};

return (
  <>
    {dependencySources.map((c, i) => (
      <div key={c.src}>
        <Widget
          src="${alias_mob}/widget/ComponentSearch.Item"
          props={{
            link: `/${c.src}`,
            accountId: c.accountId,
            widgetName: c.widgetName,
            extraButtons: ({ widgetPath }) => (
              <Link
                className="btn btn-outline-secondary"
                //href={`#/${alias_mob}/widget/WidgetSource?src=${widgetPath}`}
                to={href({
                  widgetSrc: "${config_account}/widget/app",
                  params: {
                    page: "inspect",
                    widgetPath: widgetPath,
                  },
                })}
              >
                Source
              </Link>
            ),
          }}
        />
      </div>
    ))}
  </>
);
