import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  ActionImpl,
} from "kbar"
import React from "react"
import styles from "./style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LinkIcon } from "constants/map"

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator className={styles.animator}>
          <KBarSearch className={styles.search} />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

function RenderResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className={styles.group}>{item}</div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  )
}

const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
    }: {
      action: ActionImpl
      active: boolean
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    console.log(action.icon)
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: active
            ? "var(--secondary-background-color)"
            : "transparent",
        }}
        className={styles.item}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FontAwesomeIcon icon={LinkIcon[action.id]} fixedWidth />
          {action.name}
        </div>
      </div>
    )
  }
)

export default CommandBar
