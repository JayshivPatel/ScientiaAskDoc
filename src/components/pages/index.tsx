import React, {Suspense, useEffect, useState} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import "./style.scss"
import classNames from "classnames"
import {CalendarEvent, Module, ProgressStatus, Term, TimelineEvent,} from "constants/types"
import Container from "react-bootstrap/esm/Container"
import LoadingScreen from "components/suspense/LoadingScreen"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"
import {request} from "../../utils/api"
import {api, methods} from "../../constants/routes"
import {YEAR_OF_NEW_CODES} from "../../constants/doc"

const Timeline = React.lazy(() => import("components/pages/Timeline"))
const ModuleDashboard = React.lazy(() =>
    import("components/pages/modulePages/ModuleDashboard")
)
const Dashboard = React.lazy(() => import("components/pages/Dashboard"))
const ModuleList = React.lazy(() => import("./ModuleList"))
const ModuleResources = React.lazy(() =>
    import("./modulePages/ModuleResources")
)
const ModuleFeedback = React.lazy(() => import("./modulePages/ModuleFeedback"))
const ExamGrading = React.lazy(() => import("./exams/Grading"))
const ExamPastPapers = React.lazy(() => import("./exams/PastPapers"))
const ModuleSubmissions = React.lazy(() =>
    import("./modulePages/ModuleSubmissions")
)

interface StandardViewProps {
    toggledLeft: boolean
    toggledRight: boolean
    fileView: string
    initTimelineSideBar: () => void
    revertTimelineSideBar: () => void
    onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void
    onSettingsClick: (event?: React.MouseEvent) => void
    onEventClick: (e?: TimelineEvent) => void
    onCalendarClick: (e?: CalendarEvent) => void
    year: string
}

const StandardView: React.FC<StandardViewProps> = ({
                                                       toggledLeft,
                                                       toggledRight,
                                                       onOverlayClick,
                                                       onSettingsClick,
                                                       fileView,
                                                       revertTimelineSideBar,
                                                       initTimelineSideBar,
                                                       onEventClick,
                                                       onCalendarClick,
                                                       year,
                                                   }: StandardViewProps) => {
    const [modulesFilter, setModulesFilter] = useState("In Progress")
    const [timelineTerm, setTimelineTerm] = useState<Term>("Autumn")
    const [modules, setModules] = useState<Module[]>([])
    useEffect(() => {
        const onSuccess = (data: { [k: string]: any }[]) => {
            setModules(
                data.map((module) => ({
                    title: module.title,
                    code: year < YEAR_OF_NEW_CODES ? `CO${module.code}` : module.code,
                    canManage: module.can_manage,
                    hasMaterials: module.has_materials,
                    // Hardcoded stuff, we don't have this data currently
                    terms: ["Autumn"],
                    progressPercent: Math.floor(Math.random() * 100),
                    progressStatus: ProgressStatus.IN_PROGRESS,
                    content: "",
                    subscriptionLevel: Math.floor(Math.random() * 3) + 1 as (1 | 2 | 3),
                }))
            )
        }

        request({
            url: api.MATERIALS_COURSES(year),
            method: methods.GET,
            onSuccess: onSuccess,
            onError: (message) => console.log(`Failed to obtain modules: ${message}`),
        })
    }, [year])

    return (
        <div
            id="wrapper"
            className={classNames({
                toggledLeft: toggledLeft,
                toggledRight: toggledRight,
            })}>
            <LeftBar
                modulesFilter={modulesFilter}
                setModulesFilter={setModulesFilter}
                timelineTerm={timelineTerm}
                setTimelineTerm={setTimelineTerm}
                onEventClick={onEventClick}
                year={year}
            />
            <RightBar
                onSettingsClick={onSettingsClick}
                onCalendarClick={onCalendarClick}
            />
            <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)}></div>
            <Suspense fallback={<LoadingScreen successful={<></>}/>}>
                <Switch>
                    <Redirect exact from="/" to="/modules"/>
                    <Redirect exact from="/modules/:id" to="/modules/:id/resources"/>

                    <Route path="/dashboard">
                        <Container className={classNames("pageContainer")}>
                            <Dashboard/>
                        </Container>
                    </Route>

                    <Route exact path="/modules">
                        <Container className={classNames("pageContainer")}>
                            <ModuleList modules={modules} modulesFilter={modulesFilter}/>
                        </Container>
                    </Route>

                    <Route
                        path="/modules/:id/dashboard"
                        render={(props) => {
                            let moduleTitle = 
                                modules.find((module) => module.code === props.match.params.id)
                                    ?.title || ""
                            return (
                                <Container className={classNames("pageContainer")}>
                                    <ModuleDashboard
                                        year={year}
                                        moduleTitle={moduleTitle}
                                        moduleID={props.match.params.id}
                                    />
                                </Container>
                            )
                            }}
                    />

                    <Route
                        path="/modules/:id/resources/:scope?"
                        render={(props) => {
                            let moduleTitle = 
                                modules.find((module) => module.code === props.match.params.id)
                                    ?.title || ""
                            let canManage =
                                modules.find((module) => module.code === props.match.params.id)
                                    ?.canManage || false
                            return (
                                <Container className={classNames("pageContainer")}>
                                    <ModuleResources
                                        year={year}
                                        moduleTitle={moduleTitle}
                                        moduleID={props.match.params.id}
                                        scope={props.match.params.scope}
                                        view={fileView}
                                        canManage={canManage}
                                    />
                                </Container>
                            )
                        }}
                    />

                    <Route
                        path="/modules/:id/submissions"
                        render={(props) => (
                            <Container className={classNames("pageContainer")}>
                                <ModuleSubmissions
                                    moduleID={props.match.params.id}
                                    onEventClick={onEventClick}
                                />
                            </Container>
                        )}
                    />

                    <Route path="/modules/:id/feedback">
                        <Container className={classNames("pageContainer")}>
                            <ModuleFeedback/>
                        </Container>
                    </Route>

                    <Route path="/timeline">
                        <Timeline
                            initSideBar={initTimelineSideBar}
                            revertSideBar={revertTimelineSideBar}
                            term={timelineTerm}
                            setTerm={setTimelineTerm}
                            onEventClick={onEventClick}
                            modules={modules}
                        />
                    </Route>

                    <Route path="/exams/grading">
                        <Container className={classNames("pageContainer")}>
                            <ExamGrading/>
                        </Container>
                    </Route>

                    <Route
                        path="/exams/papers/:scope?"
                        render={(props) => (
                            <Container className={classNames("pageContainer")}>
                                <ExamPastPapers
                                    view={fileView}
                                    scope={props.match.params.scope}
                                    modules={modules}
                                />
                            </Container>
                        )}
                    />
                    <Route path="/exams" render={() => <Redirect to="/exams/papers"/>}/>

                </Switch>
            </Suspense>
        </div>
    )
}

export default StandardView
