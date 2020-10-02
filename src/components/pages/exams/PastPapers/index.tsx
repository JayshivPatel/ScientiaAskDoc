import React, { Suspense } from "react"
import SearchBox from "components/headings/SearchBox"
import QuickAccessView from "./components/QuickAccessView"
import FoldersView from "./components/FoldersView"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import LoadingScreen from "components/suspense/LoadingScreen"
import { BasicResource, Folder, Module } from "constants/types"
const CurrentDirectoryView = React.lazy(() =>
  import("./components/CurrentDirectoryView")
)

export interface ResourcesProps {
  scope?: string
  view: string
  modules: Module[]
}

export interface ResourceState {
  error: any
  isLoaded: Boolean
  resources: BasicResource[]
  searchText: string
  folders: Folder[]
}

class PastPapers extends React.Component<ResourcesProps, ResourceState> {
  constructor(props: ResourcesProps) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      resources: [],
      folders: [],
      searchText: "",
    }
  }

  loadResources() {
    fetch("/jsons/folders.json")
      .then((response) => response.json())
      .then((f) => {
        f.forEach((folder: Folder) => this.loadFromFolder(folder.title))
        this.setState({ folders: f, isLoaded: true })
      })
      .catch((error) => {
        this.setState({ error: error, isLoaded: true })
      })
  }

  loadFromFolder(title: string) {
    fetch(`/jsons/${title.trim()}.json`)
      .then((response) => response.json())
      .then((r) => {
        const resource = this.state.resources.slice()
        this.setState({ resources: resource.concat(r) })
      })
      .catch((error) => {
        this.setState({ error: title + error })
      })
  }

  componentDidMount() {
    this.loadResources()
  }

  includeInSearchResult(item: BasicResource, searchText: string) {
    let rx = /([a-z]+)\(([^)]+)\)/gi
    let match: RegExpExecArray | null
    let title = item.title.toLowerCase()
    let tags = item.tags.map((tag) => tag.toLowerCase())

    while ((match = rx.exec(searchText)) !== null) {
      switch (match[1]) {
        case "class":
          const matchSafe = match as RegExpExecArray
          if (!tags.some((tag) => tag === matchSafe[2])) {
            return false
          }
          break
      }
    }
    let rest = searchText.replace(rx, "").trim()
    return (
      tags.some((tag) => tag.indexOf(rest) !== -1) || title.indexOf(rest) !== -1
    )
  }

  getSearchPrompts() {
    let classList = [
      { name: "b3", value: "class(b3)" },
      { name: "bm1", value: "class(bm1)" },
      { name: "ise2", value: "class(ise2)" },
      { name: "ise3", value: "class(ise3)" },
      { name: "jmc1", value: "class(jmc1)" },
      { name: "jmcb3", value: "class(jmcb3)" },
      { name: "jmcm3", value: "class(jmcm3)" },
      { name: "m3", value: "class(m3)" },
      { name: "m4", value: "class(m4)" },
      { name: "mac", value: "class(mac)" },
      { name: "mcs", value: "class(mcs)" },
      { name: "mcss", value: "class(mcss)" },
      { name: "o1", value: "class(o1)" },
      { name: "o2", value: "class(o2)" },
      { name: "phd", value: "class(phd)" },
      { name: "x1", value: "class(x1)" },
      { name: "x2", value: "class(x2)" },
    ]
    const prompts = [{ title: "Classes", list: classList }]

    return prompts
  }

  handleResourceClick(id: number) {
    let win = window.open(
      this.state.resources.find((r) => r.id === id)?.path,
      "_blank"
    )
    win?.focus()
  }

  render() {
    let scope = this.props.scope || ""
    const view = () => {
      switch (this.props.view) {
        default:
          return (
            <>
              <FoldersView
                folders={this.state.folders}
                scope={scope}
                searchText={this.state.searchText}
              />
              <Suspense fallback={<LoadingScreen successful={<></>} />}>
                {scope !== "" && (
                  <CurrentDirectoryView
                    resources={this.state.resources}
                    scope={scope}
                    searchText={this.state.searchText}
                    onItemClick={(id) => this.handleResourceClick(id)}
                    includeInSearchResult={(i, s) =>
                      this.includeInSearchResult(i, s)
                    }
                  />
                )}
              </Suspense>
              <QuickAccessView
                resources={this.state.resources}
                scope={scope}
                searchText={this.state.searchText}
                onItemClick={(id) => this.handleResourceClick(id)}
                modules={this.props.modules}
              />
            </>
          )
      }
    }

    return (
      <>
        <MyBreadcrumbs />

        {scope !== "" && (
          <SearchBox
            searchText={this.state.searchText}
            onSearchTextChange={(text) => this.setState({ searchText: text })}
            prompts={this.getSearchPrompts()}
          />
        )}

        <LoadingScreen
          error={this.state.error}
          isLoaded={this.state.isLoaded}
          successful={view()}
        />
      </>
    )
  }
}

export default PastPapers
