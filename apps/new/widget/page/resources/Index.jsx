const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "sidebar",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/${config_account}/widget/Index?page=resources",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      guide: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        label: "BOS-WORKSPACE DOCS",
        init: {
          feedName: "Resources",
          name: "Guide",
          icon: "bi bi-journal-text",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/gateway/main/resources.md",
        },
        default: true,
      },
      starter: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          name: "Getting Started",
          icon: "bi bi-journal-text",
        },
        default: true,
        routes: {
          gettingStarted: {
            init: {
              name: "Getting Started",
            },
          },
          migrationGuide: {
            init: {
              name: "MigrationGuide",
            },
          },
          installation: {
            init: {
              name: "Installation",
            },
          },
          setup: {
            init: {
              name: "Setup",
            },
          },
        },
      },
      migrationGuide: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Migration Guide",
          name: "Migration Guide",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/migration_guide.md",
        },
        hide: true,
      },
      installation: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Installation",
          name: "Installation",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/installation.md",
        },
        hide: true,
      },
      setup: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Setup",
          name: "Setup",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/setup.md",
        },
        hide: true,
      },
      gettingStarted: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Getting Started",
          name: "Getting Started",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/index.md",
        },

        hide: true,
      },
      usageHeading: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          name: "Usage",
          icon: "bi bi-journal-text",
        },

        routes: {
          usage: {
            init: {
              name: "Usage",
            },
          },
          aliases: {
            init: {
              name: "Aliases",
            },
          },
          deploy: {
            init: {
              name: "Deploy",
            },
          },
        },
      },
      aliases: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Aliases",
          name: "Aliases",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/aliases.md",
        },
        hide: true,
      },
      deploy: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Deploy",
          name: "Deploy",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/deploy.md",
        },
        hide: true,
      },
      usage: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Usage",
          name: "Usage",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/index.md",
        },
        hide: true,
      },
    },
  },
};

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </div>
);
