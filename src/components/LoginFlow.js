import React from "react";
import { Widget } from "near-social-vm";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function LoginFlow(props) {
  const redirectMapStore = useBosLoaderStore();

  return (
    <div>
      <Widget
        src={"buildhub.near/widget/LoginFlow"}
        props={{
          ...props
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap
        }}
      />
    </div>
  );
}
