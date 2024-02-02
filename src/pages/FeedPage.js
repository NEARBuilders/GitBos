import { Widget } from "near-social-vm";
import React, { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function FeedPage(props) {
  const redirectMapStore = useBosLoaderStore();

  const src = props.widgets.feed;

  const query = useQuery();
  const [widgetProps, setWidgetProps] = useState({});

  useEffect(() => {
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query]);

  console.log("srv", src);
  return (
    <div className="container-xl mt-3" style={{ backgroundColor: "#0b0c14" }}>
      <Widget
        key={src}
        src={src}
        config={{
          redirectMap: redirectMapStore.redirectMap
        }}
        props={{ requestSignIn: props.requestSignIn, ...widgetProps }}
      />
    </div>
  );
}
